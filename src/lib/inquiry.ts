import { z } from "zod";

// Field names are shared by the form, the server action and the store.
export const INQUIRY_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "businessName",
  "city",
  "state",
  "message",
] as const;

export type InquiryField = (typeof INQUIRY_FIELDS)[number];

const clean = (max: number) => z.string().trim().max(max, `Use ${max} characters or fewer.`);
const required = (max: number, label: string) =>
  clean(max).min(1, `${label} is required.`);

export const inquirySchema = z.object({
  firstName: required(80, "First name"),
  lastName: required(80, "Last name"),
  email: required(254, "Email").pipe(z.email("Enter a valid email address.")),
  phone: required(40, "Phone").refine(
    (value) => {
      const digits = value.replace(/\D/g, "");
      return /^[+\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
    },
    "Enter a valid phone number.",
  ),
  businessName: clean(120),
  city: clean(80),
  state: clean(80),
  message: required(4000, "Message"),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryErrors = Partial<Record<InquiryField, string>>;

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: InquiryErrors;
  values?: Partial<Record<InquiryField, string>>;
};

export function readFormValues(formData: FormData): Record<InquiryField, string> {
  const out = {} as Record<InquiryField, string>;
  for (const field of INQUIRY_FIELDS) {
    const raw = formData.get(field);
    out[field] = typeof raw === "string" ? raw : "";
  }
  return out;
}

export function validateInquiry(values: Record<InquiryField, string>):
  | { ok: true; data: Inquiry }
  | { ok: false; errors: InquiryErrors } {
  const result = inquirySchema.safeParse(values);
  if (result.success) return { ok: true, data: result.data };
  const errors: InquiryErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as InquiryField | undefined;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
