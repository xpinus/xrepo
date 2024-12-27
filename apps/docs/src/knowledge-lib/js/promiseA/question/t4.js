new Promise((resolve) => {
    console.log(1);
    resolve();
})
    .then(() => {
        new Promise((resolve) => {
            console.log(2);
            resolve();
        }).then(() => {
            console.log(4);
        });
    })
    .then(() => {
        console.log(3);
    });
