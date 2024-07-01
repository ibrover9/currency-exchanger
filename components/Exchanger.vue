<script setup lang="ts">
import { getCurrencies } from "~/functions/getCurrencies";
import { resultСalculationCurrency } from "~/functions/resultСalculationCurency";

const currencyStart = ref<string>("");
const currencyFinish = ref<string>("");
const currencies = ref<string[]>([]);
const isLoading = ref<boolean>(true);
const number = ref<string>("");
const changeNumberForCurrency = ref<number>(0);

const handleInput = () => {
  number.value = number.value.replace(/[^0-9.]/g, "");

  const parts = number.value.split(".");
  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, 2);
    number.value = parts.join(".");
  }

  number.value = number.value.replace(/^(\d*\.\d{0,2})\d*$/, "$1");

  if (number.value !== "") {
    logAndCalculateCurrency();
  }
};

onMounted(async () => {
  try {
    currencies.value = await getCurrencies();
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

const logAndCalculateCurrency = async () => {
  changeNumberForCurrency.value = await resultСalculationCurrency(
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
    <input
      type="text"
      placeholder="Enter a number"
      v-model="number"
      @input="handleInput"
    />
    <input
      type="text"
      placeholder="Select a currency"
      list="currency"
      v-model="currencyStart"
    />
    <input type="text" placeholder="Result" v-model="changeNumberForCurrency" />
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
