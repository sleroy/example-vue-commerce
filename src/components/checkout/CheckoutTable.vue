<template>
    <section class="checkout-product-grid">
        <div v-if="!isCheckoutSection" class="w-full" >
            <div class="cart-header-row" v-if="products.length > 0">
                <div class="cart-header-title">Title</div>
                <div class="cart-header-quantity">Quantity</div>
                <div class="cart-header-price">Price &euro;</div>
                <div class="cart-header-totalprice">Total &euro;</div>
                <div class="cart-header-action"></div>
            </div>
            <div class="cart-product-row" v-for="product in products" :key="product.id">
                <div class="cart-product-title">{{ product.title }}</div>
                <div class="cart-product-quantity"><span class="money">{{ product.quantity > 0 ? `${product.quantity}` : '' }}</span>
                </div>
                <div class="cart-product-price">{{ product.price }} &euro;</div>
                <div class="cart-product-totalprice">{{ product.total() }} &euro;</div>                
                <div class="cart-product-action">
                    <button class="cart-product-remove-button" @click="removeFromCart(product.id)">
                        {{ removeLabel }}
                    </button>
                </div>
            </div>
            <div class="cart-footer-row" v-if="products.length > 0">
                    <div class="cart-footer-action">
                        <button class="cart-proceed-button" @click="proceedCheckout()">
                            Proceed to the payment
                        </button>
                    </div>
                </div>
            <div class="cart-alert" v-if="products.length === 0" role="alert">
                    <p>{{ cartEmptyLabel }}</p>
            </div>
            </div>
        <div v-if="isCheckoutSection">
            <p>You bought it :-)</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { backend } from '@/domain/backend';


const removeFromCartUC = usecase('remove-from-cart');


// Access to the router
const removeLabel = ref('Remove from cart')
const cartEmptyLabel = ref('Your cart is empty')

const isCheckoutSection = ref(false)

const products = computed(() => {
    return backend.products.productsAdded();
})



function removeFromCart(id: string) {
    removeFromCartUC.execute(id)
}

</script>

<style lang="scss" scoped>
.box {
    @apply flex;
    @apply justify-between;
    @apply mb-3;
}

.cart-alert {
    @apply bg-warning-100 border border-warning-400 text-warning-700 px-4 py-3 rounded relative
}

.checkout-product-grid {
    @apply flex p-5 rounded-b-2xl
}


.cart-product-row {
    @apply grid grid-cols-1 md:grid-cols-6 align-middle justify-items-center my-2 gap-1 md:gap-4
}


.cart-product-title {
    @apply col-span-1 md:col-span-2 items-center
}   

.cart-product-quantity {
    @apply col-span-1 text-center items-center
}

.cart-product-price {
    @apply col-span-1 font-bold  text-center items-center
}

.cart-product-totalprice {
    @apply invisible md:visible col-span-1 font-bold  text-center items-center
}

.cart-product-action {
    @apply col-span-1 items-center
}

.cart-product-remove-button {
    @apply rounded-xl p-2 text-xs md:text-sm text-grey_dark bg-red-400

}

.cart-header-row {
    @apply invisible md:visible grid mb-3 grid-cols-1 md:grid-cols-6 md:gap-4
}

.cart-header-title {
    @apply col-span-1 md:col-span-2 text-sm uppercase text-blue items-center
}

.cart-header-quantity {
    @apply col-span-1 text-sm uppercase text-blue text-center items-center
}

.cart-header-price {
    @apply col-span-1 text-sm uppercase text-blue text-center items-center
}

.cart-header-totalprice {
    @apply col-span-1 text-sm uppercase text-blue text-center items-center
}

.cart-header-action {
    @apply invisible md:visible col-span-1 text-sm uppercase text-blue text-center items-center
}

.cart-proceed-button {
    @apply w-full md:w-1/3 rounded-xl p-3 md:p-4 text-white bg-blue
}

.cart-footer-row {
    @apply flex flex-row md:grid-cols-6 mb-3 justify-end my-16  gap-4
}

.cart-footer-action {
    @apply flex-auto mx-4 text-sm uppercase text-blue text-center
}


.cart-header-action {
    @apply col-span-2
}
</style>
