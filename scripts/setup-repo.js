#!/usr/bin/env node

/**
 * GitHub Repository Setup Script
 *
 * This script helps initialize the Git repository and prepare for first push
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Repository configuration
const REPO_CONFIG = {
  name: 'prompt-optimizer-for-claude',
  description: '🚀 One-command prompt optimizer for Claude Code - Based on Google\'s 68-page prompting guide and Lao Jin\'s metaprompt techniques',
  username: 'CGang00955', // Replace with actual username
  topics: [
    'claude',
    'prompt-engineering',
    'ai',
    'optimization',
    'prompt-optimizer',
    'claude-code',
    'metaprompt',
    'google-prompting-guide',
    'typescript',
    'automation'
  ]
};

console.log('🚀 Setting up GitHub repository...\n');

// Initialize git repository
try {
  console.log('1️⃣ Initializing Git repository...');
  execSync('git init', { stdio: 'inherit' });

  console.log('2️⃣ Adding all files...');
  execSync('git add .', { stdio: 'inherit' });

  console.log('3️⃣ Creating initial commit...');
  execSync('git commit -m "🎉 Initial commit: Add prompt optimizer for Claude Code"', { stdio: 'inherit' });

  // Add remote origin (user needs to replace CGang00955)
  console.log('\n✅ Repository initialized successfully!');
  console.log('\n📝 Next steps:');
  console.log('\n1. Create a new repository on GitHub:');
  console.log(`   - Repository name: ${REPO_CONFIG.name}`);
  console.log(`   - Description: ${REPO_CONFIG.description}`);
  console.log(`   - Topics: ${REPO_CONFIG.topics.join(', ')}`);
  console.log('   - Make it public');
  console.log('   - Don\'t initialize with README (we already have one)');

  console.log('\n2. Add remote origin:');
  console.log(`   git remote add origin https://github.com/${REPO_CONFIG.username}/${REPO_CONFIG.name}.git`);

  console.log('\n3. Push to GitHub:');
  console.log('   git branch -M main');
  console.log('   git push -u origin main');

  console.log('\n4. Update references:');
  console.log('   - Replace "CGang00955" in all files with your actual GitHub username');
  console.log('   - Update package.json repository URLs');
  console.log('   - Update install script URLs');

  console.log('\n5. Configure secrets in GitHub repository settings:');
  console.log('   - NPM_TOKEN (for publishing to npm)');
  console.log('   - SNYK_TOKEN (for security scanning)');

  console.log('\n✨ Your repository is ready for GitHub!');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}