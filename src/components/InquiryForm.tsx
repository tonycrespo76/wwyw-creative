"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry } from "@/app/contact/actions";
import type { InquiryField, InquiryState } from "@/lib/inquiry";
import { Turnstile } from "./Turnstile";
import styles from "./InquiryForm.module.css";

const INITIAL: InquiryState = { status: "idle" };

type FieldProps = {
  name: InquiryField;
  label: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  state: InquiryState;
  wide?: boolean;
};

function Field({ name, label, required, type = "text", autoComplete, inputMode, state, wide }: FieldProps) {
  const error = state.errors?.[name];
  const errorId = `${name}-error`;
  return (
    <div className={`${styles.field} ${wide ? styles.wide : ""}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required ? <span className={styles.req}> (required)</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        defaultValue={state.values?.[name] ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={styles.input}
      />
      {error ? (
        <p id={errorId} className={styles.error}>
          Error: {error}
        </p>
      ) : null}
    </div>
  );
}

export function InquiryForm({ siteKey }: { siteKey: string | undefined }) {
  const [state, action, pending] = useActionState(submitInquiry, INITIAL);
  const summary = useRef<HTMLParagraphElement>(null);

  // After each result, move focus to the status message.
  useEffect(() => {
    if (state.status !== "idle") summary.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div className={styles.done}>
        <p ref={summary} tabIndex={-1} className={styles.doneText} role="status">
          {state.message}
        </p>
      </div>
    );
  }

  const messageError = state.errors?.message;

  return (
    <form action={action} className={styles.form} noValidate>
      {state.status === "error" && state.message ? (
        <p ref={summary} tabIndex={-1} className={styles.summary} role="alert">
          Error: {state.message}
        </p>
      ) : null}

      <div className={styles.grid}>
        <Field name="firstName" label="First name" required autoComplete="given-name" state={state} />
        <Field name="lastName" label="Last name" required autoComplete="family-name" state={state} />
        <Field name="email" label="Email" required type="email" autoComplete="email" inputMode="email" state={state} />
        <Field name="phone" label="Phone" required type="tel" autoComplete="tel" inputMode="tel" state={state} />
        <Field name="businessName" label="Business name" autoComplete="organization" state={state} wide />
        <Field name="city" label="City" autoComplete="address-level2" state={state} />
        <Field name="state" label="State" autoComplete="address-level1" state={state} />

        <div className={`${styles.field} ${styles.wide}`}>
          <label htmlFor="message" className={styles.label}>
            Message<span className={styles.req}> (required)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            placeholder="Tell us more about your project"
            defaultValue={state.values?.message ?? ""}
            aria-invalid={messageError ? true : undefined}
            aria-describedby={messageError ? "message-error" : undefined}
            className={`${styles.input} ${styles.textarea}`}
          />
          {messageError ? (
            <p id="message-error" className={styles.error}>
              Error: {messageError}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {siteKey ? (
        <div className={styles.check}>
          <Turnstile siteKey={siteKey} resetKey={state} />
        </div>
      ) : (
        <p className={styles.error}>Error: the spam check is not configured, so inquiries cannot be sent yet.</p>
      )}

      <button type="submit" className={styles.submit} disabled={pending}>
        {pending ? "Sending" : "Send inquiry"}
      </button>
    </form>
  );
}
