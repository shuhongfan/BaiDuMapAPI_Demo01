<template>
  <button
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'BaseButton'
})
export default class extends Vue {
  @Prop({ default: false }) private disabled!: boolean

  private handleClick(evt:Event) {
    this.$emit('click', evt)
  }
}
</script>
<style lang="scss" scoped>
  @import './index';
</style>
