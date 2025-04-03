const {test, chromium} = require('@playwright/test');
test("Book a flight", async ()=>{

    const browser = await chromium.launch({headless: false})
    const bContext = await browser.newContext()
    const page = await bContext.newPage()
    await page.goto("https://www.makemytrip.com")
    await page.locator("span.commonModal__close").click()
    await page.locator("#fromCity").click()
    await page.getByPlaceholder("From").fill("Mum")
    await page.locator("//li[@data-suggestion-index='0']").click()
    await page.locator("#toCity").click()
    await page.getByPlaceholder("To").fill("Lon")
    await page.waitForTimeout(3000)
    await page.locator("//li[@data-suggestion-index='0']").click()

   let date = "Jun 20 2025"
   let dateSelected =false

   while(!dateSelected){

    const currentDates = await page.$$("//div[@aria-disabled='false']")
    for(let d of currentDates){
        const cd = await d.getAttribute("aria-label")
        //console.log(cd)
        if(cd.includes(date)){
            await d.click()
            dateSelected = true
            break;
        }
    }

    if(!dateSelected){
        await page.locator("//span[@aria-label='Next Month']").click()
    }

   }
   
    let adults = "2"
    let childrens = "1"
    let infants = "1"
    let travelClass = "First Class"
    await page.waitForTimeout(3000)
    await page.locator("//label[@for = 'travellers']").click()
    await page.waitForTimeout(3000)
    const adultsRange = await page.$$("//p[@data-cy = 'adultRange']/following-sibling::ul/li")
    for(let a of adultsRange){
        const num = await a.textContent()
        if(num.includes(adults)){
            await a.click()
            break;
        }
    }
    await page.waitForTimeout(2000)
    const childrensRange = await page.$$("//p[@data-cy = 'childrenRange']/following-sibling::ul/li")
    for(let c of childrensRange){
        const num = await c.textContent()
        if(num.includes(childrens)){
            await c.click()
            break;
        }
    }
    const infantsRange = await page.$$("//p[@data-cy = 'infantRange']/following-sibling::ul/li")
    for(let i of infantsRange){
        const num = await i.textContent()
        if(num.includes(infants)){
            await i.click()
            break;
        }
    }

    const travelClasses = await page.$$("//p[@data-cy = 'chooseTravelClass']/following-sibling::ul/li")
    for(let tc of travelClasses){
        const className = await tc.textContent()
        if(className.includes(travelClass)){
            await tc.click()
            break;
        }
    }

    await page.locator("//button[text() = 'APPLY']").click()
    await page.waitForTimeout(3000)

    
    await page.waitForSelector("//a[text() = 'Search']", { state: 'visible' });
    await page.locator("//a[text() = 'Search']").click();
    await page.waitForLoadState('domcontentloaded'); 
   

    //await page.waitForTimeout(3000)
})