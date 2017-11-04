<template>
  <div id="app">
    <ProgramGuide :programs="programs" class="program-guide"/>
  </div>
</template>

<script>
import ProgramGuide from './components/ProgramGuide'
import generateProgram from './generate-program.js'

export default {
  name: 'app',
  components: {
    ProgramGuide
  },
  data () {
    const channels = []
    for (let i = 1; i < 10; i++) {
      channels.push('ch' + i)
    }
    const programs = generateProgram(0, 60 * 24 * 2, channels)
    return {
      programs: programs
    }
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
