<script setup lang="ts">
import Products from '../components/Products.vue';
import { ref, reactive, computed, onMounted, defineProps, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCommerceStore } from '@/stores/commerce'
import type { Product } from '../domain/products/Product';
import { ProductRepository } from '../domain/products/ProductRepository';
import { usecase } from '@/domain/usecases/usecaseMap';

// Access to the router
const router = useRouter()
const route = useRoute()

function validate(params: any) {
    return /^\d+$/.test(params.id)
}

const product = ref({}) as Ref<Product>;
const selected = ref(1);
const quantityArray = reactive([] as number[]);
const productRepo = new ProductRepository();


onMounted(() => {
    product.value = productRepo.getProductById(route.params.id as string);
    selected.value = product.quantity;

    for (let i = 1; i <= 20; i++) {
        quantityArray.push(i);
    }
})

const isAddedBtn = computed(() => {
    return product.isAddedBtn;
});

// Usecases
const addToCartUC = usecase('add-to-cart');
const removeFromCartUC = usecase('remove-from-cart');
const saveToFavoriteUC = usecase('save-to-favorite');
const removeFromFavoriteUC = usecase('remove-from-favorite');
const selectQuantityUC = usecase('select-quantity');


function addToCart(id: string) {
    let data = {
        id: id,
        status: true
    }
    addToCartUC.execute(data)
    //productRepo.addToCart( id);
    //productRepo.setAddedBtn(data);
}

function removeFromCart(id: string) {
    let data = {
        id: id,
        status: false
    }
    //productRepo.removeFromCart(id);
    //productRepo.setAddedBtn(data);
    removeFromCartUC.execute(data)
}
function onSelectQuantity(id: string) {
    let data = {
        id: id,
        quantity: selected
    }
    selectQuantityUC.execute(data)
    //store.setQuantity(data);
}
function saveToFavorite(id: string) {
    saveToFavoriteUC.execute(id)
}
function removeFromFavourite(id: number) {
    removeFromFavoriteUC.execute(id)
}

</script>

<template>
    <Products :detail="true" :product="product" />
</template>
