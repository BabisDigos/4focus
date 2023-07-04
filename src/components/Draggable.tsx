import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  Setter,
  Show,
} from "solid-js";
import { createDraggable } from "@neodrag/solid";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { makePersisted } from "@solid-primitives/storage";
import { Coordinates } from "~/types";

export const Draggable: Component<{
  index: number;
  initialPosition: Coordinates;
  zOrder: Accessor<number>;
  setZOrder: Setter<number>;
  children: JSXElement;
}> = ({ index, initialPosition, zOrder, setZOrder, children }) => {
  const { draggable } = createDraggable();
  const [mounted, setMounted] = createSignal(false);

  const [position, setPosition] = makePersisted(createSignal(initialPosition), {
    name: `draggable-${index}`,
  });

  let el: HTMLDivElement | undefined;
  const visible = createVisibilityObserver({
    threshold: 0.8,
    initialValue: true,
  })(() => el);

  onMount(() => setMounted(true));

  /* Handle bounds when resizing */
  createEffect(() => {
    if (!visible()) {
      setPosition({ ...initialPosition, z: zOrder() });
    }
  });

  return (
    <Show when={mounted()}>
      <div
        ref={el}
        use:draggable={{
          bounds: "body",
          onDragStart: () => {
            setZOrder((prev) => ++prev);
            setPosition((prev) => ({ ...prev, z: zOrder() }));
          },
          onDrag: ({ offsetX, offsetY }) => {
            setPosition((prev) => ({ ...prev, x: offsetX, y: offsetY }));
          },
          position: position(),
          cancel: ".cancel",
        }}
        class="absolute cursor-move rounded-lg border border-black border-opacity-10 bg-black bg-opacity-40 p-6 text-white shadow-md backdrop-blur-md backdrop-filter"
        style={{
          /* Neodrag can't update the z-index on drag, so we have to do it manually */
          "z-index": position().z,
        }}
      >
        {children}
      </div>
    </Show>
  );
};
