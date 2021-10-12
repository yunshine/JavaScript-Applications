// Your code should go here
const tableBody = document.querySelector("tbody");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const sortButton = document.querySelector("#sort");
let startInterval;

const sortUsersByBalance = array => {
    const sortedUsers = array.sort((personA, personB) => {
        if (personA["accountBalance"] === personB["accountBalance"]) {
            personA["id"] > personB["id"] ? 1 : -1;
        } else if (personA["accountBalance"] < personB["accountBalance"]) {
            return 1;
        } else {
            return -1;
        }
    })
    return sortedUsers;
}

const displaySortedUsers = () => {
    let sortedUsers = sortUsersByBalance(USERS);
    tableBody.innerHTML = "";
    fillTable(sortedUsers);
}

const rearrangeUsers = array => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

const displayRandomlyRearrangeUsers = () => {
    let rearrangedUsers = rearrangeUsers(USERS);
    tableBody.innerHTML = "";
    fillTable(rearrangedUsers);
}

// this function shortens and adds an ellipsis to names over 25 letters long
const truncateName = name => {
    return (name.length > 25) ? name.substr(0, 25-1) + '&hellip;' : name;
};

// this function "sanitizes" phone numbers by removing tags; used against XSS attacks
const sanitizePhoneNumber = phoneNumber => {
    const tagsToReplace = {
        '<': '&lt;',
        '>': '&gt;'
    };
    return phoneNumber.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
}

const fillTable = array => {
    array.map(user => {
        const sanitizedPhoneNumber = sanitizePhoneNumber(user["phone"]);
        const truncatedName = truncateName(`${user["name"]["last"]} ${user["name"]["first"]}`);
        const userData = `<tr><td>${truncatedName}</td><td>${user["email"]}</td><td>${sanitizedPhoneNumber}</td><td><img src=${user["pictureUrl"]} alt=${user["name"]["last"]}${user["name"]["first"]}></img></td><td>${user["accountBalance"]}</td></tr>`;
        tableBody.insertAdjacentHTML("beforeend", userData);
    })
}

// fills the table with USERS data on page load
window.onload = function() {
    fillTable(USERS);
};

startButton.onclick = function() {
    startInterval = setInterval(displayRandomlyRearrangeUsers, 1000);
    sortButton.disabled = true;
    sortButton.setAttribute("aria-disabled", "true");
}

stopButton.addEventListener("click", e => {
    clearInterval(startInterval);
    sortButton.disabled = false;
    sortButton.setAttribute("aria-disabled", "false");
});

sortButton.addEventListener("click", e => {
    displaySortedUsers();
});
