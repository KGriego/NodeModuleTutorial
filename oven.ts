export const bake = (time: number) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('cookies are baked');
            res(true)
        }, time)
    })
}