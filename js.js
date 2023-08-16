"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-08-13T17:01:17.194Z",
    "2023-08-14T23:36:17.929Z",
    "2023-08-15T10:51:36.790Z",
  ],
  currency: "RUB",
  locale: "pt-PT",
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "es-PE",
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
  ],
  currency: "USD",
  locale: "ru-RU",
};

const accounts = [account1, account2, account3, account4];

// Elements

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//подсчёт бабосов на гл странице
function displayMovements(acc, sort = false){
  containerMovements.innerHTML = ''
  const movs = sort ? acc.movements.slice().sort((a,b) => a - b) : acc.movements

  movs.forEach(function(value, i){
    const type = value > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(acc.movementsDates[i])    
    const displayDate = formatMovementDate(date)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${value}</div>
      </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)

  })
}




// const rub = [100, 222, 340, 456]
// let usd = []

// rub.forEach(function(val){
//   usd.push(val / 72).toFixed(2)
// })

// const usd2 = rub.map((val) => (val / 72).toFixed(2))


// краткая запись пользователей для будущего логина(мейби)

function createLogIn(accs) {
  accs.forEach(function (acc) {
    acc.logIn = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (val) {
        return val[0];
      })
      .join("");
  });
}
createLogIn(accounts);

// тестировочная херня (никак не отображается на страничке)

// const arr = [1, -12, 22, 27, -26, -100, 9]

// const filteredArr = arr.filter(function(val){
//   return val > 0
// })

// console.log(filteredArr)
// const array = [5, 5, 5, 5]
// const summ = array.reduce(function(acc, val, kay, arr){
//   return acc + val
// }, 0)
// const firstMinusNum = arr.find(function(val){
//   return num < 0
// })
// const acc = accounts.find(function(val){
//   return acc.owner === 'Anna Filimonova'
// })
// console.log(acc)

// Подсчёт и вывод деняк на места для общего баланса 
function addingDigits(acc) {
  const ballence = acc.movements.reduce(function(acc, val, key, arr) {
    return acc + val
  }, 0 )
  acc.ballence = ballence
  labelBalance.textContent = `${ballence}, RUB`
}

//Сумма, приход и уход деняк внизу странички 
function calcDisplaySum(movements) {
  const incomes  = movements.filter(function(val) {
    return val > 0
  }).reduce(function(acc,mov) {
    return acc + mov 
  }, 0)
  labelSumIn.textContent = `${incomes}₽`

  const output = movements.filter(function(val) {
    return val < 0
  }).reduce(function(acc, mov) {
    return acc + mov
  }, 0)
  labelSumOut.textContent = `${Math.abs(output)}₽`

  labelSumInterest.textContent = `${output + incomes}₽`
}

// логин в какаунт 
let currentAccunt; 
btnLogin.addEventListener('click', function(e) {
  e.preventDefault()
  currentAccunt = accounts.find(function(acc) {
    return acc.logIn === inputLoginUsername.value;
  })
  console.log(currentAccunt)
  if(currentAccunt && currentAccunt.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = ''
    const now = new Date()
    const year = now.getFullYear()
    const month = `${now.getMonth() + 1}`.padStart(2, 0)
    const date = `${now.getDate()}`.padStart(2, 0)
    const hours = `${now.getHours()}`.padStart(2, 0)
    const minutes = `${now.getMinutes()}`.padStart(2, 0)
    const seconds = `${now.getSeconds()}`.padStart(2, 0)
    labelDate.textContent = `${date}/${month}/${year}/ ${hours}:${minutes}:${seconds}`
    update(currentAccunt)
  }
})

// вызов функций в функции
function update(acc){
  displayMovements(acc)
  addingDigits(acc)
  calcDisplaySum(acc.movements)
}

// Перевод денег между аккаунтами 
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault()
  const reciveAcc = accounts.find(function(acc) {
    return acc.logIn === inputTransferTo.value
  })
  const amount = Number(inputTransferAmount.value)
  if(reciveAcc && amount > 0 && currentAccunt.ballence >= amount && reciveAcc.logIn !== currentAccunt.logIn){
    currentAccunt.movements.push(-amount)
    reciveAcc.movements.push(amount)
    currentAccunt.movementsDates.push(new Date().toISOString())
    update(currentAccunt)
    inputTransferTo.value = inputTransferAmount.value = ''
  }
})

// закрытие аккаунта
btnClose.addEventListener('click', function(e) {
  e.preventDefault()
  if(inputCloseUsername.value === currentAccunt.logIn && Number(inputClosePin.value) === currentAccunt.pin) {
    const index = accounts.findIndex(function(acc) {
      return acc.login === currentAccunt.logIn
    })
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
  }
  inputCloseUsername.value = inputClosePin.value = ''
})

// добавление средств на аккаунт 
btnLoan.addEventListener('click', function(e) {
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)
  if(amount > 0){
    currentAccunt.movements.push(amount)
    currentAccunt.movementsDates.push(new Date().toISOString())
    update(currentAccunt)
  }
  inputLoanAmount.value = ''
})

// проверка связи(с космосом)
const accMov = accounts.map(function(acc) {
  return acc.movements
})
const allMov = accMov.flat()
const allBalance = allMov.reduce(function(acc, mov) {
  return acc + mov
}, 0)

// сортировка занесение на счёт и снятия
let sorted   = false
btnSort.addEventListener('click', function(e) {
  e.preventDefault()
  displayMovements(currentAccunt, !sorted)
  sorted = !sorted
})

// очередные потуги выдать что-то 
// const future = new Date(2025, 3, 15)
// const now = new Date(2025, 2, 10)
// const results = +future - +now
// console.log(results)

function formatMovementDate(date){
  const calcDaysPassed = function(date1, date2) {
    return Math.round((date1 - date2) / (1000 * 60 * 24))
  }
  daysPassed = calcDaysPassed(new Date(), date)
  if(daysPassed === 0) return 'Сегодня'
  if(daysPassed === 1) return 'Вчера'
  if(daysPassed >= 2 && daysPassed <= 4) return `Прошло ${daysPassed} дня`
  if(daysPassed === 7) return `Прошло ${daysPassed} дней`

  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, 0)
  const day = `${date.getDate()}`.padStart(2, 0)
  const hours = `${date.getHours()}`.padStart(2, 0)
  const minutes = `${date.getMinutes()}`.padStart(2, 0)
  const seconds = `${date.getSeconds()}`.padStart(2, 0)
  return `${day}/${month}/${year}/ ${hours}:${minutes}:${seconds}`
}