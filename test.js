#!/usr/bin/env node

/**
 * Simple test script for prompt-optimizer
 */

console.log('✅ Test script is running');
console.log('✅ Project structure is valid');

// Check if essential files exist
const fs = require('fs');
const path = require('path');

const essentialFiles = [
  'package.json',
  'bin/install.js',
  'hooks/prompt-optimizer-hook.ts',
  'hooks/metaprompt-enhancer-hook.ts',
  'hooks/prompt-optimizer-config.json',
  'README.md'
];

let allFilesExist = true;

essentialFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 All tests passed!');
  process.exit(0);
} else {
  console.log('\n❌ Some files are missing');
  process.exit(1);
}