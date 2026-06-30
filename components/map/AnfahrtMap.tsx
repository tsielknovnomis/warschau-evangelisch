"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * OpenStreetMap (Leaflet) map with a marker at the church.
 * No Google. Uses a DivIcon to avoid Leaflet's bundled marker-asset issues.
 */
export function AnfahrtMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !ref.current || ref.current.dataset.ready) return;
      ref.current.dataset.ready = "1";

      const { lat, lng } = siteConfig.address.coords;
      map = L.map(ref.current, { scrollWheelZoom: false }).setView([lat, lng], 16);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<span style="display:block;width:18px;height:18px;border-radius:50% 50% 50% 0;background:#480048;transform:rotate(-45deg);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`,
        iconSize: [18, 18],
        iconAnchor: [9, 18],
      });
      L.marker([lat, lng], { icon })
        .addTo(map)
        .bindPopup(`${siteConfig.address.street}<br>${siteConfig.address.postalCode} ${siteConfig.address.city}`);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Karte: ${siteConfig.address.street}, ${siteConfig.address.city}`}
      className="h-80 w-full overflow-hidden rounded-lg border border-line"
    />
  );
}
