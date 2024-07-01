import { getCurrencieRelativeRubles } from "./getCurrencieRelativeRubles";
import { getCurrencies } from "./getCurrencies";
import { getRubleRelativeCurrencies } from "./getRubleRelativeCurrencies";

export async function resultСalculationCurrency(
  currencyStart: string,
  currencyFinish: string,
  number: number
) {
  const currencyStartInRUB = await getCurrencieRelativeRubles(currencyStart);
  const currencyFinishInRUB = await getRubleRelativeCurrencies(currencyFinish);

  const rezult = number * currencyStartInRUB * currencyFinishInRUB;
  return rezult;
}
