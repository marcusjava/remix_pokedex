export interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className="error__container">
      <h3>Error</h3>
      <p className="error__text">{error.message}</p>
    </div>
  );
}
