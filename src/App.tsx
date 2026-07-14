import { useEffect, useMemo, useRef, useState } from 'react'
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
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
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
import {
  computeInsertIndex,
  type DropHint,
  type DropSide,
} from './lib/dropHint'

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

function isTierRow(id: string): id is Exclude<TierId, 'bench'> {
  return id === 'S' || id === 'A' || id === 'B' || id === 'C' || id === 'D'
}

/** Prefer cards for insert targeting; fall back to empty tier slots. */
const collisionDetection: CollisionDetection = (args) => {
  const pointerHits = pointerWithin(args)
  if (pointerHits.length > 0) {
    const itemHit = pointerHits.find((hit) => !isContainer(hit.id))
    if (itemHit) return [itemHit]
    const containerHit = pointerHits.find((hit) => isContainer(hit.id))
    if (containerHit) return [containerHit]
    return pointerHits
  }

  const rectHits = rectIntersection(args)
  if (rectHits.length > 0) {
    const itemHit = rectHits.find((hit) => !isContainer(hit.id))
    if (itemHit) return [itemHit]
    const containerHit = rectHits.find((hit) => isContainer(hit.id))
    if (containerHit) return [containerHit]
    return rectHits
  }

  return closestCorners(args)
}

function resolveSide(
  dragCenterX: number,
  overLeft: number,
  overWidth: number,
): DropSide {
  return dragCenterX < overLeft + overWidth / 2 ? 'before' : 'after'
}

export default function App() {
  const [board, setBoard] = useState<BoardState>(loadBoard)
  const [query, setQuery] = useState('')
  const [provider, setProvider] = useState<Provider | 'all'>('all')
  const [active, setActive] = useState<LlmModel | null>(null)
  const [dropHint, setDropHint] = useState<DropHint | null>(null)
  const dropHintRef = useRef<DropHint | null>(null)
  const boardRef = useRef(board)
  boardRef.current = board
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

  function publishHint(hint: DropHint | null) {
    dropHintRef.current = hint
    setDropHint(hint)
  }

  function onDragStart(event: DragStartEvent) {
    const model = MODELS.find((m) => m.id === event.active.id)
    setActive(model ?? null)
    publishHint(null)
  }

  function onDragOver(event: DragOverEvent) {
    const { active: drag, over } = event
    if (!over) {
      publishHint(null)
      return
    }

    const activeId = String(drag.id)
    const overId = String(over.id)
    const current = boardRef.current

    const translated = drag.rect.current.translated
    const dragCenterX = translated
      ? translated.left + translated.width / 2
      : over.rect.left + over.rect.width / 2

    const to = isContainer(overId) ? overId : findContainer(current, overId)
    if (!to || !isTierRow(to)) {
      publishHint(null)
      return
    }

    if (isContainer(overId)) {
      publishHint({
        container: to,
        overId: null,
        side: 'after',
        index: current[to].filter((id) => id !== activeId).length,
      })
      return
    }

    if (overId === activeId) {
      publishHint(null)
      return
    }

    const side = resolveSide(dragCenterX, over.rect.left, over.rect.width)
    const index = computeInsertIndex(current[to], activeId, overId, side)
    publishHint({ container: to, overId, side, index })
  }

  function onDragEnd(event: DragEndEvent) {
    const hint = dropHintRef.current
    setActive(null)
    publishHint(null)

    const { active: drag, over } = event
    if (!over && !hint) return

    const activeId = String(drag.id)
    const overId = over ? String(over.id) : null

    setBoard((prev) => {
      const from = findContainer(prev, activeId)
      if (!from) return prev

      const to = hint?.container
        ? hint.container
        : overId && isContainer(overId)
          ? overId
          : overId
            ? findContainer(prev, overId)
            : undefined

      if (!to) return prev

      if (from === to) {
        if (from === 'bench') return prev

        const items = prev[from]
        const oldIndex = items.indexOf(activeId)
        if (oldIndex < 0) return prev

        let nextIndex: number
        if (hint && hint.container === from) {
          nextIndex = hint.index
        } else if (overId && !isContainer(overId)) {
          nextIndex = computeInsertIndex(items, activeId, overId, 'before')
        } else {
          nextIndex = items.length - 1
        }

        const without = items.filter((id) => id !== activeId)
        const clamped = Math.max(0, Math.min(nextIndex, without.length))
        without.splice(clamped, 0, activeId)

        const unchanged = without.every((id, i) => id === items[i])
        if (unchanged) return prev
        return { ...prev, [from]: without }
      }

      const fromItems = [...prev[from]]
      const toItems = [...prev[to]]
      const fromIndex = fromItems.indexOf(activeId)
      if (fromIndex < 0) return prev
      fromItems.splice(fromIndex, 1)

      if (to === 'bench') {
        toItems.push(activeId)
      } else if (hint && hint.container === to) {
        const clamped = Math.max(0, Math.min(hint.index, toItems.length))
        toItems.splice(clamped, 0, activeId)
      } else if (overId && !isContainer(overId) && toItems.includes(overId)) {
        const translated = drag.rect.current.translated
        const dragCenterX = translated
          ? translated.left + translated.width / 2
          : over!.rect.left + over!.rect.width / 2
        const side = resolveSide(dragCenterX, over!.rect.left, over!.rect.width)
        const index = computeInsertIndex(prev[to], activeId, overId, side)
        toItems.splice(index, 0, activeId)
      } else {
        toItems.push(activeId)
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
        onDragOver={onDragOver}
        onDragMove={onDragOver as (event: DragMoveEvent) => void}
        onDragEnd={onDragEnd}
        onDragCancel={() => {
          setActive(null)
          publishHint(null)
        }}
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
                dropHint={dropHint}
                activeId={active?.id ?? null}
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
