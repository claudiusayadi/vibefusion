FROM oven/bun:alpine AS base
WORKDIR /app
COPY package*.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY . .

# RUN echo 'export default { output: "standalone" };' > next.config.mjs

RUN bun run build
RUN ls -la .next

FROM base AS release
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next

EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30m --timeout=5s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

CMD ["bun", "run", "start"]