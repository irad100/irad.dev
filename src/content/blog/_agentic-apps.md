---
title: Agentic Apps
description: Agentic Apps Description
pubDate: May 2 2025
heroImage: ../assets/agentic-apps.png
---

```mermaid
---
config:
  look: handDrawn
  theme: neutral
---
flowchart TD
    U[User Query]

    subgraph Agent
        direction TB
        R["Reason (internal chain-of-thought)"]
        A["Act (external tool / API call)"]
    end

    E[Environment / Tool API]

    U --> R
    R -- compose action --> A
    A -- execute --> E
    E -- observation --> R
    R -- refine thought / next action --> A
    R -- final answer --> U
```
