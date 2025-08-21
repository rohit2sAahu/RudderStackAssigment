import {expect,Page} from "@playwright/test";
import { eventsLinks } from "../enums/eventsLinks";
import { sendIndentifyRequest } from "../utils/apiClient";

export class EventPage{
    page:Page
    private metricValueXpath:string;
    private refreshButtonXpath:string;
    private getWriteKeyXpath:string;
    private getDataPlaneXpath:string;
    constructor(page:Page){
        this.page = page;
        this.metricValueXpath="//h3[@data-testid='metric-value']//span";
        this.getWriteKeyXpath='//span[contains(text(), "Write key")]';
        this.refreshButtonXpath="//button[@class='ant-btn css-pdgk7u ant-btn-default ant-btn-lg sc-ivDtld jzfOZE']";
        this.getDataPlaneXpath='//span[@class="sc-jrkPvW ebfakN text-ellipsis"]';
    }

    async getDataPlane(): Promise<string> {
        await this.page.waitForLoadState('load');
        return this.page.locator(this.getDataPlaneXpath).innerText();
      }
    
      async getWriteKey(): Promise<string> {
        await this.page.waitForLoadState('load');
        const fullText = await this.page.locator(this.getWriteKeyXpath).first().innerText();
        return fullText.replace("Write key ", "");
      }
    
      async clickOnConnections(){
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(5000);
        await this.page.locator(`//span[@class='sc-ipMuEU fWjDDO text-ellipsis' and text()='${eventsLinks.javascript}']`).click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');

      }
      async clickOnTabsInsideConnections(){
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(5000);
        await this.page.locator(`//div[text()='${eventsLinks.EventsTab}']`).click();
        await this.page.waitForTimeout(10000);
      }

      async captureResponseAtSourceConnections(dataPlane:string,writeKey:string){
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(5000);
        const preExistingEvents = await this.page.locator(this.metricValueXpath).innerText(); // capturing the existing number of events before sending the API's request
        const response = await sendIndentifyRequest(dataPlane,writeKey);
        await this.page.locator(this.refreshButtonXpath).last().click(); // refresh the button 
        await this.page.waitForTimeout(120000); // wait for 2 mins to capture the post event into the UI sent through API's
        const postexistingEvents = await this.page.locator(this.metricValueXpath).innerText(); // capturing the existing number of events before sending the API's request
        console.log("post :",postexistingEvents);
        console.log("pre :",postexistingEvents);
        console.log("response : ",response);

      }

    


}