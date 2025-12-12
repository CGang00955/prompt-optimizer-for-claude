#!/usr/bin/env tsx

import type { Buffer } from 'node:buffer'
import process from 'node:process'

/**
 * Claude Code Metaprompt Enhancer Hook
 *
 * 老金原创元提示词技术 - 全自动强化版本
 *
 * 核心功能：
 * 1. 自动识别提示词类型和意图
 * 2. 应用谷歌68页提示词圣经的优化原则
 * 3. 动态生成元提示词强化模板
 * 4. 实时迭代优化建议
 */

interface ToolInput {
  prompt?: string
  context?: string
  [key: string]: unknown
}

interface HookData {
  tool_input?: ToolInput
  prompt?: string
  context?: string
  [key: string]: unknown
}

// Debug mode
const DEBUG = process.env.DEBUG_METAPROMPT === '1'
function log(msg: string): void {
  if (DEBUG) {
    console.error(`[metaprompt-enhancer] ${msg}`)
  }
}

// 老金元提示词强化矩阵
const METAPROMPT_MATRIX = {
  // 角色预设库
  personas: {
    creative: '你是一位富有创造力的创意总监，擅长突破性思维和创新解决方案。',
    analytical: '你是一位资深的分析师，精通数据分析和逻辑推理，总能提供深入的见解。',
    educator: '你是一位经验丰富的教育家，善于将复杂的概念简单化，并循序渐进地解释。',
    strategist: '你是一位战略专家，擅长从宏观角度分析问题，制定长远规划。',
    critic: '你是一位严谨的批评家，能够发现问题并提供建设性的改进建议。'
  },

  // 任务优化模板
  task_templates: {
    writing: '请创作一篇{type}，主题是{topic}，目标读者是{audience}，要求{requirements}',
    analysis: '请分析{subject}，从{perspectives}角度，重点关注{focus}，输出{format}',
    problem_solving: '请解决{problem}，考虑{constraints}，提供{solutions}，并评估{evaluation}',
    creative: '请设计{creation}，风格为{style}，包含{elements}，达到{goal}'
  }
}

// 智能提示词分析器
class PromptAnalyzer {
  private prompt: string

  constructor(prompt: string) {
    this.prompt = prompt.toLowerCase()
  }

  // 识别任务类型
  identifyTaskType(): string {
    const taskPatterns = {
      writing: /写|创作|生成|编写|compose|write|create|generate/i,
      analysis: /分析|解析|评估|analyze|evaluate|assess/i,
      problem_solving: /解决|处理|solve|handle|address/i,
      creative: /设计|创意|想象|design|imagine|creative/i,
      explanation: /解释|说明|explain|describe|clarify/i
    }

    for (const [type, pattern] of Object.entries(taskPatterns)) {
      if (pattern.test(this.prompt)) {
        return type
      }
    }

    return 'general'
  }

  // 评估提示词质量
  assessQuality() {
    const indicators = {
      hasPersona: /你是|扮演|you are|act as/i.test(this.prompt),
      hasContext: /背景|关于|context|background|based on/i.test(this.prompt),
      hasConstraints: /限制|要求|必须|constraint|require|must/i.test(this.prompt),
      hasOutputFormat: /格式|输出|format|output|structure/i.test(this.prompt)
    }

    const score = Object.values(indicators).filter(Boolean).length

    return {
      score,
      ...indicators,
      enhancement_level: score >= 3 ? 'advanced' : score >= 2 ? 'intermediate' : 'basic'
    }
  }
}

// 元提示词生成器
class MetapromptGenerator {
  private analysis: any

  constructor(analysis: any) {
    this.analysis = analysis
  }

  // 生成强化版提示词
  generate(): string {
    const taskType = this.analysis.taskType
    const quality = this.analysis.quality

    // 选择合适的角色
    const persona = this.selectPersona(taskType)

    // 构建任务模板
    const task = this.buildTaskTemplate(taskType)

    // 组合元提示词
    const metaprompt = `
${persona}

【核心任务】
${task}

【上下文增强】
基于谷歌提示词工程最佳实践，结合行业标准和专业规范。

【输出要求】
请使用结构化格式输出，包含具体的步骤和说明。

【强化指令】
1. 基于谷歌68页提示词圣经的原则
2. 确保输出清晰、准确、有价值
3. 提供具体可行的建议或解决方案
4. 考虑实际应用场景

现在，请将用户的原始提示词与以上元提示词结合，生成一个优化后的超级提示词。`

    return metaprompt.trim()
  }

  private selectPersona(taskType: string): string {
    const personaMap: Record<string, string> = {
      writing: METAPROMPT_MATRIX.personas.creative,
      analysis: METAPROMPT_MATRIX.personas.analytical,
      explanation: METAPROMPT_MATRIX.personas.educator,
      problem_solving: METAPROMPT_MATRIX.personas.strategist,
      creative: METAPROMPT_MATRIX.personas.creative,
      general: METAPROMPT_MATRIX.personas.educator
    }

    return personaMap[taskType] || personaMap.general
  }

  private buildTaskTemplate(taskType: string): string {
    const template = METAPROMPT_MATRIX.task_templates[taskType as keyof typeof METAPROMPT_MATRIX.task_templates]
    return template || '请高效地完成用户请求的任务'
  }
}

// 主处理函数
function processInput(): void {
  if (processCompleted) return

  try {
    const data = JSON.parse(inputData) as HookData
    log(`收到数据: ${JSON.stringify(data, null, 2)}`)

    const originalPrompt = data.tool_input?.prompt ?? data.prompt ?? ''

    if (!originalPrompt) {
      log('未找到提示词内容')
      cleanup()
      return
    }

    log(`开始元提示词强化处理...`)

    // 分析提示词
    const analyzer = new PromptAnalyzer(originalPrompt)
    const analysis = {
      taskType: analyzer.identifyTaskType(),
      quality: analyzer.assessQuality()
    }

    log(`分析完成: ${JSON.stringify(analysis, null, 2)}`)

    // 生成元提示词
    const generator = new MetapromptGenerator(analysis)
    const metaprompt = generator.generate()

    log(`元提示词生成完成`)

    // 返回强化结果
    console.log(JSON.stringify({
      status: 'success',
      original_prompt: originalPrompt,
      metaprompt_enhanced: metaprompt,
      analysis: analysis,
      enhancement_level: analysis.quality.enhancement_level,
      timestamp: new Date().toISOString()
    }))

  } catch (error) {
    log(`处理错误: ${error instanceof Error ? error.message : String(error)}`)
    console.log(JSON.stringify({
      status: 'error',
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    }))
  }

  cleanup()
}

// 变量管理
let inputData = ''
let processCompleted = false

function cleanup(): void {
  if (!processCompleted) {
    processCompleted = true
    process.exit(0)
  }
}

// stdin 处理
process.stdin.on('data', (chunk: Buffer) => {
  inputData += chunk.toString()
})

process.stdin.on('end', processInput)

// 超时保护
const SAFETY_TIMEOUT = 10000 // 10秒超时
setTimeout(() => {
  log('达到安全超时，退出')
  cleanup()
}, SAFETY_TIMEOUT)