<template>
	<div :class="[openModal ? 'fixed flex' : 'hidden', 'modal']">
		<div class="modal-background"></div>
		<div class="modal-wrapper">
			<div class="bg-grey_light flex items-center justify-between rounded-t-2xl p-5">
				<p class="text-xl">{{ modalTitle }}</p>
				<button class="delete" aria-label="close" @click="closeModal(false)">X</button>
			</div>
			<CheckoutTable :modal="true"></CheckoutTable>
			<div class="m-4">
				<button v-show="products.length > 0" class="rounded-xl p-3 bg-blue text-white w-full" @click="onNextBtn">{{ buyLabel }}</button>
				<button v-show="products.length == 0" class="rounded-xl p-3 bg-blue text-white w-full" @click="closeModal(true)">{{ closeLabel }}</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { backend } from '@/domain/backend';
import CheckoutTable from "../checkout/CheckoutTable.vue";
import { useRouter } from 'vue-router';



// Access to the router
const router = useRouter()

const modalTitle = ref('Checkout')
const closeLabel = ref('Close')

const products = computed(() => {
	return backend.products.productsAdded();
})
const openModal = computed(() => {
	return backend.system.isOpenedCheckoutModal();
})

const buyLabel = computed(() => {
	const { totalProducts, productLabel, finalPrice } = backend.products.generateBuyStats();
	return `Buy ${totalProducts} ${productLabel} at ${finalPrice}€`;
})


function closeModal(reloadPage: boolean) {
	backend.system.showCheckoutModal(false)
	if (reloadPage) {
		backend.system.setCheckoutRequired(false)
	}
}
function onNextBtn() {
	backend.system.showCheckoutModal(false)
	router.push({name:"checkout"})
}

</script>

<style lang="scss" scoped>
.box {
	@apply flex;
	@apply justify-between;
	@apply mb-3;
}
</style>
