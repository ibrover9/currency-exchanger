import axios from "axios";

export const getCurrencieRelativeRubles = async () => {
  try {
    const { data: currencieRelativeRubles } = await axios.get(
      "https://www.cbr-xml-daily.ru/daily_json.js"
    );
    console.log(currencieRelativeRubles);
  } catch (error) {
    console.error(error);
  }
};
