import type { LlmModel, Provider } from '../data/models'

/** Brand marks from @lobehub/icons-static-svg + Simple Icons (Xiaomi) */
const ICON = {
  openai: '/icons/openai.svg',
  anthropic: '/icons/anthropic.svg',
  claude: '/icons/claude-color.svg',
  xai: '/icons/xai.svg',
  grok: '/icons/grok.svg',
  gemini: '/icons/gemini-color.svg',
  gemma: '/icons/gemma-color.svg',
  google: '/icons/google-color.svg',
  zai: '/icons/zai.svg',
  moonshot: '/icons/moonshot.svg',
  kimi: '/icons/kimi.svg',
  nvidia: '/icons/nvidia-color.svg',
  minimax: '/icons/minimax-color.svg',
  longcat: '/icons/longcat-color.svg',
  hunyuan: '/icons/hunyuan-color.svg',
  tencent: '/icons/tencent-color.svg',
  deepseek: '/icons/deepseek-color.svg',
  qwen: '/icons/qwen-color.svg',
  meta: '/icons/meta-color.svg',
  metaai: '/icons/metaai-color.svg',
  xiaomi: '/icons/xiaomi.svg',
  doubao: '/icons/doubao-color.svg',
  bytedance: '/icons/bytedance-color.svg',
  mistral: '/icons/mistral-color.svg',
  nova: '/icons/nova-color.svg',
  aws: '/icons/aws-color.svg',
  cohere: '/icons/cohere-color.svg',
  codex: '/icons/codex-color.svg',
  kwaipilot: '/icons/kwaipilot.svg',
  kwaikat: '/icons/kwaikat.svg',
  arcee: '/icons/arcee-color.svg',
  stepfun: '/icons/stepfun-color.svg',
  wenxin: '/icons/wenxin-color.svg',
  baidu: '/icons/baidu-color.svg',
  sakana: '/icons/sakana.svg',
  inclusionai: '/icons/inclusionai.svg',
  cursor: '/icons/cursor.svg',
} as const

const PROVIDER_ICON: Record<Provider, string> = {
  Anthropic: ICON.claude,
  OpenAI: ICON.openai,
  SpaceXAI: ICON.xai,
  Google: ICON.gemini,
  'Z.AI': ICON.zai,
  Moonshot: ICON.kimi,
  NVIDIA: ICON.nvidia,
  MiniMax: ICON.minimax,
  Meituan: ICON.longcat,
  Tencent: ICON.hunyuan,
  DeepSeek: ICON.deepseek,
  Alibaba: ICON.qwen,
  Meta: ICON.meta,
  Xiaomi: ICON.xiaomi,
  ByteDance: ICON.doubao,
  Mistral: ICON.mistral,
  Amazon: ICON.nova,
  Cohere: ICON.cohere,
  KwaiKAT: ICON.kwaikat,
  Sakana: ICON.sakana,
  Arcee: ICON.arcee,
  StepFun: ICON.stepfun,
  Baidu: ICON.wenxin,
  inclusionAI: ICON.inclusionai,
  Cursor: ICON.cursor,
}

const MODEL_ICON: Record<string, string> = {
  'claude-fable-5': ICON.claude,
  'claude-sonnet-5': ICON.claude,
  'claude-opus-4.8': ICON.claude,
  'claude-opus-4.7': ICON.claude,
  'claude-sonnet-4.6': ICON.claude,
  'claude-opus-4.6': ICON.claude,
  'gpt-5.6-sol': ICON.openai,
  'gpt-5.6-terra': ICON.openai,
  'gpt-5.6-luna': ICON.openai,
  'gpt-5.5': ICON.openai,
  'gpt-5.5-pro': ICON.openai,
  'gpt-5.4': ICON.openai,
  'gpt-5.4-pro': ICON.openai,
  'gpt-5.3-codex': ICON.codex,
  'grok-4.5': ICON.grok,
  'grok-4.3': ICON.grok,
  'grok-4.20-reasoning': ICON.grok,
  'gemini-3.5-flash': ICON.gemini,
  'gemini-3.1-pro': ICON.gemini,
  'gemini-3.1-flash-lite': ICON.gemini,
  'gemma-4-31b': ICON.gemma,
  'glm-5.2': ICON.zai,
  'glm-5.1': ICON.zai,
  'glm-5': ICON.zai,
  'kimi-k2.7-code': ICON.kimi,
  'kimi-k2.7-code-hs': ICON.kimi,
  'kimi-k2.6': ICON.kimi,
  'kimi-k2.5': ICON.kimi,
  'nemotron-3-ultra': ICON.nvidia,
  'minimax-m3': ICON.minimax,
  'minimax-m2.7': ICON.minimax,
  'minimax-m2.5': ICON.minimax,
  'longcat-2.0': ICON.longcat,
  hy3: ICON.hunyuan,
  'deepseek-v4-pro': ICON.deepseek,
  'deepseek-v4-flash': ICON.deepseek,
  'qwen3.7-max': ICON.qwen,
  'qwen3.7-plus': ICON.qwen,
  'qwen3.6-max': ICON.qwen,
  'qwen3-coder-next': ICON.qwen,
  'muse-spark-1.1': ICON.metaai,
  'mimo-v2.5-pro': ICON.xiaomi,
  'mimo-v2.5': ICON.xiaomi,
  'doubao-seed-2.1-pro': ICON.doubao,
  'mistral-large-3': ICON.mistral,
  'amazon-nova-2-premier': ICON.nova,
  'command-a-reasoning': ICON.cohere,
  'kat-coder-pro-v2.5': ICON.kwaikat,
  'fugu-ultra': ICON.sakana,
  'trinity-large-thinking': ICON.arcee,
  'step-3.7-flash': ICON.stepfun,
  'ernie-5.1': ICON.wenxin,
  'ring-2.6-1t': ICON.inclusionai,
  'composer-2.5': ICON.cursor,
}

/** Mono / currentColor marks tinted for white cards */
const TINT: Partial<Record<string, string>> = {
  [ICON.openai]: '#10A37F',
  [ICON.anthropic]: '#D97757',
  [ICON.xai]: '#0C1016',
  [ICON.grok]: '#0C1016',
  [ICON.moonshot]: '#16161D',
  [ICON.kimi]: '#1783FF',
  [ICON.zai]: '#0C1016',
  [ICON.xiaomi]: '#FF6900',
  [ICON.kwaipilot]: '#4A7FB5',
  [ICON.kwaikat]: '#111111',
  [ICON.inclusionai]: '#5B4DFF',
  [ICON.cursor]: '#0C1016',
}

export function resolveIconSrc(model: Pick<LlmModel, 'id' | 'provider'>) {
  return MODEL_ICON[model.id] ?? PROVIDER_ICON[model.provider]
}

export function ModelIcon({
  model,
  size = 40,
}: {
  model: Pick<LlmModel, 'id' | 'provider' | 'name'>
  size?: number
}) {
  const src = resolveIconSrc(model)
  const tint = TINT[src]

  return (
    <span
      className={`model-icon${tint ? ' model-icon--tinted' : ''}`}
      style={{
        width: size,
        height: size,
        ['--icon-tint' as string]: tint,
      }}
      aria-hidden
    >
      {tint ? (
        <span
          className="model-icon__mask"
          style={{
            width: size * 0.62,
            height: size * 0.62,
            backgroundColor: tint,
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
          }}
        />
      ) : (
        <img
          src={src}
          alt=""
          width={size * 0.62}
          height={size * 0.62}
          draggable={false}
        />
      )}
    </span>
  )
}
