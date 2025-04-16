const {test, expect} = require('@playwright/test');
const {LandingPage} = require('../pages/landingPage')

test("Book a flight", async ({page})=>{

    const landingPage = new LandingPage(page, "2", "1", "1", "First Class")
   // await landingPage.goto()
    await landingPage.navigateTo("https://www.makemytrip.com")
    await landingPage.popupClose()
    await landingPage.location()
    await landingPage.datePicker("Jun 20 2025", false)
    await landingPage.travellerSelection()
    await landingPage.searchFlight()
    const url = await page.url()
    expect (url.includes("flight/search")).toBeTruthy()
    await page.close()
})
