import { test } from "@playwright/test";
import dotenv from "dotenv";
import {manager} from "../utils/actionManager"

dotenv.config();

test("Rudderstack Automation Workflow", async ({ page }) => {
  const manage = new manager(page);
  const login = manage.getLoginPage();
  const dashboard = manage.getDashboardPage();
  const events = manage.getEventPage();


  // Step 1: Login
  await login.goToDashboardPage();

  // Step 2: Capture data-plane & writeKey
  const dataPlane = await events.getDataPlane();
  const writeKey = await events.getWriteKey();
    await events.clickOnConnections();
    await events.clickOnTabsInsideConnections();
    await events.captureResponseAtSourceConnections(dataPlane,writeKey);
});
