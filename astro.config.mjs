import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://boksen-nederland.nl",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", concurrency: 4 },
});
