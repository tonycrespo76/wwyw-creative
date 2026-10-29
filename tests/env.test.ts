import { describe, expect, it } from "vitest";
import { readEnv } from "@/server/env";

describe("readEnv", () => {
  it("defaults NODE_ENV", () => {
    expect(readEnv({}).NODE_ENV).toBe("development");
  });
  it("rejects a short spike secret", () => {
    expect(() => readEnv({ SPIKE_SECRET: "short" })).toThrow();
  });
});
