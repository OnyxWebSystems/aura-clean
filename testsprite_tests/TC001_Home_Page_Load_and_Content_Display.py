import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000//", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # --> Assertions to verify final state
        frame = context.pages[-1]
        await expect(frame).to_have_url("/")  # Verify navigation to home page
        await expect(frame).to_have_load_state("load", timeout=2000)  # Verify page loads within 2 seconds
        await expect(frame.locator('text=Impeccable Spaces,\nEffortless Living').first).to_be_visible(timeout=30000)  # Hero section tagline
        await expect(frame.locator('text=Schedule Your Cleaning').first).to_be_visible(timeout=30000)  # Hero section CTA button
        await expect(frame.locator('text=From\n$149\nResidential Cleaning').first).to_be_visible(timeout=30000)  # Services overview - Residential Cleaning
        await expect(frame.locator('text=From\n$299\nOffice Cleaning').first).to_be_visible(timeout=30000)  # Services overview - Office Cleaning
        await expect(frame.locator('text=From\n$349\nDeep Cleaning').first).to_be_visible(timeout=30000)  # Services overview - Deep Cleaning
        await expect(frame.locator('text=From\n$449\nMove-In/Out Cleaning').first).to_be_visible(timeout=30000)  # Services overview - Move-In/Out Cleaning
        await expect(frame.locator('text=01\nBook Online').first).to_be_visible(timeout=30000)  # How It Works step 1
        await expect(frame.locator('text=02\nWe Confirm').first).to_be_visible(timeout=30000)  # How It Works step 2
        await expect(frame.locator('text=03\nEnjoy Your Space').first).to_be_visible(timeout=30000)  # How It Works step 3
        await expect(frame.locator('text=$2M Coverage').first).to_be_visible(timeout=30000)  # Trust indicator - Insurance coverage
        await expect(frame.locator('text=After trying numerous cleaning services over the years, Pristine & Co. has been a revelation. Their attention to detail is unmatched, and I love coming home to a spotless space every week.').first).to_be_visible(timeout=30000)  # Testimonial
        await expect(frame.locator('text=Join thousands of satisfied clients who\'ve discovered the Pristine difference. Book your first cleaning today and experience the transformation.').first).to_be_visible(timeout=30000)  # CTA section message
        await expect(frame.locator('text=Call 1-800-PRISTINE').first).to_be_visible(timeout=30000)  # CTA section phone number
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    