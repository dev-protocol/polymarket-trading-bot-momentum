import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "test",
    include: ["**/*.test.ts"],
    environment: "node",
    testTimeout: 30000,
  },
});
