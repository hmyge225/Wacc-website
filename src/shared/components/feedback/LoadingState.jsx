export function LoadingState({ label = "Chargement de la page…" }) {
  return (
    <div className="loading-state" role="status">
      <span className="loading-dot" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
