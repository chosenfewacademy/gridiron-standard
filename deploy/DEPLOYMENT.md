# Deployment Guide

## Current deployment readiness

The repository now includes:
- lightweight HTTP server
- Dockerfile
- Docker ignore rules
- explicit output policy
- team-branding config
- input-card spec generation
- status and health endpoints

## Server endpoints

### Health
`GET /health`

### Project state
`GET /status`

### Player ratings
`GET /player/ratings?name=Jalen%20Hurts`

### Input-card spec
`GET /player/card?name=Jalen%20Hurts`

The input-card endpoint returns a structured card spec for the explicit in-game input card workflow.
It does not automatically render an image inside the deployment service.

## Local run

```bash
npm install
npm run server
```

Default port:
`3000`

## Docker run

```bash
docker build -t gridiron-standard .
docker run -p 3000:3000 --env-file .env gridiron-standard
```

## Important operating rules

- Normal audits and ratings remain text or JSON by default.
- Graphic input cards are generated only on explicit request.
- Input cards must not include player photos.
- Input cards include only:
  - player name
  - exact Madden position
  - NFL team name
  - team branding
  - OVR
  - ratings in Madden editor order

## Remaining deployment work

1. verify exact Madden editor order for all positions
2. wire a production card-rendering service if desired
3. add authentication if exposed outside a private environment
4. add persistent backing store if moving beyond file-based state
5. add CI checks and test coverage
