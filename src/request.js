import _ from 'lodash';

export const getCurrencies = async () => {
  const response = await fetch(
    'https://api.exchangeratesapi.io/latest?base=CAD'
  );

  const json = await response.json();

  return ['CAD', ..._.keys(json.rates)].sort();
};

export const getRates = async (baseCurrency) => {
  const cacheKey = 'rates_' + baseCurrency;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch(
    `https://api.exchangeratesapi.io/latest?base=${baseCurrency}`
  );

  const json = await response.json();

  sessionStorage.setItem(cacheKey, JSON.stringify(json.rates));

  return json.rates;
};
