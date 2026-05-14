// storage-state.js — Resolve the default playwright storage-state path.
//
// Resolution order:
//   1. `EMPLOKE_WORKSPACE_DIR` env var — emploke's task/session runtime
//      contract (always set per-run, see emploke's runtime env contract
//      in `docs/architecture.md`).
//   2. `cwd` — fallback when the script is invoked manually outside an
//      emploke run (e.g. local debugging). Assumes the caller has `cd`'d
//      into the workspace root.
//
// All playwright-using components in the same workspace share one
// `<workspace>/.playwright/storage-state.json`. Auth scripts pass the file
// to `browser.newContext({ storageState })` so existing cookies for other
// sites are preserved; saving via `context.storageState({ path })` then
// writes the union (other sites' cookies untouched + the freshly logged-in
// site's cookies replacing any same-key stale ones).
//
// To switch accounts on the same site, delete the file and re-authenticate.

const path = require('path');

function projectRoot() {
  return process.env.EMPLOKE_WORKSPACE_DIR || process.cwd();
}

function defaultStorageStatePath() {
  return path.join(projectRoot(), '.playwright', 'storage-state.json');
}

module.exports = { defaultStorageStatePath, projectRoot };
