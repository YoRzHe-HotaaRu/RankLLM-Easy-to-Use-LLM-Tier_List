import type { TierId } from '../data/models'

export type DropSide = 'before' | 'after'

export interface DropHint {
  container: Exclude<TierId, 'bench'>
  /** Card to insert relative to, or null when dropping into empty / end of row. */
  overId: string | null
  side: DropSide
  /** Absolute insert index in the target tier list (excluding the dragged id). */
  index: number
}

export function computeInsertIndex(
  items: string[],
  activeId: string,
  overId: string | null,
  side: DropSide,
): number {
  const without = items.filter((id) => id !== activeId)
  if (!overId || !without.includes(overId)) return without.length
  const overIndex = without.indexOf(overId)
  return side === 'before' ? overIndex : overIndex + 1
}
