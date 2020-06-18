const runChallenges = require("../lib/dom.js");

let EXERCISE_NUMBER = 1;

function addSuccess() {
  document.getElementById('results').insertAdjacentHTML(
    'beforeend',
    `<li class="success">Exercise ${EXERCISE_NUMBER} OK</li>`);
  EXERCISE_NUMBER += 1;
}

function addError(msg) {
  document.getElementById('results').insertAdjacentHTML(
    'beforeend',
    `<li class="error">Exercise ${EXERCISE_NUMBER} KO: ${msg} </li>`);
  EXERCISE_NUMBER += 1;
}

function assertEqual(actual, expected) {
  if (actual === expected) {
    addSuccess();
  } else if (typeof expected === "number") {
    addError(`Expected ${expected}, got ${actual}`);
  } else {
    addError(`Expected "${expected}", got "${actual}"`);
  }
}

function assertNotEqual(actual, notExpected) {
  if (actual !== notExpected) {
    addSuccess();
  } else if (typeof notExpected === "number") {
    addError(`Expected ${actual} to differ from ${notExpected}`);
  } else {
    addError(`Expected "${actual}" to differ from "${notExpected}"`);
  }
}

function check(email, teamCount, sum) {
  assertEqual(email, "boris@lewagon.org");
  assertNotEqual(document.getElementById("email").value, "boris@lewagon.org");
  assertEqual(document.getElementById("email-hint").innerHTML, "<strong>This is my email now</strong>");
  assertEqual(document.querySelectorAll('th.blue').length, 3);
  assertEqual(teamCount, 14);
  assertEqual(document.querySelectorAll('tbody > tr').length, 15);
  assertEqual(sum, 859);
  assertEqual(document.querySelector('th').style.backgroundColor, 'rgb(221, 244, 255)');
  assertEqual(document.getElementsByTagName('label').length, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  runChallenges(check);
});
