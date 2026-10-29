import { describe, expect, it } from "vitest";
import { encode } from "@/lib/code-strip";

describe("encode", () => {
  it("maps letters to code classes and spaces to null", () => {
    const out = encode("a b");
    expect(out.map((o) => o.char)).toEqual(["A", " ", "B"]);
    expect(out[0]?.code).toBe("hazard");
    expect(out[1]?.code).toBeNull();
    expect(out[2]?.code).toBe("cobalt");
  });
});
