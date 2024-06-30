import axios from "axios";

const getRubleRelativeCurrencies = async () => {
  try {
    const { data: rubleRelativeCurrencies } = await axios.get(
      "https://www.cbr-xml-daily.ru/latest.js"
    );
    console.log(rubleRelativeCurrencies);
  } catch (error) {
    console.error(error);
  }
};
