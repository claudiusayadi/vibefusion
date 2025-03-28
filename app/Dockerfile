FROM oven/bun:alpine AS base
WORKDIR /app
COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY . .

RUN bun run build

FROM base AS release
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./.next/standalone

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", ".next/standalone/server.js"]