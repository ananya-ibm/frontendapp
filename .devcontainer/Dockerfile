FROM registry.access.redhat.com/ubi8/ubi-minimal:8.2

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG NVM_DIR=/usr/local/nvm
ARG NODE_VERSION=v14.11.0

# install necessary tools
RUN microdnf update 
RUN microdnf install -y tar gzip shadow-utils sudo bash git procps findutils

# Create user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Update bash config
RUN echo "export COMP_WORDBREAKS=\${COMP_WORDBREAKS//:}" >> /home/node/.bashrc \
    && echo "source <(npm completion)" >> /home/node/.bashrc \
    && echo "export PS1=\"\\n\\[\$(tput sgr0)\\]\\[\\033[38;5;4m\\]\\w\\[\$(tput sgr0)\\]\\n\\[\$(tput sgr0)\\]\\[\\033[38;5;10m\\]>\\[\$(tput sgr0)\\] \\[\$(tput sgr0)\\]\"" >> /home/node/.bashrc

# Setup nvm
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
