const puppeteer = require("puppeteer");

const searchGoogle=async (searchQuery) => {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();

        await page.goto("https://google.com");

        await page.type('input[name="q"]', searchQuery);
       // await page.screenshot({path: "public/cats.png"});

       //await page.$eval('input[name="btnK"]',button=> {button.click()});
       await page.keyboard.press('Enter');

       await page.waitForSelector('div[id=search]');

       const searchResults= await page.$$eval('div[id=rso]', results=> {
       	let data=[];

       	results.forEach(parent=>{
       		const ele= parent.querySelector("h2");

       		if(ele==null){
       			return;
       		}

       		let gCount= parent.querySelectorAll('div[class=g]');

       		if(gCount.length==0){

       			gCount= parent.querySelectorAll('div[class= srg] > div[classs=g]');
       		}

       		gCount.forEach(result=>{
       			const title= result.querySelector('div[class=rc] > div[class=r] > a > h3').innerText;

       			const url= result.querySelector('div[class=rc] > div[class=r] > a').href;

       			const description = result.querySelector('div[class=rc] > div[class=s] > div >span[class=st]').innerText;

       			data.push({title, url, description});
       		});
       	});

       	return data;
       });

        
       	
        await browser.close();

        return searchResults;

        
    }

    module.exports= searchGoogle;

   