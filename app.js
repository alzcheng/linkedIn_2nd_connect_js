const puppeteer = require('puppeteer');
//test company: Stanley Black and Decker
let company = "Stanley%2520Black%2520%2526%2520Decker";

const secondConnect = async (company) => {

    //Launch and setup
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.linkedin.com/');

    await page.type('#session_key', '');
    await page.type('#session_password', '');

    await page.click('.sign-in-form__submit-button');

    //Wait for it to ask for text code due to 2 way authentication
    await page.waitForSelector('#ember20', { timeout: 60000 }).then(() => {
        console.log("I'm in");
    });

    //Now that there is the authentication, go to Sales Navigator on LinkedIn
    await page.goto(`https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=1&relationship=F%2CS`);

    //Wait until the search page is loaded 
    await page.waitForSelector('.search-results__result-item', { timeout: 60000 }).then(() => {
        console.log("Search Successful");
    });

    //Create an array of links of the secondary connections
    let links = await page.$$eval('.search-results__result-item', results => {
        let arr = [];
        let peopleHeader = "http://www.linkedin.com/sales/people/";
        results.forEach(item => {
            arr.push(peopleHeader.concat(item.getAttribute("data-scroll-into-view").slice(24, -1)))
        });
        return arr;
    });
    console.log(links);//test - works! 

    //Code below does not work----------------------------------------------------------------

    // let peopleHeader = "http://www.linkedin.com/sales/people/";
    // let extracts = await page.$$('.search-results__result-item');
    // //let pgCount = Math.ceil(parseInt(document.querySelector('#search-spotlight-tab-ALL').firstChild.innerText) / 25);

    // extracts.forEach(item => {
    //     links.push(peopleHeader.concat(item.getAttribute("data-scroll-into-view").slice(24, -1)))
    // });
    // console.log(links);

    // for (let i = 2; i < pgCount; i++) {

    //     await page.goto(`https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=${i}&relationship=F%2CS`);

    //     //let peopleHeader = "http://www.linkedin.com/sales/people/";
    //     await page.waitForNavigation().then(() => {

    //         extracts.forEach(item => {
    //             links.push(peopleHeader.concat(item.getAttribute("data-scroll-into-view").slice(24, -1)))
    //         });
    //     });

    // }
    //await browser.close();
};

secondConnect(company);

