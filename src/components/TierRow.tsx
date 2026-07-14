import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { ReactNode } from 'react'
import type { LlmModel, TierId } from '../data/models'
import { TIER_META } from '../data/models'
import type { DropHint } from '../lib/dropHint'
import { InsertMarker } from './InsertMarker'
import { ModelCard } from './ModelCard'

export function TierRow({
  tier,
  models,
  dropHint,
  activeId,
}: {
  tier: Exclude<TierId, 'bench'>
  models: LlmModel[]
  dropHint: DropHint | null
  activeId: string | null
}) {
  const meta = TIER_META[tier]
  const { setNodeRef, isOver } = useDroppable({
    id: tier,
    data: { type: 'container', children: models.map((m) => m.id) },
  })
  const ids = models.map((m) => m.id)
  const hintHere = dropHint?.container === tier

  const nodes: ReactNode[] = []
  let displayIndex = 0

  if (models.length === 0) {
    if (hintHere) nodes.push(<InsertMarker key="insert-empty" active />)
    nodes.push(
      <p key="empty" className="tier-empty">
        Drop models here
      </p>,
    )
  } else {
    for (const model of models) {
      if (model.id === activeId) {
        nodes.push(
          <ModelCard key={model.id} model={model} compact sortable />,
        )
        continue
      }

      if (hintHere && dropHint.index === displayIndex) {
        nodes.push(<InsertMarker key={`insert-${displayIndex}`} active />)
      }

      nodes.push(<ModelCard key={model.id} model={model} compact sortable />)
      displayIndex += 1
    }

    if (hintHere && dropHint.index === displayIndex) {
      nodes.push(<InsertMarker key="insert-end" active />)
    }
  }

  return (
    <section
      className={`tier-row${isOver || hintHere ? ' is-over' : ''}`}
      style={{ ['--tier-color' as string]: meta.color }}
    >
      <div className="tier-stamp" aria-label={`Tier ${meta.label}`}>
        <span className="tier-stamp__letter">{meta.label}</span>
        <span className="tier-stamp__blurb">{meta.blurb}</span>
        <span className="tier-stamp__count">{models.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className={`tier-slot${isOver || hintHere ? ' is-over' : ''}`}
      >
        <SortableContext items={ids} strategy={horizontalListSortingStrategy}>
          {nodes}
        </SortableContext>
      </div>
    </section>
  )
}
