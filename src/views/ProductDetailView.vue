<script setup lang="ts">
import Products from '../components/Products.vue';
import { ref, reactive, onMounted, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '../domain/products/Product';
import { ProductRepository } from '../domain/products/ProductRepository';
import { SystemInfoRepository } from '@/domain/systeminfo/SystemInfoRepository';

// Access to the router
const route = useRoute()


const product = ref(undefined) as Ref<Product| undefined>;
const selected = ref(1);
const quantityArray = reactive([] as number[]);

const sysinfoRepo = new SystemInfoRepository();
const productRepo = new ProductRepository(sysinfoRepo);


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
