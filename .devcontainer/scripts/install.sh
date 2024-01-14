#!/usr/bin/env zsh

set -eux

echo 'alias la="exa -lah"' >> ~/.zshrc

# Theme
sudo mkdir -p ${ZSH:-~/.oh-my-zsh}/custom/themes && cd ${ZSH:-~/.oh-my-zsh}/custom/themes && git clone https://github.com/eendroroy/alien.git
cd alien && sudo git submodule update --init --recursive

sed -i -e '$a# Alien Theme' ~/.zshrc
sed -i -e '$aexport ALIEN_USE_NERD_FONT=1' ~/.zshrc
sed -i -e '$aexport ALIEN_THEME="${ZSH_ALIEN_THEME}"' ~/.zshrc
sed -i -e '$aexport ALIEN_VERSIONS_PROMPT="NODE"' ~/.zshrc
sed -i -e '$aexport ALIEN_SECTIONS_LEFT=(exit user path newline ssh venv prompt)' ~/.zshrc
sed -i -e '$aexport ALIEN_SECTIONS_RIGHT=(vcs_branch:async vcs_status:async vcs_dirty:async versions time battery)' ~/.zshrc
sed -i -e '$asource $ZSH/custom/themes/alien/alien.zsh' ~/.zshrc
sed -i -e '$a# Alien Theme end' ~/.zshrc

# ZSH Plugins

# - ZSH Syntax Highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# - ZSH Autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

sed -i 's/\(^plugins=([^)]*\)/\1 zsh-syntax-highlighting zsh-autosuggestions/' ~/.zshrc
