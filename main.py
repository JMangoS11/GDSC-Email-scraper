from playwright.sync_api import sync_playwright
import subprocess
import os




def run_scrape_city(city='New York', range=1): #default is ny and 1 org
    env = os.environ.copy()
    env['CITY'] = city
    env['RANGE'] = str(range)
    
    result = subprocess.run(
        ['npx', 'playwright', 'test', 'example.spec.ts', '--project=chromium', '--grep', 'scrape city'],
        capture_output= True,
        text=True,
        env=env
        )
    # print("---------------")
    # print("STDOUT:")
    print(result.stdout)
    # if result.stderr:
    #     print("STDERR:")
    #     print(result.stderr)

    return 0


def run_scrape_single(org_name='THROW ERROR'): 
    env = os.environ.copy()
    env['ORG_NAME'] = org_name
    
    result = subprocess.run(
        ['npx', 'playwright', 'test', 'example.spec.ts', '--project=chromium', '--grep', 'scrape single'],
        capture_output= True,
        text=True,
        env=env
        )
    # print("---------------")
    # print("STDOUT:")
    print(result.stdout)
    # if result.stderr:
    #     print("STDERR:")
    #     print(result.stderr)

    return 0



if __name__ == "__main__":
    city = 'San Jose' #change city here
    run_scrape_city(city,1)
    run_scrape_single("New York City Rescue Mission")
