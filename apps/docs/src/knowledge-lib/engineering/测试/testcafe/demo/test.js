fixture('Pizza Palace').page('https://testcafe-demo-page.glitch.me/');

test('Submit a form', async (t) => {
    await t
        // automatically dismiss dialog boxes
        .setNativeDialogHandler(() => true)

        // drag the pizza size slider
        .drag('.noUi-handle', 100, 0)

        // select the toppings
        .click('.next-step')
        .click('label[for="pepperoni"]')
        .click('#step2 .next-step')

        // fill the address form
        .click('.confirm-address')
        .typeText('#phone-input', '+1-541-754-3001')
        .click('#step3 .next-step')

        // zoom into the iframe map
        .switchToIframe('.restaurant-location iframe')
        .click('button[title="Zoom in"]')

        // submit the order
        .switchToMainWindow()
        .click('.complete-order');
});
