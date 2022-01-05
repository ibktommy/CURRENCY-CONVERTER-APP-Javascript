const formBtn = document.querySelector(".form");
const amount = document.querySelector("#amount");
const fromCurrency = document.querySelector("#from-currency");
const toCurrency = document.querySelector("#to-currency");
const result = document.querySelector(".output");
const codeError = document.querySelector(".code-error");
const inputError = document.querySelector(".input-error");

// EVENT LISTENER
formBtn.addEventListener("submit", getRate);

function getRate(e) {
    e.preventDefault();

    fetchData();
}

// FETCH DATA USING FETCH API
// function fetchData() {
//     fetch(
//         "http://data.fixer.io/api/latest?access_key=9f9646efe9adebaf5fc0bfdab570fdda&format=1"
//     )
//         .then((response) => {
//             return response.json();
//         })
//         .then((responseData) => {
//             const date = responseData.date;
//             const currencyRates = responseData.rates;
//             amountValue = parseInt(amount.value);
//             fromValue = fromCurrency.value.toUpperCase();
//             toValue = toCurrency.value.toUpperCase();

//             baseCurrency = currencyRates[toValue] * amountValue;
//             converter = parseFloat(
//                 (baseCurrency / currencyRates[fromValue]).toFixed(2)
//             );

//             if (
//                 amount.value === "" ||
//                 fromCurrency.value === "" ||
//                 toCurrency.value === ""
//             ) {
//                 inputError.classList.add("show");
//                 setTimeout(() => {
//                     inputError.classList.remove("show");
//                 }, 2500);
//             } else if (isNaN(converter)) {
//                 codeError.classList.add("show");
//                 setTimeout(() => {
//                     codeError.classList.remove("show");
//                 }, 2500);
//             } else {
//                 result.textContent = `As at "${date}" ${amountValue}(${fromValue}) ==> ${converter}(${toValue})`;
//             }
//         })
//         .catch((error) => {
//             result.textContent = `ERROR: ${error}`;
//         });
// }

// FETCH DATA USING ASYNC AWAIT
async function fetchData() {
    let url =
        "http://data.fixer.io/api/latest?access_key=9f9646efe9adebaf5fc0bfdab570fdda&format=1";

    // Fetching Data and Setting Parameters
    const response = await fetch(url);
    const responseData = await response.json();
    const date = await responseData.date;
    const currencyRates = await responseData.rates;
    amountValue = parseInt(amount.value);
    fromValue = fromCurrency.value.toUpperCase();
    toValue = toCurrency.value.toUpperCase();

    // Converter Calculation
    baseCurrency = (await currencyRates[toValue]) * amountValue;
    console.log(baseCurrency);
    converter = parseFloat(
        (baseCurrency / currencyRates[fromValue]).toFixed(2)
    );

    // Set Error messages and Display Result
    if (
        amount.value === "" ||
        fromCurrency.value === "" ||
        toCurrency.value === ""
    ) {
        inputError.classList.add("show");
        result.innerHTML = "";
        setTimeout(() => {
            inputError.classList.remove("show");
        }, 2500);
    } else if (isNaN(converter)) {
        codeError.classList.add("show");
        result.innerHTML = "";
        setTimeout(() => {
            codeError.classList.remove("show");
        }, 2500);
    } else {
        result.innerHTML = `As at "${date}" <br>${amountValue}(${fromValue}) ==> ${converter}(${toValue})`;
    }
}
