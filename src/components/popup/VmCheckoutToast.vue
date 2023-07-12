<script setup lang="ts">
import { eventbus, Events } from '../../domain/eventBus';
import { toast } from 'https://cdn.jsdelivr.net/npm/vue3-toastify@0.1.11/+esm';


// We listen to userSignin event
eventbus.on(Events.checkoutPerformed, (e) => {
    console.log("Received checkout")
    toast("Wow so easy !", {
        autoClose: 1000,
      }); // ToastOptions
}); // 'e' has inferred type 'string'
</script>
  
<template>

</template>
  

<style lang="scss"></style>
  
  
  