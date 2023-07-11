<script setup lang="ts">
import Products from '../components/Products.vue';
import { ref, reactive, computed, onMounted, type Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Product } from '../domain/products/Product';
import { ProductRepository } from '../domain/products/ProductRepository';
import { usecase } from '@/domain/usecases/usecaseMap';

// Access to the router
const route = useRoute()


const product = ref(undefined) as Ref<Product| undefined>;
const selected = ref(1);
const quantityArray = reactive([] as number[]);
const productRepo = new ProductRepository();


onMounted(() => {
    product.value = productRepo.getProductById(route.params.id as string);
    if (product.value) {
        selected.value = product.value.quantity;
    }

    for (let i = 1; i <= 20; i++) {
        quantityArray.push(i);
    }
})


</script>

<template>
    <Products :detail="true" :product="product" />
</template>
