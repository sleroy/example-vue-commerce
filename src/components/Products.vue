<template>
  <div :class="[detail ? 'detail' : '']" class="rounded-2xl shadow-custom bg-white p-4">
    <div class="img-wrapper rounded-t-2xl">
      <router-link :to="{
        name: 'product_detail-id',
        params: {
          id: product.id,
          title: product.title,
          price: product.price,
          rating: product.ratings,
          reviews: product.reviews,
          isAddedBtn: product.isAddedBtn
        }
      }">
        <img class="rounded-2xl" :src="picture" alt="Placeholder image">
      </router-link>
    </div>
    <div class="text-wrapper p-4">
      <div class="flex items-center justify-between mb-3">
        <div class="media-content">
          <router-link :to="{
            name: 'product_detail-id',
            params: {
              id: product.id,
              title: product.title,
              price: product.price,
              rating: product.ratings,
              reviews: product.reviews,
              isAddedBtn: product.isAddedBtn
            }
          }">
            <span :class="[detail ? 'text-3xl' : 'text-lg']" class="font-medium">{{ product.title }}</span>
          </router-link>
        </div>
        <button class="button text-lg" :title="removeFromFavouriteLabel" v-show="product.isFavourite"
          @click="removeFromFavourite(product.id)">
          <span class="icon">
            <i class="fas fa-heart text-red"></i>
          </span>
        </button>
        <button class="button text-lg" :title="addToFavouriteLabel" v-show="!product.isFavourite"
          @click="saveToFavorite(product.id)">
          <span class="icon">
            <i class="far fa-heart text-red"></i>
          </span>
        </button>
      </div>
      <div class="content is-clearfix">
        <p :class="[detail ? 'text-2xl' : 'text-base']">{{ product.description }}</p>
        <div class="flex justify-between">
          <div class="flex items-center">
            <i v-for="(item, index) in product.ratings" :key="`stars-${index}`" class="fa fa-star text-gold"></i>
            <p class="ml-2 text-lg">{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</p>
          </div>
          <p class="text-3xl font-medium">
            <strong>&euro; {{ product.price }}</strong>
          </p>
        </div>
        <div class="flex justify-between mt-5 items-center">
          <select class="p-2 border-2 rounded-2xl" @change="onSelectQuantity(product.id)" v-model="selected">
            <option v-bind:key="quantity" v-for="quantity in quantityArray" :value="quantity">
              {{ quantity }}
            </option>
          </select>
          <button class="rounded-xl p-3 bg-blue text-white" v-if="!product.isAddedToCart"
            @click="addToCart(product.id)">{{ addToCartLabel }}</button>
          <button class="rounded-xl p-3" v-if="product.isAddedToCart" @click="removeFromCart(product.id, false)">{{
            removeFromCartLabel }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, reactive, computed, onMounted, defineProps, ReactiveEffect } from 'vue'
import { UserInfoRepository } from '../domain/userinfo/UserInfoRepository';
import { usecase } from '../domain/usecases/usecaseMap';

const props = defineProps({
  product: Object,
  detail: Boolean
})

const addToCartLabel = ref('Add to cart')
const removeFromCartLabel = ref('Remove from cart')
const addToFavouriteLabel = ref('Add to favourite')
const removeFromFavouriteLabel = ref('Remove from favourite')
const selected = ref(1)
const quantityArray = reactive([]) as number[] // Reactive is for objects and arra

const picture = computed( () => { return (props.product && props.product.image) ? props.product.image : 'https://bulma.io/images/placeholders/1280x960.png'})

const userInfoRepo = new UserInfoRepository();

const addToCartUC = usecase('add-to-cart');
const removeFromCartUC = usecase('remove-from-cart');
const saveToFavoriteUC = usecase('save-to-favorite');
const removeFromFavoriteUC = usecase('remove-from-favorite');
const selectQuantityUC = usecase('select-quantity');


onMounted(() => {
  for (let i = 1; i <= 20; i++) {
    quantityArray.push(i);
  }

  if (props.product && props.product.quantity > 1) {
    selected.value = props.product.quantity;
  }
})

function addToCart(id: number) {
  addToCartUC.execute(id)
}

function removeFromCart(id: number) {
  removeFromCartUC.execute(id)
}

function saveToFavorite(id: number) {
  saveToFavoriteUC.execute(id)  
}
function removeFromFavourite(id: number) {
  removeFromFavoriteUC.execute(id)
}

function onSelectQuantity(id: number) {
  selectQuantityUC.execute(id, selected)
}
</script>

<style lang="scss" scoped>
.detail {
  @apply flex;
  @apply flex-col;
  @apply lg:flex-row;
  @apply m-5;
  @apply shadow-2xl;

  .img-wrapper {
    flex: 1;

    img {
      @apply lg:rounded-none;
      @apply lg:rounded-tl-2xl;
      @apply lg:rounded-bl-2xl;
    }
  }

  .text-wrapper {
    flex: 2;
  }
}
</style>
