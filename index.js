const readlineSync = require("readline-sync");
const chalk = require("chalk");

//Defined constants
const yes = chalk.bold.green;
const no = chalk.bold.red;
const nameBg = chalk.greenBright;
const newGameBg = chalk.bold.yellowBright;
const buttonBg = chalk.bgGreen.white;
const getAnswer = readlineSync.question;
const log = console.log;

//Function to capitalize first letter of a string
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

//Function to take input values
function welcome() {
  let inputName = capitalizeFirstLetter(
    getAnswer("\nEnter your name: ", { defaultInput: "nobody" })
  );
  let dob = getAnswer(
    `\n Hello ${nameBg(inputName)}, enter your date of birth in DD/MM format: `
  );
  isDOBValid(dob, inputName);
}

//Function to check if the DOB is valid
function isDOBValid(dob, name) {
  if (!dob.includes("/")) {
    log(`\n${no("Please enter your date of birth in DD/MM format.")}`);
    playAgain();
    return;
  }
  dob = dob.split("/");
  let date = parseInt(dob[0]);
  let month = parseInt(dob[1]);
  if (month > 0 && month < 13 && date > 0 && date < 32) {
    if (month == 2 && date > 29) {
      log(`\n${no(`${date}/0${month} can never happen.`)}`);
      playAgain();
      return;
    } else if (
      date > 30 &&
      (month == 4 || month == 6 || month == 9 || month == 11)
    ) {
      log(`\n${no(`${month}th month can never have more than 30 days.`)}`);
      playAgain();
      return;
    }
    let isPrimeNumber = isPrime(date);
    displayResult(name, isPrimeNumber);
  } else if (month > 12 || month < 1) {
    log(
      `\n${no(
        "\nPlease enter a valid month. A month value cannot be more than 12 and less than 01."
      )}`
    );
    playAgain();
    return;
  } else if (date > 31 || date < 1) {
    log(
      `\n${no(
        "\nPlease enter a valid date. A date value cannot be more than 31 and less than 01."
      )}`
    );
    playAgain();
    return;
  } else {
    log(`\n${no("\nPlease enter a valid date of birth.")}`);
    playAgain();
    return;
  }
}

//Function to check if a number is a prime
function isPrime(n) {
  let divisor = 3;
  let limit = Math.sqrt(n);

  //check simple cases
  if (n == 2 || n == 3) return true;
  if (n % 2 == 0) return false;

  while (divisor <= limit) {
    if (n % divisor == 0) return false;
    else divisor += 2;
  }
  return true;
}

//Function to display result
function displayResult(name, isPrimeNumber) {
  if (isPrimeNumber) {
    log(
      `\n${yes(
        `Yes ${name}, your birth day is a prime number. You should share it on your social handles.`
      )}`
    );
  } else {
    log(`\n${no(`No ${name}, your birth day is not a prime number.`)}`);
  }
  playAgain();
}

//Function to play the game again
function playAgain() {
  let answer = readlineSync.keyInYN("\nDo you wish to play again?");
  if (answer) {
    welcome();
  } else {
    log(
      `\n${newGameBg(
        `If you wish to play again go to the top right corner of the screen and click on the ${buttonBg(
          "Run"
        )} button or you can simply just reload the page. Thank you!`
      )}`
    );
  }
}

welcome();
