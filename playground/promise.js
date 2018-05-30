const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers.');
            }
        }, 1500);
    });
};

// asyncAdd returns a promise
asyncAdd(1, 3).then((res) => {
    console.log('Result:', res);
    return asyncAdd(res, 'poop');
}).then((res) => {
    console.log('Should be', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// const somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('Hey. It worked');
//         reject('Unable to fulfill promise');
//     }, 2500);
// });

// somePromise.then((message) => {
//     // only called if things worked as expected. Value passed into resolve will be passed here. 
//     console.log('Success:', message);
// }, (errorMessage) => {
//     console.log('Error:', errorMessage);
// });