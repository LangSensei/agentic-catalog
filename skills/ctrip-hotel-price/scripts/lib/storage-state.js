// storage-state.js — Resolve the default playwright storage-state path.
//
// Resolution order:
//   1. WORKSPACE_DIR env var (explicit override)
//   2. EMPLOKE_WORKSPACE env var (legacy override)
//   3. Walk up from cwd looking for `workspace.json` (emploke marker)
//   4. XDG data home fallback (~/.local/share/playwright-state/<site>/storage-state.json)
//
// When a workspace is found, the path is
// <workspace>/.playwright-state/<site>/storage-state.json so multiple skills
// targeting the same site can share one logged-in session within a workspace.

const fs = require('fs');
const path = require('path');
const os = require('os');

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

function defaultStorageStatePath(site) {
  const root = projectRoot();
  if (root) {
    return path.join(root, '.playwright-state', site, 'storage-state.json');
  }
  const dataHome = process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share');
  return path.join(dataHome, 'playwright-state', site, 'storage-state.json');
}

module.exports = { defaultStorageStatePath, projectRoot };
