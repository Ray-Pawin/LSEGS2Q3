
const puppeteer = require('puppeteer');
const fs = require('fs/promises')




async function start() {
    var arg = process.argv.slice(2);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://codequiz.azurewebsites.net/");

    await Promise.all([
        page.click('input[type=button]'),
        page.waitForNavigation({waitUntil: 'networkidle2'})
    ]);

    switch (arg[0]) {
        case "B-INCOMESSF":
            selector =  1;
            break;
        case "BM70SSF":
            selector =  2;
            break;
        case "BEQSSF":
            selector =  3;
            break;
        case "B-FUTURESSF":
            selector =  4;
            break;
        default:
            selector = 0;
            console.log("Error Parameter")
    }
        if(selector != 0){
            const result = await page.$$eval('tr', rows => {
                return Array.from(rows, row => {
                    const columns = row.querySelectorAll('td');
                    return Array.from(columns, column => column.innerText);
                });
              });
            console.log(result[selector][2]);
        }

    await browser.close();
}

start();