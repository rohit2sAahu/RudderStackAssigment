import {expect,Page} from "@playwright/test";

export class DashBoardPage{
    page:Page
    constructor(page:Page){
        this.page = page;
    }

    async mouseClickActionOnCenter(){
      const screenSize = this.page.viewportSize();
      if(screenSize){
          const centerX = screenSize.width/2;
          const centerY = screenSize.height/2;
          await this.page.mouse.click(centerX,centerY);
      }
    }
    

}