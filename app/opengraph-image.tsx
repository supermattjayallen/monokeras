import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.brand} — ${site.hero.headline}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F3F5F7",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#0C1222",
            fontSize: 34,
            fontWeight: 650,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#0C1222",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F3F5F7",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            M
          </div>
          Monokeras
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              color: "#0C1222",
              fontSize: 64,
              fontWeight: 650,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              maxWidth: 980,
            }}
          >
            {site.hero.headline}
          </div>
          <div
            style={{
              color: "#5C6578",
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 860,
            }}
          >
            IT consulting for web, cloud, security, AI, and legacy modernization.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#5C6578",
            fontSize: 22,
          }}
        >
          <span>{site.location}</span>
          <span>{site.legalName}</span>
        </div>
      </div>
    ),
    size,
  );
}
