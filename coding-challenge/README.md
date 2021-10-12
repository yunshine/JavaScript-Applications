## Global Indications

- Please write your code to run on the latest version of Chrome without any server. The code should be working by opening the `index.html` file directly on Chrome.
- Do not use external libraries; please write your code using only the JavaScript specifications and APIs that are usable on the latest version of Chrome.
- Please use git (see the [Instructions](#instructions) section below).

## Requirements

1. When index.html is opened in the browser, the content of constant USERS in json/data.js will appear as a table on the browser. Table column order should be the same as the order already written in index.html.
    - Name is the last name and the first name, respectively, separated by a space.
2. When button#start is clicked, table rows will randomly rearrange every second.
3. The process in 2 can be stopped when button#stop is clicked.
4. When user name very long (left to your own appreciation), an ellipsis is shown.
5. When button#sort is clicked, rows will be sorted by balance in descending order. If two or more balances are the same, rows will be sorted in ascending id order.
6. When the process in 2-3 is running, disable button#sort.
7. The buttons have meaningful (left to your own appreciation) bootstrap classes.

## Additional Notes

- Please write your code so as to avoid triggering unnecessary reflows and repaints.
- As long as your code fulfills the requirements, you may add other optional features or requirements (i.e. add/change css classes, refactor index.html..).

## Instructions

1. All the necessary files for this tests have already been created, however please feel free to add any file you deem useful. Edit js/app.js and index.html by writing the code that fulfills the above requirements.
2. Initialize git in this folder by using `git init` and then make commits as you would normally do. Please refrain from pushing anything, we will only look at your local branch.
3. Try to go as far as you can but please do not spend more than 2~3 hours on this.
4. If there is anything you want to mention about the merits of your project/your eventual functional choices, please do so in the `notes.md` file.
5. Once you are finished, compress all of the code (including js/app.js) into a zip file.

## Notes

- If there is anything you are unable to accomplish in the time but want to express, please make note of it in the `notes.md` file.
- [Bootstrap Documentation](https://getbootstrap.com/docs/4.4/getting-started/introduction/).
