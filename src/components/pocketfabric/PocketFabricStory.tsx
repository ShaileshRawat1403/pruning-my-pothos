"use client";

import Link from "next/link";
import { useState } from "react";
import SpotlightCard from "../SpotlightCard";

const research = "https://doi.org/10.5281/zenodo.23836212";
const validation = "https://doi.org/10.5281/zenodo.23836251";

const milestones = [
  { date: "August 2026", title: "Start with a terminal", text: "The pre-study used a second phone, a Vivo I2202. Linux execution inside the Android app hit restrictions that did not appear under the same command run another way. The precise cause remained unidentified.", ref: "§5.2 · pre-study" },
  { date: "September / early October", title: "The phone becomes the host", text: "The OnePlus 9 ran services in a Debian userland under PRoot. Restarts, binary replacement and supervision produced operational failures. The work shifted from getting tools to launch to keeping services controllable.", ref: "§§4, 5.2" },
  { date: "10 October", title: "Move into chroot", text: "Debian 13 was built beside the old installation. Services moved in stages, with the old userland retained for rollback. Magisk started the supervisor at boot. A mount cleanup incident required a reboot.", ref: "§§5.2–5.3 · migration and incident" },
  { date: "October", title: "Find the operating limits", text: "Android power policy denied network access to Linux service accounts. A missing procfs interface made idle terminal supervision expensive. Separate Linux accounts and launch limits provided a narrower boundary than containers.", ref: "§§5.3–5.6" },
  { date: "25–28 October", title: "Test the GPU, then the claim", text: "An integer check passed. Embeddings with the default half-precision paths failed the fixed accuracy criteria. Disabling those paths passed, but the GPU still lost the cold end-to-end comparison.", ref: "§6 · GPU experiments" },
];

const phases = [
  { title: "Keep a rollback", text: "Archive the node state and build Debian 13 beside the existing PRoot installation. The old service environment stays available.", moved: 0 },
  { title: "Give it a boot path", text: "Install the tools and runit supervisor. A Magisk late-start script starts Linux services without depending on an unlocked Termux session.", moved: 0 },
  { title: "Move Verb first", text: "Run the replacement on a test port, compare it with the live service, then switch over. A service cutover is a separate step from building the userland.", moved: 1 },
  { title: "Move the other services", text: "Move LanguageOps, AdGuard, cloudflared and SSH. This diagram reconstructs the 10 October migration; it is not a live inventory.", moved: 5 },
  { title: "Reboot and check", text: "The recorded hands-off reboot test passed. Magisk brought the services back even though Termux:Boot did not run. One recovery test does not establish an availability rate.", moved: 5 },
];
const services = ["Verb", "LanguageOps", "AdGuard", "cloudflared", "SSH"];
const incident = [
  { title: "Bind the device tree", text: "A test bound /dev into the chroot. The mount copies remained in a shared propagation group.", state: "Shared mounts", broken: false },
  { title: "Clean up the copy", text: "Unmounting the copy propagated through the shared peer group to Android’s original device mounts.", state: "Unmount propagates", broken: true },
  { title: "Lose the device mounts", text: "Terminals, binder, cgroups and USB were affected. ADB dropped and new terminals failed with ENODEV.", state: "Device mounts lost", broken: true },
  { title: "Reboot to recover", text: "A reboot restored the device mounts. Later mount work needed private propagation and checks against Android init’s mount table.", state: "Restored after reboot", broken: false },
];

function Source({ children, report = "research" }: { children: React.ReactNode; report?: "research" | "validation" }) {
  return <a className="pf-source" href={report === "research" ? research : validation}>{children} ↗</a>;
}

function PhonePlate() {
  return <figure className="pf-phone-plate">
    <svg viewBox="0 0 460 400" role="img" aria-labelledby="pf-phone-title pf-phone-desc">
      <title id="pf-phone-title">Android remains underneath the Linux services</title>
      <desc id="pf-phone-desc">A OnePlus 9 contains a Debian chroot, a runit supervisor and application services. Android and the vendor kernel remain underneath. The laptop connects as an operator client.</desc>
      <path d="M64 356H402M308 74l41-25M310 80h53" className="pf-ink-line" />
      <text x="326" y="35" className="pf-svg-note">Still a phone.</text>
      <rect x="95" y="18" width="216" height="337" rx="27" className="pf-phone-shell" />
      <path d="M174 31h58M181 342h44" className="pf-ink-line" />
      <rect x="110" y="62" width="186" height="230" rx="7" className="pf-svg-paper" />
      <text x="128" y="90" className="pf-svg-label">Debian 13 / chroot</text>
      <rect x="124" y="106" width="158" height="46" rx="3" className="pf-svg-accent" />
      <text x="203" y="134" textAnchor="middle" className="pf-svg-label">Web apps + terminals</text>
      <path d="M203 154v19" className="pf-ink-line" />
      <rect x="124" y="176" width="158" height="36" rx="3" className="pf-svg-paper" />
      <text x="203" y="199" textAnchor="middle" className="pf-svg-label">runit supervisor</text>
      <path d="M124 228h158" className="pf-ink-line" />
      <text x="203" y="253" textAnchor="middle" className="pf-svg-label">Android 14</text>
      <text x="203" y="278" textAnchor="middle" className="pf-svg-small">vendor kernel 5.4</text>
      <text x="203" y="320" textAnchor="middle" className="pf-svg-small">OnePlus 9 · rooted</text>
      <path d="M312 191h76v71" className="pf-ink-line" strokeDasharray="4 5" />
      <rect x="345" y="264" width="86" height="55" rx="3" className="pf-svg-paper" />
      <path d="M335 325h106" className="pf-ink-line" />
      <text x="388" y="287" textAnchor="middle" className="pf-svg-small">Operator</text>
      <text x="388" y="306" textAnchor="middle" className="pf-svg-small">laptop</text>
      <text x="54" y="386" className="pf-svg-note">The laptop can leave. The services stay.</text>
    </svg>
    <figcaption>Architecture of the recorded deployment. The laptop is a client. <Source>Research §4</Source></figcaption>
  </figure>;
}

export default function PocketFabricStory() {
  const [milestone, setMilestone] = useState(2);
  const [phase, setPhase] = useState(0);
  const [incidentStep, setIncidentStep] = useState(0);
  const [precision, setPrecision] = useState<"on" | "off">("on");
  const [timing, setTiming] = useState<"cold" | "compute">("cold");
  const selected = milestones[milestone];
  const fault = incident[incidentStep];
  const cpu = timing === "cold" ? 2.037 : 0.382;
  const gpu = timing === "cold" ? 3.095 : 0.293;
  const maxTime = timing === "cold" ? 3.2 : 0.4;

  return <article className="pf-story">
    <header className="pf-hero">
      <div className="pf-hero-copy">
        <Link href="/stack/" className="pf-back">← Stack / PocketFabric</Link>
        <p className="pf-kicker">One phone. A month of operating it.</p>
        <h1>A retired phone,<br />run like a server.</h1>
        <p className="pf-lead">PocketFabric is an experiment in using a rooted Android phone as personal computing infrastructure. The hard parts were service control, recovery, isolation and getting the GPU result right.</p>
        <p className="pf-byline">Shailesh Rawat · Independent Researcher<br />Study: August–October 2026 · Reports: 31 October 2026</p>
        <div className="pf-links"><a href="#pf-migration">Explore the migration ↓</a><a href="#pf-reports">Read the reports ↗</a></div>
      </div>
      <PhonePlate />
    </header>

    <div className="pf-ledger" aria-label="Study scope">
      <div><strong>1</strong><span>main device<br />OnePlus 9</span></div>
      <div><strong>12</strong><span>weeks of records<br />including the pre-study</span></div>
      <div><strong>28</strong><span>completed experiments<br />6 refused or interrupted</span></div>
      <div><strong>8</strong><span>unplanned incidents<br />recorded in the study</span></div>
    </div>
    <p className="pf-caption">Historical observations through 29 October 2026. This page is an illustrated account of that work, not a live status page. <Source>Research §§3–4</Source></p>

    <nav className="pf-chapters" aria-label="PocketFabric sections">
      <a href="#pf-record">The record</a><a href="#pf-migration">The migration</a><a href="#pf-failure">The failure</a><a href="#pf-boundary">The boundary</a><a href="#pf-gpu">The GPU</a><a href="#pf-reports">The reports</a>
    </nav>

    <section id="pf-record" className="pf-section">
      <div className="pf-section-head"><p className="pf-kicker">01 / The record</p><h2>Getting it to run was the beginning.</h2><p>A terminal experiment grew into a host for web applications and coding-agent sessions. Select a point to see what changed.</p></div>
      <div className="pf-timeline" role="group" aria-label="Study milestones">
        {milestones.map((item, i) => <button key={item.title} type="button" aria-pressed={milestone === i} aria-controls="pf-milestone-detail" onClick={() => setMilestone(i)}><span className="pf-timeline-dot" /><span className="pf-mono">{item.date}</span><strong>{item.title}</strong></button>)}
      </div>
      <div className="pf-detail" id="pf-milestone-detail" aria-live="polite" aria-atomic="true"><p className="pf-kicker">{selected.date}</p><h3>{selected.title}</h3><p>{selected.text}</p><Source>Research {selected.ref}</Source></div>
    </section>

    <section id="pf-migration" className="pf-section">
      <div className="pf-section-head"><p className="pf-kicker">02 / The migration</p><h2>Change the userland. Keep a way back.</h2><p>PRoot ran a Linux userland through system-call translation. With root access, chroot gave it a different filesystem root while still sharing Android’s kernel. The move happened in stages on 10 October.</p></div>
      <div className="pf-controls" role="group" aria-label="Migration stage">{phases.map((item, i) => <button key={item.title} type="button" aria-pressed={phase === i} aria-controls="pf-migration-board pf-phase-detail" onClick={() => setPhase(i)}>{i + 1}. {item.title}</button>)}</div>
      <figure className="pf-migration-board" id="pf-migration-board" aria-label={`Migration stage ${phase + 1}: ${phases[phase].title}`}>
        <div className="pf-service-column"><h3>PRoot / Termux</h3><p>The earlier installation</p><ul>{services.filter((_, i) => i >= phases[phase].moved).map(name => <li key={name}>{name}</li>)}</ul>{phases[phase].moved === 5 && <p className="pf-empty">Retained for rollback</p>}</div>
        <span className="pf-migration-arrow" aria-hidden="true">→</span>
        <div className="pf-service-column pf-destination"><h3>Debian chroot</h3><p>Magisk → runit → services</p><ul>{services.filter((_, i) => i < phases[phase].moved).map(name => <li key={name}>{name}</li>)}</ul>{phases[phase].moved === 0 && <p className="pf-empty">Build and check first</p>}</div>
        <figcaption>Illustrated reconstruction of the migration, not a deployment control.</figcaption>
      </figure>
      <div className="pf-detail" id="pf-phase-detail" aria-live="polite" aria-atomic="true"><h3>{phases[phase].title}</h3><p>{phases[phase].text}</p><Source>Research §5.2</Source></div>
      <div className="pf-pair pf-fixes">
        <div><p className="pf-kicker">Binary replacement</p><h3>Write, then rename.</h3><p>Copying over the running binary caused SIGBUS crashes. Replacing it through a new file and rename avoided that failure.</p></div>
        <div><p className="pf-kicker">Supervision</p><h3>Check the process that matters.</h3><p>The PRoot wrapper and the real service process needed different handling. A successful wrapper command did not prove that a restart had replaced the service.</p></div>
      </div>
    </section>

    <section id="pf-failure" className="pf-section">
      <div className="pf-section-head"><p className="pf-kicker">03 / The failure</p><h2>A copy of /dev was still connected.</h2><p>A chroot does not automatically isolate mount operations. This cleanup reached Android’s own device mounts. Step through the incident.</p></div>
      <div className="pf-controls" role="group" aria-label="Mount incident stage">{incident.map((item, i) => <button type="button" key={item.title} aria-pressed={incidentStep === i} aria-controls="pf-incident-detail" onClick={() => setIncidentStep(i)}>{i + 1}. {item.title}</button>)}</div>
      <figure className={`pf-mounts${fault.broken ? " pf-mounts-broken" : ""}`}>
        <div><span className="pf-kicker">Android / original</span><strong>/dev</strong><span>terminals · binder · USB</span></div>
        <div className="pf-mount-bridge"><span aria-hidden="true">{incidentStep === 3 ? "∥" : "↔"}</span><span>{fault.state}</span></div>
        <div><span className="pf-kicker">Chroot / copy</span><strong>/dev</strong><span>{incidentStep === 3 ? "Private propagation required" : "Shared propagation"}</span></div>
        <figcaption>Mechanism drawing of the recorded incident. No commands here operate the phone.</figcaption>
      </figure>
      <div className="pf-detail" id="pf-incident-detail" aria-live="polite" aria-atomic="true"><h3>{fault.title}</h3><p>{fault.text}</p><Source>Research §5.3</Source></div>
    </section>

    <section id="pf-boundary" className="pf-section">
      <div className="pf-section-head"><p className="pf-kicker">04 / The boundary</p><h2>The kernel set the ceiling.</h2><p>This vendor build lacked user and PID namespaces. Separate Linux accounts and controlled launch paths supplied a limited boundary; the public deployment did not have per-session container isolation.</p></div>
      <figure className="pf-boundary-figure">
        <div className="pf-pair"><div><span className="pf-kicker">verb-host</span><h3>Application server</h3><p>Private state and the public service</p></div><div><span className="pf-kicker">verb-agent</span><h3>Terminal sessions</h3><p>Tools, launch limits and resource budgets</p></div></div>
        <div className="pf-kernel-rule">Shared Android vendor kernel <span>No user or PID namespaces</span></div>
        <figcaption>Recorded public deployment checkpoint, 12 October. Candidate isolation experiments were assessed separately. <Source>Research §§4, 5.5</Source></figcaption>
      </figure>
      <div className="pf-pair pf-fixes"><div><p className="pf-kicker">Power policy</p><h3>The process lived. Its network did not.</h3><p>Android’s Doze policy blocked network access for Linux accounts used by the candidate agent boundary. Service health needed to include reachability and recovery.</p><Source>Research §5.3</Source></div><div><p className="pf-kicker">Idle cost</p><h3>A missing interface had a CPU bill.</h3><p>The vendor build omitted a procfs child-process interface. The original supervisor consumed 0.44 CPU cores per idle terminal until its process tracking was redesigned.</p><Source>Research §5.4</Source></div></div>
    </section>

    <section id="pf-gpu" className="pf-section">
      <div className="pf-section-head"><p className="pf-kicker">05 / The GPU</p><h2>Compute worked. The defaults failed the test.</h2><p>The Adreno 660 ran Vulkan compute through Turnip. Exact integer addition passed. Embedding output needed a separate comparison against fixed numerical criteria.</p></div>
      <div className="pf-gpu-grid">
        <figure className="pf-test">
          <h3>Change the precision path</h3>
          <p>F16 means 16-bit floating point. Compare the GPU results against the same cosine threshold.</p>
          <div className="pf-controls" role="group" aria-label="GPU precision path"><button type="button" aria-pressed={precision === "on"} onClick={() => setPrecision("on")}>F16 on</button><button type="button" aria-pressed={precision === "off"} onClick={() => setPrecision("off")}>F16 off</button></div>
          <div className="pf-verdict" aria-live="polite" aria-atomic="true"><span className="pf-kicker">Minimum cosine similarity</span><strong>{precision === "on" ? "0.99982" : "≥ 0.999997"}</strong><span className={precision === "on" ? "pf-fail" : "pf-pass"}>{precision === "on" ? "Failed the fixed criteria" : "Passed the fixed criteria"}</span><span>Cosine threshold: ≥ 0.99999</span></div>
          <figcaption>Results for the tested model, build and driver. Passing a tolerance does not mean bit-identical output. The full criteria also include component errors. <Source>Research §§6.1–6.2</Source></figcaption>
        </figure>
        <figure className="pf-test">
          <h3>Choose what the clock counts</h3>
          <p>The GPU’s compute counter was lower. Starting a fresh process changed the result.</p>
          <div className="pf-controls" role="group" aria-label="Benchmark timing scope"><button type="button" aria-pressed={timing === "cold"} onClick={() => setTiming("cold")}>Cold end-to-end</button><button type="button" aria-pressed={timing === "compute"} onClick={() => setTiming("compute")}>Compute counter</button></div>
          <div className="pf-bars" aria-live="polite" aria-atomic="true">{[["CPU", cpu], ["GPU", gpu]].map(([name, value]) => <div className="pf-bar-row" key={name}><span>{name}</span><div className="pf-bar-track"><div className={`pf-bar pf-bar-${String(name).toLowerCase()}`} style={{ width: `${Number(value) / maxTime * 100}%` }} /></div><strong>{Number(value).toFixed(3)} s</strong></div>)}<p>{timing === "cold" ? "CPU finished first in this cold job." : "GPU compute was quicker; this excludes startup and output."}</p></div>
          <figcaption>36 texts, 732 tokens; one cold run per configuration (n = 1). Compute values are internal prompt-evaluation counters, not another end-to-end measurement. <Source>Research §6.3</Source></figcaption>
        </figure>
      </div>
      <aside className="pf-caution"><h3>The tempting result was the wrong one.</h3><p>An apparent 46× GPU advantage came from an invalid CPU measurement. Offline tests reproduced a thread-starvation mechanism; the cause on the phone remained unidentified. A resident GPU worker and energy use were not tested.</p><Source>Research §§6.3–6.4</Source></aside>
    </section>

    <section id="pf-reports" className="pf-section">
      <div className="pf-section-head"><p className="pf-kicker">06 / The reports</p><h2>Read the evidence and the loose ends.</h2><p>The research report explains the experiments. The validation report checks a specific release and records what remained unresolved.</p></div>
      <div className="pf-pair pf-report-cards">
        <SpotlightCard href={research} external accent="var(--accent-amber)"><span className="pf-kicker">Research / version 1.2</span><h3>A Second Life Under Constraints ↗</h3><p>The device, experiments, failures and limits. Includes a supplementary evidence ledger.</p><span className="pf-mono">doi:10.5281/zenodo.23836212</span></SpotlightCard>
        <SpotlightCard href={validation} external accent="var(--accent-cyan)"><span className="pf-kicker">Validation / version 1.2</span><h3>PocketNode functional validation ↗</h3><p>Source-specific tests and bounded service observations. Open findings remain visible.</p><span className="pf-mono">doi:10.5281/zenodo.23836251</span></SpotlightCard>
      </div>
      <div className="pf-evidence-notes"><h3>What this establishes</h3><p>A single-device study with a pre-study on a second phone. Raw operational logs are private; the public supplements support the reported figures and ledger. The work does not establish long-term availability, energy savings or results across other devices.</p><p>The 31 October validation includes failed checks and open findings. Local console fixes had separate test evidence and were not certified as deployed. The latest state belongs in that report, rather than in a green status illustration here. <Source report="validation">Validation report</Source></p><p>Personal work by Shailesh Rawat, self-funded, with no external funding or endorsement. The reports disclose substantial AI assistance. Both are CC BY 4.0 preprints and have not undergone journal peer review.</p></div>
      <p className="pf-endnote">Adapted from the author’s interactive PocketFabric account. The separate meaning-similarity experiment is outside these two reports and is not presented as a result here.</p>
      <div className="pf-links"><Link href="/stack/">← More work on Stack</Link><Link href="/about/">About the author →</Link></div>
    </section>
  </article>;
}
