<script setup>
import axios from "axios";
import { getCurrencies } from "~/functions/getCurrencies";
import { getCurrencieRelativeRubles } from "~/functions/getCurrencieRelativeRubles";
import { getRubleRelativeCurrencies } from "~/functions/getRubleRelativeCurrencies";

const currencyInRUB = ref({});
const rubInCurrency = ref({});
const currency = ref([]);
onMounted(async () => {
  currency.value = await getCurrencies();
  rubInCurrency.value = await getRubleRelativeCurrencies();
  currencyInRUB.value = await getCurrencieRelativeRubles();
  console.log(currencyInRUB.value.Date);
});
</script>

<template>
  <div>
    <input type="text" placeholder="Enter a number" />
    <input type="text" placeholder="Select a currency" list="currency" />
    <input type="text" />
    <input type="text" placeholder="Select a currency" list="currency" />
    <datalist id="currency">
      <option value="Евро">Евро</option>
      <option value="Доллар">Доллар</option>
      <option value="Рубль">Рубль</option>
    </datalist>
  </div>
</template>
