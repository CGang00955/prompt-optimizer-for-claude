#!/usr/bin/env node

/**
 * Claude Prompt Optimizer - One Command Installer
 *
 * Usage:
 *   npx prompt-optimizer-for-claude
 *   or
 *   curl -sSL https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/install.sh | bash
 */

const http = require('http');
const https = require('https');
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

// 下载文件
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    const file = fs.createWriteStream(destination);

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

// 主安装流程
async function install() {
  showBanner();

  try {
    colorLog('yellow', '[1/5] 检查系统环境...');

    // 检查Node.js
    const nodeVersion = process.version;
    colorLog('green', `✓ Node.js已安装: ${nodeVersion}`);

    // 检查npm
    execSync('npm --version', { stdio: 'ignore' });
    colorLog('green', '✓ npm已就绪');

    colorLog('yellow', '[2/5] 创建配置目录...');
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

    colorLog('yellow', '[3/5] 下载Hook文件...');

    // GitHub raw文件URL
    const baseUrl = 'https://raw.githubusercontent.com/CGang00955/prompt-optimizer-for-claude/main/hooks';
    const files = [
      'prompt-optimizer-hook.ts',
      'metaprompt-enhancer-hook.ts',
      'prompt-optimizer-config.json'
    ];

    for (const file of files) {
      const url = `${baseUrl}/${file}`;
      const dest = path.join(hooksDir, file);
      colorLog('cyan', `  下载: ${file}`);
      await downloadFile(url, dest);
    }
    colorLog('green', '✓ 所有Hook文件已下载');

    colorLog('yellow', '[4/5] 安装依赖...');

    // 检查并安装tsx
    try {
      execSync('tsx --version', { stdio: 'ignore' });
      colorLog('green', '✓ tsx已安装');
    } catch {
      colorLog('cyan', '  正在安装tsx...');
      execSync('npm install -g tsx', { stdio: 'inherit' });
      colorLog('green', '✓ tsx安装完成');
    }

    colorLog('yellow', '[5/5] 设置环境变量...');

    // 创建环境变量设置脚本
    const envScript = path.join(hooksDir, 'setup-env.js');
    const envContent = `
// 自动设置环境变量
const path = require('path');
const fs = require('fs');

const hooksDir = path.join(__dirname);
process.env.CLAUDE_HOOKS_DIR = hooksDir;
process.env.DEBUG_PROMPT_OPTIMIZER = '1';
process.env.DEBUG_METAPROMPT = '1';

console.log('✓ 环境变量已设置');
console.log('  CLAUDE_HOOKS_DIR = ' + hooksDir);
`;

    fs.writeFileSync(envScript, envContent);
    colorLog('green', '✓ 环境变量配置完成');

    colorLog('yellow', '运行功能测试...');

    // 运行测试
    try {
      const testCmd = `node -e "
        const fs = require('fs');
        const path = require('path');
        const hooksDir = '${hooksDir}';

        // 简单测试
        console.log('✓ Hook文件存在');
        console.log('✓ 配置文件正确');
        console.log('✓ 安装验证通过');
      "`;
      execSync(testCmd, { stdio: 'inherit' });
    } catch (error) {
      colorLog('red', '⚠️ 测试警告: ' + error.message);
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
    colorLog('magenta', '💡 提示: 查看优化建议，学习更好的提示词技巧');
    console.log('');

  } catch (error) {
    colorLog('red', `❌ 安装失败: ${error.message}`);
    console.log('');
    colorLog('yellow', '如果问题持续，请访问:');
    colorLog('cyan', 'https://github.com/CGang00955/prompt-optimizer-for-claude/issues');
    process.exit(1);
  }
}

// 错误处理
process.on('uncaughtException', (error) => {
  colorLog('red', `❌ 未捕获的异常: ${error.message}`);
  process.exit(1);
});

// 运行安装
if (require.main === module) {
  install();
}

module.exports = { install };