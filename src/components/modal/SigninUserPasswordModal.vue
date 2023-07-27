<template>
  <div :class="[openModal ? 'fixed flex' : 'hidden', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-wrapper">
      <div class="bg-grey_light flex items-center justify-between rounded-t-2xl p-5">
        <p v-if="!isUserLoggedIn" class="text-xl">{{ modalTitle }}</p>
        <p v-if="isUserLoggedIn" class="text-xl">{{ modalTitleLoggedIn }}</p>
        <button class="delete" aria-label="close" @click="closeModal">X</button>
      </div>
      <form @submit="checkForm" action="#" method="post">
        <section class="p-5 rounded-b-2xl">
          <div>
            <div class="m-4">
              <input :class="[highlightEmailWithError ? 'input border-red' : 'input']" type="email"
                placeholder="youremail@email.com" name="emailName" v-model="email" @keyup="checkEmailOnKeyUp(email)" />
              <p v-if="highlightEmailWithError" class="text-red-500">{{ emailRequiredLabel }}</p>
            </div>
            <div class="m-4">
              <input :class="[highlightPasswordWithError ? 'input border-red' : 'input']" type="password"
                placeholder="********" name="passwordName" v-model="password" @keyup="checkPasswordOnKeyUp(password)" />
              <p v-if="highlightPasswordWithError" class="text-red-500">{{ passwordRequiredLabel }}</p>
            </div>
            <div class="m-4">
              <p v-if="loginError" class="text-red-500">{{ loginLbl }}</p>
            </div>
          </div>
          <div class="m-4">
            <button v-if="!isUserLoggedIn" type="submit" class="rounded-xl p-3 bg-blue text-white w-full">
            {{ loginBtnLabel }}</button>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { isValidEmail } from '@/assets/validators';
import { backend } from '@/domain/backend';
import { toErrorWithMessage } from '@/domain/utils/errors';

const signPwdUC = usecase('signin-password')

const modalTitle = ref('Log in')
const loginError = ref(false)
const loginLbl = ref("Login failed")

const modalTitleLoggedIn = ref('Welcome!')
const loginBtnLabel = ref('Log in')
const emailRequiredLabel = ref('Email required')
const passwordRequiredLabel = ref('Password required')
const emailNotValidLabel = ref('Valid email required')
const email = ref('')
const password = ref('')
const highlightEmailWithError = ref(null) as Ref<Boolean | null>
const highlightPasswordWithError = ref(null) as Ref<Boolean | null>
const isFormSuccess = ref(false)

const isUserLoggedIn = computed(() => {
  return backend.user.isUserLoggedIn();
})

const openModal = computed(() => {
  return backend.system.isOpenedSigninUserPasswordModal();
})

function closeModal() {
  backend.system.showSigninUserPasswordModal(false)
}

function checkForm(e: Event) {
  e.preventDefault();
  loginError.value = false
  loginLbl.value = "Login failed"
  if (email && password) {
    highlightEmailWithError.value = false;
    highlightPasswordWithError.value = false;
    isFormSuccess.value = true;
    signPwdUC.execute(email.value, password.value)
      .catch((err: any) => {        
        loginLbl.value = toErrorWithMessage(err).message
        loginError.value = true 
      });
  }

  if (!email) {
    highlightEmailWithError.value = true;

    if (email && !isValidEmail(email)) {
      emailRequiredLabel.value = emailNotValidLabel.value;
    }
  } else {
    highlightEmailWithError.value = false;
  }

  if (!password) {
    highlightPasswordWithError.value = true;
  } else {
    highlightPasswordWithError.value = false;
  }
}
function checkEmailOnKeyUp(emailValue: string) {
  if (emailValue && isValidEmail(emailValue)) {
    highlightEmailWithError.value = false;
  } else {
    highlightEmailWithError.value = true;

    if (!isValidEmail(emailValue)) {
      emailRequiredLabel.value = emailNotValidLabel.value;
    }
  }
}
function checkPasswordOnKeyUp(passwordValue: string) {
  if (passwordValue) {
    highlightPasswordWithError.value = false;
  } else {
    highlightPasswordWithError.value = true;
  }
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


