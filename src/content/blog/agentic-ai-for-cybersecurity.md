---
title: "Agentic AI in Cybersecurity: Moving Toward Fully Autonomous Pentesting"
description: "Hot take: fully autonomous pentesting isn't a moonshot but an engineering discipline. the real question is how can we make HITL the exception?"
pubDate: Aug 16 2025
heroImage: ../assets/agentic-ai-for-cybersecurity.png
---

### Hot take

Human‑in‑the‑loop (HITL) agentic AI[^1] isn’t the destination. We should aim for fully autonomous pentesting inside clearly defined scopes, with strong policies and guardrails.

To be clear: full autonomy without guardrails is unsafe. The idea is full autonomy inside strict policy, rich telemetry, and fast rollback, with HITL used by exception for destructive or regulated actions.

> There are two fundamental strategies to build an AI startup: you either bet the technology is going to get massively better or you bet the technology is about as good as it's going to be... In the first world, you will be really happy when the models improve, and in the second world you will be really sad. - [Sam Altman](https://www.youtube.com/watch?v=zoviibYmqmI)

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: var(--box-shadow);">
  <iframe
    src="https://www.youtube.com/embed/zoviibYmqmI"
    title="Agentic AI for Cybersecurity"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
  ></iframe>
</div>

I’m taking the first bet: design for full autonomy within clear bounds. Let agents run end‑to‑end pentest workflows without pausing for approvals when the policy, telemetry, and rollback guarantees are in place.

### Why autonomy by default (and common misconceptions)

- **Scale and throughput**: Automated recon can surface thousands of findings. If a person must approve every step, chains stall and real‑risk validation slows ([Rapid7](https://www.rapid7.com/fundamentals/human-in-the-loop/)).
- **Machine speed vs approval queues**: Exploit chains run at machine speed. Approval queues add latency and hurt end‑to‑end completion rates ([AthenaCore](https://www.athenacore.com/post/human-in-the-loop-is-not-enough-designing-meaningful-human-oversight-for-high-risk-ai)).
- **Consistency and operator variability**: Judgments vary across operators, and skills are scarce. Default gating doesn’t scale ([SAFE Security](https://safe.security/resources/blog/what-is-agentic-ai-in-cybersecurity/)).
- **Oversight quality**: Floods of probes create triage fatigue and automation bias. Better oversight = strong telemetry and clear policies, not step‑by‑step approvals ([CybersecurityTribe](https://www.cybersecuritytribe.com/articles/an-introduction-agentic-ai-in-cybersecurity/)).
- **Observability over approvals**: Attack graph traces (goals, steps, artifacts, outcomes), tool policies, and replayable logs scale; black‑box approvals don’t ([NVIDIA Blog](https://blogs.nvidia.com/blog/agentic-ai-cybersecurity/)).

Common misconceptions:

- **You don’t need AGI**: Narrow, policy‑bounded autonomy can fully run recurring tasks (recon triage, exploit validation, canary‑only lateral movement, evidence capture, reporting) at machine speed.
- **Agents don’t “roam freely”**: Well‑designed systems run with least‑privilege, short‑lived capabilities tied to intent and scope, inside geofences and rate limits - and every step is replayable.
- **Edge cases are policy‑handled**: Default‑deny on uncertainty, stage in sandboxes/canaries first, escalate only on crisp triggers.
- **Approvals vs responsibility**: Swap step approvals for policy‑as‑code and audit trails. Keep exception approvals for destructive writes or policy violations; accountability comes from pre‑authorization and full telemetry.
- **“Fully autonomous” today**: Achieve it via progressive hardening. Start safe, track reliability (chain completion, unsafe‑action rate, time‑to‑detect, time‑to‑revert), then expand.

A concrete example: an agent triages web recon findings, validates an SSRF in a sandbox, moves laterally only within canary accounts (isolated, monitored decoys) using short‑lived credentials, captures evidence, and leaves a replayable trace. It escalates only for destructive writes or when a policy‑based risk score trips a threshold.

### Oversight model and caveats

Default to autonomy for low‑ and medium‑risk actions in scoped, reversible environments. Keep continuous oversight and a fast‑acting kill switch. Pull in HITL for destructive or irreversible operations and for explicit regulatory triggers. Always operate within legal authorizations and rules of engagement. This approach lines up with guidance from [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) and [ENISA](https://www.enisa.europa.eu/publications/cybersecurity-of-ai-and-standardisation).

Oversight modes:

- **HITL (Human‑in‑the‑loop)**: A human approves actions before execution; high friction, best for destructive/irreversible writes.
- **HOTL (Human‑on‑the‑loop)**: A human supervises a running system and can intervene mid‑flight; good for elevated‑risk phases.
- **HoTL (Human‑over‑the‑loop)**[^2]: Humans set policy and thresholds, watch telemetry, and intervene by exception; the right default for reversible, well‑scoped operations.

### Implementation playbook: guardrails and steps

Guardrails that keep you safe:

- **Engagement policies**: Encode scope, rules of engagement, allowed hours, and no‑touch assets. Agents request capabilities; policies decide, log, and constrain.
- **Scoped credentials**: Issue short‑lived, least‑privilege tokens bound to intent, resources, and rate limits.
- **Staged execution**: Use dry runs, simulations, and canary resources before high‑impact actions; promote on passing checks.
- **Attack validation**: Check no‑harm constraints, correct asset/tenant scope, reversibility, and policy alignment; deny on ambiguity.
- **Attack graph observability**: Log goals, plans, actions, evidence, and outcomes for replay and forensics.
- **Continuous evaluation**: Track exploit success, false positives, unsafe‑action and policy‑violation rates, time‑to‑detect, and time‑to‑revert; halt on regressions.
- **Safety and rollback**: Use payload sandboxes, allowlists, canary tokens, rate limits, and a global kill switch.
- **Targeted human override**: Escalate on destructive writes, exfil outside canaries, policy exceptions, or when a policy‑based risk score crosses a threshold.

Here’s the playbook:

1. **Pick low‑risk candidates**: recon triage, evidence capture, sandboxed exploit validation, canary‑scope lateral movement.
2. **Start read‑only/sim**: dry runs in sandboxes and canary tenants; no external writes.
3. **Enforce policy‑bound scopes**: rules of engagement, rate limits, geofences, and no‑touch lists.
4. **Issue scoped, short‑lived credentials** tied to intent, resources, and rate limits.
5. **Stage and promote**: require success in sim/canary before production‑adjacent scopes.
6. **Instrument observability**: attack graph traces, artifact logs, and per‑tool safety metrics.
7. **Gate destructive writes**: require exception‑based approval on explicit triggers; wire a global kill switch.
8. **Close the loop**: feed lessons into policies, tests, and SLOs; expand only when reliability is green.

In short: build for agents that act within constraints and escalate by exception, not tools that constantly wait for us.

### Evidence: systems and frameworks

- **Recent academic/industry research (2024–2025)**:

  - **RapidPen**: LLM‑orchestrated autonomous pentest framework; reports end‑to‑end exploit chains in controlled targets with explicit scoping and replayable logs ([arXiv](https://arxiv.org/abs/2502.16730)).
  - **VulnBot**: Multi‑agent collaboration for recon → scanning → exploitation, guided by a penetration task graph and policy‑bounded tool use ([arXiv](https://arxiv.org/abs/2501.13411)).
  - **ARACNE**: Service‑focused autonomous agent (e.g., SSH) with constrained action spaces and guardrails to prevent out‑of‑scope actions ([arXiv](https://arxiv.org/abs/2502.18528)).
  - **AutoPentest**: Black‑box LLM agent applying chain‑of‑thought and tool orchestration with safety staging and evaluation harnesses ([arXiv](https://arxiv.org/abs/2505.10321)).

- **Regulatory and industry frameworks**:
  - **NIST AI RMF 1.0**: Emphasizes transparency, traceability, documentation, measurable risk controls, continuous monitoring, and incident response across Govern/Map/Measure/Manage functions ([NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)).
  - **ENISA guidance on the cybersecurity of AI**: Recommends secure‑by‑design engineering, rigorous logging, data governance, evaluation, and alignment with emerging standards ([ENISA](https://www.enisa.europa.eu/publications/cybersecurity-of-ai-and-standardisation)).
  - **EU AI Act (risk‑based regulation)**: Requires human oversight, robust logging, technical documentation, and risk management proportional to system risk; aligns naturally with policy‑ and telemetry‑driven autonomy for high‑impact operations ([European Commission overview](https://digital-strategy.ec.europa.eu/en/policies/eu-ai-act)).

Across both, the guardrails converge: strict scoping, staged execution (read‑only/sim first), short‑lived/least‑privilege credentials, policy‑based gating, and comprehensive audit trails.

### Challenges we’re solving (and how)

Autonomy doesn’t ignore risk; it manages it well. Here’s what works in practice:

- **Adversarial pressure on agents**: Prompt/tool injection, data‑exfil attempts, and model evasion.
  - Our approach: tool allowlists, strong input sanitization, payload sandboxes, canary tokens, out‑of‑band DLP/egress monitors, and deny‑by‑default on ambiguity.
- **Automation bias and triage fatigue**: Teams may over‑trust automated results or miss anomalies.
  - Our approach: policy‑based risk thresholds, exception‑only approvals for destructive writes, periodic trace reviews, and separate “review SLOs” from “execution SLOs.”
- **Policy gaps and drift**: Rules of engagement can miss edge cases or degrade over time.
  - Our approach: policy‑as‑code with versioning, pre‑deployment policy test suites, and drift detection wired to a kill switch.
- **Observability and response**: Without telemetry, autonomy can add uncertainty.
  - Our approach: full‑fidelity attack graph traces, per‑tool safety metrics (unsafe‑action rate, policy‑violation rate), anomaly detection, and one‑click system‑wide rollback/kill.
- **Culture and trust**: Not every org is ready to drop step approvals on day one.
  - Our approach: start read‑only/sim, publish weekly reliability and safety metrics, and expand autonomy only when SLOs stay green.

[^1]: By “agentic AI,” I mean systems that can plan and act via tools under explicit policies and telemetry. By “HITL,” I mean step‑gated approvals for each action rather than supervising by exception.

[^2]: “Human‑over‑the‑loop” (HoTL) refers to policy‑ and telemetry‑driven oversight where humans supervise outcomes and intervene by exception rather than approving each step in advance.
