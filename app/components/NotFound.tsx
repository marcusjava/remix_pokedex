export interface NotFoundProps {
  message?: string;
}

export default function NotFound({ message }: NotFoundProps) {
  return (
    <div className="notfound__container">
      <h3>404 Not Found</h3>
      {message ? <p className="text-sm text-gray-400">{message}</p> : null}
    </div>
  );
}
