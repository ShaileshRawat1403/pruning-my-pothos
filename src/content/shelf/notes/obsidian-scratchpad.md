---
title: "Notes/Tools: a daily Obsidian scratchpad"
seoTitle: "Obsidian Scratchpad: A Daily Note Setup You Can Copy"
description: "A daily Obsidian scratchpad: one note per day, timestamps and short fragments. The Daily notes and Templates settings to copy, and a weekly cleanup."
publishDate: "2026-01-25"
updatedAt: "2026-10-21"
tags:
  - notes
  - obsidian
  - workflow
coverUrl: "/covers/shelf/items/notes/obsidian-scratchpad.png"
coverAlt: "Cover illustration for Notes/Tools: a daily Obsidian scratchpad"
---

An Obsidian scratchpad is one note per day that you write into without organising anything: a timestamp, a fragment, the next fragment. It takes two core plugins, Daily notes and Templates, and about five minutes to set up.

## The setup

1. Create two folders in your vault: `Scratchpad` and `Templates`.
2. In `Templates`, create a note called `scratchpad` with this in it:

   ```markdown
   # {{date}}

   - {{time}}
   ```

3. Turn on the **Templates** core plugin and set its template folder to `Templates`.
4. Turn on the **Daily notes** core plugin and set:
   - **Date format**: `YYYY-MM-DD`
   - **New file location**: `Scratchpad`
   - **Template file location**: `Templates/scratchpad`
5. Give two commands a hotkey: **Open today's daily note**, and **Templates: Insert current time** for each new fragment.

`{{date}}` and `{{time}}` are filled in when the note is created, as described in [Obsidian's Templates help](https://obsidian.md/help/plugins/templates); the Daily notes settings are on [its own help page](https://obsidian.md/help/plugins/daily-notes). Checked 2026-10-21.

## How I use it

Working notes. Subject to change.

What I keep: a daily file with timestamps and short fragments.

Why it works: low friction beats perfect structure when ideas are early.

Where it fails: long-term retrieval without periodic cleanup.

## The cleanup that keeps it useful

The failure above has a cheap fix: once a week, read the week's scratchpads and move anything still alive into a proper note, then leave the scratchpad alone. The daily files stay as a log; the ideas move to where you will look for them later.

A fragment that keeps coming back can be a decision waiting to be written down. The longer argument for writing those down is [decision logs beat memory](/self/decision-logs-beat-memory/).
