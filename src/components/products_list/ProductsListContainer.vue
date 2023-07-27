<template>
  <div class="m-5">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="product in products" :key="product.id">
        <VmProducts :detail="false" :product="product" />
      </div>
    </div>
    <div class="text-center" v-if="products.length === 0">
      <h2 class="text-2xl">{{ noProductLabel }}</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import VmProducts from '../Products.vue';
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { getByTitle } from '@/assets/filters';
import { backend } from '@/domain/backend';

// Access to the router
const router = useRouter()
const route = useRoute()

const id = ref('')
const noProductLabel = ref('No product found')

const products = computed(() => {
  const products = backend.products.products
  const hasSearched = backend.system.hasSearched()
  if (hasSearched) {
    return getProductByTitle();
  } else {
    return products;
  }
});

function getProductByTitle() {
  const products = backend.products.products
  const productTitleSearched = backend.system.getProductTitleSearched()

  return getByTitle(products, productTitleSearched);
}

</script>
