import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("client Axios", () => {
  it("fonctionne sans configuration et limite la durée des requêtes", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "");
    vi.resetModules();
    const { api } = await import("@/shared/services/api");
    expect(api.defaults.baseURL).toBe("/api");
    expect(api.defaults.timeout).toBe(10_000);
    expect(api.defaults.headers.common.Authorization).toBeUndefined();
  });

  it("prend en compte l’URL publique sans effectuer de requête réseau", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "https://api.example.test/v1");
    vi.resetModules();
    const { api } = await import("@/shared/services/api");
    const adapter = vi.fn(async (config) => ({
      data: [{ id: 1 }],
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    }));
    expect(adapter).not.toHaveBeenCalled();
    const response = await api.get("/items", { adapter });
    expect(adapter).toHaveBeenCalledOnce();
    expect(api.getUri(response.config)).toBe(
      "https://api.example.test/v1/items",
    );
    expect(response.data).toEqual([{ id: 1 }]);
  });
});
