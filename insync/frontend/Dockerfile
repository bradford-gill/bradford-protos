FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY project/package.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY project/ .

# Expose port
EXPOSE 5173

# Start development server (configured via docker-compose)
# npm run dev -- --host 0.0.0.0 --port 5173