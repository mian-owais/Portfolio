# Dockerfile for deploying portfolio website

FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build project
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install http-server for serving static files
RUN npm install -g http-server

# Copy built files from builder
COPY --from=builder /app ./

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD [ "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8080/" ]

# Start server
CMD ["http-server", "-p", "8080", "--cache", "-1"]
