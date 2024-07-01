import axios from "axios";

export const getRubleRelativeCurrencies = async (currencyFinish: string) => {
  try {
    const { data: rubleRelativeCurrencies } = await axios.get(
      "https://www.cbr-xml-daily.ru/latest.js"
    );

    return rubleRelativeCurrencies.rates[currencyFinish];
  } catch (error) {
    console.error(error);
  }
};
