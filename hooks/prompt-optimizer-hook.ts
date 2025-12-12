#!/usr/bin/env tsx

import type { Buffer } from 'node:buffer'
import process from 'node:process'

/**
 * Claude Code Prompt Optimizer Hook
 *
 * 基于谷歌68页提示词圣经和老金元提示词技术
 * 自动优化和强化用户输入的提示词
 *
 * 核心优化要素：
 * - Persona（角色设定）
 * - Task（任务定义）
 * - Context（上下文）
 * - Format（格式要求）
 */

// TypeScript interfaces for type safety
interface ToolInput {
  prompt?: string
  [key: string]: unknown
}

interface HookData {
  tool_input?: ToolInput
  prompt?: string
  [key: string]: unknown
}

// Debug mode
const DEBUG = process.env.DEBUG_PROMPT_OPTIMIZER === '1'
function log(msg: string): void {
  if (DEBUG) {
    console.error(`[prompt-optimizer] ${msg}`)
  }
}

// Read from stdin with optimized handling
let inputData = ''
let processCompleted = false

function cleanup(): void {
  if (!processCompleted) {
    processCompleted = true
    process.exit(0)
  }
}

// 元提示词模板 - 老金原创优化策略
const META_PROMPTS = {
  // 角色强化模板
  persona: `你是一个专业的提示词工程师，精通谷歌68页提示词圣经的精髓。你的任务是优化用户的提示词，使其更加精确、有效和富有创造力。`,

  // 任务优化模板
  task: `请分析以下提示词，并根据四大要素进行优化：
1. Persona（角色）：明确AI应该扮演的角色
2. Task（任务）：清晰定义要完成的任务
3. Context（上下文）：提供充足的背景信息
4. Format（格式）：指定输出格式要求`,

  // 上下文增强模板
  context: `基于谷歌提示词指南的最佳实践：
- 使用自然语言，但保持精确
- 提供具体的例子和约束条件
- 明确目标和受众
- 包含必要的背景信息`,

  // 格式规范模板
  format: `优化后的提示词应该：
- 清晰简洁（建议21个词左右）
- 包含明确的指令
- 提供输出格式指导
- 设置合理的约束条件`
}

// 优化策略函数
function optimizePrompt(originalPrompt: string): string {
  log(`开始优化提示词: "${originalPrompt.substring(0, 50)}..."`)

  // 分析原提示词
  const analysis = analyzePrompt(originalPrompt)
  log(`分析结果: ${JSON.stringify(analysis)}`)

  // 生成优化后的提示词
  const optimized = generateOptimizedPrompt(originalPrompt, analysis)
  log(`优化完成`)

  return optimized
}

// 分析提示词结构
function analyzePrompt(prompt: string): {
  hasPersona: boolean
  hasTask: boolean
  hasContext: boolean
  hasFormat: boolean
  wordCount: number
  complexity: 'simple' | 'medium' | 'complex'
} {
  const personaKeywords = ['你是', 'you are', 'act as', '扮演', '作为']
  const taskKeywords = ['请', 'please', '帮助', 'help', '生成', 'generate', '写', 'write']
  const contextKeywords = ['背景', 'context', '关于', 'about', '基于', 'based on']
  const formatKeywords = ['格式', 'format', '输出', 'output', '格式化', 'format as']

  return {
    hasPersona: personaKeywords.some(keyword =>
      prompt.toLowerCase().includes(keyword.toLowerCase())
    ),
    hasTask: taskKeywords.some(keyword =>
      prompt.toLowerCase().includes(keyword.toLowerCase())
    ),
    hasContext: contextKeywords.some(keyword =>
      prompt.toLowerCase().includes(keyword.toLowerCase())
    ),
    hasFormat: formatKeywords.some(keyword =>
      prompt.toLowerCase().includes(keyword.toLowerCase())
    ),
    wordCount: prompt.split(/\s+/).length,
    complexity: prompt.length > 100 ? 'complex' : prompt.length > 50 ? 'medium' : 'simple'
  }
}

// 生成优化后的提示词
function generateOptimizedPrompt(original: string, analysis: any): string {
  let optimized = original
  const additions: string[] = []

  // 根据分析结果添加缺失的要素
  if (!analysis.hasPersona) {
    additions.push(META_PROMPTS.persona)
  }

  // 如果提示词太短，添加更多上下文
  if (analysis.wordCount < 10) {
    additions.push(META_PROMPTS.context)
  }

  // 如果没有明确的格式要求，建议添加
  if (!analysis.hasFormat) {
    additions.push(META_PROMPTS.format)
  }

  // 根据复杂度调整
  if (analysis.complexity === 'simple') {
    additions.push('请提供更多具体细节和约束条件以获得更好的结果。')
  }

  // 组合优化后的提示词
  if (additions.length > 0) {
    optimized = `${original}

【优化建议】
${additions.join('\n')}

【元提示词】
${META_PROMPTS.task}

现在请基于以上优化建议重新生成一个更有效的提示词版本。`
  }

  return optimized
}

function processInput(): void {
  if (processCompleted)
    return

  try {
    // Parse JSON input
    const data = JSON.parse(inputData) as HookData
    log(`收到数据: ${JSON.stringify(data)}`)

    // 提取提示词
    const originalPrompt = data.tool_input?.prompt ?? data.prompt ?? ''

    if (!originalPrompt) {
      log('未找到提示词内容')
      cleanup()
      return
    }

    log(`开始处理提示词: ${originalPrompt.length} 字符`)

    // 应用优化策略
    const optimizedPrompt = optimizePrompt(originalPrompt)

    // 输出优化结果
    console.log(JSON.stringify({
      original_prompt: originalPrompt,
      optimized_prompt: optimizedPrompt,
      optimization_applied: true,
      timestamp: new Date().toISOString()
    }))

    log('提示词优化完成')
  }
  catch (error) {
    // 静默处理错误，避免干扰 Claude Code 的正常流程
    if (error instanceof Error) {
      log(`处理错误: ${error.message}`)
    }
  }

  cleanup()
}

// Set up stdin handling
process.stdin.on('data', (chunk: Buffer) => {
  inputData += chunk.toString()
})

process.stdin.on('end', processInput)

// Safety timeout
const SAFETY_TIMEOUT = 5000 // 5秒超时
setTimeout(() => {
  log('达到安全超时，退出')
  cleanup()
}, SAFETY_TIMEOUT)