import axios from "axios";

export const getRubleRelativeCurrencies = async () => {
  try {
    const { data: rubleRelativeCurrencies } = await axios.get(
      "https://www.cbr-xml-daily.ru/latest.js"
    );
    console.log(rubleRelativeCurrencies);
    return { rubleRelativeCurrencies };
  } catch (error) {
    console.error(error);
  }
};
