<script>
  import { Col, Container, Row } from "sveltestrap";
  import { Button, Form, FormGroup, FormText, Input, Label } from "sveltestrap";
  import CurrencyForm from "./CurrencyForm.svelte";
  let convertedResult;
  function showResult(e) {
    const { amount, currency } = e.detail;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency
    });
    convertedResult = formatter.format(amount);
  }

  if ("serviceWorker" in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function(reg) {
        console.log("Yes, it did.");
      })
      .catch(function(err) {
        console.log("No it didn't. This happened: ", err);
      });
  }
</script>

<style>
  h1,
  h2 {
    text-align: center;
    padding: 20px;
  }
</style>

<Container>
  <Row>
    <Col xs="12">
      <h1>Currency Convertor</h1>
    </Col>
  </Row>

  <CurrencyForm on:calculate={showResult} />

  {#if convertedResult}
    <Row>
      <Col xs="12">
        <h2>{convertedResult}</h2>
      </Col>
    </Row>
  {/if}
</Container>
