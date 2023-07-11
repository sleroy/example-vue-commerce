<template>
  <div :class="[openModal ? 'fixed flex' : 'hidden', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-wrapper">
      <div class="bg-grey_light flex items-center justify-between rounded-t-2xl p-5">
        <p class="text-xl">Sign-in</p>
      </div>
      <section class="p-5 rounded-b-2xl">
        <div>
          <div class="m-4">
            <p>Authentication using your Google account</p>
          </div>
        </div>
        <div class="m-4">
          <button type="submit" class="rounded-xl p-3 bg-blue text-white w-full">Sign in</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, type Ref } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { SystemInfoRepository } from '../../domain/systeminfo/SystemInfoRepository';
import { UserInfoRepository } from '../../domain/userinfo/UserInfoRepository';

const userInfoRepository = new UserInfoRepository()
const systemInfoRepository = new SystemInfoRepository()

const signinUC = usecase('signin')

// Access to the router
const router = useRouter()
const route = useRoute()

const openModal = computed(() => {
  return systemInfoRepository.isOpenedLoginModal();
})

function closeModal() {
  systemInfoRepository.showLoginModal(false)
}

function checkForm(e: Event) {
  e.preventDefault();
  signinUC.execute();  

}
</script>

<style lang="scss">
.fa-exclamation-circle {
  @apply text-red;
}

.fa-check {
  @apply text-green;
}
</style>


