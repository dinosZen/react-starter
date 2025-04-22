import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const { status, statusText, data } = error;
    return <FullPage message={data?.message ?? statusText} code={status} />;
  }

  const message = error instanceof Error ? error.message : String(error);
  return <FullPage message={message} code={500} />;
}

function FullPage({
  message,
  code,
}: Readonly<{
  message: string;
  code: number;
}>) {
  return (
    <main className="grid h-screen place-content-center gap-4 text-center">
      <h1 className="text-5xl font-bold">Oops!</h1>
      <h1 className="text-5xl font-bold">{code}</h1>
      <p className="text-lg">{message || "Something went wrong."}</p>
      <Link to="/" className="text-blue-600 underline">
        Go home
      </Link>
    </main>
  );
}
