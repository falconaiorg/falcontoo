# syntax=docker/dockerfile:1


ARG NODE_VERSION=22.1.0
ARG PNPM_VERSION=8.15.4


FROM node:${NODE_VERSION}-alpine as base
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

RUN apk update && apk add --no-cache \
    chromium

ENV CHROMIUM_PATH /usr/bin/chromium
ENV LAUNCH_HEADLESS=true



# Setup pnpm path, use corepack for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH = "${PNPM_HOME}:${PATH}"
RUN corepack enable

COPY . /falcon
WORKDIR /falcon

FROM base as prod-deps
RUN --mount=type=cache,id=pnpm,target="/pnpm/store" \
    pnpm install --frozen-lockfile


FROM base as build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
RUN pnpm run build
RUN pnpm deploy --filter=@falcon/draco --prod /prod/draco


FROM base as draco

COPY --from=build /prod/draco /prod/draco
COPY apps/draco/start.sh /prod/draco/start.sh
RUN chmod +x /prod/draco/start.sh

WORKDIR /prod/draco
EXPOSE 8000
CMD ["pnpm", "start"]

