FROM oven/bun:alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY next.config.ts ./
COPY app ./app
COPY public ./public
COPY tsconfig.json ./

RUN bun run build

FROM oven/bun:alpine AS runner

WORKDIR /app

COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", ".next/standalone/server.js"]