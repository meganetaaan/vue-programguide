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
        <div v-for="day of days" class="day">
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
      <div class="programs" :style="bodyStyle">
        <div v-for="program of programs" :style="getStyle(program)" class="program">
          <div class="program-name" >{{ program.name }}</div>
        </div>
      </div>
      <div class="dividers" :style="bodyStyle">
        <div v-for="channel of channels" class="divider">
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
    const times = []
    for (let i = 0; i < 24; i++) {
      const label = String(i).padStart(2, '0') + ':00'
      times.push(label)
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
      times: times,
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
      ],
      _pxPerDay: 500
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.bodyWidth = this.$refs.xHeader.getBoundingClientRect().width
      this.bodyHeight = this.$refs.yHeader.getBoundingClientRect().height
    })
  },
  computed: {
    bodyStyle () {
      return {
        width: this.bodyWidth + 'px',
        height: this.bodyHeight + 'px'
      }
    }
  },
  watch: {
    x () {
      this.$refs.xHeader.scrollLeft = this.x
      this.$refs.body.scrollLeft = this.x
    },
    y () {
      this.$refs.yHeader.scrollTop = this.y
      this.$refs.body.scrollTop = this.y
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
        top: this.toYFromTime(d.beginTime),
        height: this.toYFromTime(d.duration)
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
      console.log(`body: ${this.y}, ${this.x}`)
    },
    toYFromTime (time) {
      return time * this._pxPerDay / 24
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
  background-color: #fafafa;
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
  background-color: #ddd;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
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
