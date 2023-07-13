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
              <input :class="[highlightNameWithError ? 'input border-red' : 'input']" type="text" placeholder="Your Name"
                v-model="name" @keyup="checkNameOnKeyUp(name)" />
              <p v-if="highlightNameWithError" class="help text-red">{{ nameErrorLabel }}</p>
            </div>
            <div class="m-4">
              <input :class="[highlightEmailWithError ? 'input border-red' : 'input']" type="email"
                placeholder="youremail@email.com" name="emailName" v-model="email" @keyup="checkEmailOnKeyUp(email)" />
              <p v-if="highlightEmailWithError" class="help text-red">{{ emailErrorLabel }}</p>
            </div>
            <div class="m-4">
              <input :class="[highlightPasswordWithError ? 'input border-red' : 'input']" type="password"
                placeholder="********" v-model="password" @keyup="checkPasswordOnKeyUp(password)">
              <p v-if="highlightPasswordWithError" class="help text-red">{{ passwordErrorLabel }}</p>
            </div>
            <div class="m-4">
              <input :class="[highlightRepeatPasswordWithError ? 'input border-red' : 'input']" type="password"
                placeholder="********" v-model="repeatPassword" @keyup="checkRepeatPasswordOnKeyUp(repeatPassword)" />
              <p v-if="highlightRepeatPasswordWithError" class="help text-red">{{ notEqualErrorLabel }}</p>
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
            @click="closeModal">{{ btnRegisteredLabel }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, type Ref } from 'vue'
import { usecase } from '@/domain/usecases/usecaseMap';
import { SystemInfoRepository } from '../../domain/systeminfo/SystemInfoRepository';
import { UserInfoRepository } from '../../domain/userinfo/UserInfoRepository';
import { isValidEmail } from '@/assets/validators';
import { type SignUpResponse, type SignupForm } from '../../domain/usecases/SignupUsecase';

const userInfoRepository = new UserInfoRepository()
const systemInfoRepository = new SystemInfoRepository()

const signupUC = usecase('signup')

// Access to the router
const router = useRouter()
const route = useRoute()

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
const password = ref('')
const repeatPassword = ref('')
const highlightNameWithError = ref(null) as Ref<boolean | null>
const highlightEmailWithError = ref(null) as Ref<boolean | null>
const highlightPasswordWithError = ref(null) as Ref<boolean | null>
const highlightRepeatPasswordWithError = ref(null) as Ref<boolean | null>
const isFormSuccess = ref(false)

const isUserSignedUp = computed(() => {
  return userInfoRepository.isUserSignedUp();
})

const openModal = computed(() => { return systemInfoRepository.isOpenedSignupModal(); })

function closeModal() {
  systemInfoRepository.showSignupModal(false);
}

function checkForm(e: Event) {
  e.preventDefault();
  const form: SignupForm  = {
    name: name.value,
    email: email.value,
    password: password.value,
    repeatPassword: repeatPassword.value
  }
  const response: SignUpResponse = signupUC.execute(form)
  isFormSuccess.value = response.isFormSuccess
  highlightEmailWithError.value = response.highlightEmailWithError
  highlightNameWithError.value = response.highlightNameWithError
  highlightPasswordWithError.value = response.highlightPasswordWithError
  highlightRepeatPasswordWithError.value = response.highlightRepeatPasswordWithError
  if (response.emailNotValid) {
    emailErrorLabel.value = emailNotValidLabel.value
  } else if (response.highlightEmailWithError) {
    emailErrorLabel.value = emailRequiredLabel.value;
  }
  
  
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


