# Changelog

## 1.2.0 (2026-05-11)

- Drop SWAT-era cred path. Credentials now load from `<SKILL_CREDS_DIR>/.env` (default `~/.config/skill-creds/.env`); `SKILL_CREDS_DIR` env var overrides the directory. Existing users with `~/.swat/.env` need to copy or move that file (`mv ~/.swat/.env ~/.config/skill-creds/.env`).

## 1.1.0 (2026-04-19)

- Auto-load credentials from `~/.swat/.env` (env vars take precedence)
- Update SETUP.md to instruct writing credentials to `~/.swat/.env` instead of exporting env vars
- Update SKILL.md environment variables section to document auto-loading behavior

## 1.0.0 (2026-04-19)

- Initial release
- Send emails via QQ Mail SMTP using nodemailer
- Support for plain text body, HTML file body, and file attachments
- JSON output to stdout for success and error cases
- Environment variable based credential management
