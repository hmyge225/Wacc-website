import { afterEach, describe, expect, it } from "vitest";
import { getQueryClient, makeQueryClient } from "@/app/providers/query-client";

afterEach(() => getQueryClient().clear());

describe("React Query côté navigateur", () => {
  it("réutilise le cache lors de rendus successifs", () => {
    const first = getQueryClient();
    first.setQueryData(["example"], "valeur en cache");
    expect(getQueryClient()).toBe(first);
    expect(getQueryClient().getQueryData(["example"])).toBe("valeur en cache");
  });

  it("permet de créer des clients indépendants pour les tests", () => {
    const first = makeQueryClient();
    const second = makeQueryClient();
    first.setQueryData(["example"], 1);
    expect(second.getQueryData(["example"])).toBeUndefined();
    first.clear();
    second.clear();
  });
});
