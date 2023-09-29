import { defineConfig } from "vite";
import { fileURLToPath } from "url";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
        "tentang-kami": fileURLToPath(
          new URL("tentang-kami.html", import.meta.url)
        ),
      },
    },
  },
});
