var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Kate'
    };

    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(1, (user) => {
    // Do something with data
    console.log(user);
});