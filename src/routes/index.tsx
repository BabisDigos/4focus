import { TbPlanet, TbSettings } from "solid-icons/tb";
import { Suspense, createSignal, lazy, Show, onMount } from "solid-js";
import { getRequestEvent, isServer } from "solid-js/web";
import { parseCookies } from "vinxi/server";
import { Background } from "~/components/Background";
import { YoutubeProvider } from "~/providers";
import { Button } from "~/design/Button";
import { Stack } from "~/design/Stack";
import { PanelProvider } from "~/providers";
import { Space, setSpace } from "~/utils";

const Menu = lazy(() =>
  import("~/components/Menu").then((m) => ({ default: m.Menu }))
);

const Panels = lazy(() =>
  import("~/components/Panels").then((m) => ({ default: m.Panels }))
);

const SettingsModal = lazy(() =>
  import("~/components/Settings").then((m) => ({ default: m.SettingsModal }))
);

const SpacesModal = lazy(() =>
  import("~/components/Spaces").then((m) => ({ default: m.SpacesModal }))
);

const getSpaceCookie = (): Space => {
  const event = getRequestEvent();

  if (!event) {
    throw new Error("No request event found");
  }

  const parsedCookies = parseCookies(event);
  const spaceCookie = parsedCookies["focusly_space"];

  return spaceCookie ? (spaceCookie as Space) : "lofi_girl";
};

export default function Home() {
  const [isMounted, setIsMounted] = createSignal(false);
  const [openSettings, setOpenSettings] = createSignal(false);
  const [openSpaces, setOpenSpaces] = createSignal(false);

  if (isServer) {
    setSpace(getSpaceCookie());
  }

  onMount(() => setIsMounted(true));

  return (
    <main class="screen">
      <Background />
      <Show when={isMounted()}>
        <YoutubeProvider>
          <PanelProvider>
            <Suspense>
              <Panels />
              <Menu />
              <SettingsModal
                isOpen={openSettings}
                setIsOpen={setOpenSettings}
              />
              <SpacesModal isOpen={openSpaces} setIsOpen={setOpenSpaces} />
            </Suspense>
          </PanelProvider>
        </YoutubeProvider>

        <Stack direction="flex-col" class="absolute bottom-4 left-4 gap-2">
          <Button
            variant="secondary"
            class="h-10 w-10"
            onClick={() => setOpenSpaces(true)}
          >
            <TbPlanet class="h-5 w-5" />
          </Button>
          <Button
            variant="secondary"
            class="h-10 w-10"
            onClick={() => setOpenSettings(true)}
          >
            <TbSettings class="h-5 w-5" />
          </Button>
        </Stack>
      </Show>

      <p class="absolute bottom-0 right-0 w-fit select-none rounded-tl-xl bg-stone-900 px-2 py-1.5 text-xs font-medium leading-none text-white">
        <span class="text-[10px]">by </span>
        <a
          href="https://twitter.com/harry_digos"
          target="blank"
          class="hover:underline"
        >
          @harry_digos
        </a>
      </p>
    </main>
  );
}
