import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import rainbowkitStylesHref from "@rainbow-me/rainbowkit/styles.css";
import { WalletConfig } from "./lib/wallet";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: cssBundleHref },
        { rel: "stylesheet", href: rainbowkitStylesHref },
      ]
    : [{ rel: "stylesheet", href: rainbowkitStylesHref }]),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <WalletConfig>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </WalletConfig>
      </body>
    </html>
  );
}
