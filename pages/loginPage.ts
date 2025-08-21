import {test,expect,Page} from "@playwright/test";
import { DashBoardPage } from "./DashBoardPage";


export class LoginPage{
    page:Page;
    private emailInputXpath : string;
    private passwordInputXpath:string;
    private submitButtonXpath:string;
    private skipLaterXpath :string;
    private goToDashBoardXpath:string;


    constructor(page:Page){
        this.page=page;
        this.emailInputXpath='//input[@data-testid="Email"]';
        this.passwordInputXpath = '//input[@data-testid="Password"]';
        this.submitButtonXpath = "//span[text()='Log in']//ancestor::button";
        this.skipLaterXpath = `//a[text()="I'll do this later"]`;
        this.goToDashBoardXpath = "//span[text()='Go to dashboard']//ancestor::button";

    }

    async goto() {
        await this.page.goto(process.env.BASE_URL!);
      }
    
    async login(email: string, password: string) :Promise<boolean>{
        const clickAction = new DashBoardPage(this.page);
        await this.page.locator(this.emailInputXpath).fill(email);
        await this.page.locator(this.passwordInputXpath).fill(password);
        await this.page.locator(this.submitButtonXpath).click();
        await this.page.waitForTimeout(7000);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('load');
        
        const isVisible = await this.page.locator(this.skipLaterXpath).isVisible();
        if(isVisible){
            await this.page.locator(this.skipLaterXpath).click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForLoadState('load');
        }
        await this.page.waitForTimeout(7000);

        const isdashboardVisibile = await this.page.locator(this.goToDashBoardXpath).isVisible();
        console.log("isDashBoardVisible : ",isdashboardVisibile);
        if(isdashboardVisibile){
            await this.page.locator(this.goToDashBoardXpath).click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForLoadState('load');

        }
        await this.page.waitForTimeout(3000);
        await clickAction.mouseClickActionOnCenter();
        await this.page.waitForTimeout(3000);
        return true;

    }
    async goToDashboardPage(){
        await this.goto();
        await this.page.waitForLoadState('load');
        const isLoginPage = expect(this.page.url().endsWith('/login'))
        console.log("is login page : ", isLoginPage);
        if(isLoginPage){
            await this.login(process.env.EMAIL!,process.env.PASSWORD!);
        }
        
        
    }

}