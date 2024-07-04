<script setup lang="ts">
import { getCurrencies } from "~/functions/getCurrencies";
import { resultСalculationCurrency } from "~/functions/resultСalculationCurency";
import type { Currency } from "~/models/Exchanger";

const currencyStart: Ref<string> = ref("USD");
const currencyFinish: Ref<string> = ref("GBP");
const currencies = ref<Currency[]>([]);
const isLoading = ref<boolean>(true);
const number = ref("1");
const changeNumberForCurrency = ref<string>("1");
const checkboxInversionResults = ref<boolean>(false);
const selectedCurrencyStart = ref<string>("Фунт стерлингов (GBP)");
const selectedCurrencyFinish = ref<string>("Фунт стерлингов (GBP)");

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
    logAndCalculateCurrency();
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

const handleCurrencySelection = (
  event: any,
  startOrFinishCurrencies: string
) => {
  const selectedValue = event.target.value;
  const index = currencies.value.findIndex(
    (currency: any) => currency.full_name === selectedValue
  );
  const currencyResult =
    index !== -1 ? currencies.value[index].abbreviation : "Not found";
  console.log(currencyResult);
  if (startOrFinishCurrencies === "start") {
    currencyStart.value = currencyResult;
  } else {
    currencyFinish.value = currencyResult;
  }
};

const logAndCalculateCurrency = async () => {
  if (checkboxInversionResults.value) {
    number.value = await resultСalculationCurrency(
      currencyFinish.value,
      currencyStart.value,

      changeNumberForCurrency.value
    );
  } else {
    changeNumberForCurrency.value = await resultСalculationCurrency(
      currencyStart.value,
      currencyFinish.value,
      number.value
    );
  }
};

const handleChange = (value: string, startOrFinishCurrencies: string) => {
  console.log("Selected currency:", value, startOrFinishCurrencies);
  // Добавьте дополнительную логику при изменении выбранной валюты
  const selectedValue = value;
  const index = currencies.value.findIndex(
    (currency: any) => currency.full_name === selectedValue
  );
  const currencyResult =
    index !== -1 ? currencies.value[index].abbreviation : "Not found";
  console.log(currencyResult);
  if (startOrFinishCurrencies === "start") {
    currencyStart.value = currencyResult;
  } else {
    currencyFinish.value = currencyResult;
  }
};

watch(number, logAndCalculateCurrency);
watch(currencyStart, logAndCalculateCurrency);
watch(currencyFinish, logAndCalculateCurrency);
</script>

<template>
  <div v-if="isLoading" class="loader">1</div>
  <div v-else class="center-container">
    <div class="inputs-exchanger">
      <input
        class="input-number"
        type="text"
        placeholder="Enter a number"
        v-model="number"
        @input="handleInput"
      />
      <!-- <input
        type="text"
        placeholder="Select a currency"
        list="currencyStart"
        :value="'Фунт стерлингов (GBP)'"
        @input="(event) => handleCurrencySelection(event, 'start')"
      /> -->
      <el-select
        filterable
        v-model="selectedCurrencyStart"
        @change="handleChange(selectedCurrencyStart, 'start')"
        style="
          min-width: 300rem;
          max-width: 300rem;
          height: 50rem;
          font-size: 16rem;
        "
      >
        <el-option
          v-for="(currency, index) in currencies"
          style="
            min-width: 300rem;
            height: 50rem;
            font-size: 16rem;
            padding-top: 10rem;
          "
          :key="index"
          :label="currency.full_name"
          :value="currency.full_name"
        >
        </el-option>
      </el-select>
      <input
        class="input-number"
        type="text"
        placeholder="Result"
        v-model="changeNumberForCurrency"
        @input="handleInput"
      />
      <!-- <input
        type="text"
        placeholder="Select a currency"
        list="currencyFinish"
        :value="'Доллар США (USD)'"
        @input="(event) => handleCurrencySelection(event, 'finish')"
      /> -->
      <el-select
        filterable
        v-model="selectedCurrencyFinish"
        @change="handleChange(selectedCurrencyFinish, 'finish')"
        style="width: 300rem; height: 50rem; font-size: 16rem"
      >
        <el-option
          v-for="(currency, index) in currencies"
          style="
            width: 300rem;
            height: 50rem;
            font-size: 16rem;
            padding-top: 10rem;
          "
          :key="index"
          :label="currency.full_name"
          :value="currency.full_name"
        >
        </el-option>
      </el-select>
    </div>

    <div class="Switch">
      <el-checkbox
        style="font-size: 16rem; height: 56rem"
        v-model="checkboxInversionResults"
        >переключатель</el-checkbox
      >
    </div>
  </div>
</template>
