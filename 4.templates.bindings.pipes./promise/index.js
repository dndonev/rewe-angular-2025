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

promise
    .then(result => { throw Error('OMG!') })
    .catch(error => { return error})
    .then(result => console.log(result))
