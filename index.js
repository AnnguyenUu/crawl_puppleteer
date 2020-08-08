
const puppeteer = require('puppeteer');
const download = require('image-downloader');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 });
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://www.pinterest.com/angelaandrewsus/ryan-gosling/');

    const imgLinks = await page.evaluate(() => {
        let imgElements = document.querySelectorAll('#main > ul.wookmark-initialised > li.thumbwook > a > img');
        imgElements = [...imgElements];
        let imgLinks = imgElements.map(i => i.getAttribute('src'));
        return imgLinks;
    });
    console.log(imgLinks);

    // Tải các ảnh này về thư mục hiện tại
    await Promise.all(imgLinks.map(imgUrl => download.image({
        url: imgUrl,
        dest: __dirname + '/RyanGosling'
    })));

    await browser.close();
})();