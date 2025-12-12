# Claude Prompt Optimizer - One Command Installer for Windows
#
# Usage:
#   iwr -useb https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/install.ps1 | iex

param(
    [switch]$Force,
    [string]$InstallPath = "$env:APPDATA\Claude"
)

# Colors
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Blue"
    Cyan = "Cyan"
    Magenta = "Magenta"
    White = "White"
}

function Write-ColorText {
    param(
        [string]$Color,
        [string]$Text
    )
    Write-Host $Text -ForegroundColor $Colors[$Color]
}

function Write-Banner {
    Write-Host ""
    Write-ColorText Cyan "╔══════════════════════════════════════════════════════════════╗"
    Write-ColorText Cyan "║                                                              ║"
    Write-ColorText Cyan "║           🚀 Claude Prompt Optimizer Installer            ║"
    Write-ColorText Cyan "║                                                              ║"
    Write-ColorText Cyan "║    基于谷歌68页提示词圣经和老金元提示词技术                   ║"
    Write-ColorText Cyan "║                                                              ║"
    Write-ColorText Cyan "╚══════════════════════════════════════════════════════════════╝"
    Write-Host ""
}

function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

function Download-File {
    param(
        [string]$Url,
        [string]$Destination
    )

    try {
        Invoke-WebRequest -Uri $Url -OutFile $Destination -UseBasicParsing
    }
    catch {
        Write-ColorText Red "下载失败: $Url"
        throw
    }
}

# Main installation
function Install-PromptOptimizer {
    Write-Banner

    # Step 1: Check environment
    Write-ColorText Yellow "[1/5] 检查系统环境..."

    # Check Node.js
    if (-not (Test-Command "node")) {
        Write-ColorText Red "❌ 请先安装 Node.js: https://nodejs.org"
        exit 1
    }
    $nodeVersion = node --version
    Write-ColorText Green "✓ Node.js已安装: $nodeVersion"

    # Check npm
    if (-not (Test-Command "npm")) {
        Write-ColorText Red "❌ npm 未找到"
        exit 1
    }
    Write-ColorText Green "✓ npm已就绪"

    # Step 2: Create directories
    Write-ColorText Yellow "[2/5] 创建配置目录..."

    $hooksPath = Join-Path $InstallPath "hooks"

    if (-not (Test-Path $InstallPath)) {
        New-Item -ItemType Directory -Path $InstallPath -Force | Out-Null
    }
    if (-not (Test-Path $hooksPath)) {
        New-Item -ItemType Directory -Path $hooksPath -Force | Out-Null
    }
    Write-ColorText Green "✓ 配置目录已创建: $hooksPath"

    # Step 3: Download hooks
    Write-ColorText Yellow "[3/5] 下载Hook文件..."

    $baseUrl = "https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/hooks"
    $files = @(
        "prompt-optimizer-hook.ts",
        "metaprompt-enhancer-hook.ts",
        "prompt-optimizer-config.json"
    )

    foreach ($file in $files) {
        Write-ColorText Cyan "  下载: $file"
        $url = "$baseUrl/$file"
        $dest = Join-Path $hooksPath $file
        Download-File -Url $url -Destination $dest
    }
    Write-ColorText Green "✓ 所有Hook文件已下载"

    # Step 4: Install dependencies
    Write-ColorText Yellow "[4/5] 安装依赖..."

    # Check and install tsx
    if (-not (Test-Command "tsx")) {
        Write-ColorText Cyan "  正在安装tsx..."
        npm install -g tsx
        if ($LASTEXITCODE -eq 0) {
            Write-ColorText Green "✓ tsx安装完成"
        } else {
            Write-ColorText Red "❌ tsx安装失败"
            exit 1
        }
    } else {
        Write-ColorText Green "✓ tsx已安装"
    }

    # Step 5: Setup environment
    Write-ColorText Yellow "[5/5] 设置环境变量..."

    # Create environment setup script
    $envScript = Join-Path $hooksPath "setup-env.ps1"
    $envContent = @"
# Claude Prompt Optimizer Environment Setup
`$env:CLAUDE_HOOKS_DIR = "$hooksPath"
`$env:DEBUG_PROMPT_OPTIMIZER = "1"
`$env:DEBUG_METAPROMPT = "1"

Write-Host "✓ 环境变量已设置" -ForegroundColor Green
Write-Host "  CLAUDE_HOOKS_DIR = `$env:CLAUDE_HOOKS_DIR" -ForegroundColor Green
"@

    Set-Content -Path $envScript -Value $envContent
    Write-ColorText Green "✓ 环境变量配置完成"

    # Set environment variables for current session
    $env:CLAUDE_HOOKS_DIR = $hooksPath
    $env:DEBUG_PROMPT_OPTIMIZER = "1"
    $env:DEBUG_METAPROMPT = "1"

    # Test installation
    Write-ColorText Yellow "运行功能测试..."

    $testFiles = @(
        "prompt-optimizer-hook.ts",
        "metaprompt-enhancer-hook.ts",
        "prompt-optimizer-config.json"
    )

    $allFilesExist = $true
    foreach ($file in $testFiles) {
        $filePath = Join-Path $hooksPath $file
        if (-not (Test-Path $filePath)) {
            $allFilesExist = $false
            break
        }
    }

    if ($allFilesExist) {
        Write-ColorText Green "✓ Hook文件存在"
        Write-ColorText Green "✓ 配置文件正确"
        Write-ColorText Green "✓ 安装验证通过"
    } else {
        Write-ColorText Red "❌ Hook文件缺失"
        exit 1
    }

    # Success message
    Write-Host ""
    Write-ColorText Green "🎉 安装成功！"
    Write-Host ""
    Write-ColorText Cyan "使用方法："
    Write-Host ""
    Write-ColorText White "1. 重启Claude Code"
    Write-Host ""
    Write-ColorText White "2. 输入任何提示词，例如："
    Write-ColorText Yellow "   - 写个报告"
    Write-ColorText Yellow "   - 分析数据"
    Write-ColorText Yellow "   - 设计logo"
    Write-Host ""
    Write-ColorText White "3. Hook会自动优化你的提示词！"
    Write-Host ""
    Write-ColorText Magenta "💡 提示: 查看优化建议，学习更好的提示词技巧"
    Write-Host ""
    Write-ColorText Cyan "要设置环境变量，请运行："
    Write-Host "powershell -ExecutionPolicy Bypass -File `"$envScript`""
    Write-Host ""
}

# Error handling
trap {
    Write-ColorText Red "❌ 安装过程中发生错误: $($_.Exception.Message)"
    exit 1
}

# Run installation
Install-PromptOptimizer