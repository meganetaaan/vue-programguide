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
        beginTime: 24 * 60 * i,
        duration: 24 * 60
      })
    }
    const times = []
    for (let i = 0; i < 24; i++) {
      const label = String(i).padStart(2, '0') + ':00'
      times.push(label)
    }
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
      offsetTime: 0,
      channels: channels,
      days: days,
      times: times,
      programs: [
        {
          id: 'p0',
          name: 'vegan wolf',
          description: "vegan wolf craft beer dreamcatcher shabby chic tattooed meh 90's cornhole letterpress semiotics Cosby sweater roof party Echo Park Thundercats XOXO small batch sartorial Brooklyn narwhal twee banjo beard viral Banksy ennui readymade try-hard Kickstarter iPhone organic drinking vinegar Blue Bottle banh mi brunch photo booth squid Carles hoodie pour-over heirloom artisan retro whatever before they sold out deep v lomo Intelligentsia 8-bit pickled tote bag leggings Neutra chia PBR Tonx vinyl slow-carb asymmetrical pop-up chillwave next level ugh chambray Williamsburg selvage authentic kale chips Wes Anderson flexitarian PBR&B hashtag four loko Bushwick McSweeney's jean shorts Pitchfork fixie hella cray wayfarers mustache High Life Odd Future art party food truck mlkshk cliche DIY VHS cardigan American Apparel bicycle rights keffiyeh butcher gluten-free bespoke pug aesthetic literally +1 distillery umami occupy farm-to-table cred sustainable crucifix selfies Marfa Godard raw denim synth single-origin coffee Etsy scenester blog locavore Austin trust fund church-key fingerstache tofu gentrify kogi post-ironic keytar stumptown disrupt kitsch seitan 3 wolf moon put a bird on it gastropub actually sriracha you probably haven't heard of them bitters paleo tousled pork belly forage biodiesel yr street art Vice master cleanse Pinterest Helvetica messenger bag mumblecore plaid quinoa Schlitz skateboard fap mixtape Tumblr ethical fanny pack polaroid lo-fi typewriter salvia normcore swag freegan Truffaut fashion axe flannel Shoreditch meggings YOLO irony Portland direct trade",
          channel: 'ch1',
          beginTime: 0,
          duration: 60
        },
        {
          id: 'p1',
          name: 'Intelligentsia',
          description: "Intelligentsia Blue Bottle before they sold out disrupt leggings squid ugh sartorial meh Shoreditch cred single-origin coffee Marfa DIY farm-to-table vegan small batch whatever shabby chic Schlitz gastropub kogi ethical Pinterest pork belly distillery scenester dreamcatcher ennui flannel Neutra food truck mlkshk Bushwick fanny pack Pitchfork four loko heirloom Williamsburg cornhole polaroid skateboard bitters quinoa mustache next level art party deep v PBR&B kitsch Wes Anderson vinyl butcher blog typewriter mixtape put a bird on it +1 trust fund normcore iPhone occupy Brooklyn irony Portland bicycle rights Truffaut Helvetica selvage synth tattooed jean shorts XOXO brunch crucifix messenger bag letterpress post-ironic craft beer Tonx paleo keytar bespoke Cosby sweater chambray gentrify PBR try-hard chillwave banjo Austin cray hashtag artisan selfies Vice mumblecore banh mi 3 wolf moon hoodie you probably haven't heard of them American Apparel meggings pop-up narwhal locavore keffiyeh wayfarers Kickstarter fingerstache freegan forage hella salvia kale chips master cleanse drinking vinegar High Life fashion axe plaid Etsy roof party chia literally street art 90's 8-bit viral tousled sriracha yr seitan beard stumptown biodiesel swag Tumblr church-key actually cardigan readymade Banksy umami pour-over sustainable tote bag Echo Park Godard Carles gluten-free organic pickled wolf cliche Odd Future lo-fi pug authentic McSweeney's direct trade  semiotics raw denim YOLO retro VHS tofu fap Thundercats flexitarian twee fixie asymmetrical aesthetic slow-carb lomo photo booth",
          channel: 'ch2',
          beginTime: 60 * 24,
          duration: 30
        },
        {
          id: 'p2',
          name: 'drinking vinegar',
          description: "drinking vinegar keffiyeh gluten-free kitsch jean shorts Helvetica American Apparel tote bag leggings authentic salvia cliche readymade chia pour-over Marfa Echo Park freegan bespoke vegan forage Thundercats chillwave Intelligentsia retro farm-to-table hella locavore Odd Future plaid cornhole synth typewriter biodiesel squid tattooed meh street art next level raw denim stumptown McSweeney's twee lo-fi mumblecore blog single-origin coffee fixie Tumblr VHS actually Pinterest cardigan small batch mixtape semiotics XOXO 3 wolf moon fashion axe Brooklyn Pitchfork wolf photo booth kogi church-key Wes Anderson deep v PBR&B disrupt PBR Neutra crucifix cred cray keytar viral 90's pickled try-hard flannel Williamsburg tousled wayfarers paleo you probably haven't heard of them hashtag gastropub irony brunch vinyl meggings kale chips normcore literally Carles DIY mlkshk artisan yr Vice narwhal flexitarian Kickstarter quinoa ennui pop-up hoodie Cosby sweater 8-bit roof party master cleanse swag seitan sartorial selfies direct trade  food truck tofu pork belly selvage letterpress post-ironic YOLO scenester polaroid butcher gentrify pug banjo Shoreditch craft beer trust fund beard fap Schlitz bicycle rights ethical banh mi High Life iPhone Bushwick mustache fanny pack art party lomo umami fingerstache Austin heirloom +1 shabby chic dreamcatcher asymmetrical Etsy skateboard Tonx before they sold out bitters organic put a bird on it distillery sriracha four loko ugh aesthetic sustainable occupy whatever Truffaut slow-carb chambray Blue Bottle Banksy Godard Portland messenger bag",
          channel: 'ch3',
          beginTime: 60 * 24 * 3 + 60 * 7,
          duration: 120
        },
        {
          id: 'p3',
          name: 'synth pork',
          description: "synth pork belly stumptown bicycle rights banjo tote bag squid polaroid vinyl fingerstache iPhone skateboard asymmetrical fashion axe Wes Anderson actually art party bitters 8-bit tousled quinoa you probably haven't heard of them salvia fap forage seitan Godard Truffaut Thundercats fanny pack church-key cray narwhal disrupt flannel pickled Tonx selfies sartorial paleo +1 typewriter raw denim biodiesel Echo Park mixtape semiotics organic Schlitz post-ironic sustainable hella meggings cred umami letterpress chambray Helvetica blog tofu kogi kale chips messenger bag Vice Cosby sweater street art ugh banh mi whatever literally cardigan wayfarers Portland distillery lo-fi small batch gentrify selvage deep v mustache Blue Bottle cliche Neutra mlkshk viral ennui next level mumblecore readymade chillwave jean shorts keytar dreamcatcher hoodie VHS cornhole drinking vinegar Brooklyn shabby chic food truck Shoreditch PBR&B butcher pop-up vegan chia fixie meh Kickstarter authentic put a bird on it kitsch brunch crucifix roof party tattooed bespoke heirloom Etsy gluten-free Odd Future artisan swag beard craft beer 90's High Life plaid gastropub slow-carb DIY Pitchfork aesthetic scenester ethical pug irony flexitarian photo booth 3 wolf moon retro wolf Banksy direct trade  Carles American Apparel Intelligentsia Marfa PBR farm-to-table sriracha Pinterest pour-over lomo Tumblr freegan leggings twee locavore normcore Williamsburg four loko keffiyeh Bushwick hashtag try-hard before they sold out XOXO master cleanse YOLO trust fund yr McSweeney's Austin single-origin coffee occupy",
          channel: 'ch1',
          beginTime: 120,
          duration: 30
        },
        {
          id: 'p4',
          name: 'Pitchfork',
          description: "you probably haven't heard of> them disrupt actually Pitchfork art party wayfarers High Life DIY irony chambray iPhone typewriter farm-to-table Intelligentsia Tumblr yr sriracha single-origin coffee mlkshk literally dreamcatcher put a bird on it biodiesel butcher salvia umami organic master cleanse fingerstache slow-carb flannel tofu shabby chic Thundercats 8-bit wolf bicycle rights Neutra narwhal distillery asymmetrical normcore Wes Anderson Etsy Marfa Echo Park swag kogi cardigan flexitarian gastropub photo booth VHS ennui aesthetic cray fixie pour-over hashtag vinyl polaroid Vice gluten-free gentrify PBR Blue Bottle American Apparel raw denim cornhole tousled meggings roof party fanny pack whatever vegan artisan keytar hoodie skateboard Cosby sweater synth Austin sustainable Schlitz kale chips squid selvage viral pork belly letterpress seitan before they sold out pop-up +1 locavore fashion axe YOLO authentic Helvetica chillwave Carles pug plaid forage lo-fi freegan banjo 3 wolf moon Pinterest mixtape ethical paleo Portland hella mumblecore fap retro brunch scenester direct trade  drinking vinegar bitters chia tattooed Truffaut trust fund sartorial Godard stumptown cliche selfies twee Shoreditch banh mi four loko street art leggings craft beer keffiyeh 90's McSweeney's post-ironic XOXO pickled PBR&B meh Bushwick jean shorts quinoa bespoke Banksy food truck Williamsburg heirloom blog ugh tote bag messenger bag small batch Brooklyn next level lomo cred semiotics Kickstarter church-key deep v mustache Odd Future readymade try-hard Tonx beard kitsch occupy crucifix",
          channel: 'ch1',
          beginTime: 60,
          duration: 30
        },
        {
          id: 'p5',
          name: 'Vice Photo',
          description: "ugh Vice photo booth narwhal wayfarers small batch aesthetic Kickstarter lo-fi roof party keytar next level seitan VHS American Apparel food truck vegan retro flexitarian lomo put a bird on it meh viral plaid raw denim Bushwick Carles Pitchfork Blue Bottle salvia before they sold out scenester leggings vinyl disrupt hella Banksy semiotics bicycle rights drinking vinegar freegan fap flannel sriracha stumptown biodiesel ethical slow-carb keffiyeh trust fund letterpress heirloom mlkshk DIY dreamcatcher McSweeney's Williamsburg locavore pour-over Odd Future tote bag hoodie 8-bit synth distillery church-key pickled wolf Schlitz art party cornhole fingerstache twee messenger bag asymmetrical chambray crucifix occupy selfies Thundercats tattooed actually fanny pack kitsch farm-to-table brunch master cleanse pop-up craft beer Marfa iPhone bespoke Intelligentsia Etsy street art ennui XOXO forage try-hard Tumblr you probably haven't heard of them bitters Godard +1 kogi swag irony 90's banh mi selvage mixtape sartorial readymade cray banjo typewriter Portland shabby chic gastropub butcher Tonx cliche post-ironic sustainable Echo Park kale chips organic Wes Anderson pork belly four loko pug meggings tousled Truffaut direct trade  normcore 3 wolf moon artisan Brooklyn cardigan chia jean shorts polaroid blog umami Cosby sweater PBR&B YOLO Neutra tofu cred yr single-origin coffee fashion axe Helvetica quinoa Pinterest fixie paleo chillwave Austin gentrify gluten-free whatever literally deep v mustache Shoreditch squid PBR hashtag authentic beard mumblecore High Life skateboard",
          channel: 'ch4',
          beginTime: 0,
          duration: 240
        },
        {
          id: 'p6',
          name: 'PBR&B',
          description: "PBR&B leggings locavore gastropub salvia fanny pack cornhole Thundercats tofu actually PBR dreamcatcher put a bird on it Blue Bottle Tumblr selfies squid post-ironic Helvetica pickled semiotics drinking vinegar irony seitan Truffaut ennui selvage banjo narwhal Wes Anderson next level try-hard chillwave sriracha heirloom pop-up flannel Kickstarter fap Brooklyn Marfa whatever keffiyeh typewriter trust fund direct trade  chia roof party pour-over craft beer authentic deep v Echo Park 3 wolf moon 90's hella Odd Future blog hashtag wayfarers Pitchfork ethical beard readymade American Apparel wolf swag +1 YOLO viral VHS cliche Pinterest bitters tattooed cred keytar High Life art party paleo Godard before they sold out occupy slow-carb fixie vegan skateboard synth vinyl mumblecore XOXO fingerstache Williamsburg Neutra bicycle rights sartorial street art umami scenester disrupt master cleanse Banksy banh mi literally Intelligentsia Shoreditch DIY plaid Portland tote bag Tonx brunch forage ugh Cosby sweater letterpress cray Austin lomo McSweeney's four loko tousled small batch jean shorts single-origin coffee chambray freegan raw denim artisan food truck crucifix asymmetrical flexitarian mixtape fashion axe meggings distillery hoodie yr quinoa Etsy polaroid Schlitz pork belly normcore church-key you probably haven't heard of them kogi lo-fi kale chips farm-to-table shabby chic mustache cardigan biodiesel mlkshk butcher aesthetic organic twee 8-bit messenger bag photo booth retro gluten-free sustainable kitsch iPhone Carles gentrify Vice meh bespoke pug stumptown Bushwick",
          channel: 'ch3',
          beginTime: 0,
          duration: 30
        }
      ],
      _pxPerDay: 2000
    }
  },
  mounted () {
    this.width = document.querySelector('.channels').offsetWidth
    this.height = document.querySelector('.days').offsetHeight
  },
  computed: {
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
      return {
        top: this.toYFromTime(program.beginTime),
        height: this.toYFromTime(program.duration)
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
      return time * this.$data._pxPerDay / (60 * 24)
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
  height: 2000px; /* TODO: use component state */
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
  box-shadow: 0 3px 6px -6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.program-name {
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
