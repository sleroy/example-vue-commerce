<template>
  <nav class="flex justify-between sticky top-0 bg-white z-10 shadow-md px-3" role="navigation"
    aria-label="main navigation">
    <router-link :to="{ name: 'index' }" class="navbar-item">
      <h1 class="title w-40 h-12"></h1>
    </router-link>

    <div class="flex items-center">
        <div class="mx-2">
          <button class="button bg-blue" @click="enableNotifications">Enable notifications</button>        
        </div>
        <div class="mx-2">
        <div class="cursor-pointer" @click="showCheckoutModal">
          <span :class="[numProductsAdded > 0 ? 'p-2 bg-blue text-white rounded-md' : '']">{{ numProductsAdded }}</span>
          <span class="icon">
            <i class="fa fa-shopping-cart"></i>
          </span>
        </div>
      </div>

      <div class="mx-2">
        <button v-if="!isUserLoggedIn" @click="onShowDropdown">
          <span class="icon">
            <i class="fa fa-user"></i>
          </span>
        </button>
        <button class="cursor-pointer" v-if="isUserLoggedIn" @click="onShowDropdown">
          Welcome {{ getUserName }}
        </button>
        <div v-if="showDropdown && isUserLoggedIn" class="dropdown w-52 h-28">
          <router-link :to="{ name: 'user-wishlist' }" class="button text-center">
            <span class="text-lg">{{ wishlistLabel }}</span>
          </router-link>
          <button @click="logout" class="button">
            <span class="text-lg">{{ logoutLabel }}</span>
          </button>
        </div>
          <div v-if="showDropdown && !isUserLoggedIn" class="dropdown">
          <button v-if="!isUserLoggedIn" class="button" @click="showSigninModal">
            <span class="text-lg">Already registered?<br /> {{ loginLabel }}</span>
            <i class="fa fa-sign-in"></i>
          </button>
          <button v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
            <span class="text-lg">Password sign-in<br /> {{ passwordLabel }}</span>
            <i class="fa fa-sign-in"></i>
          </button>
          <button v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
            <span class="text-lg">New User?<br /> {{ signupLabel }}</span>
            <i class="fa fa-user-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { ProductRepository } from '../../domain/products/ProductRepository';
import { SystemInfoRepository } from '../../domain/systeminfo/SystemInfoRepository';
import { UserInfoRepository } from '../../domain/userinfo/UserInfoRepository';
import { obtainRemoteNotifications } from '../../adapters/AdapterStrategy';

// Access to the router

const showDropdown = ref(false)
const logoutLabel = ref('Log out')
const loginLabel = ref('Log in')
const passwordLabel = ref('Log in with pwd')
const signupLabel = ref('Sign up')
const wishlistLabel = ref('Wishlist')

const logoutUC = usecase('logout')

const systemRepository: SystemInfoRepository = new SystemInfoRepository();
const productRepository = new ProductRepository();
const userInfoRepository = new UserInfoRepository();


const numProductsAdded = computed(() => {
  return productRepository.getNumberOfProductsAdded();
});

const isUserLoggedIn = computed(() => {
  return userInfoRepository.isUserLoggedIn();
})

const getUserName = computed(() => {
  return userInfoRepository.getUserNameOrDefault();
});


function closeDropdown() {
  setTimeout(() => {
    showDropdown.value = false;
  }, 100);
}
function showCheckoutModal() {
  systemRepository.showCheckoutModal(true);
}

function showLoginModal() {
  systemRepository.showLoginModal(true);
}

function showSigninModal() {
  systemRepository.showSigninModal(true);
}

function showSignupModal() {
  systemRepository.showSignupModal(true);
}

function onShowDropdown() {
  showDropdown.value = !showDropdown
}

function logout() {
  logoutUC.execute()
}

function enableNotifications() {
  systemRepository.enableNotifications();
}

onMounted(() => {
  window.addEventListener("blur", closeDropdown, true);
})

onUnmounted(() => {
  window.removeEventListener("blur", closeDropdown);
})

</script>

<style lang="scss" scoped>
.title {
  background: url('/myshop.png') no-repeat;
  background-position: 50% 50%;
  background-size: 165px;
}

.dropdown {
  @apply absolute;
  @apply p-3;
  @apply bg-white;
  @apply right-0;
  @apply shadow-lg;
  @apply rounded-xl;
  @apply flex;
  @apply flex-col;
  @apply border-2;
  @apply border-grey_light;
}

.button {
  @apply w-full;
  @apply hover:bg-grey_light;
  @apply p-2;
  @apply rounded-lg;
}
</style>
