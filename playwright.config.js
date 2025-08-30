const { PlaywrightTestConfig, defineConfig } = require("@playwright/test");

const config = {
  testDir: "./",
  testMatch: ["**/*.spec.js", "**/*.spec.ts"],
  retries: 0,
  timeout: 30000,
  reporter: [["list"], ["./reporter.js"]],
  use: {
    baseURL: "https://automationexercise.com",
    headless: false,
    viewport: { width: 1280, height: 720 },
    video: "on", //on-first-retry, retain-on-failure
    screenshot: "only-on-failure",
    //show error message in the console
    trace: "on",
  },
  projects: [
    {
      name: "Chrome",
      use: { browserName: "chromium" },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "WebKit", // WebKit is the engine that powers Safari
      use: { browserName: "webkit" },
    },
  ],
};

module.exports = config;
