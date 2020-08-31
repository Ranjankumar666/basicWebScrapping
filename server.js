const express = require("express");
const bodyParser = require("body-parser");

const searchGoogle= require("./searchGoogle")

const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/search",(req, res)=>{
	const searchQuery= req.query.searchquery;

	if(searchQuery != null){


		searchGoogle(searchQuery)
			.then(results=>{
				res.status(200);
				res.json(results);
			});

	}else{
		res.end();
	}

})

app.route("/").get((req, res) => {

    res.send("hello");
});

/*.post((req, res) => {
    const { url, site } = req.body;

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url);
        await page.screenshot({ path: `${site}.png` });
       const dimensions= await page.evaluate(() => {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                deviceScaleFactor: window.devicePixelRatio
            };


        });
       	await console.log(dimensions);
        await browser.close();
        await res.download(`${site}.png`);
    })();


});*/

app.listen(3000, () => {
    console.log("started at 3000");
})