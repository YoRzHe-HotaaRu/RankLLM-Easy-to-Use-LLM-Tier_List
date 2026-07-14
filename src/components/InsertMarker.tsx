export function InsertMarker({ active }: { active?: boolean }) {
  return (
    <div
      className={`insert-marker${active ? ' is-active' : ''}`}
      aria-hidden
    >
      <span className="insert-marker__beam" />
      <span className="insert-marker__cap insert-marker__cap--top" />
      <span className="insert-marker__cap insert-marker__cap--bottom" />
    </div>
  )
}
