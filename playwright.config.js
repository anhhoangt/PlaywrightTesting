const { PlaywrightTestConfig, defineConfig } = require("@playwright/test");

const config = {
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
      use: { browswerName: "chromium" },
    },
    {
      name: "Firefox",
      use: { browswerName: "firefox" },
    },
    {
      name: "WebKit", // WebKit is the engine that powers Safari
      use: { browswerName: "webkit" },
    },
  ],
};

module.exports = config;
