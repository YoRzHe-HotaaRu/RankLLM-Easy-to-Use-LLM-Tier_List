import { useDroppable } from '@dnd-kit/core'
import type { LlmModel, Provider } from '../data/models'
import { ModelCard } from './ModelCard'

export function Bench({
  models,
  query,
  onQuery,
  provider,
  onProvider,
  providers,
}: {
  models: LlmModel[]
  query: string
  onQuery: (value: string) => void
  provider: Provider | 'all'
  onProvider: (value: Provider | 'all') => void
  providers: Provider[]
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'bench',
    data: { type: 'container', children: models.map((m) => m.id) },
  })

  return (
    <section className={`bench${isOver ? ' is-over' : ''}`}>
      <div className="bench__head">
        <div>
          <p className="eyebrow">Unranked inventory</p>
          <h2 className="bench__title">Model Bench</h2>
        </div>
        <div className="bench__controls">
          <label className="field">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Fable, Sol, Hy3…"
              autoComplete="off"
            />
          </label>
          <label className="field">
            <span>Provider</span>
            <select
              value={provider}
              onChange={(e) => onProvider(e.target.value as Provider | 'all')}
            >
              <option value="all">All labs</option>
              {providers.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div ref={setNodeRef} className="bench__grid">
        {models.length === 0 ? (
          <p className="tier-empty">
            {query || provider !== 'all'
              ? 'No matches in the bench.'
              : 'Bench empty. Every model is ranked.'}
          </p>
        ) : (
          models.map((model) => (
            <ModelCard key={model.id} model={model} sortable={false} />
          ))
        )}
      </div>
    </section>
  )
}
