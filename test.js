#!/usr/bin/env node

/**
 * Test script for prompt-optimizer hooks
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Test cases
const testCases = [
  {
    name: 'Simple prompt test',
    input: { prompt: '写一篇文章' },
    expectedFeatures: ['优化建议', '角色设定']
  },
  {
    name: 'Complex task test',
    input: { prompt: '请分析我们公司的季度销售数据，找出增长点和问题' },
    expectedFeatures: ['分析', '数据']
  },
  {
    name: 'Creative task test',
    input: { prompt: '设计一个logo' },
    expectedFeatures: ['创意', '设计']
  }
];

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, text) {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

// Test hook functionality
async function testHook(hookPath, testCase) {
  try {
    const input = JSON.stringify(testCase.input);
    const result = execSync(`echo '${input}' | tsx ${hookPath}`, {
      encoding: 'utf8',
      timeout: 5000
    });

    const output = JSON.parse(result);

    // Check expected features
    const hasFeatures = testCase.expectedFeatures.some(feature =>
      JSON.stringify(output).includes(feature)
    );

    return {
      success: true,
      hasFeatures,
      output
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Main test runner
async function runTests() {
  log('blue', '🧪 Running Prompt Optimizer Tests\n');

  const hooksDir = path.join(__dirname, 'hooks');
  const hooks = [
    { name: 'Basic Optimizer', path: path.join(hooksDir, 'prompt-optimizer-hook.ts') },
    { name: 'Metaprompt Enhancer', path: path.join(hooksDir, 'metaprompt-enhancer-hook.ts') }
  ];

  let allPassed = true;

  for (const hook of hooks) {
    log('yellow', `\nTesting: ${hook.name}`);

    if (!fs.existsSync(hook.path)) {
      log('red', `  ❌ Hook file not found: ${hook.path}`);
      allPassed = false;
      continue;
    }

    for (const testCase of testCases) {
      const result = await testHook(hook.path, testCase);

      if (result.success) {
        log('green', `  ✓ ${testCase.name}`);
        if (result.hasFeatures) {
          log('green', `    ✓ Contains expected features`);
        }
      } else {
        log('red', `  ❌ ${testCase.name}`);
        log('red', `    Error: ${result.error}`);
        allPassed = false;
      }
    }
  }

  // Summary
  log('blue', '\n' + '='.repeat(50));
  if (allPassed) {
    log('green', '✅ All tests passed!');
  } else {
    log('red', '❌ Some tests failed');
    process.exit(1);
  }
}

// Check dependencies
function checkDependencies() {
  try {
    execSync('tsx --version', { stdio: 'ignore' });
    return true;
  } catch {
    log('red', '❌ tsx is not installed');
    log('yellow', 'Please run: npm install -g tsx');
    return false;
  }
}

// Main
if (require.main === module) {
  if (!checkDependencies()) {
    process.exit(1);
  }

  runTests().catch(error => {
    log('red', `Test error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { runTests };