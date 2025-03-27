FROM oven/bun:alpine AS base
WORKDIR /usr/src/app
COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS build
WORKDIR /usr/src/app
COPY . .
RUN bun run build

FROM base AS release
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/.next ./

EXPOSE 3000

CMD ["bun", ".next/standalone/server.js"]