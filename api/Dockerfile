FROM oven/bun:alpine AS base

WORKDIR /api

COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS build

WORKDIR /api

COPY . .

RUN bun run build

FROM base AS release

WORKDIR /api

COPY --from=build /api/dist ./dist
COPY --from=build /api/package.json ./
COPY --from=build /api/bun.lock ./

RUN bun install --production

EXPOSE 3001

CMD ["bun", "run", "start"]