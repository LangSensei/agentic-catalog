# QQ Email Setup Guide

This guide helps users complete prerequisites before agents can use this skill.
Run checks in order — each step depends on the previous one.

## 1. Nodemailer

Node.js library for sending emails via SMTP.

### Check
```bash
NODE_PATH=$(npm root -g) node -e "require('nodemailer')" 2>/dev/null && echo "OK"
```

### Steps
```bash
npm install -g nodemailer
```

## 2. QQ Mail SMTP

Enable SMTP service and generate an authorization code in QQ Mail settings.

### Check
```bash
CREDS_FILE="${SKILL_CREDS_DIR:-$HOME/.config/skill-creds}/.env"
grep -q 'QQ_EMAIL_USER=' "$CREDS_FILE" 2>/dev/null && grep -q 'QQ_EMAIL_AUTH_CODE=' "$CREDS_FILE" 2>/dev/null && echo "OK" || echo "MISSING"
```

### Steps

1. Log in to [mail.qq.com](https://mail.qq.com)
2. Go to Settings > Account > POP3/IMAP/SMTP/Exchange/CardDAV
3. Enable SMTP service
4. Generate an authorization code (follow the SMS verification prompt)
5. Add credentials to the shared skill-creds env file:
   ```bash
   CREDS_DIR="${SKILL_CREDS_DIR:-$HOME/.config/skill-creds}"
   mkdir -p "$CREDS_DIR"
   echo 'QQ_EMAIL_USER=your_qq_email@qq.com' >> "$CREDS_DIR/.env"
   echo 'QQ_EMAIL_AUTH_CODE=your_authorization_code' >> "$CREDS_DIR/.env"
   ```

## 3. Verify

Send a test email to confirm everything works.

### Steps

1. Ensure Steps 1 and 2 are complete (nodemailer installed, SMTP credentials set)
2. Run the check command below to send a test email to yourself
3. Confirm the output JSON shows `"status":"success"` and check your inbox for the test email

### Check
```bash
NODE_PATH=$(npm root -g) node scripts/send.js \
  --to "$QQ_EMAIL_USER" \
  --subject "QQ Email Skill Test" \
  --body "If you received this, qq-email skill is configured correctly."
```

Expected output: `{"status":"success","messageId":"...","to":"...","subject":"..."}`
