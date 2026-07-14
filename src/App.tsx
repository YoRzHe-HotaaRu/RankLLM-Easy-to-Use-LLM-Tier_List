import { useEffect, useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Bench } from './components/Bench'
import { ModelCardPreview } from './components/ModelCard'
import { TierRow } from './components/TierRow'
import {
  MODELS,
  PROVIDERS,
  TIERS,
  type LlmModel,
  type Provider,
  type TierId,
} from './data/models'
import {
  CONTAINERS,
  countPlaced,
  emptyBoard,
  exportSummary,
  findContainer,
  modelsInTier,
  normalizeBoard,
  randomBoard,
  type BoardState,
} from './lib/board'

const STORAGE_KEY = 'llm-tier-board-v2'

function loadBoard(): BoardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return normalizeBoard(JSON.parse(raw))
    const legacy = localStorage.getItem('llm-tier-board-v1')
    if (legacy) return normalizeBoard(JSON.parse(legacy))
    return emptyBoard()
  } catch {
    return emptyBoard()
  }
}

function isContainer(id: UniqueIdentifier): id is TierId {
  return CONTAINERS.includes(String(id) as TierId)
}

/** Prefer the tier/bench under the pointer so empty rows still accept drops. */
const collisionDetection: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args)
  if (pointerHits.length > 0) {
    const containerHit = pointerHits.find((hit) => isContainer(hit.id))
    if (containerHit) return [containerHit]
    return pointerHits
  }

  const rectHits = rectIntersection(args)
  if (rectHits.length > 0) {
    const containerHit = rectHits.find((hit) => isContainer(hit.id))
    if (containerHit) return [containerHit]
    return rectHits
  }

  return closestCorners(args)
}

export default function App() {
  const [board, setBoard] = useState<BoardState>(loadBoard)
  const [query, setQuery] = useState('')
  const [provider, setProvider] = useState<Provider | 'all'>('all')
  const [active, setActive] = useState<LlmModel | null>(null)
  const [copied, setCopied] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board))
  }, [board])

  const placed = countPlaced(board)
  const total = MODELS.length

  const benchModels = useMemo(() => {
    const q = query.trim().toLowerCase()
    return modelsInTier(board, 'bench').filter((m) => {
      const matchesProvider = provider === 'all' || m.provider === provider
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.shortName.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q)
      return matchesProvider && matchesQuery
    })
  }, [board, query, provider])

  function onDragStart(event: DragStartEvent) {
    const model = MODELS.find((m) => m.id === event.active.id)
    setActive(model ?? null)
  }

  function onDragEnd(event: DragEndEvent) {
    setActive(null)
    const { active: drag, over } = event
    if (!over) return

    const activeId = String(drag.id)
    const overId = String(over.id)

    setBoard((prev) => {
      const from = findContainer(prev, activeId)
      if (!from) return prev

      const to = isContainer(overId)
        ? overId
        : findContainer(prev, overId)

      if (!to) return prev

      if (from === to) {
        // Reorder only inside tier rows, never inside the inventory bench.
        if (from === 'bench') return prev

        const items = prev[from]
        const oldIndex = items.indexOf(activeId)
        const newIndex = isContainer(overId)
          ? items.length - 1
          : items.indexOf(overId)

        if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prev
        return { ...prev, [from]: arrayMove(items, oldIndex, newIndex) }
      }

      const fromItems = [...prev[from]]
      const toItems = [...prev[to]]
      const fromIndex = fromItems.indexOf(activeId)
      if (fromIndex < 0) return prev

      fromItems.splice(fromIndex, 1)

      // Inventory stays unordered: always append when returning to bench.
      if (to === 'bench' || isContainer(overId) || toItems.length === 0) {
        toItems.push(activeId)
      } else {
        const overIndex = toItems.indexOf(overId)
        toItems.splice(overIndex >= 0 ? overIndex : toItems.length, 0, activeId)
      }

      return { ...prev, [from]: fromItems, [to]: toItems }
    })
  }

  function resetBoard() {
    setBoard(emptyBoard())
  }

  function shuffleBoard() {
    setBoard(randomBoard())
  }

  async function copyExport() {
    const text = exportSummary(board)
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="page">
      <div className="page__grain" aria-hidden />
      <div className="page__rules" aria-hidden />

      <header className="hero">
        <div className="hero__mark">
          <span className="reg-mark" aria-hidden />
          <p className="eyebrow">Edition 2026.07 · {total} models</p>
        </div>

        <div className="hero__brand">
          <h1 className="brand">
            RANK<span className="brand__slash">/</span>LLM
          </h1>
          <p className="hero__lede">
            Drag frontier models onto the board. Sharp tiers, no soft corners,
            your call on who sits in S.
          </p>
        </div>

        <div className="hero__stats">
          <div className="stat-block">
            <span className="stat-block__label">Ranked</span>
            <span className="stat-block__value">
              {placed}
              <span className="stat-block__den">/{total}</span>
            </span>
          </div>
          <div className="stat-block">
            <span className="stat-block__label">Bench</span>
            <span className="stat-block__value">
              {modelsInTier(board, 'bench').length}
            </span>
          </div>
        </div>

        <div className="hero__actions">
          <button type="button" className="btn btn--ghost" onClick={resetBoard}>
            Reset
          </button>
          <button type="button" className="btn btn--ghost" onClick={shuffleBoard}>
            Chaos rank
          </button>
          <button type="button" className="btn btn--solid" onClick={copyExport}>
            {copied ? 'Copied' : 'Export list'}
          </button>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={() => setActive(null)}
      >
        <main className="board">
          <div className="board__frame">
            <div className="board__caption">
              <span>Tier matrix</span>
              <span>Drop · reorder · argue</span>
            </div>
            {TIERS.map((tier) => (
              <TierRow
                key={tier}
                tier={tier}
                models={modelsInTier(board, tier)}
              />
            ))}
          </div>

          <Bench
            models={benchModels}
            query={query}
            onQuery={setQuery}
            provider={provider}
            onProvider={setProvider}
            providers={PROVIDERS as Provider[]}
          />
        </main>

        <DragOverlay dropAnimation={null}>
          {active ? <ModelCardPreview model={active} /> : null}
        </DragOverlay>
      </DndContext>

      <footer className="footer">
        <p>
          Model roster curated from mid-2026 releases (OpenAI GPT-5.6 family,
          Claude Fable 5, Grok 4.5, GLM-5.2, Kimi K2.7 Code, Nemotron 3 Ultra,
          MiniMax M3, LongCat 2.0, Hy3, KAT-Coder-Pro, Fugu Ultra, Ring-2.6-1T,
          and peers). Rankings are yours.
        </p>
        <p className="footer__meta">Local save · no account · no cloud sync</p>
      </footer>
    </div>
  )
}
