FROM oven/bun:alpine AS base
WORKDIR /app
COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY . .

# Compile TypeScript config to JavaScript
RUN bun build next.config.ts --outfile=next.config.js

RUN bun run build

# Verify standalone output
RUN ls -la .next/standalone || echo "Standalone directory not found!"

FROM base AS release
WORKDIR /app

# Copy standalone directory (contains server.js and node_modules)
COPY --from=build /app/.next/standalone ./

# Copy static files
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30m --timeout=5s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1


# Run the standalone server
CMD ["bun", "run", "server.js"]