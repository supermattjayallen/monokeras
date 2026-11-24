import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hiring",
  description: "Private hiring workspace.",
  robots: {
    index: false,
    follow: false,
  },
  referrer: "no-referrer",
};

export default function HiringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
