#!/usr/bin/env node

/**
 * Claude Prompt Optimizer - One Command Installer
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// 彩色输出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorLog(color, text) {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

// 显示横幅
function showBanner() {
  console.log('');
  colorLog('cyan', '╔══════════════════════════════════════════════════════════════╗');
  colorLog('cyan', '║                                                              ║');
  colorLog('cyan', '║           🚀 Claude Prompt Optimizer Installer            ║');
  colorLog('cyan', '║                                                              ║');
  colorLog('cyan', '║    基于谷歌68页提示词圣经和老金元提示词技术                   ║');
  colorLog('cyan', '║                                                              ║');
  colorLog('cyan', '╚══════════════════════════════════════════════════════════════╝');
  console.log('');
}

// 获取平台信息
function getPlatform() {
  const platform = os.platform();
  if (platform === 'win32') return 'windows';
  if (platform === 'darwin') return 'macos';
  return 'linux';
}

// 获取Claude配置目录
function getClaudeConfigDir() {
  const platform = getPlatform();
  const homeDir = os.homedir();

  switch (platform) {
    case 'windows':
      return path.join(homeDir, 'AppData', 'Roaming', 'Claude');
    case 'macos':
      return path.join(homeDir, 'Library', 'Application Support', 'Claude');
    case 'linux':
      return path.join(homeDir, '.config', 'Claude');
    default:
      return path.join(homeDir, '.claude');
  }
}

// 复制本地文件到目标目录
function copyLocalFiles(targetDir) {
  const sourceDir = path.join(__dirname, '..');

  const filesToCopy = [
    'hooks/prompt-optimizer-hook.ts',
    'hooks/metaprompt-enhancer-hook.ts',
    'hooks/prompt-optimizer-config.json'
  ];

  filesToCopy.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    // 确保目标目录存在
    const targetDirPath = path.dirname(targetPath);
    if (!fs.existsSync(targetDirPath)) {
      fs.mkdirSync(targetDirPath, { recursive: true });
    }

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`  ✓ Copied ${file}`);
    } else {
      console.log(`  ⚠ Warning: ${file} not found`);
    }
  });
}

// 主安装流程
async function install() {
  showBanner();

  try {
    colorLog('yellow', '[1/4] 检查系统环境...');

    // 检查Node.js
    const nodeVersion = process.version;
    colorLog('green', `✓ Node.js已安装: ${nodeVersion}`);

    // 检查npm
    try {
      execSync('npm --version', { stdio: 'ignore' });
      colorLog('green', '✓ npm已就绪');
    } catch {
      colorLog('red', '❌ npm未找到');
      process.exit(1);
    }

    colorLog('yellow', '[2/4] 创建配置目录...');
    const claudeDir = getClaudeConfigDir();
    const hooksDir = path.join(claudeDir, 'hooks');

    // 创建目录
    if (!fs.existsSync(claudeDir)) {
      fs.mkdirSync(claudeDir, { recursive: true });
    }
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }
    colorLog('green', `✓ 配置目录已创建: ${hooksDir}`);

    colorLog('yellow', '[3/4] 复制Hook文件...');
    copyLocalFiles(hooksDir);
    colorLog('green', '✓ 所有Hook文件已复制');

    colorLog('yellow', '[4/4] 检查tsx...');

    // 检查并安装tsx
    try {
      execSync('tsx --version', { stdio: 'ignore' });
      colorLog('green', '✓ tsx已安装');
    } catch {
      colorLog('cyan', '  正在安装tsx...');
      try {
        execSync('npm install -g tsx', { stdio: 'inherit' });
        colorLog('green', '✓ tsx安装完成');
      } catch {
        colorLog('yellow', '  ⚠ tsx安装失败，请手动运行: npm install -g tsx');
      }
    }

    // 完成
    console.log('');
    colorLog('green', '🎉 安装成功！');
    console.log('');
    colorLog('cyan', '使用方法：');
    console.log('');
    colorLog('white', '1. 重启Claude Code');
    console.log('');
    colorLog('white', '2. 输入任何提示词，例如：');
    colorLog('yellow', '   - 写个报告');
    colorLog('yellow', '   - 分析数据');
    colorLog('yellow', '   - 设计logo');
    console.log('');
    colorLog('white', '3. Hook会自动优化你的提示词！');
    console.log('');

  } catch (error) {
    colorLog('red', `❌ 安装失败: ${error.message}`);
    process.exit(1);
  }
}

// 运行安装
if (require.main === module) {
  install();
}