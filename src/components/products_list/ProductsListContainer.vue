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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCommerceStore } from '@/stores/commerce'
import { getByTitle } from '@/assets/filters';
import { ProductRepository } from '../../domain/products/ProductRepository';
import { UserInfoRepository } from '../../domain/userinfo/UserInfoRepository';
import { SystemInfoRepository } from '@/domain/systeminfo/SystemInfoRepository';

// Access to the router
const router = useRouter()
const route = useRoute()

const id = ref('')
const noProductLabel = ref('No product found')

const systemInfoRepo = new SystemInfoRepository()
const productRepo = new ProductRepository()
const userInfo = new UserInfoRepository();

const products = computed(() => {
  const products = productRepo.products
  const hasSearched = userInfo.hasSearched()
  if (hasSearched) {
    return getProductByTitle();
  } else {
    return products;
  }
});

function getProductByTitle() {
  const products = productRepo.products
  const productTitleSearched = userInfo.getProductTitleSearched()

  return getByTitle(products, productTitleSearched);
}

</script>
