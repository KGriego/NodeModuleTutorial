import { bake } from './oven'

function Cookie() {
    console.log('initializing cookie');
    this.baked = false;
}

Cookie.prototype = {
    addType: function (type: string) {
        this.type = type;
    },
    getType: function () {
        return this.type;
    },
    bakeCookies: async function (time: number) {
        console.log(this.baked);
        if (this.baked === true) {
            return console.log('STOOOOOOOP, are you trying to burn the cookies?!?')
        }
        this.baked = await bake(time);;
        return this.baked;
    }
};

module.exports = Cookie;