
import { Builder, Capabilities, By } from "selenium-webdriver"


require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()





beforeEach(async () => {
    driver.get('http://localhost:4000/')
    await driver.sleep(4000);
})

afterAll(async () => {
    driver.quit()
})


describe("Assessment buttons: ", () => {
    test("Draw Button displays div", async () => {
        const addToDuoButton = await driver.findElement(By.id('draw'));
        await addToDuoButton.click();
        const drawButton = await driver.findElement(By.id('choices'));
        const displayed = await drawButton.isDisplayed();
        expect(displayed).toBe(true);
        await driver.sleep(4000);
    });
    
    test("Add to Duo button displays player-duo div", async () => {
        const addToDuoButton = await driver.findElement(By.className('bot-btn'));
        await addToDuoButton.click();
        const playerDuoDiv = await driver.findElement(By.id('player-duo'));
        const displayed = await playerDuoDiv.isDisplayed();
        expect(displayed).toBe(true);
        await driver.sleep(4000);
    });

    test("Removed from Duo button returns to choices", async () => {
        const removeFromDuoButton = await driver.findElement(By.className('bot-btn'));
        await removeFromDuoButton.click();
        const choicesDiv = await driver.findElement(By.id('choices'));
        const displayed = await choicesDiv.isDisplayed();
        expect(displayed).toBe(true);
        await driver.sleep(4000);
    });
});