/* eslint-disable no-empty-pattern */
import { test as base } from "@playwright/test";
import { PLAYWRIGHT_APPLICATION } from "./constants";
import { VoiceOver, macOSActivate } from "@guidepup/guidepup";

const test = base.extend<{ vo: VoiceOver; macOSActivate }>({
  vo: async ({}, use) => {
    const vo = new VoiceOver();

    try {
      await vo.start();

      try {
        await macOSActivate(PLAYWRIGHT_APPLICATION);
      } catch (e) {
        console.log("playwright activate failed");

        throw e;
      }

      await use(vo);
    } finally {
      vo.stopLog();
      await vo.stop();
    }
  },
  macOSActivate: async ({}, use) => {
    await use(macOSActivate);
  },
});

export default test;
