<template>
  <div id="app">
    <ProgramGuide/>
  </div>
</template>

<script>
import ProgramGuide from './components/ProgramGuide'

export default {
  name: 'app',
  components: {
    ProgramGuide
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
