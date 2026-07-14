export type Provider =
  | 'Anthropic'
  | 'OpenAI'
  | 'SpaceXAI'
  | 'Google'
  | 'Z.AI'
  | 'Moonshot'
  | 'NVIDIA'
  | 'MiniMax'
  | 'Meituan'
  | 'Tencent'
  | 'DeepSeek'
  | 'Alibaba'
  | 'Meta'
  | 'Xiaomi'
  | 'ByteDance'
  | 'Mistral'
  | 'Amazon'
  | 'Cohere'
  | 'KwaiKAT'
  | 'Sakana'
  | 'Arcee'
  | 'StepFun'
  | 'Baidu'
  | 'inclusionAI'

export type TierId = 'S' | 'A' | 'B' | 'C' | 'D' | 'bench'

export interface LlmModel {
  id: string
  name: string
  shortName: string
  provider: Provider
  released: string
  tagline: string
}

export const TIERS: Exclude<TierId, 'bench'>[] = ['S', 'A', 'B', 'C', 'D']

export const TIER_META: Record<
  Exclude<TierId, 'bench'>,
  { label: string; blurb: string; color: string }
> = {
  S: { label: 'S', blurb: 'Frontier ceiling', color: '#E23D28' },
  A: { label: 'A', blurb: 'Elite daily drivers', color: '#D97706' },
  B: { label: 'B', blurb: 'Strong & reliable', color: '#B8860B' },
  C: { label: 'C', blurb: 'Capable niche picks', color: '#2F7A5F' },
  D: { label: 'D', blurb: 'Situational / legacy', color: '#5A6B7D' },
}

/** Curated 2026 text / coding LLMs through July 2026 releases. */
export const MODELS: LlmModel[] = [
  {
    id: 'claude-fable-5',
    name: 'Claude Fable 5',
    shortName: 'Fable 5',
    provider: 'Anthropic',
    released: '2026-06-09',
    tagline: 'Adaptive reasoning flagship',
  },
  {
    id: 'gpt-5.6-sol',
    name: 'GPT-5.6 Sol',
    shortName: '5.6 Sol',
    provider: 'OpenAI',
    released: '2026-07-09',
    tagline: 'OpenAI frontier flagship',
  },
  {
    id: 'gpt-5.6-terra',
    name: 'GPT-5.6 Terra',
    shortName: '5.6 Terra',
    provider: 'OpenAI',
    released: '2026-07-09',
    tagline: 'Balanced everyday workhorse',
  },
  {
    id: 'gpt-5.6-luna',
    name: 'GPT-5.6 Luna',
    shortName: '5.6 Luna',
    provider: 'OpenAI',
    released: '2026-07-09',
    tagline: 'Fast cost-efficient tier',
  },
  {
    id: 'grok-4.5',
    name: 'Grok 4.5',
    shortName: 'Grok 4.5',
    provider: 'SpaceXAI',
    released: '2026-07-08',
    tagline: 'Coding & agentic speed',
  },
  {
    id: 'claude-sonnet-5',
    name: 'Claude Sonnet 5',
    shortName: 'Sonnet 5',
    provider: 'Anthropic',
    released: '2026-06-30',
    tagline: 'Mid-tier Claude workhorse',
  },
  {
    id: 'claude-opus-4.8',
    name: 'Claude Opus 4.8',
    shortName: 'Opus 4.8',
    provider: 'Anthropic',
    released: '2026-05-28',
    tagline: 'Prior Opus generation peak',
  },
  {
    id: 'glm-5.2',
    name: 'GLM-5.2',
    shortName: 'GLM 5.2',
    provider: 'Z.AI',
    released: '2026-06-13',
    tagline: 'Zhipu / Z.AI flagship',
  },
  {
    id: 'kimi-k2.7-code',
    name: 'Kimi K2.7 Code',
    shortName: 'K2.7 Code',
    provider: 'Moonshot',
    released: '2026-06-12',
    tagline: 'Moonshot coding specialist',
  },
  {
    id: 'kimi-k2.7-code-hs',
    name: 'Kimi K2.7 Code Highspeed',
    shortName: 'K2.7 HS',
    provider: 'Moonshot',
    released: '2026-06-12',
    tagline: 'Low-latency Kimi coding',
  },
  {
    id: 'nemotron-3-ultra',
    name: 'Nemotron 3 Ultra 550B',
    shortName: 'Nemotron 3',
    provider: 'NVIDIA',
    released: '2026-06-01',
    tagline: 'NVIDIA open ultra MoE',
  },
  {
    id: 'minimax-m3',
    name: 'MiniMax M3',
    shortName: 'M3',
    provider: 'MiniMax',
    released: '2026-06-01',
    tagline: 'MiniMax reasoning flagship',
  },
  {
    id: 'longcat-2.0',
    name: 'LongCat 2.0',
    shortName: 'LongCat 2',
    provider: 'Meituan',
    released: '2026-06-30',
    tagline: '1.6T MoE, 1M context',
  },
  {
    id: 'hy3',
    name: 'Hy3',
    shortName: 'Hy3',
    provider: 'Tencent',
    released: '2026-07-06',
    tagline: 'Tencent Hunyuan 295B MoE',
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash',
    shortName: '3.5 Flash',
    provider: 'Google',
    released: '2026-05-19',
    tagline: 'Google speed & multimodal',
  },
  {
    id: 'gemini-3.1-pro',
    name: 'Gemini 3.1 Pro',
    shortName: '3.1 Pro',
    provider: 'Google',
    released: '2026-02-19',
    tagline: 'Google Pro reasoning',
  },
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    shortName: 'V4 Pro',
    provider: 'DeepSeek',
    released: '2026-04-24',
    tagline: 'DeepSeek frontier open',
  },
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    shortName: 'V4 Flash',
    provider: 'DeepSeek',
    released: '2026-04-24',
    tagline: 'DeepSeek fast tier',
  },
  {
    id: 'qwen3.7-max',
    name: 'Qwen 3.7 Max',
    shortName: 'Qwen 3.7 Max',
    provider: 'Alibaba',
    released: '2026-05-20',
    tagline: 'Alibaba Max flagship',
  },
  {
    id: 'qwen3.7-plus',
    name: 'Qwen3.7 Plus',
    shortName: 'Qwen Plus',
    provider: 'Alibaba',
    released: '2026-05-20',
    tagline: 'Alibaba Plus workhorse',
  },
  {
    id: 'gpt-5.5',
    name: 'GPT-5.5',
    shortName: 'GPT-5.5',
    provider: 'OpenAI',
    released: '2026-04-23',
    tagline: 'Prior OpenAI generation',
  },
  {
    id: 'gpt-5.5-pro',
    name: 'GPT-5.5 Pro',
    shortName: '5.5 Pro',
    provider: 'OpenAI',
    released: '2026-04-23',
    tagline: 'GPT-5.5 high-compute',
  },
  {
    id: 'grok-4.3',
    name: 'Grok 4.3',
    shortName: 'Grok 4.3',
    provider: 'SpaceXAI',
    released: '2026-04-30',
    tagline: 'Prior Grok generation',
  },
  {
    id: 'muse-spark-1.1',
    name: 'Muse Spark 1.1',
    shortName: 'Muse 1.1',
    provider: 'Meta',
    released: '2026-07-09',
    tagline: 'Meta latest release',
  },
  {
    id: 'mimo-v2.5-pro',
    name: 'MiMo V2.5 Pro',
    shortName: 'MiMo V2.5 Pro',
    provider: 'Xiaomi',
    released: '2026-04-23',
    tagline: 'Xiaomi Pro agent model',
  },
  {
    id: 'gemma-4-31b',
    name: 'Gemma 4 31B',
    shortName: 'Gemma 4',
    provider: 'Google',
    released: '2026-04-02',
    tagline: 'Google open weights',
  },
  {
    id: 'claude-opus-4.7',
    name: 'Claude Opus 4.7',
    shortName: 'Opus 4.7',
    provider: 'Anthropic',
    released: '2026-04-16',
    tagline: 'Opus mid-cycle refresh',
  },
  {
    id: 'kimi-k2.6',
    name: 'Kimi K2.6',
    shortName: 'Kimi 2.6',
    provider: 'Moonshot',
    released: '2026-04-20',
    tagline: 'Long-context Moonshot',
  },
  {
    id: 'glm-5.1',
    name: 'GLM-5.1',
    shortName: 'GLM 5.1',
    provider: 'Z.AI',
    released: '2026-04-07',
    tagline: 'GLM mid-cycle upgrade',
  },
  {
    id: 'minimax-m2.7',
    name: 'MiniMax M2.7',
    shortName: 'M2.7',
    provider: 'MiniMax',
    released: '2026-03-18',
    tagline: 'Prior MiniMax flagship',
  },
  {
    id: 'glm-5',
    name: 'GLM-5',
    shortName: 'GLM 5',
    provider: 'Z.AI',
    released: '2026-02-15',
    tagline: 'GLM-5 generation launch',
  },
  {
    id: 'claude-sonnet-4.6',
    name: 'Claude Sonnet 4.6',
    shortName: 'Sonnet 4.6',
    provider: 'Anthropic',
    released: '2026-02-17',
    tagline: 'Prior Sonnet generation',
  },
  {
    id: 'claude-opus-4.6',
    name: 'Claude Opus 4.6',
    shortName: 'Opus 4.6',
    provider: 'Anthropic',
    released: '2026-02-05',
    tagline: 'Early-2026 Opus',
  },
  {
    id: 'gpt-5.4',
    name: 'GPT-5.4',
    shortName: 'GPT-5.4',
    provider: 'OpenAI',
    released: '2026-03-06',
    tagline: 'GPT-5.4 mainline',
  },
  {
    id: 'gpt-5.4-pro',
    name: 'GPT-5.4 Pro',
    shortName: '5.4 Pro',
    provider: 'OpenAI',
    released: '2026-03-01',
    tagline: 'GPT-5.4 high-compute',
  },
  {
    id: 'gpt-5.3-codex',
    name: 'GPT-5.3 Codex',
    shortName: '5.3 Codex',
    provider: 'OpenAI',
    released: '2026-02-24',
    tagline: 'Codex coding agent',
  },
  {
    id: 'qwen3.6-max',
    name: 'Qwen3.6 Max Preview',
    shortName: 'Qwen 3.6',
    provider: 'Alibaba',
    released: '2026-04-29',
    tagline: 'Qwen 3.6 Max preview',
  },
  {
    id: 'qwen3-coder-next',
    name: 'Qwen3 Coder Next',
    shortName: 'Coder Next',
    provider: 'Alibaba',
    released: '2026-02-04',
    tagline: 'Alibaba coding specialist',
  },
  {
    id: 'kimi-k2.5',
    name: 'Kimi K2.5',
    shortName: 'Kimi 2.5',
    provider: 'Moonshot',
    released: '2026-01-26',
    tagline: 'Early-2026 Kimi',
  },
  {
    id: 'minimax-m2.5',
    name: 'MiniMax M2.5',
    shortName: 'M2.5',
    provider: 'MiniMax',
    released: '2026-02-15',
    tagline: 'MiniMax mid-cycle',
  },
  {
    id: 'mimo-v2.5',
    name: 'MiMo V2.5',
    shortName: 'MiMo V2.5',
    provider: 'Xiaomi',
    released: '2026-04-23',
    tagline: 'Xiaomi standard tier',
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    shortName: 'Flash Lite',
    provider: 'Google',
    released: '2026-05-08',
    tagline: 'Ultra-light Gemini',
  },
  {
    id: 'grok-4.20-reasoning',
    name: 'Grok 4.20 Reasoning',
    shortName: '4.20 R',
    provider: 'SpaceXAI',
    released: '2026-03-09',
    tagline: 'Grok 4.20 reasoning mode',
  },
  {
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    shortName: 'Large 3',
    provider: 'Mistral',
    released: '2026-03-01',
    tagline: 'European frontier open',
  },
  {
    id: 'amazon-nova-2-premier',
    name: 'Amazon Nova 2 Premier',
    shortName: 'Nova 2',
    provider: 'Amazon',
    released: '2026-02-10',
    tagline: 'AWS Nova premier tier',
  },
  {
    id: 'command-a-reasoning',
    name: 'Command A Reasoning',
    shortName: 'Cmd A',
    provider: 'Cohere',
    released: '2026-01-20',
    tagline: 'Cohere enterprise reasoner',
  },
  {
    id: 'doubao-seed-2.1-pro',
    name: 'Doubao-Seed-2.1-pro',
    shortName: 'Seed 2.1 Pro',
    provider: 'ByteDance',
    released: '2026-06-15',
    tagline: 'ByteDance Seed flagship',
  },
  {
    id: 'kat-coder-pro-v2.5',
    name: 'KAT-Coder-Pro V2.5',
    shortName: 'KAT Pro V2.5',
    provider: 'KwaiKAT',
    released: '2026-07-01',
    tagline: 'Kuaishou agentic coding',
  },
  {
    id: 'fugu-ultra',
    name: 'Fugu Ultra',
    shortName: 'Fugu Ultra',
    provider: 'Sakana',
    released: '2026-06-22',
    tagline: 'Sakana AI evolutionary model',
  },
  {
    id: 'trinity-large-thinking',
    name: 'Trinity Large Thinking',
    shortName: 'Trinity Large',
    provider: 'Arcee',
    released: '2026-06-01',
    tagline: 'Arcee reasoning open model',
  },
  {
    id: 'step-3.7-flash',
    name: 'Step 3.7 Flash',
    shortName: 'Step 3.7 Flash',
    provider: 'StepFun',
    released: '2026-07-01',
    tagline: 'StepFun multimodal MoE',
  },
  {
    id: 'ernie-5.1',
    name: 'ERNIE 5.1',
    shortName: 'ERNIE 5.1',
    provider: 'Baidu',
    released: '2026-05-01',
    tagline: 'Baidu Wenxin flagship',
  },
  {
    id: 'ring-2.6-1t',
    name: 'Ring-2.6-1T',
    shortName: 'Ring 2.6 1T',
    provider: 'inclusionAI',
    released: '2026-06-01',
    tagline: 'inclusionAI trillion-scale',
  },
]

export const PROVIDERS = [...new Set(MODELS.map((m) => m.provider))].sort()
