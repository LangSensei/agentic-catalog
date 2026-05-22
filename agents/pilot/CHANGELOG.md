# Changelog

## 1.0.0 (2026-05-22)

Initial release.

- Distills the always-on workspace pilot role into a marketplace agent. Body covers Setup, Hard rules, Onboarding, Resume, Operating loop, Dispatching, Hiring, Domain derivation, Mission lifecycle, Monitoring, Release flow, Failure handling, Self-improvement, Rituals, Communication, State files, Edge cases.
- Ships a full `references/` subtree (bootstrap, operating-loop, hiring/, sub-agent/, monitoring/, self-improvement/, rituals/, communication/, edge-cases/, state-management) so every body citation resolves.
- State directory convention is `.pilot/` (not `.ceo/`); pilot is a sibling of `workspace-ceo`, not a rename, so the two can coexist on the same workspace without colliding.
- Workspace path contract: uses `EMPLOKE_WORKSPACE` only as the scope id (UUID) and `EMPLOKE_WORKSPACE_DIR` whenever a path is needed.
