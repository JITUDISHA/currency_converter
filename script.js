// document.getElementById("inpcount").addEventListener("keydown", function(event){
//     if(event.key === "Enter"){
//         document.getElementById("inpcount").style.backgroundColor="red";    
//         cange();

//     }
// } );



 




const apiKey = "cur_live_vmUr4tWYUWopB7V42VKtTTUTXQj6uQDVp5IY4aqE"; 
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

// Load currency options
async function loadCurrencies() {
  try {
    const res = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${apiKey}`);
    const data = await res.json();
    const currencies = Object.keys(data.data);

    currencies.forEach(code => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.text = option2.text = code;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (err) {
    resultDiv.textContent = "❌ Failed to load currencies";
    console.error(err);
    document.resultDiv.style.color = "red";

  }
}













async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    document.resultDiv.style.color = "red";
    
    return;
  }

  try {
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${from}&currencies=${to}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.data || !data.data[to]) {
      resultDiv.textContent = "Conversion rate not available.";
      return;
    }

    const rate = data.data[to].value;
    const converted = rate * amount;
    resultDiv.innerHTML = `${amount} ${from} = <strong>${converted.toFixed(2)} ${to}</strong>`;
  } catch (err) {
    resultDiv.textContent = "❌ Conversion failed.";
    console.error("Error:", err);
  }
  currencies.forEach(code => {

      const option1 = document.createElement("option");
      const option2 = document.createElement("option");
      option1.value = option2.value = code;
      option1.text = option2.text = code;
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });
}


convertBtn.addEventListener("click", convertCurrency);
amountInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") convertCurrency();
});


loadCurrencies();

async function getCurrency() {
    const countryName = document.getElementById("countryInput").value.trim();
    const result = document.getElementById("resultText");

    if (!countryName) {
      result.textContent = "Please enter a country name.";
      return;
    }

    try {
   
      const countryRes = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
      if (!countryRes.ok) throw new Error("Country not found");
      const countryData = await countryRes.json();

      const country = countryData[0];
      const currencyCode = Object.keys(country.currencies)[0];  
      const currencyName = country.currencies[currencyCode].name;
      const currencySymbol = country.currencies[currencyCode].symbol;

       
      const apiKey = "5eec9f573eec96123919a0e2"; 
      const currencyCheck = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyCode}`);

      if (!currencyCheck.ok) throw new Error("Currency API error");


      const currencyData = await currencyCheck.json();

      result.textContent = `Currency of ${country.name.common}: ${currencyName} (${currencySymbol}) — Code: ${currencyCode}`;

    } catch (error) {
      console.error(error);
      result.textContent = "Error: " + error.message;
    }
  }





