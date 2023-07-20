<template>
  <div :class="[openModal ? 'fixed flex' : 'hidden', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-wrapper">
      <div class="bg-grey_light flex items-center justify-between rounded-t-2xl p-5">
        <p class="text-xl">Login using Google Auth provider</p>
      </div>
      <section class="p-5 rounded-b-2xl">
        <div class="m-4">
          <button type="button" class="rounded-xl p-3 bg-blue text-white w-full" @click="signin()">Sign in with Google</button>
        </div>
        <div class="m-4" v-if="signInError">
          <p class="text-red">{{ errorLabel }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { type SigninResponse } from '../../connectors/AuthenticationConnector';
import { backend } from '@/domain/backend';

const signinUC = usecase('signin')
const signInError = ref(false)
const errorLabel = ref("User could not sign in")

const openModal = computed(() => {
  return backend.system.isOpenedSigninModal();
})

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
  @apply text-red-500;
}

.fa-check {
  @apply text-green;
}
</style>


