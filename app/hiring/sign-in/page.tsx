import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { HiringFrame } from "@/components/hiring/HiringFrame";
import { getHiringUser } from "@/lib/hiring/guard";
import { InviteSession } from "@/app/hiring/sign-in/invite-session";
import { PasswordForm } from "@/app/hiring/sign-in/password-form";
import { SignInForm } from "@/app/hiring/sign-in/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
};

type PageProps = {
  searchParams: Promise<{ setup?: string | string[]; link?: string | string[] }>;
};

export default async function SignInPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const setup = first(params.setup);
  const link = first(params.link);
  const user = await getHiringUser();

  if (user && setup !== "password") redirect("/hiring");

  const choosingPassword = Boolean(user) && setup === "password";

  return (
    <HiringFrame>
      <section className="section-pad" aria-labelledby="sign-in-heading">
        <div className="site-shell">
          <div className="surface-card mx-auto max-w-md p-6 sm:p-8">
            <p className="eyebrow mb-4">Hiring</p>
            <h1
              id="sign-in-heading"
              className="text-3xl font-semibold tracking-[-0.03em] text-ink"
            >
              {choosingPassword ? "Choose a password" : "Sign in"}
            </h1>
            <p className="mt-3 text-base leading-7 text-muted">
              {choosingPassword
                ? "Save a password so you can open the hiring workspace next time."
                : "The hiring workspace is for the Monokeras hiring team."}
            </p>
            <div className="mt-6">
              <InviteSession />
              {link === "expired" ? (
                <p role="alert" className="mb-4 text-sm text-ink">
                  That sign-in link is invalid or expired.
                </p>
              ) : null}
              {choosingPassword ? <PasswordForm /> : <SignInForm />}
            </div>
          </div>
        </div>
      </section>
    </HiringFrame>
  );
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
