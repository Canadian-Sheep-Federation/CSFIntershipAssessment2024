const API_BASE_URL = process.env.API_BASE_URL || "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest";
const API_VERSION = process.env.API_VERSION || "v1";

async function getExchangeRate(currency_from, currency_to) {
  const res = await fetch(`${API_BASE_URL}/${API_VERSION}/currencies/${currency_from}`);
  const json = await res.json();
  if (!res.ok) {
    console.error(`Server failed to get exchange rate (${res.status}): ${json.message}`);
    throw new Error(json.message);
  } else {
    return json[currency_from][currency_to];
  }
}

export default {
  getExchangeRate
}