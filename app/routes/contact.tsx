import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const FIELD_BASE = "border-slate-800/90 bg-slate-950/95 px-4 py-3 text-white placeholder:text-slate-500 focus-visible:border-sky-400 focus-visible:ring-sky-500/20";
const LABEL_CLASS = "text-sm font-semibold text-slate-200";

const subjectOptions = [
  { value: "general", label: "General inquiry" },
  { value: "sales", label: "Sales / consulting" },
  { value: "partnership", label: "Partnership request" },
  { value: "support", label: "Support question" },
];

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  subject: z.string(),
  message: z.string().min(1, "Message is required."),
});

const EMAIL_API_URL: string = (() => {
  const url = import.meta.env.VITE_EMAIL_API_URL;
  if (!url) throw new Error("VITE_EMAIL_API_URL is required at build time");
  return url;
})();

export function meta() {
  return [
    { title: "Neosofia | Contact Us" },
    { name: "description", content: "Contact Neosofia for consulting, platform engineering, and compliance support." },
  ];
}

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitted" | "error">("idle");

  const form = useForm({
    defaultValues: { email: "", subject: subjectOptions[0].value, message: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      setSubmitStatus("idle");
      try {
        const subjectLabel = subjectOptions.find((o) => o.value === value.subject)?.label ?? value.subject;
        const response = await fetch(`${EMAIL_API_URL}/api/emails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from_email: value.email, subject: subjectLabel, message: value.message }),
        });
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error ?? `Request failed with status ${response.status}`);
        }
        setSubmitStatus("submitted");
        form.reset();
      } catch (e) {
        console.error("Contact form error:", e instanceof Error ? e.message : String(e), e);
        setSubmitStatus("error");
      }
    },
  });

  return (
    <section className="mx-auto max-w-5xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
      <div className="mb-12 rounded-4xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/20 sm:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Contact Neosofia</h1>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            Send us your email address, select a subject, and write your message.
          </p>

          <form
            className="mt-10 space-y-6"
            onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
          >
            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={LABEL_CLASS}>Your email address</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className={`mt-2 h-auto rounded-3xl ${FIELD_BASE}`}
                      placeholder="you@example.com"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="subject">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name} className={LABEL_CLASS}>Subject</FieldLabel>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="mt-2 w-full rounded-3xl border border-slate-800/90 bg-slate-950/95 px-4 py-3 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20 appearance-none"
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-950">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </form.Field>

            <form.Field name="message">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} className={LABEL_CLASS}>Message</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      rows={8}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                      className={`mt-2 rounded-[2rem] ${FIELD_BASE}`}
                      placeholder="Tell us how we can help."
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                );
              }}
            </form.Field>

            {submitStatus === "error" ? (
              <Alert className="rounded-3xl border-rose-500/30 bg-rose-500/10 text-rose-200">
                <AlertDescription>Unable to send your message right now. Please try again later.</AlertDescription>
              </Alert>
            ) : null}

            {submitStatus === "submitted" ? (
              <Alert className="rounded-3xl border-emerald-500/30 bg-emerald-500/10 text-emerald-200">
                <AlertDescription>Your message has been sent. We'll be in touch soon.</AlertDescription>
              </Alert>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full bg-sky-500 hover:bg-sky-400"
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? "Sending…" : "Send message"}
                  </Button>
                )}
              </form.Subscribe>

              <Link to="/" className="text-sm font-semibold text-slate-300 transition hover:text-white">
                Back to home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
