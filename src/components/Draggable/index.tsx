import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  JSXElement,
} from "solid-js";
import { createDraggable } from "@neodrag/solid";
import { SetStoreFunction } from "solid-js/store";
import { createElementBounds } from "@solid-primitives/bounds";

import { Note, Tab, XOR } from "~/types";
import { usePanelContext } from "~/providers";

type DraggableProps = {
  tab: Tab;
  children: JSXElement;
  disabled?: boolean;
} & XOR<
  {
    setTab: SetStoreFunction<Tab>;
  },
  {
    setNotes: SetStoreFunction<Note[]>;
    index: Accessor<number>;
  }
>;

export const Draggable: Component<DraggableProps> = (props) => {
  const { getBiggestZ } = usePanelContext();
  const { draggable } = createDraggable(); // use:draggable
  const screenBounds = createElementBounds(document.body, {
    trackScroll: false,
    trackMutation: false,
  });
  const [target, setTarget] = createSignal<HTMLElement>();
  const bounds = createElementBounds(target);
  const [isDragging, setIsDragging] = createSignal(false);

  createEffect(() => {
    const isOutOfBoundsRight =
      Math.floor(bounds.right!) > Math.floor(screenBounds.width!);
    const isOutOfBoundsBottom =
      Math.floor(bounds.bottom!) > Math.floor(screenBounds.height!);

    if (isOutOfBoundsRight) {
      const newPosX = Math.floor(screenBounds.width! - bounds.width!);
      if (props.setTab) {
        props.setTab("position", "x", newPosX);
      } else {
        props.setNotes(props.index(), "position", "x", newPosX);
      }
    }

    if (isOutOfBoundsBottom) {
      const newPosY = Math.floor(screenBounds.height! - bounds.height!);
      if (newPosY < 1) return;

      if (props.setTab) {
        props.setTab("position", "y", newPosY);
      } else {
        props.setNotes(props.index(), "position", "y", newPosY);
      }
    }
  });

  return (
    <div
      ref={setTarget}
      use:draggable={{
        bounds: "body",
        onDragStart: () => {
          setIsDragging(true);
          if (props.setTab) {
            props.setTab("position", "z", () => getBiggestZ() + 1);
          } else {
            props.setNotes(
              props.index(),
              "position",
              "z",
              () => getBiggestZ() + 1,
            );
          }
        },
        onDrag: ({ offsetX, offsetY }) => {
          /* To store the position to local storage */
          if (props.setTab) {
            props.setTab("position", "x", offsetX);
            props.setTab("position", "y", offsetY);
          } else {
            props.setNotes(props.index(), "position", "x", offsetX);
            props.setNotes(props.index(), "position", "y", offsetY);
          }
        },
        onDragEnd: () => {
          setIsDragging(false);
        },
        position: props.tab.position,
        disabled: props.disabled || props.tab.isLocked,
      }}
      class="absolute"
      classList={{
        "cursor-default": props.disabled || props.tab.isLocked,
        "cursor-grab": !isDragging() && !props.disabled && !props.tab.isLocked,
        "cursor-grabbing": isDragging(),
      }}
      style={{
        "z-index": props.tab.position.z,
      }}
    >
      {props.children}
    </div>
  );
};
