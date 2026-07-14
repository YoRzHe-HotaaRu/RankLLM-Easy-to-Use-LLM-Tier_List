import type { TierId } from '../data/models'
import { MODELS, TIERS } from '../data/models'

export type BoardState = Record<TierId, string[]>

export const CONTAINERS: TierId[] = [...TIERS, 'bench']

export function emptyBoard(): BoardState {
  return {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    bench: MODELS.map((m) => m.id),
  }
}

export function randomBoard(): BoardState {
  const next: BoardState = { S: [], A: [], B: [], C: [], D: [], bench: [] }
  for (const model of MODELS) {
    const roll = Math.random()
    if (roll < 0.12) next.S.push(model.id)
    else if (roll < 0.32) next.A.push(model.id)
    else if (roll < 0.55) next.B.push(model.id)
    else if (roll < 0.72) next.C.push(model.id)
    else if (roll < 0.85) next.D.push(model.id)
    else next.bench.push(model.id)
  }
  return next
}

export function countPlaced(board: BoardState) {
  return TIERS.reduce((sum, tier) => sum + board[tier].length, 0)
}

export function modelsInTier(board: BoardState, tier: TierId) {
  const byId = new Map(MODELS.map((m) => [m.id, m]))
  return board[tier]
    .map((id) => byId.get(id))
    .filter((m): m is (typeof MODELS)[number] => Boolean(m))
}

export function findContainer(
  board: BoardState,
  id: string,
): TierId | undefined {
  if (id in board) return id as TierId
  for (const container of CONTAINERS) {
    if (board[container].includes(id)) return container
  }
  return undefined
}

export function exportSummary(board: BoardState) {
  const lines = ['# LLM Tier List', '']
  for (const tier of TIERS) {
    const names = modelsInTier(board, tier).map((m) => m.name)
    lines.push(`## ${tier}`)
    lines.push(names.length ? names.map((n) => `- ${n}`).join('\n') : '- (empty)')
    lines.push('')
  }
  const leftover = modelsInTier(board, 'bench').map((m) => m.name)
  lines.push('## Unranked')
  lines.push(
    leftover.length ? leftover.map((n) => `- ${n}`).join('\n') : '- (none)',
  )
  return lines.join('\n')
}

/** Migrate old map-style saves + keep unknown models on the bench. */
export function normalizeBoard(raw: unknown): BoardState {
  const base = emptyBoard()
  const known = new Set(MODELS.map((m) => m.id))

  if (!raw || typeof raw !== 'object') return base

  const obj = raw as Record<string, unknown>

  // New format: { S: string[], ... }
  if (Array.isArray(obj.bench) || Array.isArray(obj.S)) {
    const placed = new Set<string>()
    for (const container of CONTAINERS) {
      const list = obj[container]
      if (!Array.isArray(list)) continue
      base[container] = list.filter(
        (id): id is string => typeof id === 'string' && known.has(id),
      )
      for (const id of base[container]) placed.add(id)
    }
    for (const model of MODELS) {
      if (!placed.has(model.id)) base.bench.push(model.id)
    }
    return base
  }

  // Legacy format: { [modelId]: TierId }
  const buckets: BoardState = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    bench: [],
  }
  for (const model of MODELS) {
    const tier = obj[model.id]
    if (
      tier === 'S' ||
      tier === 'A' ||
      tier === 'B' ||
      tier === 'C' ||
      tier === 'D' ||
      tier === 'bench'
    ) {
      buckets[tier].push(model.id)
    } else {
      buckets.bench.push(model.id)
    }
  }
  return buckets
}
