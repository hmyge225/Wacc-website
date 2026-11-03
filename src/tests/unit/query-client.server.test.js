// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getQueryClient } from "@/app/providers/query-client";

describe("React Query côté serveur", () => {
  it("ne partage pas les données entre deux rendus serveur", () => {
    const first = getQueryClient();
    const second = getQueryClient();
    first.setQueryData(["session"], { name: "Alice" });
    expect(second).not.toBe(first);
    expect(second.getQueryData(["session"])).toBeUndefined();
    first.clear();
    second.clear();
  });

  it("garde les données fraîches pendant une minute", () => {
    const client = getQueryClient();
    expect(client.getDefaultOptions().queries.staleTime).toBe(60_000);
    client.clear();
  });
});
