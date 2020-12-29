const puppeteer = require('puppeteer');
let company = "";

const urlEncodingConvert = (company) => {
    const uri = `https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=1&relationship=F%2CS`;
    return encodeURI(uri);
}

//console.log(urlEncodingConvert(company));

const secondConnect = async (company) => {

    //Launch and setup
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/');

    await page.type('#session_key', '');
    await page.type('#session_password', '');

    await page.click('.sign-in-form__submit-button');

    // await page.waitForNavigation().then(() => {
    //     console.log("Wait for entering phone code")
    // }); // <------------------------- Wait for Navigation

    await page.waitForSelector('#ember20', 60000).then(() => {
        console.log("I'm in");
    });

    await page.goto(`https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=1&relationship=F%2CS`);

    await page.waitForSelector('#ember48', 60000).then(() => {
        console.log("Search Successful");
    });

    let allElements = await page.$$('.search-results__result-item');
    console.log(JSON.stringify(allElements.JSON()));
    //await page.goto(`https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=2&relationship=F%2CS`);

    // 
    //await browser.close();
};

secondConnect(company);

