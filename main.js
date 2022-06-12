const fs = require('fs');

const puppeteer = require('puppeteer');
const path = require('path');

// current path of the vids folder
const upload_file_directory = path.join(__dirname, 'vids/');

// utility 

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const yt_cookies = require('./yt_cookies.json');

const title_prefix = "BANKER IS GAY HOLY !!"
const description = "#Shorts"

const studio_url = 'https://studio.youtube.com/';


let files = [];
fs.readdir(upload_file_directory, function (err, temp_files) {
    if (err) {
        console.log('Something went wrong...');
        return console.error(err);
    }
    for (let i = 0; i < temp_files.length; i++) {
        files.push(temp_files[i]);
    }
});

try {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--window-size=1280,720]', '--enable-audio-service-sandbox'],
    });
    const page = await browser.newPage();
    await page.setCookie(...yt_cookies);
    await page.goto(studio_url, {'timeout': 10000});
    await page.setViewport({'width': 1280, 'height': 720});

    for (let i = 0; i < files.length; i++) {
      const file_name = files[i];
      console.log('processing file: ' + file_name);

      // click create icon
      await page.click('#create-icon');


      // click upload video
      await page.click('#text-item-0 > ytcp-ve')
      await sleep(5000);
      // click select files and upload file
      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click('#select-files-button > div'), // some button that triggers file selection
      ]);
      await fileChooser.accept([upload_file_directory + file_name]);
      await sleep(5000);

      // title content
      const text_box = await page.$x("//*[@id=\"textbox\"]");
      // Title
      await text_box[0].type(title_prefix);

      await sleep(1000);
      // description content
      await text_box[1].type(description);
      await sleep(1000);

      // click not for KIDS
      await page.evaluate(() => {
        document.querySelectorAll("#radioContainer")[1].click()
      })
      // wait 2 sec
      await sleep(60 * 20);
      // click next
      await page.click('#dialog > div > ytcp-animatable.button-area.metadata-fade-in-section.style-scope.ytcp-uploads-dialog > div > div.right-button-area.style-scope.ytcp-uploads-dialog');
      // wait 2 sec
      await sleep(60 * 20);
      // click next
      await page.click('#dialog > div > ytcp-animatable.button-area.metadata-fade-in-section.style-scope.ytcp-uploads-dialog > div > div.right-button-area.style-scope.ytcp-uploads-dialog');
      // wait 2 sec
      await sleep(60 * 20);
      // click next
      await page.click('#dialog > div > ytcp-animatable.button-area.metadata-fade-in-section.style-scope.ytcp-uploads-dialog > div > div.right-button-area.style-scope.ytcp-uploads-dialog');
      // click publish
      await page.evaluate(() => {
        document.querySelectorAll('tp-yt-paper-radio-button')[3].click()
        document.querySelector("#done-button").click()
      })
      
      // wait 10sec
      await sleep(60 * 100);
    }
    await browser.close();
  })()
}
catch (err) {
  console.log(err);
}
