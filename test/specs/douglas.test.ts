describe('Douglas Parfum Test Suite', () => {
    before(async () => { 
        await browser.url('https://www.douglas.de/de');
        await browser.pause(1000); 
    });

    it('Should handle cookie consent and navigate to Parfum', async () => { 
        const cookieConsentButton = await $('[data-testid="uc-accept-all-button"]'); 
        await browser.waitUntil(
            async () => await cookieConsentButton.isExisting(),
            { timeout: 20000, timeoutMsg: 'Cookie consent button not displayed after 20s' }
        ); 
        await cookieConsentButton.click(); 
        await browser.url('https://www.douglas.de/de/c/parfum/01');
        await browser.pause(1000); 
    });

    it('Should click criteria options in sequence and verify URL updates', async () => { 

        const baseUrl = 'https://www.douglas.de/de/c/parfum/01?q=:relevance';
        const criteria = [
            { label: 'Sale', urlFragment: ':flags:discountFlag' },
            { label: 'NEU', urlFragment: ':flags:computedNewFlag' },
            { label: 'Limitiert', urlFragment: ':flags:computedLimited' }
        ];

        let currentUrl = baseUrl;

        for (const criterion of criteria) {  
            currentUrl += criterion.urlFragment;
 
            await browser.url(currentUrl);
             
            await browser.waitUntil(
                async () => (await browser.getUrl()) === currentUrl,
                { timeout: 20000, timeoutMsg: `URL did not match expected: ${currentUrl}` }
            ); 
            
            await browser.pause(1000);  
        }
        await browser.pause(10000);
    });
    
});
