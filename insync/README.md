## Production Deployment
```bash
docker compose up -d --build
```

## Development Deployment (hot reload)
Use the dev override to mount source code and enable auto-reload for both the Vite frontend and FastAPI backend:
```bash
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build
```
The frontend service installs dependencies inside the container and watches the local `frontend/project` directory, while the backend runs `uv run backend -- --reload` for live API updates.