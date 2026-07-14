import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { LlmModel, TierId } from '../data/models'
import { TIER_META } from '../data/models'
import { ModelCard } from './ModelCard'

export function TierRow({
  tier,
  models,
}: {
  tier: Exclude<TierId, 'bench'>
  models: LlmModel[]
}) {
  const meta = TIER_META[tier]
  const { setNodeRef, isOver } = useDroppable({
    id: tier,
    data: { type: 'container', children: models.map((m) => m.id) },
  })
  const ids = models.map((m) => m.id)

  return (
    <section
      className={`tier-row${isOver ? ' is-over' : ''}`}
      style={{ ['--tier-color' as string]: meta.color }}
    >
      <div className="tier-stamp" aria-label={`Tier ${meta.label}`}>
        <span className="tier-stamp__letter">{meta.label}</span>
        <span className="tier-stamp__blurb">{meta.blurb}</span>
        <span className="tier-stamp__count">{models.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className={`tier-slot${isOver ? ' is-over' : ''}`}
      >
        <SortableContext items={ids} strategy={horizontalListSortingStrategy}>
          {models.length === 0 ? (
            <p className="tier-empty">Drop models here</p>
          ) : (
            models.map((model) => (
              <ModelCard key={model.id} model={model} compact sortable />
            ))
          )}
        </SortableContext>
      </div>
    </section>
  )
}
