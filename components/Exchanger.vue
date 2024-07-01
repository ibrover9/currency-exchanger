<script setup>
import axios from "axios";
import { getCurrencies } from "~/functions/getCurrencies";
import { getCurrencieRelativeRubles } from "~/functions/getCurrencieRelativeRubles";
import { getRubleRelativeCurrencies } from "~/functions/getRubleRelativeCurrencies";

const currencyInRUB = ref({});
const rubInCurrency = ref({});
const currencies = ref([]);
onMounted(async () => {
  currencies.value = await getCurrencies();
  rubInCurrency.value = await getRubleRelativeCurrencies();
  currencyInRUB.value = await getCurrencieRelativeRubles();
  console.log(currencyInRUB.value.Date);
});
</script>

<template>
  <div v-if="isLoading" class="loader">1</div>
  <div v-else class="center-container">
    <input type="text" placeholder="Enter a number" />
    <input type="text" placeholder="Select a currency" list="currency" />
    <input type="text" placeholder="Result" />
    <input type="text" placeholder="Select a currency" list="currency" />
    <datalist id="currency">
      <option
        v-for="(currency, index) in currencies"
        :key="index"
        :value="currency"
      >
        {{ currency }}
      </option>
    </datalist>
  </div>
</template>
