const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const page = await browser.newPage();
  await page.setViewport({ width: 1856, height: 1392 });
  await page.goto('https://www.grouponcareers.com/en-us/');
  await page.click('div.item.select.category-select');
  await page.type('input.select2-search__field', 'Technology & Product');
  await page.keyboard.press('Enter');
  //await page.screenshot({path: 'frontpage.png'});
  await page.click('input#btnSearch');

  let moreResults = true;
  const jobs = [];
  let max = 20;

  const fs = require('fs');

  while(moreResults){

    await page.waitFor(800);
    await page.waitForSelector('td.JobTitle-cell');
    //await page.screenshot({path: 'careers'.concat( max ,'.png')});

    const newJobs = await page.evaluate(() => {
      const trs = Array.from(document.querySelectorAll('table tbody tr'));

      return trs.map(tr => {
        const dataNodeList = tr.querySelectorAll('td');
        const dataArray = Array.from(dataNodeList);
        const jobId = dataArray[0].innerHTML.split("/")[3]
        const [ title, location, dept ] = dataArray.map(td => td.textContent);

        return { jobId, title, location, dept  };
      })
    });

    jobs.push(...newJobs);

    try {
      await page.click('a[title=Next]:not(.k-state-disabled)');
      max = max - 1;
      if (max <= 0 ) { moreResults = false };
    } catch(error) {
      //console.log(error);
      moreResults = false;
    }
  }
  //process.stdout.write(data);
  //console.log(jobs);
  fs.writeFile(
    './output.json',
    JSON.stringify(jobs,null,2),
    (err) => err ? console.log("not written") : console.log("written ok")
  )
  await browser.close();
})();
