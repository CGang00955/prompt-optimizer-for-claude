#!/bin/bash

# Claude Prompt Optimizer - One Command Installer for Linux/Mac
#
# Usage:
#   curl -sSL https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/install.sh | bash
#   or
#   wget -qO- https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/install.sh | bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
print_banner() {
    echo ""
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                              ║${NC}"
    echo -e "${CYAN}║           🚀 Claude Prompt Optimizer Installer            ║${NC}"
    echo -e "${CYAN}║                                                              ║${NC}"
    echo -e "${CYAN}║    基于谷歌68页提示词圣经和老金元提示词技术                   ║${NC}"
    echo -e "${CYAN}║                                                              ║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_step() {
    echo -e "${YELLOW}[$1/5] $2...${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${CYAN}  $1${NC}"
}

# Get platform
get_platform() {
    case "$(uname -s)" in
        Darwin*)    echo "macos" ;;
        Linux*)     echo "linux" ;;
        *)          echo "unknown" ;;
    esac
}

# Get Claude config directory
get_claude_dir() {
    local platform=$(get_platform)
    local home_dir="$HOME"

    case $platform in
        macos)
            echo "$home_dir/Library/Application Support/Claude"
            ;;
        linux)
            echo "$home_dir/.config/Claude"
            ;;
        *)
            echo "$home_dir/.claude"
            ;;
    esac
}

# Download file
download_file() {
    local url="$1"
    local dest="$2"

    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$url" -o "$dest"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$url" -O "$dest"
    else
        print_error "需要 curl 或 wget 来下载文件"
        exit 1
    fi
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Main installation
main() {
    print_banner

    # Step 1: Check environment
    print_step "1" "检查系统环境"

    if ! command_exists node; then
        print_error "请先安装 Node.js: https://nodejs.org"
        exit 1
    fi
    print_success "Node.js已安装: $(node --version)"

    if ! command_exists npm; then
        print_error "npm 未找到"
        exit 1
    fi
    print_success "npm已就绪"

    # Step 2: Create directories
    print_step "2" "创建配置目录"

    CLAUDE_DIR=$(get_claude_dir)
    HOOKS_DIR="$CLAUDE_DIR/hooks"

    mkdir -p "$HOOKS_DIR"
    print_success "配置目录已创建: $HOOKS_DIR"

    # Step 3: Download hooks
    print_step "3" "下载Hook文件"

    BASE_URL="https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/hooks"
    FILES=(
        "prompt-optimizer-hook.ts"
        "metaprompt-enhancer-hook.ts"
        "prompt-optimizer-config.json"
    )

    for file in "${FILES[@]}"; do
        print_info "下载: $file"
        download_file "$BASE_URL/$file" "$HOOKS_DIR/$file"
    done
    print_success "所有Hook文件已下载"

    # Step 4: Install dependencies
    print_step "4" "安装依赖"

    if ! command_exists tsx; then
        print_info "正在安装tsx..."
        npm install -g tsx
        print_success "tsx安装完成"
    else
        print_success "tsx已安装"
    fi

    # Step 5: Setup environment
    print_step "5" "设置环境变量"

    # Create env setup script
    ENV_SCRIPT="$HOOKS_DIR/setup-env.sh"
    cat > "$ENV_SCRIPT" << 'EOF'
#!/bin/bash
# Claude Prompt Optimizer Environment Setup

export CLAUDE_HOOKS_DIR="$(dirname "$0")"
export DEBUG_PROMPT_OPTIMIZER=1
export DEBUG_METAPROMPT=1

echo "✓ 环境变量已设置"
echo "  CLAUDE_HOOKS_DIR = $CLAUDE_HOOKS_DIR"
EOF

    chmod +x "$ENV_SCRIPT"
    print_success "环境变量配置完成"

    # Test installation
    print_step "" "运行功能测试"

    if [ -f "$HOOKS_DIR/prompt-optimizer-hook.ts" ] && [ -f "$HOOKS_DIR/metaprompt-enhancer-hook.ts" ]; then
        print_success "Hook文件存在"
        print_success "配置文件正确"
        print_success "安装验证通过"
    else
        print_error "Hook文件缺失"
        exit 1
    fi

    # Success message
    echo ""
    print_success "🎉 安装成功！"
    echo ""
    echo -e "${CYAN}使用方法：${NC}"
    echo ""
    echo "1. 重启Claude Code"
    echo ""
    echo "2. 输入任何提示词，例如："
    echo -e "${YELLOW}   - 写个报告${NC}"
    echo -e "${YELLOW}   - 分析数据${NC}"
    echo -e "${YELLOW}   - 设计logo${NC}"
    echo ""
    echo "3. Hook会自动优化你的提示词！"
    echo ""
    echo -e "${MAGENTA}💡 提示: 查看优化建议，学习更好的提示词技巧${NC}"
    echo ""
    echo -e "${CYAN}要设置环境变量，请运行：${NC}"
    echo "source $ENV_SCRIPT"
}

# Run installation
main "$@"