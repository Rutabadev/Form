<template>
  <div class="form">
    <h2>Form</h2>
    <p>{{ msg }}</p>
    <div class="panels">
      <Inputs></Inputs>
      <Rules></Rules>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Inputs from '@/components/Inputs.vue'
import Rules from '@/components/Rules.vue'

@Component({
  name: 'form',
  components: {
    Inputs,
    Rules
  }
})
export default class Form extends Vue {
  private msg: string = 'Ok les gars';
}
</script>

<style lang="scss">
  .form {
    .panels {
      display: flex;
      justify-content: space-around;
    }
  }
</style>
