import { readResume } from "@/lib/hiring/applications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const contentTypes: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const result = await readResume(id);
  if (!result.ok) {
    return new Response(
      result.status === 404 ? "Résumé not found." : "Résumé unavailable.",
      {
        status: result.status,
        headers: {
          "Cache-Control": "private, no-store",
          "X-Robots-Tag": "noindex, nofollow",
        },
      },
    );
  }

  const extension = result.fileName.split(".").pop()?.toLowerCase() || "";
  const contentType = contentTypes[extension] || "application/octet-stream";
  const inline = extension === "pdf";
  const filename = result.fileName.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "");

  return new Response(Buffer.from(result.bytes), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename || "resume"}"`,
      "Content-Length": String(result.bytes.byteLength),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
