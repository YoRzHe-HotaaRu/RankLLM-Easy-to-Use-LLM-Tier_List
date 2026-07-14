import { useDraggable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { CSSProperties } from 'react'
import type { LlmModel } from '../data/models'
import { ModelIcon } from './ModelIcon'

function CardFace({
  model,
  compact,
}: {
  model: LlmModel
  compact: boolean
}) {
  return (
    <>
      <ModelIcon model={model} size={compact ? 34 : 44} />
      <span className="model-card__text">
        <span className="model-card__name">{model.shortName}</span>
        {!compact && (
          <span className="model-card__meta">{model.provider}</span>
        )}
      </span>
    </>
  )
}

function SortableModelCard({
  model,
  compact,
}: {
  model: LlmModel
  compact: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: model.id,
    data: { model, sortable: true },
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 40 : undefined,
    opacity: isDragging ? 0 : 1,
    width: isDragging ? 0 : undefined,
    minWidth: isDragging ? 0 : undefined,
    paddingLeft: isDragging ? 0 : undefined,
    paddingRight: isDragging ? 0 : undefined,
    margin: isDragging ? 0 : undefined,
    borderWidth: isDragging ? 0 : undefined,
    overflow: isDragging ? 'hidden' : undefined,
    pointerEvents: isDragging ? 'none' : undefined,
  }

  return (
    <button
      type="button"
      ref={setNodeRef}
      className={`model-card${compact ? ' model-card--compact' : ''}${
        isDragging ? ' is-dragging' : ''
      }`}
      style={style}
      {...listeners}
      {...attributes}
      title={`${model.name} · ${model.provider} · ${model.released}`}
    >
      <CardFace model={model} compact={compact} />
    </button>
  )
}

function DraggableModelCard({
  model,
  compact,
}: {
  model: LlmModel
  compact: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: model.id,
      data: { model, sortable: false },
    })

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 40 : undefined,
    opacity: isDragging ? 0.35 : 1,
  }

  return (
    <button
      type="button"
      ref={setNodeRef}
      className={`model-card${compact ? ' model-card--compact' : ''}${
        isDragging ? ' is-dragging' : ''
      }`}
      style={style}
      {...listeners}
      {...attributes}
      title={`${model.name} · ${model.provider} · ${model.released}`}
    >
      <CardFace model={model} compact={compact} />
    </button>
  )
}

export function ModelCard({
  model,
  compact = false,
  sortable = false,
}: {
  model: LlmModel
  compact?: boolean
  sortable?: boolean
}) {
  if (sortable) {
    return <SortableModelCard model={model} compact={compact} />
  }
  return <DraggableModelCard model={model} compact={compact} />
}

export function ModelCardPreview({ model }: { model: LlmModel }) {
  return (
    <div className="model-card model-card--ghost">
      <ModelIcon model={model} size={44} />
      <span className="model-card__text">
        <span className="model-card__name">{model.shortName}</span>
        <span className="model-card__meta">{model.provider}</span>
      </span>
    </div>
  )
}
