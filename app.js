const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.appendChild(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

function updateFlag(element) {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input").value;
  if (amount === "" || amount < 1) {
    amount = 1;
    document.querySelector(".amount input").value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  try {
    const response = await fetch(`${BASE_URL}${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const total = (amount * rate).toFixed(2);
    msg.innerText = `${amount} ${from} = ${total} ${to}`;
  } catch (err) {
    msg.innerText = "Failed to fetch exchange rate.";
    console.error(err);
  }
});
