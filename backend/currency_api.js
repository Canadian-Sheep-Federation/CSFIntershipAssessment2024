const API_BASE_URL = process.env.API_BASE_URL || "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest";
const API_VERSION = process.env.API_VERSION || "v1";

async function getExchangeRate(currency_from, currency_to) {
  const res = await fetch(`${API_BASE_URL}/${API_VERSION}/currencies/${currency_from}.json`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error(`Server failed to get exchange rate: API request status (${res.status})`);
  } else {
    const json = await res.json();
    return json[currency_from][currency_to];
  }
}

export default {
  getExchangeRate
}