import type { TierId } from '../data/models'

export type DropSide = 'before' | 'after'

export interface DropHint {
  container: Exclude<TierId, 'bench'>
  overId: string | null
  side: DropSide
  /** Insert index in the target tier list, excluding the dragged id. */
  index: number
}

export type TierRowId = Exclude<TierId, 'bench'>

/** Find insert index by comparing pointer X to live card midpoints in the row. */
export function indexFromPointerX(
  tier: TierRowId,
  items: string[],
  activeId: string,
  pointerX: number,
): { index: number; overId: string | null; side: DropSide } {
  const without = items.filter((id) => id !== activeId)

  if (without.length === 0) {
    return { index: 0, overId: null, side: 'after' }
  }

  const slot = document.querySelector<HTMLElement>(`[data-tier-slot="${tier}"]`)
  if (!slot) {
    return { index: without.length, overId: null, side: 'after' }
  }

  const rectById = new Map<string, DOMRect>()
  for (const el of slot.querySelectorAll<HTMLElement>('[data-model-id]')) {
    const id = el.dataset.modelId
    if (!id || id === activeId) continue
    const rect = el.getBoundingClientRect()
    if (rect.width < 8) continue
    rectById.set(id, rect)
  }

  for (let i = 0; i < without.length; i += 1) {
    const id = without[i]
    const rect = rectById.get(id)
    if (!rect) continue

    const mid = rect.left + rect.width / 2
    if (pointerX < mid) {
      return { index: i, overId: id, side: 'before' }
    }
  }

  const lastId = without[without.length - 1]
  return { index: without.length, overId: lastId, side: 'after' }
}
