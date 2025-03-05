// @refresh reload
import { Router } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import { Toaster } from "solid-toast";

import "./app.css"; // TODO: check

const SettingsProvider = clientOnly(() =>
  import("~/providers").then((m) => ({ default: m.SettingsProvider })),
);

const YoutubeProvider = clientOnly(() =>
  import("~/providers").then((m) => ({ default: m.YoutubeProvider })),
);

const PanelProvider = clientOnly(() =>
  import("~/providers").then((m) => ({ default: m.PanelProvider })),
);

const CursorPositionProvider = clientOnly(() =>
  import("~/providers").then((m) => ({ default: m.CursorPositionProvider })),
);

import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense>
          <ErrorBoundary fallback={""}>
            <SettingsProvider>
              <YoutubeProvider>
                <PanelProvider>
                  <CursorPositionProvider>
                    <Toaster
                      position="top-right"
                      containerStyle={{
                        "z-index": "2147483647",
                      }}
                    />

                    {props.children}
                  </CursorPositionProvider>
                </PanelProvider>
              </YoutubeProvider>
            </SettingsProvider>
          </ErrorBoundary>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
