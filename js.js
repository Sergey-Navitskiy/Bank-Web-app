"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
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

function displayMovements(movements){
  containerMovements.innerHTML = ''
  movements.forEach(function(value, i){
    const type = value > 0 ? 'deposit' : 'withdrawal'

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__date">24/01/2037</div>
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


function addingDigits(movements){
  const ballence = movements.reduce(function(acc, val, key, arr){
    return acc + val
  }, 0 )
  labelBalance.textContent = `${ballence}, RUB`
}



//Сумма, приход и уход деняк внизу странички 

function calcDisplaySum(movements){
  const incomes  = movements.filter(function(val){
    return val > 0
  }).reduce(function(acc,mov){
    return acc + mov 
  }, 0)
  labelSumIn.textContent = `${incomes}₽`

  const output = movements.filter(function(val){
    return val < 0
  }).reduce(function(acc, mov){
    return acc + mov
  }, 0)
  labelSumOut.textContent = `${Math.abs(output)}₽`

  labelSumInterest.textContent = `${output + incomes}₽`
}



let currentAccunt; 

btnLogin.addEventListener('click', function(e) {
  e.preventDefault()
  currentAccunt = accounts.find(function(acc){
    return acc.logIn === inputLoginUsername.value;
  })
  console.log(currentAccunt)
  if(currentAccunt && currentAccunt.pin === Number(inputLoginPin.value)){
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername = ''
    //console.log('pin Ok')
    displayMovements(currentAccunt.movements)
    addingDigits(currentAccunt.movements)
    calcDisplaySum(currentAccunt.movements)
  }
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault()
  const reciveAcc = accounts.find(function(acc){
    return
  })inputTransferTo.value
  const amount = Number(inputTransferAmount.value)
})