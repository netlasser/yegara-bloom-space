import { createContext, useCallback, useContext, useState, type FormEvent, type ReactNode } from "react";
import { Check } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { spaces } from "@/lib/spaces";

type Ctx = { openInquiry: (space?: string) => void };
const InquiryContext = createContext<Ctx>({ openInquiry: () => undefined });
export const useInquiry = () => useContext(InquiryContext);

export type InquiryPayload = {
  name: string; company: string; email: string; phone: string; space: string; date: string; message: string;
};

/**
 * INTEGRATION POINT: no email/backend is connected yet.
 * Replace this with a server function call to deliver inquiries.
 */
async function submitInquiry(_payload: InquiryPayload): Promise<void> {
  return Promise.resolve();
}

const field = "mt-2 h-12 w-full border border-ink/30 bg-cream px-3 text-ink placeholder:text-ink/40 focus-visible:border-orange";

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [space, setSpace] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const openInquiry = useCallback((s?: string) => { setSpace(s ?? ""); setDone(false); setOpen(true); }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    setBusy(true);
    await submitInquiry({ name: get("name"), company: get("company"), email: get("email"), phone: get("phone"), space: get("space"), date: get("date"), message: get("message") });
    setBusy(false);
    setDone(true);
  }

  return (
    <InquiryContext.Provider value={{ openInquiry }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92svh] max-w-2xl overflow-y-auto rounded-none border-0 bg-cream p-6 text-ink md:p-10">
          {done ? (
            <div className="py-6">
              <span className="flex h-14 w-14 items-center justify-center bg-orange text-ink"><Check /></span>
              <DialogTitle className="mt-8 text-4xl font-bold uppercase leading-[0.9] md:text-5xl">Thank you.</DialogTitle>
              <DialogDescription className="mt-5 max-w-md text-base text-muted-foreground">
                Your visit request is ready. Online sending isn't switched on yet — to confirm your visit, message us on Instagram{" "}
                <a className="font-bold text-ink underline decoration-orange underline-offset-4" href="https://www.instagram.com/yegaraspace.et/" target="_blank" rel="noreferrer">@yegaraspace.et</a>.
              </DialogDescription>
              <Button variant="yegara" className="mt-8 h-12 px-8 font-bold uppercase" onClick={() => setOpen(false)}>Close</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <p className="eyebrow text-orange">Bloom Tower · Kazanchis</p>
              <DialogTitle className="mt-4 text-4xl font-bold uppercase leading-[0.9] md:text-5xl">Book a visit.</DialogTitle>
              <DialogDescription className="mt-3 text-muted-foreground">Tell us a little about you and we'll arrange a time to show you around.</DialogDescription>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <label className="eyebrow">Name<input required name="name" autoComplete="name" className={field} /></label>
                <label className="eyebrow">Company<input name="company" autoComplete="organization" className={field} /></label>
                <label className="eyebrow">Email<input required type="email" name="email" autoComplete="email" className={field} /></label>
                <label className="eyebrow">Phone<input type="tel" name="phone" autoComplete="tel" className={field} /></label>
                <label className="eyebrow">Space interested in
                  <select name="space" value={space} onChange={(e) => setSpace(e.target.value)} className={field}>
                    <option value="">Not sure yet</option>
                    {spaces.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
                  </select>
                </label>
                <label className="eyebrow">Preferred visit date<input type="date" name="date" className={field} /></label>
                <label className="eyebrow md:col-span-2">Message<textarea name="message" rows={4} className={`${field} h-auto py-3`} /></label>
              </div>
              <Button type="submit" variant="yegara" disabled={busy} className="mt-8 h-12 w-full font-bold uppercase tracking-[0.12em] md:w-auto md:px-10">Send request</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </InquiryContext.Provider>
  );
}
