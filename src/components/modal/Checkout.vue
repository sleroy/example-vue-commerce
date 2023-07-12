<template>
	<div :class="[openModal ? 'fixed flex' : 'hidden', 'modal']">
		<div class="modal-background"></div>
		<div class="modal-wrapper">
			<div class="bg-grey_light flex items-center justify-between rounded-t-2xl p-5">
				<p class="text-xl">{{ modalTitle }}</p>
				<button class="delete" aria-label="close" @click="closeModal(false)">X</button>
			</div>
			<section class="p-5 rounded-b-2xl">
				<div v-if="!isCheckoutSection">
					<div class="box" v-for="product in products" :key="product.id">
						<div>
							<p>{{ product.title }} {{ product.quantity > 0 ? ` - Quantity: ${product.quantity}` : '' }}</p>
							<p>{{ product.price }} &euro;</p>
						</div>
						<button class="rounded-xl p-3 text-white bg-red" @click="removeFromCart(product.id)">{{ removeLabel
						}}</button>
					</div>
					<div v-if="products.length === 0">
						<p>{{ cartEmptyLabel }}</p>
					</div>
				</div>
				<div v-if="isCheckoutSection">
					<p>You bought it :-)</p>
				</div>
			</section>
			<div class="m-4">
				<button v-show="products.length > 0 && !isCheckoutSection" class="rounded-xl p-3 bg-blue text-white w-full"
					@click="onNextBtn">{{ buyLabel }}</button>
				<button v-if="isCheckoutSection" class="rounded-xl p-3 bg-blue text-white w-full"
					@click="closeModal(true)">{{ closeLabel }}</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { ProductRepository } from '../../domain/products/ProductRepository';
import { SystemInfoRepository } from '../../domain/systeminfo/SystemInfoRepository';

const systemInfoRepository = new SystemInfoRepository()
const productRepository = new ProductRepository(systemInfoRepository);

const removeFromCartUC = usecase('remove-from-cart');
const checkoutUC = usecase('checkout');

// Access to the router
const modalTitle = ref('Checkout')
const removeLabel = ref('Remove from cart')
const cartEmptyLabel = ref('Your cart is empty')
const closeLabel = ref('Close')
const isCheckoutSection = ref(false)

const products = computed(() => {
	return productRepository.productsAdded();
})
const openModal = computed(() => {
	return systemInfoRepository.isOpenedCheckoutModal();
})

const buyLabel = computed(() => {
	const { totalProducts, productLabel, finalPrice } = productRepository.generateBuyStats();
	return `Buy ${totalProducts} ${productLabel} at ${finalPrice}€`;
})


function closeModal(reloadPage: boolean) {
	systemInfoRepository.showCheckoutModal(false)
	if (reloadPage) {
		systemInfoRepository.setCheckoutRequired(false)
		isCheckoutSection.value = false;
		console.log("Checkout is ", isCheckoutSection)
	}
}
function removeFromCart(id: string) {
	removeFromCartUC.execute(id)
}
function onNextBtn() {
	checkoutUC.execute().then((r: boolean) => {
		isCheckoutSection.value = r;
	})
}


</script>

<style lang="scss" scoped>
.box {
	@apply flex;
	@apply justify-between;
	@apply mb-3;
}
</style>
