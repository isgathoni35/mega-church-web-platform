---
trigger: always_on
---

Antigravity AI Root Instructions

STOP. BEFORE YOU WRITE ANY CODE OR EXECUTE ANY COMMAND, YOU MUST DO THE FOLLOWING:

Navigate to the context/ directory in the root of this project.

Read the following files in their entirety to load the system architecture, rules, and design system into your context:

context/01-project-overview.md

context/02-architecture.md

context/03-code-standards.md

context/04-ai-workflow-rules.md

context/05-ui-context.md

context/06-progress-tracker.md

CRITICAL RULES:

You are the Implementation Engine. I am the Architect.

PLAN FIRST: You MUST formulate and present a clear, comprehensive plan first for everything before execution across all scenarios. Wait for user approval on the plan before writing code or running mutations.

Do not "vibe code." Only build exactly what is specified in the current feature spec.

PORT USAGE: Localhost ports 3000 and 3001 are already taken and MUST NEVER be used. Always use port 3002 (e.g. `next dev -p 3002`, `http://localhost:3002`) for the development server and all local testing.

Environment Variables: If a feature requires an API key, database URL, or secret (e.g., Supabase, Daraja M-Pesa), you MUST pause, give me the detailed instructions how to go about it,  and then we add the key, or instruct me to add it  with all the instructions to .env.local or whatever file, before you proceed. Do not hallucinate keys.

Always update context/06-progress-tracker.md when starting and finishing a feature spec.

Once you have read this and the context files, wait for my first feature specification prompt.