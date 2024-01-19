const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("P1 got resolve")
        resolve("P1 Promise")
    }, 5000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("P2 got resolve")
        resolve("P2 Promise")
    }, 5000)
})

async function handleClick() {
    try {
        console.log("First Log");

        await p1;
        console.log("Second Log");

        await p2;
        console.log("Third Log");
    } catch (error) {
        console.error(error)
    }
}