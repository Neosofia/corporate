import { useState, type FormEvent } from "react";
import { Link } from "react-router";

const subjectOptions = [
  { value: "general", label: "General inquiry" },
  { value: "sales", label: "Sales / consulting" },
  { value: "partnership", label: "Partnership request" },
  { value: "support", label: "Support question" },
];

const isValidEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

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
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(subjectOptions[0].value);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(email) || !message.trim()) {
      setError("Please provide a valid email address and a message.");
      return;
    }

    setStatus("submitting");

    try {
      const subjectLabel = subjectOptions.find((option) => option.value === subject)?.label ?? subject;

      const response = await fetch(`${EMAIL_API_URL}/api/emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_email: email, subject: subjectLabel, message }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed with status ${response.status}`);
      }

      setStatus("submitted");
      setEmail("");
      setSubject(subjectOptions[0].value);
      setMessage("");
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      console.error("Contact form error:", message, e);
      setError("Unable to send your message right now. Please try again later.");
      setStatus("idle");
    }
  };

  const isSubmitDisabled =
    status === "submitting" ||
    !isValidEmail(email) ||
    !message.trim();

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 rounded-4xl border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/20 sm:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Contact Neosofia</h1>
          <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
            Send us your email address, select a subject, and write your message.
          </p>

          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-200">
                Your email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                required
                className="mt-2 w-full rounded-3xl border border-slate-800/90 bg-slate-950/95 px-4 py-3 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-200">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={subject}
                onChange={(event) => setSubject(event.currentTarget.value)}
                className="mt-2 w-full rounded-3xl border border-slate-800/90 bg-slate-950/95 px-4 py-3 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
              >
                {subjectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={8}
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
                required
                className="mt-2 w-full rounded-[2rem] border border-slate-800/90 bg-slate-950/95 px-4 py-3 text-sm text-white outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-500/20"
                placeholder="Tell us how we can help."
              />
            </div>

            {error ? (
              <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            ) : null}

            {status === "submitted" ? (
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                Your message has been sent. We’ll be in touch soon.
              </div>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                disabled={isSubmitDisabled}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

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
