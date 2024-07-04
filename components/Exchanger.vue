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
      currencyStart.value,
      currencyFinish.value,
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

watch(number, logAndCalculateCurrency);
watch(currencyStart, logAndCalculateCurrency);
watch(currencyFinish, logAndCalculateCurrency);
</script>

<template>
  <div v-if="isLoading" class="loader">1</div>
  <div v-else class="center-container">
    <div class="inputs-exchanger">
      <input
        type="text"
        placeholder="Enter a number"
        v-model="number"
        @input="handleInput"
      />
      <input
        type="text"
        placeholder="Select a currency"
        list="currencyStart"
        :value="'Фунт стерлингов (GBP)'"
        @input="(event) => handleCurrencySelection(event, 'start')"
      />
      <input
        type="text"
        placeholder="Result"
        v-model="changeNumberForCurrency"
        @input="handleInput"
      />
      <input
        type="text"
        placeholder="Select a currency"
        list="currencyFinish"
        :value="'Доллар США (USD)'"
        @input="(event) => handleCurrencySelection(event, 'finish')"
      />
      <datalist id="currencyStart">
        <option
          v-for="(currency, index) in currencies"
          :key="index"
          :value="currency.full_name"
        ></option>
      </datalist>
      <datalist id="currencyFinish">
        <option
          v-for="(currency, index) in currencies"
          :key="index"
          :value="currency.full_name"
        ></option>
      </datalist>
    </div>

    <div class="Switch">
      <label for="">Переключатель</label>
      <input
        type="checkbox"
        id="option1"
        name="option1"
        v-model="checkboxInversionResults"
      />
    </div>
    <!-- <p>
      {{ checkboxInversionResults ? "ВЫ ВЫБРАЛИ ОПЦИЮ!" : "ОПЦИЯ НЕ ВЫБРАНА" }}
    </p> -->
  </div>
</template>
