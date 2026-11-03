import { describe, expect, it } from "vitest";
import { makeStore } from "@/app/store";
import { increment, reset, selectCount } from "@/features/home/homeSlice";

describe("store Redux", () => {
  it("incrémente et remet à zéro le compteur", () => {
    const store = makeStore();
    store.dispatch(increment());
    store.dispatch(increment());
    expect(selectCount(store.getState())).toBe(2);
    store.dispatch(reset());
    expect(selectCount(store.getState())).toBe(0);
  });

  it("isole les états de deux instances", () => {
    const first = makeStore();
    const second = makeStore();
    first.dispatch(increment());
    expect(selectCount(first.getState())).toBe(1);
    expect(selectCount(second.getState())).toBe(0);
  });

  it("accepte un état initial sérialisable", () => {
    const store = makeStore({ home: { count: 4 } });
    expect(selectCount(store.getState())).toBe(4);
    store.dispatch(increment());
    expect(selectCount(store.getState())).toBe(5);
  });
});
