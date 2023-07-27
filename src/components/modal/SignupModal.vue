<template>
  <div :class="[openModal ? 'fixed flex' : 'hidden', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-wrapper">
      <div class="bg-grey_light flex items-center justify-between rounded-t-2xl p-5">
        <p v-if="!isUserSignedUp" class="text-xl">{{ modalTitle }}</p>
        <p v-if="isUserSignedUp" class="text-xl">{{ modalTitleRegistered }}</p>
        <button class="delete" aria-label="close" @click="closeModal">X</button>
      </div>
      <form @submit="checkForm" action="#" method="post">
        <section class="p-5 rounded-b-2xl">
          <div v-if="!isUserSignedUp">
            <div class="m-4">
              <input :class="[highlightNameWithError ? 'input border-red-500' : 'input']" type="text" placeholder="Your Name"
                v-model="name" @keyup="checkNameOnKeyUp(name)" />
              <p v-if="highlightNameWithError" class="help text-red-500">{{ nameErrorLabel }}</p>
            </div>
            <div class="m-4">
              <input :class="[highlightEmailWithError ? 'input border-red-500' : 'input']" type="email"
                placeholder="youremail@email.com" name="emailName" v-model="email" @keyup="checkEmailOnKeyUp(email)" />
              <p v-if="highlightEmailWithError" class="help text-red-500">{{ emailErrorLabel }}</p>
            </div>
            <div class="m-4">
              <input :class="[highlightPasswordWithError ? 'input border-red-500' : 'input']" type="password"
                placeholder="********" v-model="password" @keyup="checkPasswordOnKeyUp(password)">
              <p v-if="highlightPasswordWithError" class="help text-red-500">{{ passwordErrorLabel }}</p>
            </div>
            <div class="m-4">
              <input :class="[highlightRepeatPasswordWithError ? 'input border-red-500' : 'input']" type="password"
                placeholder="********" v-model="repeatPassword" @keyup="checkRepeatPasswordOnKeyUp(repeatPassword)" />
              <p v-if="highlightRepeatPasswordWithError" class="help text-red-500">{{ notEqualErrorLabel }}</p>
            </div>
            <div class="m-4" v-if="errorMessage">              
              <p class="help text-red-500">{{ errorMessage }}</p>
            </div>
          </div>
          <div v-if="isUserSignedUp">
            <div class="text-center">
              <div>
                <p class="text-4xl">Welcome {{ name }}!</p>
                <p class="text-2xl">Now you are a member</p>
              </div>
            </div>
          </div>
        </section>
        <div class="m-4">
          <button v-if="!isUserSignedUp" class="rounded-xl p-3 bg-blue text-white w-full">{{ primaryBtnLabel }}</button>
          <button v-if="isUserSignedUp" type="button" class="rounded-xl p-3 bg-grey_light text-grey_dark"
            @click="redirectLogin">{{ btnRegisteredLabel }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { isValidEmail } from '@/assets/validators';
import { type SignUpFormResponse, type SignupForm } from '../../domain/usecases/SignupUsecase';
import { backend } from '@/domain/backend';
import { toErrorWithMessage } from '../../domain/utils/errors';

const signupUC = usecase('signup')


// Access to the router

const modalTitle = ref('Sign up')
const modalTitleRegistered = ref('Welcome ')
const primaryBtnLabel = ref('Sign up')
const btnRegisteredLabel = ref('Close')
const notEqualErrorLabel = ref('Passwords must be equal')
const passwordErrorLabel = ref('Password required')
const nameErrorLabel = ref('Name required')
const emailRequiredLabel = ref('Email required')
const emailNotValidLabel = ref('Valid email required')
const emailErrorLabel = ref(emailRequiredLabel.value)

const name = ref('')
const email = ref('')
const errorMessage = ref('')
const password = ref('')
const repeatPassword = ref('')
const highlightNameWithError = ref(null) as Ref<boolean | null>
const highlightEmailWithError = ref(null) as Ref<boolean | null>
const highlightPasswordWithError = ref(null) as Ref<boolean | null>
const highlightRepeatPasswordWithError = ref(null) as Ref<boolean | null>
const isFormSuccess = ref(false)

const isUserSignedUp = ref(false)

const openModal = computed(() => { return backend.system.isOpenedSignupModal(); })



function closeModal() {
  backend.system.showSignupModal(false);

}

function redirectLogin() {
  closeModal()
  backend.system.showLoginModal(true)
}

function checkForm(e: Event) {
  e.preventDefault();
  errorMessage.value = ""
  const form: SignupForm  = {
    name: name.value,
    email: email.value,
    password: password.value,
    repeatPassword: repeatPassword.value
  }
  signupUC.execute(form).then((response: SignUpFormResponse) => {
    isFormSuccess.value = response.isFormSuccess
    highlightEmailWithError.value = response.highlightEmailWithError
    highlightNameWithError.value = response.highlightNameWithError
    highlightPasswordWithError.value = response.highlightPasswordWithError
    highlightRepeatPasswordWithError.value = response.highlightRepeatPasswordWithError
    errorMessage.value = response.errorMessage
    
    isUserSignedUp.value = isFormSuccess.value

    if (response.emailNotValid) {
      emailErrorLabel.value = emailNotValidLabel.value
    } else if (response.highlightEmailWithError) {
      emailErrorLabel.value = emailRequiredLabel.value;
    }
  }).catch((e: unknown) => {
    errorMessage.value = toErrorWithMessage(e).message
  })
  

  
}

function checkNameOnKeyUp(nameValue: any) {
  if (nameValue) {
    highlightNameWithError.value = false;
  } else {
    highlightNameWithError.value = true;
  }
}

function checkEmailOnKeyUp(emailValue:string) {
  if (emailValue && isValidEmail(emailValue)) {
    highlightEmailWithError.value = false;
  } else {
    highlightEmailWithError.value = true;

    if (!isValidEmail(emailValue)) {
      emailErrorLabel.value = emailNotValidLabel.value;
    }
  }
}
function checkPasswordOnKeyUp(passwordValue: string) {
  if (passwordValue) {
    highlightPasswordWithError.value = false;

    if (repeatPassword.value === password.value) {
      highlightRepeatPasswordWithError.value = false;
    } else {
      highlightRepeatPasswordWithError.value = true;
    }
  } else {
    highlightPasswordWithError.value = true;
  }
}

function checkRepeatPasswordOnKeyUp(repeatPasswordValue: string) {
  if (repeatPasswordValue) {
    if (repeatPasswordValue === password.value) {
      highlightRepeatPasswordWithError.value = false;
    } else {
      highlightRepeatPasswordWithError.value = true;
    }
  } else {
    highlightRepeatPasswordWithError.value = true;
  }
}
</script>

<style lang="scss" scoped>
.fa-exclamation-circle {
  color: red;
}

.fa-check {
  color: green;
}
</style>


