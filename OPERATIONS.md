# Corporate Site — Operations

## Local development

### Prerequisites

| Tool | Purpose | Install |
|------|---------|---------|
| Node.js ≥ 20 | Runtime | [nodejs.org](https://nodejs.org) |
| pnpm | Package manager | `npm install -g pnpm` |
| uv | Python (notification service) | [docs.astral.sh/uv](https://docs.astral.sh/uv) |

Install dependencies:

```bash
pnpm install
```

### Notification service

The contact form requires the notification service to be running locally.
See the [notification service README](https://github.com/Neosofia/notification/blob/main/README.md) for setup instructions.

Once running, add the following to `.env`:

```
VITE_EMAIL_API_URL=http://localhost:8005
```

### Start the dev server

```bash
pnpm dev
```

The site is available at `http://localhost:5173`.

---

## Production deployment (GitHub Pages)

The site is built and published via GitHub Actions on every push to `main`.

### Build environment variables

Set these as repository secrets / Actions variables in **Settings → Secrets and variables → Actions**:

| Variable | Description |
|---|---|
| `VITE_EMAIL_API_URL` | Public URL of the deployed notification service (e.g. `https://notification-xyz.up.railway.app`) |

### Wiring the notification service

1. Deploy the notification service to Railway (see its README).
2. Copy the Railway public URL.
3. Set `VITE_EMAIL_API_URL` to that URL in the GitHub Actions environment (step above).
4. Re-run the deployment workflow (or push a commit) to rebuild with the new variable.
