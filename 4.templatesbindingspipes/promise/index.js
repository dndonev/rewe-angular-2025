// const response = fetch('');



const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 1000);
});
// promise
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log(error);
//     });
// console.log('YOHOOO!');
const findPromiseResult = async () => {
    try {
        console.log(await promise);
    } catch (e) {
        console.log(e);
    }
    // console.log('YOHOOO!');
};

findPromiseResult();


// async function wait() {
//     const promise = new Promise((resolve, reject) => {
//         const hasError = false;

//         setTimeout(() => {
//             if (hasError) {
//                 reject('500 Internal Server Error');
//             } else {
//                 resolve('Success!');
//             }
//         }, 1000);
//     });

//     try {
//         console.log(await promise);
//         console.log('YOHOOO');
//     } catch (e) {
//         console.log(e);
//     }
// }

// wait();