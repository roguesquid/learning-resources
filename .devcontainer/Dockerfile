ARG OS_VARIANT='20-bullseye'

FROM mcr.microsoft.com/vscode/devcontainers/base:${OS_VARIANT}

ARG SHELL='zsh'
ARG PNPM_HOME='/usr/local/share/pnpm'

ENV SHELL $SHELL
ENV PNPM_HOME ${PNPM_HOME}
ENV PATH="${PATH}:${PNPM_HOME}"

# Configura PNPM
RUN mkdir -p $PNPM_HOME && chown -R vscode $PNPM_HOME

# Actualiza e instala paquetes adicionales
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && apt-get install -y --no-install-recommends \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    lsb-release \
    tzdata \
    fonts-powerline \
    git-flow
