<template>
  <div class="m-4 p-4 text-center">
    <VmSearch></VmSearch>
  </div>
</template>

<script>
import VmSearch from '../search/Search.vue';

export default {
  name: 'VmSubheader',

  components: {
    VmSearch
  }
}
</script>
