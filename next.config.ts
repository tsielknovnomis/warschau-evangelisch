import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy WordPress URLs → new canonical paths (301)
      { source: "/gottesdiensttermine", destination: "/gottesdienste", permanent: true },
      { source: "/gottesdiensttermine/anfahrt", destination: "/anfahrt", permanent: true },
      // Anfahrt is now top-level
      { source: "/gottesdienste/anfahrt", destination: "/anfahrt", permanent: true },
      { source: "/uber-uns", destination: "/ueber-uns", permanent: true },
      { source: "/uber-uns/geschichte", destination: "/geschichte", permanent: true },
      { source: "/uber-uns/verein", destination: "/verein", permanent: true },
      {
        source: "/uber-uns/verein/satzung-des-vereins-deutschsprachige-evangelische-seelsorge-inwarschau",
        destination: "/satzung",
        permanent: true,
      },
      {
        source: "/satzung-des-vereins-deutschsprachige-evangelische-seelsorge-inwarschau",
        destination: "/satzung",
        permanent: true,
      },
      { source: "/beitrittserklaerung", destination: "/beitritt", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/naechster-gottesdienst", destination: "/gottesdienste", permanent: true },
      { source: "/beitraege", destination: "/gottesdienste", permanent: true },
      // Aktuelles overview merged into the Termine page
      { source: "/aktuelles", destination: "/gottesdienste", permanent: true },
      // Verein/Satzung/Beitritt/Geschichte were nested under /ueber-uns, now flat
      { source: "/ueber-uns/geschichte", destination: "/geschichte", permanent: true },
      { source: "/ueber-uns/verein", destination: "/verein", permanent: true },
      { source: "/ueber-uns/verein/beitritt", destination: "/beitritt", permanent: true },
      { source: "/ueber-uns/verein/satzung", destination: "/satzung", permanent: true },
    ];
  },
};

export default nextConfig;
