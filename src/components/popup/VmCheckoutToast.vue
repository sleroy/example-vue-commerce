<script setup lang="ts">
import { eventbus, Events } from '../../domain/eventBus'
import { useToast } from "vue-toastification";

// We listen to userSignin event
eventbus.on(Events.checkoutPerformed, (e) => {
    console.log('Received checkout')
    // Get toast interface
    const toast = useToast();

    // Use it!
    toast("I'm a toast!");
}) // 'e' has inferred type 'string'
</script>

<template></template>

<style lang="scss"></style>
