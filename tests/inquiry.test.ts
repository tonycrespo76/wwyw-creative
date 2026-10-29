import { describe, expect, it } from "vitest";
import { validateInquiry } from "@/lib/inquiry";
import { allow, resetRateLimits } from "@/server/rate-limit";

const valid = {
  firstName: " Ada ",
  lastName: "Lovelace",
  email: "ada@example.com",
  phone: "+1 (555) 010-0199",
  businessName: "",
  city: "",
  state: "",
  message: "A new site",
};

describe("validateInquiry", () => {
  it("accepts a valid inquiry and trims values", () => {
    const r = validateInquiry(valid);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.firstName).toBe("Ada");
  });

  it("requires first name, last name, email, phone and message", () => {
    const r = validateInquiry({ ...valid, firstName: "", lastName: " ", email: "", phone: "", message: "" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(["email", "firstName", "lastName", "message", "phone"]);
  });

  it("leaves business name, city and state optional", () => {
    expect(validateInquiry(valid).ok).toBe(true);
  });

  it("rejects a bad email and a bad phone", () => {
    const r = validateInquiry({ ...valid, email: "nope", phone: "abc" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.email).toBeDefined();
      expect(r.errors.phone).toBeDefined();
    }
  });
});

describe("allow", () => {
  it("blocks after the limit within the window", () => {
    resetRateLimits();
    expect([1, 2, 3].map(() => allow("k", 2, 1000, 0))).toEqual([true, true, false]);
    expect(allow("k", 2, 1000, 2000)).toBe(true);
  });
});
