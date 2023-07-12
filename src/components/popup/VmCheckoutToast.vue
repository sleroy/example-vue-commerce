<script setup lang="ts">
import { eventbus, Events, registerEventHandler } from '../../domain/eventBus';
import { useToast } from "vue-toastification";
import type { CheckoutRequest } from '../../connectors/CheckoutServiceConnector';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';



const cb = (e: any) => {
    // Get toast interface
    const toast = useToast();
    const checkoutEvent = e as CheckoutRequest;
    const numProducts = checkoutEvent.products.length;
    // Use it!
    toast(`${checkoutEvent.user} has ordered ${numProducts} products`);
};


onBeforeMount(() => {
    console.log("Register toast events")
    // We listen to userSignin event
    registerEventHandler(Events.checkoutPerformed, cb) // 'e' has inferred type 'string'    
})


</script>

<template>
    <div> </div>
</template>

<style lang="scss"></style>
