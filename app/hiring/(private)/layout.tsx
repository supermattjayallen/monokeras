import { HiringFrame } from "@/components/hiring/HiringFrame";
import { SignOutButton } from "@/components/hiring/SignOutButton";
import { requireHiringUser } from "@/lib/hiring/guard";

export default async function PrivateHiringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireHiringUser();

  return (
    <HiringFrame
      account={
        <div className="flex items-center gap-3">
          {user.email ? (
            <p className="hidden max-w-56 truncate text-sm text-muted sm:block">
              {user.email}
            </p>
          ) : null}
          <SignOutButton />
        </div>
      }
    >
      {children}
    </HiringFrame>
  );
}
