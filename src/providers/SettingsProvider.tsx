import { Component, JSX, createContext, useContext } from "solid-js";
import { makePersisted } from "@solid-primitives/storage";
import { createStore } from "solid-js/store";
import { Alarm, BgColor } from "~/config";

export interface SettingsContextProps {
  alarmSound: Alarm;

  updateAlarmSound: (value: Alarm) => void;
  bgColor: BgColor;

  updateBgColor: (value: BgColor) => void;
  resetAll: () => void;
}

export const SettingsContext = createContext<SettingsContextProps>();

const initialAlarmSound = (): Alarm => ({
  value: "bells",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  url: "bells.wav" as any,
});

const initialBgColor = (): BgColor => ({
  value: "stone",
  class: "bg-stone-950",
});

export const SettingsProvider: Component<{
  children: JSX.Element;
}> = (props) => {
  const [alarmSound, setAlarmSound] = makePersisted(
    // eslint-disable-next-line solid/reactivity
    createStore<Alarm>(initialAlarmSound()),
    {
      name: "alarm-sound",
    },
  );

  const updateSound = (value: Alarm) => {
    setAlarmSound(value);
  };

  const [bgColor, setBgColor] = makePersisted(
    // eslint-disable-next-line solid/reactivity
    createStore<BgColor>(initialBgColor()),
    {
      name: "bg-color",
    },
  );

  const updateBgColor = (value: BgColor) => {
    setBgColor(value);
    if (document.documentElement) {
      document.documentElement.style.setProperty("--bg-color", value.class);
    }
  };

  const resetAll = () => {
    setAlarmSound(initialAlarmSound());
    setBgColor(initialBgColor());
  };

  return (
    <SettingsContext.Provider
      value={{
        alarmSound,
        updateAlarmSound: updateSound,
        bgColor,
        updateBgColor: updateBgColor,
        resetAll,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }
  return context;
};
