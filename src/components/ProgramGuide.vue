<template>
  <div class="programguide">
    <div class="x-header">
      <div class="channels" ref="xHeader" @scroll="onScrollX">
        <div v-for="channel of channels" class="channel">{{ channel.name }}</div>
      </div>
    </div>
    <div class="y-header">
      <div class="days" ref="yHeader" @scroll="onScrollY">
        <div v-for="day of days" class="day">
          <div class="day-label">{{ day.beginTime }}</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="programs" ref="body" @scroll="onScrollXY" :style="bodyStyle">
        <div v-for="program of programs" :style="getStyle(program)" class="program">
          <div class="program-name" >{{ program.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramGuide',
  data () {
    const channels = []
    for (let i = 0; i < 10; i++) {
      channels.push({
        id: `ch${i}`,
        name: `Ch${i}`,
        description: `Channel ${i}`
      })
    }
    const days = []
    for (let i = 0; i < 10; i++) {
      days.push({
        id: `d${i}`,
        name: `Day ${i}`,
        description: `Day ${i}`,
        beginTime: 24 * i,
        duration: 24
      })
    }
    return {
      x: 0,
      y: 0,
      scroll: {
        x: 0, // pixel
        y: 0  // pixel
      },
      zoom: {}, // wanna make it "browser zoom friendly" instead of having its own zoom level
      offsetTime: 0,
      channels: channels,
      days: days,
      programs: [
        {
          id: 'p0',
          name: '番組0',
          description: '',
          channel: 'ch1',
          beginTime: '0',
          duration: ''
        },
        {
          id: 'p1',
          name: '番組1',
          description: '',
          channel: 'ch2',
          beginTime: '48',
          duration: '48'
        }
      ]
    }
  },
  computed: {
    bodyStyle () {
      return {
        width: this.bodyWidth + 'px',
        height: this.bodyHeight + 'px'
      }
    },
    bodyWidth () {
      return this.channels.length * 100
    },
    bodyHeight () {
      return this.days.length * 100
    }
  },
  watch: {
    x () {
      this.$refs.xHeader.scrollLeft = this.x
    },
    y () {

    }
  },
  methods: {
    getStyle (program) {
      const channelPos = this.getChannelPos(program)
      const dayPos = this.getDayPos(program)
      const style = {
        position: 'absolute',
        top: dayPos.top + 'px',
        left: channelPos.left + 'px',
        height: dayPos.height + 'px',
        width: channelPos.width + 'px'
      }
      console.debug(style)
      return style
    },
    getChannelPos (program) {
      const idx = this.channels.findIndex(function (c) { return c.id === program.channel })
      return {
        left: idx * 100,
        width: 100
      }
    },
    getDayPos (program) {
      const d = this.days.find(function (d) { return program.beginTime <= d.beginTime })
      console.debug(d)
      return {
        top: d.beginTime,
        height: 100
      }
    },
    onScrollX (event) {
      this.x = event.target.scrollLeft
      console.log(this.x)
    },
    onScrollY (event) {
      this.y = event.target.scrollTop
      console.log(this.y)
    },
    onScrollXY (event) {
      this.x = event.target.scrollLeft
      this.y = event.target.scrollTop
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.programguide {
  position: relative;
  width: 500px;
  height: 500px;
  background-color: lightblue;
}

.x-header {
  position: absolute;
  top: 0;
  left: 100px;
  width: 400px;
  height: 50px;
  background-color: lightseagreen;
}

.channels {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: auto;
}

.channel {
  flex-grow: 1;
  min-width: 100px;
  height: 100%;
  background-color:lightpink;
  box-sizing: border-box;
  border-left: 0.5px solid red;
  border-right: 0.5px solid red;
}

.days {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.day {
  flex-grow: 0;
  width: 100%;
  min-height: 100px;
  background-color:lightblue;
  box-sizing: border-box;
  border-top: 1px solid blue;
  border-bottom: 1px solid blue;
}

.day-label {
  position: sticky;
  top: 0px;
}

.y-header {
  position: absolute;
  top: 50px;
  left: 0px;
  width: 100px;
  height: 450px;
  background-color: lightblue;
}

.body {
  position: absolute;
  top: 50px;
  left: 100px;
  width: 400px;
  height: 450px;
  overflow: auto;
}

.programs {
}

.program {
  background-color: lightgray;
}

</style>
