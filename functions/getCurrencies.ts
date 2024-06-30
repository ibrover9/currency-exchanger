import axios from "axios";

export const getCurrencies = async () => {
  try {
    const { data: currencies } = await axios.get(
      "https://8e5e773afae46144.mokky.dev/currencies"
    );
    console.log(currencies);
    return currencies;
  } catch (error) {
    console.error(error);
  }
};
