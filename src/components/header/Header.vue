<template>
  <nav class="flex justify-between sticky top-0 bg-white z-10 shadow-md px-3" role="navigation"
    aria-label="main navigation">
    <router-link :to="{ name: 'index' }" class="navbar-item">
      <h1 class="title w-40 h-12"></h1>
    </router-link>

    <div class="flex flex-row §items-center gap-4 py-6">
      <div class="nav-category">Category 1</div>
      <div class="nav-category">Category 2</div>
      <div class="nav-category">Category 3</div>
      <div class="nav-category">Category 4</div>      
      <div class="nav-notifications">
        <button @click="enableNotifications">&#x1F50A;</button>
      </div>
      <div class="nav-cart">
        <div class="cursor-pointer" @click="showCheckoutModal">
          <span :class="[numProductsAdded > 0 ? 'visible' : 'invisible']">{{ numProductsAdded }}</span>
          <span class="nav-cart-label">
            <i class="fa fa-shopping-cart" :class="[numProductsAdded > 0 ? 'nav-cart-icon-selected' : 'nav-cart-icon']"></i>Cart
          </span>
        </div>
      </div>

      <div class="nav-login">
        <button cass="button" v-if="!isUserLoggedIn" @click="onShowDropdown">
          <span class="icon">
            <i class="fa fa-user pr-2"></i>
          </span>
            <span class="nav-category">Login</span>
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
          <button v-if="!isUserLoggedIn" class="button header-btn-signin" @click="showSigninModal">
            <span class="header-btn-lbl">{{ loginLabel }}</span>
            <i class="fa fa-sign-in"></i>
          </button>
          <button v-if="!isUserLoggedIn" class="button header-btn-signinpwd" @click="showSigninUserPasswordModal">
            <span class="header-btn-lbl">{{ passwordLabel }}</span>
            <i class="fa fa-sign-in"></i>
          </button>
          <button v-if="!isUserLoggedIn" class="button header-btn-signup" @click="showSignupModal">
            <span class="header-btn-lbl">{{ signupLabel }}</span>
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
import { backend } from '../../domain/backend';

// Access to the router

const showDropdown = ref(false)
const logoutLabel = ref('Log out')
const loginLabel = ref('Google Sign-in')
const passwordLabel = ref('Sign-in with password')
const signupLabel = ref('Sign up')
const wishlistLabel = ref('Wishlist')

const logoutUC = usecase('logout')


const numProductsAdded = computed(() => {
  return backend.products.getNumberOfProductsAdded();
});

const isUserLoggedIn = computed(() => {
  return backend.user.isUserLoggedIn();
})

const getUserName = computed(() => {
  return backend.user.getUserNameOrDefault();
});


function closeDropdown() {
  setTimeout(() => {
    showDropdown.value = false;
  }, 100);
}
function showCheckoutModal() {
  backend.system.showCheckoutModal(true);
}

function showSigninUserPasswordModal() {
  backend.system.showSigninUserPasswordModal(true);
}

function showSigninModal() {
  backend.system.showSigninModal(true);
}

function showSignupModal() {
  backend.system.showSignupModal(true);
}

function onShowDropdown() {
  showDropdown.value = !showDropdown.value
}

function logout() {
  logoutUC.execute()
}

function enableNotifications() {
  backend.system.enableNotifications();
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

.header-btn-signin {
  @apply text-xs
}

.header-btn-signinpwd {
  @apply text-xs
}

.header-btn-signup {
  @apply text-xs
}

.header-btn-lbl {

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

.nav-products-number {
  @apply py-2 px-2 bg-blue text-white rounded-md text-xs
}

.nav-category {
  @apply text-grey_dark text-xs uppercase font-light 
}

.nav-login {
  @apply text-grey_dark text-xs uppercase font-light
}

.nav-notifications {
  @apply align-middle justify-center text-sm
}

.nav-cart {
  @apply text-grey_dark text-xs uppercase font-light 
}

.nav-cart-icon {
  @apply pr-1
}

.nav-cart-icon-selected {
  @apply text-blue pr-1
}

.nav-products-number {

}
</style>
