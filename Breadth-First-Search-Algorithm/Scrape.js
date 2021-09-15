// const fetch = require("node-fetch");
// const cheerio = require("cheerio");
// const fs = require("fs");
// // function to get the raw data
// const getRawData = (URL) => {
//     return fetch(URL)
//         .then((response) => response.text())
//         .then((data) => {
//             return data;
//         });
// };
// // URL for data
// const URL = "https://www.instagram.com/yun.chung/?__a=1";
// // start of the program
// const scrapeData = async () => {
//     const rawData = await getRawData(URL);
//     // parsing the data
//     const parsedData = cheerio.load(rawData);
//     console.log("Data: ", parsedData);
//     // write code to extract the data
//     // here
//     // ...
//     // ...
// };
// // invoking the main function
// scrapeData();

// var xhr = new XMLHttpRequest();

// // xhr.open("GET", "https://cors-anywhere.herokuapp.com/www.instagram.com/yun.chung/?__a=1", true);
// xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://www.instagram.com/yun.chung/?__a=1", true);
// xhr.responseType = "document";

// xhr.onload = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         var response = xhr.responseXML.querySelector("body > pre");
//         console.log("response: ", response);
//     }
// };

// xhr.onerror = function () {
//     console.log("Error: ", xhr.status, xhr.statusText);
// }

// xhr.send();



// const puppeteer = require("puppeteer");
// // const url = "https://www.instagram.com/yun.chung/?__a=1";
// const url = "https://kream.co.kr/products/24703";

// async function scrape(url) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);

//     // const [el] = await page.$x("#__layout > div > div.container.detail.lg > div.content > div > div > div: nth - child(2) > div > div.column_top > div.detail_main_title.lg.has_btn > div > h2");

//     const [el] = await page.evaluate(() => {
//         document.querySelector('input[name="q"]').value = 'JavaScript';
//     });

//     // const [el] = await page.document.querySelector("#__layout > div > div.container.detail.lg > div.content > div > div > div:nth-child(2) > div > div.column_top > div.detail_main_title.lg.has_btn > div > h2")
//     const txt = await el.getProperty('textContent');
//     const txtText = await txt.jsonValue();

//     console.log(el);
// }

// scrape(url);


// const scrape = () => {


//     fetch('http://localhost:8080/blogs/')
//         .then(res => {
//             if (!res.ok) {
//                 throw Error('There was an error, and data could not be fetched...');
//             }
//             return res.json();
//         })
//         .then(data => {
//             console.log("Does this work? Here's the data: ", data);
//         })
//         .catch(err => {
//             if (err.name === 'AbortError') {
//                 console.log("This fetch request has been aborted by abortController...");
//             } else {
//                 console.log("working I guess...");
//             }
//         })
// }


async function scrape() {
    console.log("in scrape function...");
    let data;

    // Note the await keyword
    await fetch('http://localhost:8080/stuff')
        .then((response) => response.text())
        .then((result) => {
            data = JSON.parse(result);
        })
        .catch((error) => console.log("error", error));

    console.log(data);
}

console.log("hi you");
scrape();