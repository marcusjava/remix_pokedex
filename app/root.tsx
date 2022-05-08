import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import Header from "./components/Header";
import globalStylesUrl from "./styles/global.css";
import headerUrl from "~/styles/header.css";
import dropdownUrl from "~/styles/dropdown.css";
import { getUser } from "./utils/session.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "My Pokemon App",
  viewport: "width=device-width,initial-scale=1",
  keywords: "Remix Pokemon App",
});

interface LoaderData {
  user: Awaited<ReturnType<typeof getUser>>;
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: globalStylesUrl,
  },
  { rel: "stylesheet", href: headerUrl },
  { rel: "stylesheet", href: dropdownUrl },
];

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const user = await getUser(request);

  return {
    user,
  };
};

export default function App() {
  const { user } = useLoaderData<LoaderData>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header user={user} />;
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="error-container">
      <h1>
        {caught.status} {caught.statusText}
      </h1>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="error-container">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </div>
  );
}
