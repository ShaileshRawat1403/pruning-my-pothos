/**
 * A small CSV reader for the browser tools (RFC 4180, the shape spreadsheets
 * export): commas and newlines inside quoted cells, "" as an escaped quote,
 * empty cells kept in place, CRLF or LF line ends, a leading BOM ignored.
 * Cells are returned exactly as written apart from that; nothing is trimmed
 * inside quotes.
 */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^﻿/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  let i = 0;

  const endCell = () => {
    row.push(cell);
    cell = "";
  };
  const endRow = () => {
    endCell();
    // A line with nothing on it is not a row.
    if (!(row.length === 1 && row[0].trim() === "")) rows.push(row);
    row = [];
  };

  while (i < src.length) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        quoted = false;
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
      continue;
    }
    if (ch === '"' && cell.trim() === "") {
      cell = "";
      quoted = true;
    } else if (ch === ",") {
      endCell();
    } else if (ch === "\n" || ch === "\r") {
      endRow();
      if (ch === "\r" && src[i + 1] === "\n") i += 1;
    } else {
      cell += ch;
    }
    i += 1;
  }
  if (quoted) throw new Error("A quoted cell is never closed.");
  if (cell !== "" || row.length > 0) endRow();
  return rows;
}

/**
 * Rows as records keyed by the header row. Header names are trimmed and
 * lower-cased; unquoted cells are trimmed of surrounding spaces.
 */
export function csvRecords(text: string): { headers: string[]; records: Record<string, string>[] } {
  const rows = parseCsv(text);
  if (rows.length < 2) throw new Error("Needs a header row and at least one data row.");
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const records = rows.slice(1).map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? "").trim()])));
  return { headers, records };
}
