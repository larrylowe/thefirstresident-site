/**
 * /archive
 *
 * Protected Briar Glen Archive experience.
 *
 * Server component reads the signed HttpOnly cookie to determine access state.
 * Client sub-components handle the intro → timeline reveal flow.
 */

import { cookies } from "next/headers";
import type { Metadata } from "next";
import { verifyArchiveToken, ARCHIVE_COOKIE_NAME } from "@/lib/archiveAccess";
import { ArchiveGate } from "@/components/ArchiveGate";
import { ArchiveAccess } from "@/components/ArchiveDoor";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Briar Glen Archive | The First Resident",
  description:
    "Enter the protected Briar Glen Archive and explore records connected to The First Resident of Briar Glen.",
};

// Always run on the server — never cache this page
export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ARCHIVE_COOKIE_NAME)?.value;
  const hasAccess = verifyArchiveToken(token);

  return (
    <main>
      <Navbar />
      {hasAccess ? <ArchiveAccess /> : <ArchiveGate />}
    </main>
  );
}
