#!/usr/bin/env bash
set -e

REPO="username/spoookify"
VERSION="v0.1.0"
BINARY_NAME="spoookify"
INSTALL_DIR="${HOME}/.local/bin"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

info() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# Detect OS
OS="$(uname -s)"
case "$OS" in
  Linux*)  OS_TYPE="linux" ;;
  Darwin*) OS_TYPE="darwin" ;;
  *)       error "Unsupported OS: $OS. Use install.ps1 for Windows." ;;
esac

# Detect Architecture
ARCH="$(uname -m)"
case "$ARCH" in
  x86_64|amd64) ARCH_TYPE="amd64" ;;
  aarch64|arm64) ARCH_TYPE="arm64" ;;
  *)             error "Unsupported architecture: $ARCH" ;;
esac

info "Detected: ${OS_TYPE}/${ARCH_TYPE}"

# Determine binary name
if [ "$OS_TYPE" = "windows" ]; then
  BINARY_FILE="${BINARY_NAME}-${OS_TYPE}-${ARCH_TYPE}.exe"
else
  BINARY_FILE="${BINARY_NAME}-${OS_TYPE}-${ARCH_TYPE}"
fi

DOWNLOAD_URL="https://github.com/${REPO}/releases/download/${VERSION}/${BINARY_FILE}"

# Create install directory
mkdir -p "$INSTALL_DIR"

info "Downloading from ${DOWNLOAD_URL}"
if command -v curl >/dev/null 2>&1; then
  curl -fsSL "$DOWNLOAD_URL" -o "${INSTALL_DIR}/${BINARY_NAME}"
elif command -v wget >/dev/null 2>&1; then
  wget -q "$DOWNLOAD_URL" -O "${INSTALL_DIR}/${BINARY_NAME}"
else
  error "curl or wget required"
fi

chmod +x "${INSTALL_DIR}/${BINARY_NAME}"

info "Installed to ${INSTALL_DIR}/${BINARY_NAME}"

# Check PATH
if [[ ":$PATH:" != *":${INSTALL_DIR}:"* ]]; then
  warn "${INSTALL_DIR} is not in your PATH"
  echo ""
  echo "Add it to your shell profile:"
  echo "  echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.bashrc"
  echo "  echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.zshrc"
  echo "  source ~/.bashrc"
  echo ""
fi

info "Installation complete! Run '${BINARY_NAME}' to start"
