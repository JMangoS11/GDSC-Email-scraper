import { test, expect, Page } from '@playwright/test';




test('scrape single', async ({page}) => {
  const org_name = process.env.ORG_NAME || 'THROW ERROR';

  const base = 'https://greatnonprofits.org';
  var data = '';

  test.setTimeout(120000);

  await page.goto(base);
  await page.getByPlaceholder('Search by Nonprofit Name, City or State').click();
  await page.getByPlaceholder('Search by Nonprofit Name, City or State').fill(org_name);
  await page.getByPlaceholder('Search by Nonprofit Name, City or State').press('Enter');
  
  await page.waitForLoadState('networkidle');
  const org = page.locator('.sc-fantwC .sc-irPVuy');


  var link = await org.nth(0).locator('a').first().getAttribute('href');
  const name = page.locator('.sc-fantwC .sc-hGNhLO');

  

  data = 'Organization Name: ' + await name.nth(0).innerText() + ' : ';
  link = await org.nth(0).locator('a').first().getAttribute('href');
  if(link) {
    data += await run_scrape(page, base+link);
  }

  console.log(data);


  



});






test('scrape city', async ({page}) => {
  const city = process.env.CITY || 'New York';
  var range = process.env.RANGE || '1';
  const base = 'https://greatnonprofits.org';
  var data = '';

  test.setTimeout(120000);

  await page.goto(base);
  await page.getByPlaceholder('Search by Nonprofit Name, City or State').click();
  await page.getByPlaceholder('Search by Nonprofit Name, City or State').fill(city);
  await page.getByPlaceholder('Search by Nonprofit Name, City or State').press('Enter');
  
  await page.waitForLoadState('networkidle');
  const org = page.locator('.sc-fantwC .sc-irPVuy');

  


  var max = await org.count();
  //console.log("---------------"+max);

  if(parseInt(range) > max) range = ''+max;

  var link = await org.nth(0).locator('a').first().getAttribute('href');
  const name = page.locator('.sc-fantwC .sc-hGNhLO');


  const city_page = page.url();

  for(var i = 0; i < parseInt(range); i++) {
    await page.goto(city_page);
    await page.waitForLoadState('networkidle');

    data = 'Organization Name: ' + await name.nth(i).innerText() + ' : ';
    link = await org.nth(i).locator('a').first().getAttribute('href');
    if(link) {
      data += await run_scrape(page, base+link);
    }

    console.log(data);
    console.log('\n ----------------------------\n')

  }



});



test('TEST', async ({page}) => {

  console.log("uy");

});



async function run_scrape(page: Page, link: string) {
  
  var data = ' ';

  //console.log(link);
  await page.goto(link);
  await page.waitForLoadState('networkidle');
  
  const master_div = page.locator('.sc-jrVwZP');
  // Get the count of direct child elements
  const childCount = await master_div.locator('>*').count();
  //console.log('Total child elements:', childCount);
  
  var child = master_div;
  for(var i = 0; i < childCount; i++) {
    child = master_div.locator('>*').nth(i);
    
    const c = await child.locator('>*').count();
    
    if(c == 0) {
      data += await child.innerText() + ' ';

    } else {
     
      for(var j = 0; j < c; j++) {
        const nestedChild = child.locator('>*').nth(j);
        data += await nestedChild.innerText() + ' ';
      }
      
    }
  }

  return data;

}