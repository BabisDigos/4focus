import { getRequestEvent, isServer } from "solid-js/web";
import { parseCookies } from "vinxi/server";
import { clientOnly } from "@solidjs/start";

import { Background } from "~/components/Background";
import { SettingsDialog } from "~/components/Settings";
import { SpacesDialog } from "~/components/Spaces";
import { Space } from "~/config";
import { Stack } from "~/design/Stack";
import { useSpace } from "~/stores";

const Panels = clientOnly(() =>
  import("~/components/Panels").then((m) => ({ default: m.Panels })),
);

const getSpaceCookie = (): Space => {
  "use server";

  const event = getRequestEvent();

  if (!event) {
    throw new Error("No request event found");
  }

  // const parsedCookies = parseCookies(event);
  // const spaceCookie = parsedCookies["focusly_space"];
  //
  // return spaceCookie ? (spaceCookie as Space) : "lofi_girl";
  return "lofi_girl";
};

export default function Home() {
  const { setSpace } = useSpace();

  if (isServer) {
    setSpace(getSpaceCookie());
  }

  return (
    <main class="screen">
      <Background />

      <Panels />

      <Stack direction="flex-col" class="absolute bottom-4 left-4 gap-2">
        <SpacesDialog />
        <SettingsDialog />
      </Stack>

      <Signature />
    </main>
  );
}

const Signature = () => (
  <p class="absolute bottom-0 right-0 w-fit select-none rounded-tl-xl bg-stone-900 px-2 py-1.5 text-xs leading-none text-white">
    <span class="text-[10px]">by </span>
    <a
      href="https://x.com/harry_digos"
      target="blank"
      class="font-medium hover:underline"
    >
      @harry_digos
    </a>
    {", "}
    <a
      href="https://github.com/harrydigos/focusly"
      target="blank"
      class="font-medium hover:underline"
    >
      source
    </a>
  </p>
);
