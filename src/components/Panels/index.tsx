import { Component, Show, createSignal, onMount } from "solid-js";

import { GlassBox } from "~/design/GlassBox";
import { Draggable } from "~/components/Draggable";
import {
  notePanel,
  setNotePanel,
  setTodos,
  todos,
} from "~/stores/MenuTabsStore";
import { Todos } from "~/components/Todos";
import { NoteControl } from "~/components/NoteControl";
import { Notes } from "~/components/Note";

export const Panels: Component = () => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => setIsMounted(true));

  return (
    <Show when={isMounted()}>
      <Show when={todos.isOpen}>
        <Draggable tab={todos} setTab={setTodos}>
          <GlassBox direction="flex-col">
            <Todos />
          </GlassBox>
        </Draggable>
      </Show>
      <Show when={notePanel.isOpen}>
        <Draggable tab={notePanel} setTab={setNotePanel}>
          <GlassBox direction="flex-col">
            <NoteControl />
          </GlassBox>
        </Draggable>
      </Show>
      <Notes />
    </Show>
  );
};
