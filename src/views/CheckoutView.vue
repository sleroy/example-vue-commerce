<script setup lang="ts">
import CheckoutTable from '@/components/checkout/CheckoutTable.vue';
</script>

<template>
    <main role="main" class="w-full flex-grow pt-1 px-3">
        <section class="cart">
            <div class="cart-container">
                <header class="cart-header">
                    Shopping cart
                </header>
                <div class="cart-list">
                    <CheckoutTable></CheckoutTable>             
                </div>

                <div class="cart-actions">
                    <div class="cart-grid">
                        
                    </div>
                </div>
                
            </div>
        </section>
    </main>
</template>
<style lang="scss">
.cart-header {
    @apply capitalize text-center text-3xl m-8
}

.cart {
    @apply mt-4
}

.cart-list {
    @apply w-full bg-grey_light
}
</style>