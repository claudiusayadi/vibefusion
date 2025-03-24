FROM oven/bun:alpine AS builder

WORKDIR /api

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:alpine

WORKDIR /api

COPY --from=builder /api/package.json /api/bun.lock* ./
COPY --from=builder /api/node_modules ./node_modules
COPY --from=builder /api/dist ./dist

ENV NODE_ENV=production

CMD ["bun", "run", "start"]