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
//     const url =
//         "http://api.exchangeratesapi.io/v1/latest?access_key=3436aba616b20a284b3d12a92d478821";
//     const proxyURL = "https://api.allorigins.win/raw?url=";

//     fetch(`${proxyURL}${url}`)
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
    try {
        const url =
            "http://api.exchangeratesapi.io/v1/latest?access_key=3436aba616b20a284b3d12a92d478821";
        const proxyURL = "https://api.allorigins.win/raw?url=";

        // Fetching Data
        const response = await fetch(`${proxyURL}${url}`);
        const responseData = await response.json();
        const date = await responseData.date;

        // Setting Parameters
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
    } catch (error) {
        return (result.innerHTML = `ERROR: ${error}`);
    }
}
