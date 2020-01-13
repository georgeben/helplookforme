<template>
  <progress
    class="w-full h-2"
    max="100"
    :value="progressValue"
  ></progress>
</template>

<script>
export default {
  name: 'progress-bar',
  props: {
    progressValue: {
      type: Number,
    }
  }
}
</script>

<style>
progress[value]::-webkit-progress-bar {
  background-color: #dbdcdc;
}
progress[value]::-moz-progress-bar {
  background-color: #dbdcdc;
}

progress[value]::-webkit-progress-value {
  background: linear-gradient(90deg, #308894 53.33%, #67d9bc 100%);
}

progress[value]::-moz-progress-bar {
  background: linear-gradient(90deg, #308894 53.33%, #67d9bc 100%);
}
</style>