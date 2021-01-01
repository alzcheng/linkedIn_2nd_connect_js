//This test script is used to understand Puppeteer and not having to 
//Log into LinkedIn all the time

const puppeteer = require('puppeteer');
//test company: Stanley Black and Decker
let company = "Stanley Black and Decker";

const searchGoogle = async (company) => {

    //Launch and setup
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();


    await page.goto('https://www.google.com/');

    await page.type('[name="q"]', company, { delay: 20 })

    await page.click('[name="btnK"]');

    await page.waitForSelector('.rc', { timeout: 60000 });

    let testLinks = await page.$$eval('.rc', input => {
        let links = [];
        input.forEach(item => links.push(item.getAttribute('data-ved')));
        return links;
    });

    await page.click('#pnnext');
    await page.waitForSelector('#pnnext', { timeout: 60000 });

    for (let i = 1; i < 10; i++) {
        let holder = await page.$$eval('.rc', input => {
            let links = [];
            input.forEach(item => links.push(item.getAttribute('data-ved')));
            return links;
        });
        holder.forEach(item => testLinks.push(item));

        await page.click('#pnnext');
        await page.waitForSelector('#pnnext', { timeout: 60000 });
    }

    console.log(testLinks);

    //await browser.close();
};

searchGoogle(company);

