<template>
  <div id="app">
    <ProgramGuide class="program-guide"/>
  </div>
</template>

<script>
import ProgramGuide from './components/ProgramGuide'
import Preview from './components/Preview'

export default {
  name: 'app',
  components: {
    ProgramGuide,
    Preview
  }
}
</script>

<style>
html,body,#app {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.program-guide {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
