import { getCurrencieRelativeRubles } from "./getCurrencieRelativeRubles";
import { getCurrencies } from "./getCurrencies";
import { getRubleRelativeCurrencies } from "./getRubleRelativeCurrencies";
import type { Currency } from "~/models/Exchanger";

export async function resultСalculationCurrency(
  currencyStart: string,
  currencyFinish: string,
  stringNumber: string
) {
  const number = parseFloat(stringNumber);
  const currencies: Currency[] = await getCurrencies();
  const abbreviationsArray = Object.values(currencies).map(
    (currency) => currency.abbreviation
  );

  if (
    abbreviationsArray.includes(currencyStart) &&
    abbreviationsArray.includes(currencyFinish)
  ) {
    const currencyStartInRUB = await getCurrencieRelativeRubles(currencyStart);
    const currencyFinishInRUB = await getRubleRelativeCurrencies(
      currencyFinish
    );
    const rezult = (number * currencyStartInRUB * currencyFinishInRUB).toFixed(
      2
    );
    return rezult;
  } else {
    return "0";
  }
}
