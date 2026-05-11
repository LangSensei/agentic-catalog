// storage-state.js — Resolve the default playwright storage-state path.
//
// Resolution order:
//   1. WORKSPACE_DIR env var (explicit override)
//   2. EMPLOKE_WORKSPACE env var (legacy override)
//   3. Walk up from cwd looking for `workspace.json` (emploke marker)
//   4. cwd fallback (treats current dir as the workspace)
//
// All playwright-using components in the same workspace share one
// `<workspace>/.playwright/storage-state.json`. Auth scripts pass the file
// to `browser.newContext({ storageState })` so existing cookies for other
// sites are preserved; saving via `context.storageState({ path })` then
// writes the union (other sites' cookies untouched + the freshly logged-in
// site's cookies replacing any same-key stale ones).
//
// To switch accounts on the same site, delete the file and re-authenticate.

const fs = require('fs');
const path = require('path');

function projectRoot() {
  if (process.env.WORKSPACE_DIR) return process.env.WORKSPACE_DIR;
  if (process.env.EMPLOKE_WORKSPACE) return process.env.EMPLOKE_WORKSPACE;
  let dir = process.cwd();
  while (dir && dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'workspace.json'))) return dir;
    dir = path.dirname(dir);
  }
  return null;
}

function defaultStorageStatePath() {
  const root = projectRoot() || process.cwd();
  return path.join(root, '.playwright', 'storage-state.json');
}

module.exports = { defaultStorageStatePath, projectRoot };
