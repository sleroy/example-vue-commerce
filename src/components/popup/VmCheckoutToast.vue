<script setup lang="ts">
import { eventbus, Events } from '../../domain/eventBus'
import { useToast } from "vue-toastification";
import type { CheckoutRequest } from '../../connectors/CheckoutServiceConnector';

// We listen to userSignin event
eventbus.on(Events.checkoutPerformed, e=> {
    console.log('Received checkout')
    // Get toast interface
    const toast = useToast();
    const checkoutEvent = e as CheckoutRequest
    const numProducts = checkoutEvent.products.length
    // Use it!
    toast(`${checkoutEvent.user} has ordered ${numProducts} products`);
}) // 'e' has inferred type 'string'
</script>

<template></template>

<style lang="scss"></style>
