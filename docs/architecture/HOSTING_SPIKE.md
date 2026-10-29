# Hosting spike (Business Web Hosting)

Goal: verify the plan can run this app before building further. The scaffold in `src/app/api/internal/spike` reports runtime facts and is protected by `SPIKE_SECRET` (404 without it). Remove the route once results are recorded.

## Steps (owner, in hPanel)
1. Create a Node.js web app from the GitHub repo `wwyw-creative` (branch `phase-1-foundation`), Node 24 if offered (else 22), build `npm run build`, start `npm run start`.
2. Set env vars: `SPIKE_SECRET` (16+ random chars), `MEDIA_ROOT` (a writable path outside the app directory).
3. Add a cron job (shortest interval offered) that runs `curl -s -H "x-spike-secret: $SECRET" https://<domain>/api/health`.
4. Call `GET /api/internal/spike` with header `x-spike-secret` and paste the JSON here.

## Pass criteria
| Check | Pass if |
|---|---|
| Build + `next start` | App serves `/api/health` |
| Node version | >= 20.9 |
| Media disk | `disk.writable` true and the path survives a redeploy |
| Outbound HTTPS | all `outbound[].ok` true |
| Memory | build completes; `rss` stable under repeated calls |
| Cron | runs at 1-5 min interval and can call the app |

## Results
Not run yet. (Local macOS run of the endpoint passed; that says nothing about Hostinger.)
