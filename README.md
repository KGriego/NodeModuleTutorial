So because I couldn't find a good tutorial online, yada yada yada yada, onto the code.

Start by making a function, that can is like a class object. We'll call it Cookies because I can't think of anything else. We'll add a console so that we know we've called it. 

```
//index.ts

function Cookie() {
    console.log('initializing cookie');
}
```

This is good enough to export the function to use outside of this file, lol! At the very bottom of the file add:

```
//index.ts

module.exports = Cookie;
```

Now, we're going to make a `test.ts` to use our function in. We'll have to import it and then call the type function. There's two ways to go about this. If you wanted to do some setup first, this is the time to pass that to the library and handle it on your end within the `Cookie` function. We'll use `CookieLibrary` as in the import to know when we're using the library and when we're talking about the function itself. 

```
//test.ts

const CookieLibrary = require('./index');

const cookie = new CookieLibrary();
```

If you wanted to, you can run the file by using `node test.ts`. I'm going to be using `nodemon` cause I'm lazy. So: `nodemon test.js`. In the terminal you should now see 'initializing cookie'. Yay! 

Now to we're going to add a type to the cookie by adding prototype's to the function that way when it's exported, the user intending to use the library can call on those functions.

There's two ways to go about this. They do exactly the same thing, at this point it's for semantics.

```
//index.ts

Cookie.prototype = {
    addType: function (type: string) {
        this.type = type;
    },
};

Cookie.prototype.addType = function (type: string) { };
```

Take your pick. I like the first one so that's what I'll be using. Also typescript!

Now back in `test.js`, after intizalizing the cookie, we can then call the `addType` and set the type of cookie.

```
//test.ts
...;
chocolateCookie.addType('chcolate');
```

But now that it's been set, how do we grab it? Let's make a getType prototype.

```
//index.ts
...,
    getType: function() {
        return this.type;
    }
...
```

And back in `test.ts` we can then call the function `getType` to get the type of cookie.

```
//test.ts

....;
const typeOfCookie = chocolateCookie.getType();
console.log(typeOfCookie);
```

Now the constant `typeOfCookie` === 'chocolate'.

Alright, cool, but how to expand. Let bake some cookies. We're going to make a `oven.ts`.

Inside of `oven.ts`, we're going to make a function that bakes the cookies. This where you would call any sort of API's or do you logic behind the scenes so everything isn't so coupled and connected together.

We're going to call our function `baker` and it's going to take in the time, wait that amount and then return true as the cookie did bake.

```
//overn.ts

export const bake = (time: number) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('cookies are baked');
            res(true)
        }, time)
    })
}
```

Now we have to connect it to the `Cookie`. Back in `index.ts`, we'll import the `bake` function and connect it to a protoype that also accepts time.

```
//index.ts

...,
    bakeCookies: async function (time: number) {
        return await bake(time)
    }
```

We can now finally call the `bakeCookies` function in `test.ts` and bake some god damn cookies. 

```
//test.ts
...;
chocolateCookie.bakeCookies(5000);
```

Now, if we wanted to, we could verify if they're baked since it is an async/await function. Since we're on the high overview of the file, we'll be using `.then` inside the `test.ts`;

```
//test.ts

chocolateCookie.bakeCookies(2000).then((baked) => {
    console.log('Is the cookie baked?', baked)
});
```
This shoudl output: `Is the cookie baked? true`;

But how do we tell if they're baked when we call the function again so that we don't burn them!?!?!? We can set a flag in `Cookie` to know whether the cookie has been baked or not. 

```
//index.ts

...;
    this.baked = false;
```

and in the `bakeCookies` prototype, we can change that flag to true.

```
//index.ts

...,
    this.baked = await bake(time);
    return this.baked;
...
```

But what to do with that flag, we'll we can use it make sure we don't burn the cookies. Let's add some checking to make sure we don't get some burnt cookies from the `bakeCookies` function.

```
//index.ts

...{
        if (this.baked === true) {
            return console.log('STOOOOOOOP, are you trying to burn the cookies?!?')
        }
        this.baked = await bake(time);
...
```

Now let's try... I don't know what that was supposed to say, this is me from the future. Oh whale, I'm tired. I'll continue this later. 