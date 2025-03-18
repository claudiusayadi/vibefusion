FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/bun.lock* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["bun", "run", "start"]