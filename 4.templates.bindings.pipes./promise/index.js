

// promise
//     .then(result => console.log(result));
//     .catch()...
// console.log('YOHOOO!');

async function wait() {
    const promise = new Promise((resolve, reject) => {
        const hasError = false;

        setTimeout(() => {
            if (hasError) {
                reject('500 Internal Server Error');
            } else {
                resolve('Success!');
            }
        }, 1000);
    });

    try {
        console.log(await promise);
        console.log('YOHOOO');
    } catch (e) {
        console.log(e);
    }
}

wait();