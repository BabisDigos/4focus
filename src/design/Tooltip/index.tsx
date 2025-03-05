import { Tooltip as KobalteTooltip } from "@kobalte/core";
import { Component, JSX, Show, splitProps } from "solid-js";
// import { TooltipRootProps } from "@kobalte/core/dist/types/tooltip";
import styles from "./Tooltip.module.css";

export type TooltipProps = {
  children: JSX.Element;
  description: string | JSX.Element;
  arrowSize?: number;
  animate?: boolean;
  // } & TooltipRootProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & any;

export const Tooltip: Component<TooltipProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "children",
    "description",
    "arrowSize",
    "animate",
  ]);

  return (
    <KobalteTooltip.Root {...rest}>
      <KobalteTooltip.Trigger class="inline-flex">
        {local.children}
      </KobalteTooltip.Trigger>
      <KobalteTooltip.Portal>
        <KobalteTooltip.Content
          class="rounded-lg border border-stone-700 bg-stone-900 px-2 py-1.5 text-xs font-normal text-stone-50 drop-shadow-md"
          classList={{
            [styles.tooltip__animation]: local.animate ?? true,
          }}
          style={{
            "z-index": 2147483647,
          }}
        >
          <KobalteTooltip.Arrow size={local.arrowSize || 0} />
          <Show
            when={typeof local.description !== "string"}
            fallback={<p>{local.description}</p>}
          >
            {local.description}
          </Show>
        </KobalteTooltip.Content>
      </KobalteTooltip.Portal>
    </KobalteTooltip.Root>
  );
};
