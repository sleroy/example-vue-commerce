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
          <button type="button" class="rounded-xl p-3 bg-blue text-white w-full" @click="signin()">Sign in</button>
          <button type="button" class="rounded-xl mt-3 p-3 bg-grey_dark text-white w-full" @click="signinPassword()">Sign in with password</button>
        </div>
        <div class="m-4" v-if="signInError">
          <p class="text-red">{{ errorLabel }}</p>
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
import { type SigninResponse } from '../../connectors/AuthenticationConnector';

const userInfoRepository = new UserInfoRepository()
const systemInfoRepository = new SystemInfoRepository()

const signinUC = usecase('signin')

// Access to the router
const router = useRouter()
const route = useRoute()

const signInError = ref(false)
const errorLabel = ref("User could not sign in")

const openModal = computed(() => {
  return systemInfoRepository.isOpenedSigninModal();
})

function closeModal() {
  systemInfoRepository.showSigninModal(false)
}


function signinPassword() {
  systemInfoRepository.showSigninModal(false)
  systemInfoRepository.showLoginModal(true)  
}


function signin() {
  signInError.value = false
  signinUC.execute()
    .then((res: SigninResponse) => {
      signInError.value = res.success
      errorLabel.value = res.errorReason
    })
    .catch((e: SigninResponse) => {
      signInError.value = true;
      errorLabel.value = e.errorReason;
    })
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


