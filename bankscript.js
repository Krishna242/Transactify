'use strict';
/*POSITIVE VALUES INDICATE DEPOSIT &NEGATIVE VALUES INDICATE WITHDRAWLS


ACCOUNT DETAILS. TOTAL ACCOUNTS =4*/

const account1 = {
  owner: 'Tushar Verma',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Vikram Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
};

const account3 = {
  owner: 'Mayank Jindal',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
};

const account4 = {
  owner: 'Narayan Rao',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const accounts = [account1, account2, account3, account4];

// ELEMENTS USING DOM MANIPULATION
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnLogout = document.querySelector('.logout__btn');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/*DISPLAYING MOVEMENTS/TRANSACTIONS IN THE MAIN APP AFTER LOGIN IN
BY EXTRACTING THE REQUIRED PARTICULAR HTML LINES AND THEN REPLACING THEM
AS PER THE REQUIREMENT AND THEN ADDING THEM BACK TO THE WEB PAGE*/

const displayMovements = function (acc, sort = false) {
  //EMPTYING ALREADY PRESENT CONTAINER ELEMENTS OF HTML BEFORE ADDING NEW HTML
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);

    const year = date.getFullYear();

    const displayDate = `${day}/${month}/${year} `;

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__date">${displayDate}</div>
          <div class="movements__value">₹ ${mov.toFixed(2)}</div>
        </div>
        `;

    //INSERTING THE NEWLY CREATED HTML INTO THE WEB PAGE
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//IMPLEMENTING TOTAL BALANCE USING REDUCE FUNCTION

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `₹ ${acc.balance.toFixed(2)}`;
};

//DISPLAYING SUMMARY AT THE BOTTOM USING CHAINING OF FILTER AND REDUCE METHODS
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `₹${incomes.toFixed(2)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `₹${-1 * out.toFixed(2)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `₹${interest.toFixed(2)}`;
};

//IMPLEMENTING USER NAMES THAT WILL JUST BE LOWERCASE INITIALS OF THE USER'S FULL NAME
const createUserNames = function (user) {
  user = user.toLocaleLowerCase().trim();
  let usernameSplit = user.split(' ');
  let username = '';
  for (let i of usernameSplit) {
    username = username + i[0];
  }
  return username;
};
for (let i = 0; i < accounts.length; i++) {
  let str1 = createUserNames(accounts[i].owner);
  accounts[i].username = str1;
}
console.log(accounts);

//IMPLEMENTING LOGIN

let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  //PREVENT FORM FROM SUBMITTING
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //DISPLAY ACCOUNT UI AND WELCOME MESSAGE
    labelWelcome.textContent = `Welcome, ${currentAccount.owner}`;

    containerApp.style.opacity = 100;

    //CLEARING USER INPUT ENTRIES
    inputLoginUsername.value = inputLoginPin.value = '';

    //ADDING TIMER FUnctION
    if (timer) clearInterval(timer); //TO AVOID OLD TIMER FROM LAST LOGIN RUNNING IN THE NEW CURRENT LOGIN
    timer = startTime();

    //DISPLAYING MOVEMENTS OF CURRENT USER

    displayMovements(currentAccount);

    //DISPLAYING BALANCE OF CURRENT USER

    calcDisplayBalance(currentAccount);

    //DISPLAYING BALANCE OF CURRENT USER

    calcDisplaySummary(currentAccount);
  }
});

//IMPLEMENTING TRANSERS

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    console.log('valid transfer');
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //ADD TRANSFER DATE

    currentAccount.movementsDates.push(new Date());
    //DISPLAYING MOVEMENTS OF CURRENT USER

    displayMovements(currentAccount);

    //DISPLAYING BALANCE OF CURRENT USER

    calcDisplayBalance(currentAccount);

    //DISPLAYING BALANCE OF CURRENT USER

    calcDisplaySummary(currentAccount);
  }
});
//IMPLEMENTING LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    //ADDING LOAN DATE

    currentAccount.movementsDates.push(new Date());

    //DISPLAYING MOVEMENTS OF CURRENT USER

    displayMovements(currentAccount);

    //DISPLAYING BALANCE OF CURRENT USER

    calcDisplayBalance(currentAccount);

    //DISPLAYING BALANCE OF CURRENT USER

    calcDisplaySummary(currentAccount);
  }
});

//IMPLEMENTING CLOSING/DELETION OF ACCOUNT

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //DELETE ACCOUNT
    accounts.splice(index, 1);

    //HIDE UI
    containerApp.style.opacity = 0;
  }
  //CLEARING USER INPUT ENTRIES
  inputLoginUsername.value = inputLoginPin.value = '';
});

//IMPLEMENTING SORTING
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//IMPLEMENTING DATES IN THE PROJECT

//FORMAT:DATE/MONTH/YEAR
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
let month = `${now.getMonth()}`.padStart(2, 0);
month = Number(month) + 1; //MONTH STARTS WITH 0 INSTEAD OF 1 IN JAVASCRIPT
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);

labelDate.textContent = `${day}/${month}/${year} , ${hour}:${min}`;

//SETTING LOGOUT TIMER

const startTime = function () {
  /* TIMER DURATION: 5MINS

     TIMER IS CALLED EVERY SECONDS

     REMAINING TIME IS SHOWN AT THE UI

     LOG OUT USER AFTER TIME REACHES 0*/

  let time = 600; //IN SECONDS

  const timer = setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(0, 2);
    const sec = String(time % 60).padStart(0, 2);
    labelTimer.textContent = `${min}:${sec}`;

    //STOPPING TIMER
    if (time === 0) {
      labelWelcome.textContent = `Login to get started`;

      containerApp.style.opacity = 0;
      clearInterval(timer);
    }
    time--;
  }, 1000); //1SEC=1000MILLISEC

  return timer;
};

//IMPLEMENTING LOGOUT BUTTON

btnLogout.addEventListener('click', function () {
  labelWelcome.textContent = `Login to get started`;

  containerApp.style.opacity = 0;
  clearInterval(timer);
});
