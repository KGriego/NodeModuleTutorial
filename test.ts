const CookieLibrary = require('./index');

const chocolateCookie = new CookieLibrary();

chocolateCookie.addType('chcolate');

const typeOfCookie = chocolateCookie.getType();
console.log(typeOfCookie);

chocolateCookie.bakeCookies(2000).then((baked) => {
    console.log('Is the cookie baked?', baked)
    if (baked) {
        chocolateCookie.bakeCookies(3000)
    }
});
