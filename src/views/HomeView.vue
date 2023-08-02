<script setup lang="ts">
import VmHero from '@/components/hero/Hero.vue';
import VmSubheader from '@/components/subheader/Subheader.vue'
import Calculator from '@/domain/calculator/Calculator'
import { TeamMember } from '@/domain/calculator/Team';
import { Events, eventbus, registerEventHandler } from '@/domain/eventBus';
import { ErrorCodes, reactive, ref } from 'vue';
import type { Budget, SingleLineBudget } from '@/domain/calculator/Budget';


const started = ref(false)
const message = ref("")
const budgets = reactive([]) as Budget[]
const errors = reactive([]) as string[]

function onCalcStartedEvent(e: any) {
  started.value = true
}

function onCalcTerminatedEvent(e: any) {
  started.value = false
}

function onBudgetReceived(e: any) {
  const budget: Budget = e;
  budgets.push(budget)
}

function handleError(e: any) {
  errors.push(`Cannot compute price for ${e.origin} to ${e.target}`)
}

function onFlightComputed(e: any) {
  const budget: SingleLineBudget = e;
  message.value = `For ${budget.member.location} to ${e.offsite.country} will cost ${e.budget}€`
}



registerEventHandler(Events.calc_started, onCalcStartedEvent)
registerEventHandler(Events.calc_terminated, onCalcTerminatedEvent)
registerEventHandler(Events.calc_new_offsite, onBudgetReceived)
registerEventHandler(Events.calc_new_line_budget, onFlightComputed)
registerEventHandler(Events.error, handleError)


function findMyOffsite() {
  const calc = new Calculator(eventbus)
  const team = {
    members: [
      new TeamMember("Paris", 6, "PAR"),
      new TeamMember("Dublin", 1, "DUB"),
      new TeamMember("UK", 8, "SOU"),
      new TeamMember("Germany", 2, "MUC"),
      new TeamMember("Austria", 2, "VIE"),
      new TeamMember("Poland", 1, "WAW"),
      new TeamMember("Switzerland", 1, "GVA"),
      new TeamMember("NBB", 8, "AMS"),
      new TeamMember("Dubai", 2, "DXB"),
      new TeamMember("South Africa", 1, "CPT"),
      new TeamMember("Luxembourg", 1, "LUX"),
    ]
  }

  const offsites = [
    {
      country: "Switzerland",
      city: "Zurich",
      closestAirport: "ZRH"
    },
    {
      country: "Poland",
      city: "Warsaw",
      closestAirport: "WAW"
    },
    {
      country: "Austria",
      city: "Vienna",
      closestAirport: "VIE"
    }
  ]
  calc.compute(team, offsites)
  
}
</script>
<template>
    <VmHero />
    <VmSubheader />
    <div class="flex h-full">
      <main class="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
        <div class="flex w-full mx-auto px-6 py-8">
          <div class="flex flex-col w-full h-full text-gray-900 text-xl border-4 border-gray-900 border-dashed">
            <div class="flex w-full max-w-xl h-40 items-center justify-center mx-auto bg-green border-b border-gray-600" v-if="started">
                <h3>Started...</h3>
            </div>
            <div class="flex w-full max-w-xl h-20 items-center justify-center mx-auto bg-blue border-b border-gray-600" v-if="message">
                <h3>{{ message }}</h3>
            </div>
            <div class="flex w-full max-w-xl items-center justify-center mx-auto bg-red-400 border-b border-gray-600" v-for="error of errors">
                <h3>{{ error }}</h3>
            </div>
            <div class="flex w-full max-w-xl h-40 items-center justify-center mx-auto bg-gray-400 border-b border-gray-600">
                <button @click="findMyOffsite">Find my offsite</button>

            </div>
          
          </div>
        </div>
      </main>
      <nav class="flex w-72 h-full bg-yellow-400">
        <div class="w-full flex mx-auto px-6 py-8">
          <div class="w-full h-full flex items-center justify-center text-gray-900 text-xl ">
            <ul class="country-selection-list">
                <li class="country-selection-item" v-for="b of budgets">
                  <span class="country-selection-name">{{b.offsite.country}}</span>
                  <span class="country-selection-budget">{{String(b.budget)}}</span>
                </li>                
            </ul>
        </div>
        </div>
      </nav>
    </div>
</template>
<style lang="scss">

.country-selection-name {
    @apply mr-4
}

.country-selection-budget {
    @apply text-blue
}


::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(13deg, #7bcfeb 14%, #e685d3 64%);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(13deg, #c7ceff 14%, #f9d4ff 64%);
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: inset 7px 10px 12px #f0f0f0;
  }

  /* Always set the map height explicitly to define the size of the div
 * element that contains the map. */
#gmp-map {
  height: 100%;
}
</style>