# ==============================
# Stage 1: Build
# ==============================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files first (cache layer)
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code & config
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript -> JavaScript
RUN npx tsc
# Resolve path aliases (e.g. config/*, controllers/*, ...)
RUN npx tsc-alias

# ==============================
# Stage 2: Production
# ==============================
FROM node:18-alpine AS production

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy prisma schema & generated client from builder
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy compiled JavaScript output from builder
COPY --from=builder /app/dist ./dist

# Copy .env.example as fallback (actual .env should be mounted or set via env vars)
COPY .env.example .env.example

# Expose service port
EXPOSE 4000

# Run Prisma migrations then start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/app.js"]