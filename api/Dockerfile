FROM oven/bun:alpine AS base

WORKDIR /api

COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS build

WORKDIR /api

COPY . .

RUN bun run build
RUN ls -la dist

FROM base AS release

WORKDIR /api

COPY --from=build /api/dist ./dist
COPY --from=build /api/package.json ./
COPY --from=build /api/bun.lock ./

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30m --timeout=5s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

CMD ["bun", "run", "dist/index.js"]