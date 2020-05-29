<script>
  import { onMount, createEventDispatcher } from "svelte";

  import { Col, Container, Row } from "sveltestrap";
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";

  import preferenceStore from "./preferenceStore.js";
  import { getCurrencies, getRates } from "./request.js";

  const dispatch = createEventDispatcher();

  let currencies = [];
  let rates = {};
  let fromCurrency;
  let toCurrency;
  let amount;

  onMount(async () => {
    currencies = await getCurrencies();
    rates = await getRates($preferenceStore.from);
    fromCurrency = $preferenceStore.from;
    toCurrency = $preferenceStore.to;
  });

  $: newRates(fromCurrency);

  $: preferenceStore.set(fromCurrency, toCurrency);

  $: rate = rates[toCurrency];

  async function newRates(baseCurrency) {
    if (baseCurrency) {
      rates = await getRates(baseCurrency);
    }
  }

  function onConvert() {
    dispatch("calculate", { amount: rate * amount, currency: toCurrency });
  }
</script>

<style>
  :global(button) {
    width: 100%;
  }
</style>

<Row>
  <Col md={{ size: 6, offset: 3 }}>
    <FormGroup>
      <Label for="fromAmount">Money</Label>
      <Input
        id="fromAmount"
        type="number"
        min="1"
        bind:value={amount}
        max="500000000"
        placeholder="Amount in dollars" />
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={{ size: 6, offset: 3 }}>
    <FormGroup>

      <Label for="exampleSelect">Currency</Label>
      <Input
        bind:value={fromCurrency}
        type="select"
        name="select"
        id="exampleSelect">
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </Input>
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={{ size: 6, offset: 3 }}>
    <FormGroup>

      <Label for="exampleSelect">Convert to</Label>
      <Input
        type="select"
        name="select"
        id="exampleSelect"
        bind:value={toCurrency}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </Input>
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={{ size: 6, offset: 3 }}>
    <button on:click={onConvert} type="button" class="btn btn-primary">
      Calculate Currency
    </button>
  </Col>
</Row>
