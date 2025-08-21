import{expect,Page} from "@playwright/test";
import { DashBoardPage } from "../pages/DashBoardPage";
import { LoginPage } from "../pages/loginPage";
import { EventPage } from "../pages/eventPage";

export class manager{
    page:Page;
    private dashboard:any;
    private loginPage:any;
    private eventPage:any;
    constructor(page:Page){ // 
        this.page = page;
        this.dashboard = new DashBoardPage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.eventPage = new EventPage(this.page);
    }

    getDashboardPage(){
        return this.dashboard;
    }
    getLoginPage(){
        return this.loginPage;
    }
    getEventPage(){
        return this.eventPage;
    }


}
