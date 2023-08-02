<template>
  <nav class="flex justify-between sticky top-0 bg-white z-10 shadow-md px-3" role="navigation"
    aria-label="main navigation">
    <router-link :to="{ name: 'index' }" class="navbar-item">
      <h1 class="title w-40 h-12"></h1>
    </router-link>

    <div class="flex flex-row §items-center gap-4 py-6">    
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

import { usecase } from '@/domain/usecases/usecaseMap';
import { backend } from '../../domain/backend';

// Access to the router

const showDropdown = ref(false)


function closeDropdown() {
  setTimeout(() => {
    showDropdown.value = false;
  }, 100);
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
