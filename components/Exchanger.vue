<script setup lang="ts">
import { getCurrencies } from "~/functions/getCurrencies";
import { getCurrencieRelativeRubles } from "~/functions/getCurrencieRelativeRubles";
import { getRubleRelativeCurrencies } from "~/functions/getRubleRelativeCurrencies";
import { resultСalculationCurrency } from "~/functions/resultСalculationCurency";

const currencyStart = ref<string>("RUB");
const currencyFinish = ref<string>("RUB");
const currencies = ref<string[]>([]);
const isLoading = ref<boolean>(true);
const number = ref<number>(0);
// const logValues = () => {
//   console.log("Number:", number.value);
//   console.log("currencyStart:", currencyStart.value);
//   console.log("currencyFinish:", currencyFinish.value);
// };
onMounted(async () => {
  try {
    currencies.value = await getCurrencies();
    // rubInCurrencyObject.value = (await getRubleRelativeCurrencies()) || {};
    // currencyInRUBObject.value = (await getCurrencieRelativeRubles()) || {};
    // console.log(currencyInRUBObject.value);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

const logAndCalculateCurrency = () => {
  resultСalculationCurrency(
    currencyStart.value,
    currencyFinish.value,
    number.value
  );
};

watch(number, logAndCalculateCurrency);
watch(currencyStart, logAndCalculateCurrency);
watch(currencyFinish, logAndCalculateCurrency);
</script>

<template>
  <div v-if="isLoading" class="loader">1</div>
  <div v-else class="center-container">
    <input type="text" placeholder="Enter a number" v-model="number" />
    <input
      type="text"
      placeholder="Select a currency"
      list="currency"
      v-model="currencyStart"
    />
    <input type="text" placeholder="Result" />
    <input
      type="text"
      placeholder="Select a currency"
      list="currency"
      v-model="currencyFinish"
    />
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
