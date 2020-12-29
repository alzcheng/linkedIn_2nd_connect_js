const puppeteer = require('puppeteer');
let company = ""

const secondConnect = async (company) => {

    //Launch and setup
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/');

    await page.type('#session_key', '');
    await page.type('#session_password', '');

    await page.click('.sign-in-form__submit-button');

    await page.waitForNavigation().then(() => {
        console.log("Wait for entering phone code")
    }); // <------------------------- Wait for Navigation
    await page.waitForSelector('#ember20').then(() => {
        console.log("I'm in");
    });

    await page.type('.search-global-typeahead__input', company);
    await page.goto(
        `https://www.linkedin.com/search/results/people/?facetNetwork=%5B%22F%22%2C%22S%22%5D&keywords=${company}&origin=FACETED_SEARCH`)

    // 
    //await browser.close();
};

secondConnect(company);

