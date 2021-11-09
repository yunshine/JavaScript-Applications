const getTodos = (resource, callbackFunction) => {
    // the XMLHttpRequest object is old, but it also works with JSON and other data types like XML or plain text...
    const request = new XMLHttpRequest();

    // the 'readystatechange' event fires whenever there is a change in the state or phase of the request...
    // We can use 'readystatechange' to determine when the request is completed AND access the data that we get back...
    request.addEventListener('readystatechange', () => {
        // FYI there are 4 phases or states of the request...
        console.log("Request: ", request);
        console.log("request.readyState: ", request.readyState);

        // if the request state/phase is 4, that means it is done (even if there is an error)...
        // so, we also need to check that there weren't any errors with the request (status 200). Only then will there be a responseText/data...
        if (request.readyState === 4 && request.status === 200) {
            // Again, request.responseText is the data that you've gotten back once the request state/phase is at 4/done...
            // callbackFunction(undefined, request.responseText);

            // dealing with JSON...
            const data = JSON.parse(request.responseText);
            callbackFunction(undefined, data);
        } else if (request.readyState === 4) {
            callbackFunction('Error. Could not fetch data...', undefined);
        }
    });

    // How to send a request to get data...
    // ==================================================================
    // request.open tells our request what type of request it is (GET) and where to get that data from/where to send the request...
    // request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');

    // accessing my own JSON file...
    request.open('GET', resource);
    // request.open sets up the request, and request.send sends the request...
    request.send();
};

/*
// These console.logs below show that the getTodos callback function is asynchronous and not blocking...
console.log(1);
console.log(2);

// How to handle errors and/or data that has been successfully fetched...
getTodos('json/todos.json', (err, data) => {
    console.log("Callback fired from inside the callbackFunction...");
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        // if you have multiple json files or apis or sources of data you need asynchronously, you could start nested  callback hell here like so...
        getTodos('json/shoppingList.json', (err, data) => {
            console.log("callback hell 1: ", data);
        })
    }
});

console.log(3);
console.log(4);
*/

// JavaScript Promises
// ==========================================================================
const getSomething = () => {

    // first, you need to return a new Promise when getSomething is called. A promise is something that will take some time to do. The result will either by "resolved" or "rejected"...
    return new Promise((resolve, reject) => {
        // fetching some data here...
        resolve('some data...');
        // reject('some err...');
    });
};


// the .then function will fire when the getSomething promise resolves with the data that is passed from the resolved function in the returned promise, OR if it rejects...
// the second callback function fires when there is a rejected error...
getSomething().then((data) => {
    console.log("data from getSomething... ", data);
}, (err) => {
    // this second callback function fires if there is an error with the getSomething promise with the err...
    console.log("err from get Something...", err);
});


// a cleaner way to write the same getSomething function...
getSomething().then(data => {
    // .then fires when the promise resolves with data...
    console.log("data from getSomething... ", data);
}).catch(err => {
    // .catch fires when the promise rejects...
    console.log("err from get Something...", err);
});


// JavaScript Promises: a real example - fetching the JSON todos with promises...
// ==========================================================================
const getTodosWithPromises = (resource) => {

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else if (request.readyState === 4) {
                reject('Error. Could not fetch data...');
            }
        });

        request.open('GET', resource);
        request.send();
    });
};

// working with 1 Promise...
getTodosWithPromises('json/todos.json').then(data => {
    console.log("Data Resolved from getTodosWithPromises: ", data);
}).catch(err => {
    console.log("Err from getToDosWithPromises: ", err);
});


// chaining multiple Promises...
getTodosWithPromises('json/todos.json').then(data => {
    console.log("Promise 1 Resolved: ", data);
    // here, we need to return the promise of the second json...
    return getTodosWithPromises('json/shoppingList.json');
}).then(data => {
    console.log("Promise 2 Resolved: ", data);
    // again, as before, here, we need to return the promise of the third json...
    return getTodosWithPromises('json/weddingPlans.json');
}).then(data => {
    console.log("Promise 3 Resolved: ", data);
    // even though there are multiple promises, we only need one .catch...
}).catch(err => {
    console.log("Err - Promise Rejected: ", err);
});


// the fetch api - the newer, better native api for doing everything that above...l
// ==========================================================================

// the fetch function below returns a promise with a resolve and a reject, just like what we saw above...
// this time, instead of json data, we get a 'response' promise object that the fetch api creates for us...
fetch('json/todos.json').then(response => {
    // one quirk with the fetch API - the Promise is only rejected when there is a network error. If you mistyped the url or something, the Promise is still resolved, but you'll get a status of 404...
    console.log('The Fetch API Resolved: ', response);
    return response.json(); /* this returns another promise... */
}).then(data => {
    console.log('Data from the Fetch API: ', data);
}).catch(err => {
    console.log('The Fetch API Rejected: ', err);
});


// Async & Await
// ==========================================================================
// first, create  a function that contains all of our async code, the code that goes out to get data from somewhere. Because we've used the keyword 'async', it is non-blocking...

// whenever we use the async key word, the function will return a PROMISE...
const getTodosWithAsyncAwait = async () => {
    // once the fetch Promise below is resolved, JavaScript will then assign the data as the value to 'response'... this data will be a response object...
    const response = await fetch('json/todos.json');
    console.log("The 'response' variable from getTodosWithAsyncAwait: ", response);

    if (response.status !== 200) {
        // when we throw a new Error in an async function, the returned Promise is 'rejected', not 'resolved'...
        throw new Error('new Error thrown...');
    }

    const data = await response.json();
    console.log("The 'data' variable from getTodosWithAsyncAwait: ", data);

    return data;
};

console.log("a");
console.log("b");

getTodosWithAsyncAwait()
    .then(data => console.log("Resolved data from getTodosWithAsyncAwait: ", data))
    .catch(err => console.log("Err from getTodosWithAsyncAwait: ", err.message));

console.log("c");
console.log("d");