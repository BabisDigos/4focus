// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { inject } from "@vercel/analytics";

inject();

mount(() => <StartClient />, document.getElementById("app")!);
