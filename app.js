const puppeteer = require('puppeteer');
//test company: Stanley Black & Decker
let company = "Stanley%2520Black%2520%2526%2520Decker";

const secondConnect = async (company) => {

    //Launch and setup
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.linkedin.com/');

    //Add your LinkedIn user email
    await page.type('#session_key', '');

    //Add your LinkedIn user password
    await page.type('#session_password', '');

    await page.click('.sign-in-form__submit-button');

    //LinkedIn will ask for text code due to 2 way authentication.  You will 
    //need to insert that onto the page.  Once you've done that and clicked enter, 
    //This will wait for the #ember20 button to appear on the page to verify that you
    //have logged into LinkedIn. 
    await page.waitForSelector('#ember20', { timeout: 60000 }).then(() => {
        console.log("I'm in");
    });

    //Now that you have logged into LinkedIn, go to Sales Navigator on LinkedIn
    await page.goto(`https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=1&relationship=F%2CS`);

    //Wait until the search page is loaded 
    await page.waitForSelector('.search-results__result-item', { timeout: 60000 }).then(() => {
        console.log("Search Successful");
    });

    //Create an array of links to the Sales Navigator pages of the secondary connections
    let links = await page.$$eval('.search-results__result-item', results => {
        let arr = [];
        let peopleHeader = "http://www.linkedin.com/sales/people/";
        results.forEach(item => {
            arr.push(peopleHeader.concat(item.getAttribute("data-scroll-into-view").slice(24, -1)))
        });
        return arr;
    });

    //added 1 for index, knows that Sales Navigator is set for 25 contacts per page
    //Pages is dividing the number of returned contacts by 25 and round up
    const pgCount = await page.$eval('#search-spotlight-tab-ALL', resultsNum => {
        return 1 + Math.ceil(parseInt(resultsNum.firstChild.innerText) / 25)
    });

    //Going through the rest of the pages to scrape for information
    for (let i = 2; i < pgCount; i++) {
        //go to the next page
        await page.goto(`https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=${i}&relationship=F%2CS`);

        //Wait until the search page is loaded 
        await page.waitForSelector('.search-results__result-item', { timeout: 60000 }).then(() => {
            console.log("Next Page Successful");
        });

        let placeholder = await page.$$eval('.search-results__result-item', results => {
            let arr = [];
            let peopleHeader = "http://www.linkedin.com/sales/people/";
            results.forEach(item => {
                arr.push(peopleHeader.concat(item.getAttribute("data-scroll-into-view").slice(24, -1)))
            });
            return arr;
        });
        placeholder.forEach(item => links.push(item));
    }

    //If you want to see the links, uncomment below
    //console.log(links)
    //await browser.close();
};

secondConnect(company);