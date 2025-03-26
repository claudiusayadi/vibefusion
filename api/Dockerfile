FROM oven/bun:alpine AS base

WORKDIR /api

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM base AS runner

WORKDIR /api

COPY --from=base /api/package.json /api/bun.lock ./
COPY --from=base /api/node_modules ./node_modules
COPY --from=base /api/dist ./dist

ENV NODE_ENV=production
EXPOSE 3001

CMD ["bun", "run", "start"]