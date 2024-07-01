import { getCurrencieRelativeRubles } from "./getCurrencieRelativeRubles";
import { getCurrencies } from "./getCurrencies";
import { getRubleRelativeCurrencies } from "./getRubleRelativeCurrencies";

export async function resultСalculationCurrency(
  currencyStart: string,
  currencyFinish: string,
  stringNumber: string
) {
  const number = parseFloat(stringNumber);
  const currency = await getCurrencies();
  if (currency.includes(currencyStart) && currency.includes(currencyFinish)) {
    const currencyStartInRUB = await getCurrencieRelativeRubles(currencyStart);
    const currencyFinishInRUB = await getRubleRelativeCurrencies(
      currencyFinish
    );

    const rezult = number * currencyStartInRUB * currencyFinishInRUB;
    return rezult;
  } else {
    return 0;
  }
}
