import { IconTypes } from "solid-icons";
import { TbListCheck, TbMusic, TbNote } from "solid-icons/tb";
import { Component, For } from "solid-js";

import { GlassBox } from "~/design/GlassBox";
import { menuTabs, setMenuTabs } from "~/stores/MenuTabsStore";
import { MenuKey, MenuTab } from "~/types";

export const Menu: Component = () => {
  return (
    <header class="w-full flex justify-center mt-4">
      <GlassBox
        direction="flex-row"
        class="w-fit gap-1"
        style={{ padding: "0.25rem 0.5rem" }}
      >
        <For each={Object.entries(menuTabs)}>
          {([key, value]) => <MenuItem key={key as MenuKey} {...value} />}
        </For>
      </GlassBox>
    </header>
  );
};

const menuIcons: Record<MenuKey, IconTypes> = {
  todos: TbListCheck,
  music: TbMusic,
  notes: TbNote,
};

const MenuItem: Component<{ key: MenuKey } & MenuTab> = (props) => {
  return (
    <button
      type="button"
      class="group flex items-center gap-1 p-2 transition-all border border-transparent text-white rounded-full ring-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      classList={{
        "bg-stone-900 bg-opacity-30 hover:border-white/30": props.isOpen,
        "hover:opacity-75": !props.isOpen,
      }}
      onClick={() => setMenuTabs(props.key, "isOpen", (prev) => !prev)}
    >
      <MenuIcon icon={menuIcons[props.key]} />
      <div class="capitalize font-semibold text-sm">{props.key}</div>
    </button>
  );
};

const MenuIcon: Component<{ icon: IconTypes }> = (props) => {
  return <props.icon size={20} />;
};
