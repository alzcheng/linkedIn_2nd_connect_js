let e = document.querySelectorAll('.search-results__result-item');
let links = [];
let peopleHeader = "http://www.linkedin.com/sales/people/";
//get a string with the link;
e.forEach(item => { links.push(item.getAttribute("data-scroll-into-view")) });

links = links.forEach(item => { item = peopleHeader.concat(item) });
console.log(links);

let extracts = document.querySelectorAll('.search-results__result-item');
let links = [];
let peopleHeader = "http://www.linkedin.com/sales/people/";
extracts.forEach(item => {
    links.push(peopleHeader.concat(item.getAttribute("data-scroll-into-view").slice(24, -1)))
})

//Get the pages
let pgCount = Math.ceil(parseInt(document.querySelector('#search-spotlight-tab-ALL').firstChild.innerText) / 25);
for (let i = 2; i < pgCount; i++) {
    await page.goto(`https://www.linkedin.com/sales/search/people?companyIncluded=${company}&companyTimeScope=CURRENT&doFetchHeroCard=false&logHistory=true&page=${i}&relationship=F%2CS`);
}

