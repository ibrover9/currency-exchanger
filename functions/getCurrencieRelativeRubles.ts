import axios from "axios";

export const getCurrencieRelativeRubles = async (currencyStart: string) => {
  try {
    const { data: currencieRelativeRubles } = await axios.get(
      "https://www.cbr-xml-daily.ru/daily_json.js"
    );
    return currencieRelativeRubles.Valute[currencyStart].Value;
  } catch (error) {
    console.error(error);
  }
};
