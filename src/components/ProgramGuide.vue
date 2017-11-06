<template>
  <div class="programguide">
    <div class="header title-header"></div>
    <div class="header x-header" @scroll.passive="onScrollX" ref="xHeader">
      <div class="channels">
        <div v-for="channel of channels" class="channel">{{ channel.name }}</div>
      </div>
    </div>
    <div class="header y-header" @scroll.passive="onScrollY" ref="yHeader">
      <div class="days">
        <div v-for="day of days" class="day" :style="dayStyle">
          <div class="day-detail">
            <div class="day-label">{{ day.name }}</div>
          </div>
          <div class="times">
            <div v-for="time of times" class="time">
              {{ time }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="body" ref="body" @scroll.passive="onScrollXY">
      <div class="dividers" :style="bodyStyle">
        <div v-for="channel of channels" class="divider">
        </div>
      </div>
      <div class="programs" :style="bodyStyle">
        <div v-for="program of programs" :style="getStyle(program)" class="program">
          <div class="program-name" >{{ program.name }}</div>
          <div class="program-description" >{{ program.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramGuide',
  props: ['programs'],
  data () {
    const channels = []
    for (let i = 1; i < 10; i++) {
      channels.push({
        id: `ch${i}`,
        name: `Ch${i}`,
        description: `Channel ${i}`
      })
    }
    const channelIndices = {}
    for (let i = 0; i < channels.length; i++) {
      channelIndices[channels[i].id] = i
    }
    const days = []
    for (let i = 0; i < 2; i++) {
      days.push({
        id: `d${i}`,
        name: `Day ${i}`,
        description: `Day ${i}`,
        beginTime: 24 * 60 * i,
        duration: 24 * 60
      })
    }
    const times = []
    for (let i = 0; i < 24; i++) {
      const label = String(i).padStart(2, '0') + ':00'
      times.push(label)
    }
    const pxPerHour = 800
    return {
      // scrollPosition by pixel
      x: 0,
      y: 0,
      // to be initialized with DOM height
      height: null,
      width: null,
      xHeaderHeight: 50,
      yHeaderWidth: 100,
      // wanna make it "browser zoom friendly" instead of having its own zoom level
      zoom: {},
      // no offsetTime in the component itself. a converter is responsible for it.
      // offsetTime: 0,
      channels: channels,
      channelIndices: channelIndices,
      days: days,
      times: times,
      _pxPerHour: pxPerHour,
      _pxPerDay: pxPerHour * 24,
      moved: null
    }
  },
  mounted () {
    this.width = document.querySelector('.channels').offsetWidth
    this.height = document.querySelector('.days').offsetHeight
  },
  computed: {
    dayStyle () {
      return {
        height: this.$data._pxPerDay + 'px'
      }
    },
    bodyStyle () {
      return {
        width: this.bodyWidth + 'px',
        height: this.bodyHeight + 'px'
      }
    },
    bodyWidth () {
      return this.width - this.yHeaderWidth
    },
    bodyHeight () {
      return this.height - this.xHeaderHeight
    },
    visibleTimeTop () {
      return this.toTimeFromY(this.y)
    },
    visibleTimeBottom () {
      this.toTimeFromY(this.y + this.bodyHeight)
    }
  },
  watch: {
    x () {
      if (this.moved === 'xHeader') {
        this.$refs.body.scrollLeft = this.x
      } else {
        this.$refs.xHeader.scrollLeft = this.x
      }
      this.moved = null
    },
    y () {
      if (this.moved === 'yHeader') {
        this.$refs.body.scrollTop = this.y
      } else {
        this.$refs.yHeader.scrollTop = this.y
      }
      this.moved = null
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
      if (program.beginTime > this.visibleTimeBottom || program.beginTime + program.duration < this.visibleTimeTop) {
        style.display = 'none'
      }
      return style
    },
    getChannelPos (program) {
      const idx = this.channelIndices[program.channel]
      return {
        left: idx * 100,
        width: 100
      }
    },
    getDayPos (program) {
      return {
        top: this.toYFromTime(program.beginTime),
        height: this.toYFromTime(program.duration)
      }
    },
    onScrollX (event) {
      this.x = event.target.scrollLeft
      this.moved = 'xHeader'
    },
    onScrollY (event) {
      this.y = event.target.scrollTop
      this.moved = 'yHeader'
    },
    onScrollXY (event) {
      this.x = event.target.scrollLeft
      this.y = event.target.scrollTop
      this.moved = 'body'
    },
    toYFromTime (time) {
      return time * this.$data._pxPerDay / (60 * 24)
    },
    toTimeFromY (y) {
      return y * 60 * 24 / this.$data._pxPerDay
    },
    formatTime (time) {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.programguide {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
  background-color: #ddd;
  color: #222;
  overflow: hidden;
}

.header.title-header {
  position: absolute;
  width: 100px;
  height: 50px;
  z-index: 2;
  /* box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); */
}

.header {
  background-color: #2196F3;
  color: #fafafa;
  z-index: 1;
}

.x-header {
  position: absolute;
  top: 0;
  left: 100px;
  width: calc(100% - 100px);
  height: 50px;
  overflow: auto;
  box-shadow: 0 3px 6px -6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.x-header::-webkit-scrollbar {
  display: none;
}

.channels {
  width: max-content;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.channel {
  padding: 5px;
  flex-grow: 1;
  min-width: 100px;
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #fafafa;
}

.times {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.time {
  text-align: right;
  flex-grow: 1;
  padding: 2px;
  box-sizing: border-box;
  border-top: 1px solid #fafafa;
}

.days {
  display: flex;
  flex-direction: column;
  height: max-content;
}

.day {
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 500px;
  box-sizing: border-box;
  border-bottom: 1px solid #fafafa;
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
  height: calc(100% - 50px);
  overflow: auto;
  box-shadow: 3px 0 6px -6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.y-header::-webkit-scrollbar {
  display: none;
}

.body {
  position: absolute;
  top: 50px;
  left: 100px;
  width: calc(100% - 100px);
  height: calc(100% - 50px);
  overflow: auto;
}

.body::-webkit-scrollbar {
  display: none;
}

.programs {
  position: absolute;
}

.program {
  padding: 5px;
  background-color: #fafafa;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-bottom: 1px solid #444;
  overflow: hidden;
}

.program:hover {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.16), 0 4px 8px rgba(0,0,0,0.23);
  z-index: 1;
}

.program-name {
  text-align: left;
  font-weight: bold;
}

.program-description {
  text-align: left;
  font-size: 0.9em;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
}

.x-header {
  box-shadow: 0 3px 6px -6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.dividers {
  position: absolute;
  display: flex;
  flex-direction: row;
}

.divider {
  border-right: 1px solid #444;
  box-sizing: border-box;
  min-width: 100px;
  height: 100%;
}

</style>
