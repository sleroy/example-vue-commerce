<template>
	<input class="input" type="search" v-model="value" :placeholder="placeholder" @keyup="search(value)" />
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { usecase } from '../../domain/usecases/usecaseMap';
// Access to the router
const router = useRouter()
const route = useRoute()

const value = ref('');

const searchProductUC = usecase('search-product')

const placeholder = computed(() => {
	if (route.path === '/wishlist') {
		return 'Search in wishlist...';
	} else {
		return 'Search...';
	}
});

function search(value: string) {
	searchProductUC.execute(value);	
}

</script>

