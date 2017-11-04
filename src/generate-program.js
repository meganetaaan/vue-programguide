const PROGRAM_TIME_PATTERNS = [
  [30, 30],
  [60],
  [55, 5],
  [30, 25, 5],
  [120],
  [90],
  [15, 10, 5, 5, 10, 15]
]

const DESCRIPTIONS = [
  "wayfarers distillery gluten-free Odd Future iPhone hashtag pop-up meggings pour-over pug locavore gastropub small batch Pinterest skateboard selvage you probably haven't heard of them tote bag mustache food truck before they sold out Truffaut hoodie Echo Park DIY artisan chillwave typewriter Brooklyn Kickstarter Cosby sweater bicycle rights crucifix selfies raw denim Portland photo booth swag stumptown single-origin coffee bitters flexitarian yr Wes Anderson mlkshk cornhole street art blog sartorial freegan deep v Marfa tattooed cliche forage fap shabby chic messenger bag Intelligentsia kitsch scenester synth aesthetic McSweeney's heirloom organic chambray Helvetica quinoa cred ethical 90's Thundercats meh mixtape tofu vinyl craft beer retro chia Pitchfork seitan fingerstache VHS salvia Godard normcore lomo vegan try-hard beard Williamsburg irony trust fund butcher gentrify brunch put a bird on it 8-bit church-key keffiyeh banh mi biodiesel hella asymmetrical PBR&B ennui authentic direct trade  fanny pack keytar pickled American Apparel next level viral Neutra four loko letterpress Austin master cleanse Tonx lo-fi tousled Vice Bushwick Etsy kogi Tumblr banjo squid sriracha Banksy actually PBR Carles semiotics +1 Shoreditch ugh fashion axe flannel pork belly bespoke cardigan umami Blue Bottle polaroid plaid 3 wolf moon fixie leggings literally XOXO readymade jean shorts disrupt drinking vinegar post-ironic roof party twee slow-carb farm-to-table sustainable art party Schlitz wolf narwhal occupy YOLO mumblecore dreamcatcher cray kale chips whatever High Life paleo",
  "literally irony mumblecore next level cred forage roof party messenger bag kitsch 90's McSweeney's paleo before they sold out you probably haven't heard of them biodiesel PBR bicycle rights Blue Bottle fashion axe viral direct trade  polaroid fixie brunch sustainable disrupt flexitarian flannel gentrify iPhone small batch fingerstache squid actually readymade church-key PBR&B jean shorts vegan XOXO letterpress Kickstarter bitters chambray banh mi salvia chia mustache High Life lomo seitan fap tousled post-ironic DIY pickled YOLO locavore cray crucifix master cleanse Pinterest +1 banjo kogi drinking vinegar typewriter Odd Future Brooklyn deep v Carles fanny pack retro Tumblr Vice American Apparel keffiyeh chillwave meh 3 wolf moon Neutra kale chips Etsy ethical tofu street art yr Shoreditch shabby chic bespoke food truck skateboard narwhal mixtape selvage trust fund craft beer selfies asymmetrical four loko swag Intelligentsia whatever Pitchfork synth tattooed keytar Cosby sweater gastropub Wes Anderson vinyl Tonx lo-fi ugh single-origin coffee Banksy heirloom wayfarers twee put a bird on it tote bag distillery leggings stumptown pop-up VHS Bushwick mlkshk plaid slow-carb quinoa photo booth farm-to-table Thundercats authentic semiotics aesthetic Echo Park sartorial ennui Williamsburg hoodie Portland meggings dreamcatcher freegan organic cliche Godard art party occupy Truffaut gluten-free blog butcher cardigan normcore Schlitz scenester artisan try-hard sriracha pug hashtag 8-bit raw denim Austin pork belly pour-over Helvetica Marfa wolf cornhole hella umami beard",
  "hella Portland Carles dreamcatcher Pinterest Helvetica pour-over disrupt cred meggings Vice Kickstarter vegan banh mi keffiyeh distillery meh typewriter messenger bag 90's Godard cliche kitsch gentrify sustainable DIY YOLO Intelligentsia master cleanse single-origin coffee mixtape Austin bespoke art party Banksy leggings crucifix gluten-free occupy PBR hoodie Wes Anderson tofu you probably haven't heard of them twee post-ironic pork belly before they sold out biodiesel Blue Bottle Schlitz mumblecore Thundercats Brooklyn 3 wolf moon Neutra freegan sriracha bitters fanny pack swag retro flannel mlkshk Truffaut trust fund butcher Tumblr Tonx flexitarian jean shorts forage authentic asymmetrical wayfarers salvia semiotics selfies bicycle rights pug direct trade  organic aesthetic seitan paleo Etsy McSweeney's fap lomo next level literally squid Cosby sweater raw denim cornhole shabby chic ennui fingerstache quinoa umami Shoreditch yr lo-fi try-hard plaid Odd Future letterpress chillwave farm-to-table gastropub cardigan irony readymade fashion axe banjo Echo Park heirloom beard kale chips XOXO Bushwick normcore synth artisan iPhone narwhal VHS 8-bit slow-carb selvage tousled High Life +1 wolf whatever viral hashtag chambray American Apparel pop-up stumptown photo booth keytar craft beer scenester street art pickled deep v skateboard put a bird on it tattooed vinyl cray kogi brunch Marfa ugh actually four loko fixie small batch roof party church-key sartorial food truck blog chia Pitchfork ethical Williamsburg drinking vinegar polaroid tote bag mustache locavore PBR&B",
  "skateboard gentrify try-hard roof party blog banh mi Marfa tote bag distillery brunch irony ennui polaroid selfies synth umami bitters Portland fashion axe typewriter VHS PBR pop-up bicycle rights organic next level forage narwhal bespoke literally authentic Helvetica vegan selvage banjo ethical Intelligentsia food truck meggings Williamsburg Brooklyn plaid post-ironic mixtape McSweeney's messenger bag wolf four loko put a bird on it street art vinyl craft beer raw denim keffiyeh cornhole wayfarers squid heirloom readymade flexitarian pug whatever beard XOXO before they sold out fanny pack meh Carles Pitchfork pork belly Echo Park High Life slow-carb fap sartorial art party lomo sriracha stumptown jean shorts +1 letterpress leggings American Apparel dreamcatcher Etsy freegan photo booth Bushwick deep v Godard Tonx pour-over DIY viral twee hoodie sustainable iPhone occupy cred small batch tousled trust fund Shoreditch Pinterest keytar Tumblr PBR&B locavore mumblecore scenester 8-bit fixie swag gastropub ugh chillwave chia single-origin coffee quinoa you probably haven't heard of them seitan chambray retro salvia artisan master cleanse mustache Odd Future aesthetic drinking vinegar kale chips 3 wolf moon crucifix semiotics shabby chic tattooed hella asymmetrical pickled fingerstache YOLO hashtag Wes Anderson Banksy disrupt cray Schlitz Thundercats Neutra Blue Bottle kogi normcore butcher yr tofu direct trade  paleo gluten-free Cosby sweater actually Austin mlkshk 90's flannel kitsch Truffaut cardigan biodiesel lo-fi farm-to-table cliche Kickstarter church-key Vice",
  "plaid mixtape food truck trust fund tousled literally cornhole ugh chia artisan before they sold out raw denim disrupt photo booth viral Austin freegan Bushwick locavore letterpress actually ennui pop-up kale chips fap ethical post-ironic sriracha street art biodiesel McSweeney's messenger bag art party Schlitz Brooklyn asymmetrical Shoreditch twee Tonx +1 beard small batch pork belly High Life banjo gentrify master cleanse Thundercats deep v crucifix put a bird on it VHS hashtag keytar keffiyeh heirloom pickled Echo Park Pitchfork YOLO skateboard hoodie cardigan try-hard chillwave wolf Carles paleo dreamcatcher fixie Portland cray iPhone normcore farm-to-table swag synth butcher polaroid authentic drinking vinegar Vice fanny pack meggings shabby chic squid cliche kogi craft beer Etsy wayfarers XOXO Cosby sweater PBR fashion axe fingerstache meh forage whatever Banksy American Apparel salvia PBR&B banh mi vegan cred four loko irony Williamsburg hella selvage bespoke yr Truffaut 90's mustache typewriter tattooed occupy pour-over blog church-key seitan Wes Anderson Odd Future pug tote bag organic Helvetica lomo DIY readymade narwhal flexitarian Intelligentsia roof party kitsch scenester brunch lo-fi 3 wolf moon bitters bicycle rights Pinterest Kickstarter chambray stumptown quinoa mumblecore Marfa Blue Bottle flannel Godard you probably haven't heard of them distillery 8-bit gastropub selfies jean shorts mlkshk tofu sustainable gluten-free semiotics slow-carb Neutra retro vinyl Tumblr aesthetic leggings direct trade  next level umami single-origin coffee sartorial",
  "whatever master cleanse sustainable Pinterest McSweeney's fixie mumblecore keytar bespoke literally art party mustache kogi sriracha you probably haven't heard of them VHS messenger bag flannel drinking vinegar bicycle rights Carles Austin tousled Vice selvage cardigan leggings wayfarers typewriter YOLO Brooklyn sartorial Etsy brunch tattooed gastropub kitsch +1 Helvetica locavore Odd Future tote bag flexitarian lo-fi iPhone single-origin coffee Schlitz mlkshk pork belly 90's gentrify Truffaut before they sold out post-ironic pour-over next level Marfa crucifix gluten-free aesthetic Cosby sweater roof party beard fashion axe craft beer Echo Park biodiesel normcore direct trade  pop-up readymade skateboard food truck scenester Pitchfork meggings PBR&B wolf distillery vegan trust fund American Apparel keffiyeh forage artisan authentic small batch pug swag Shoreditch jean shorts hashtag Thundercats ethical farm-to-table cornhole organic letterpress twee banjo stumptown Tonx narwhal yr fap raw denim Portland freegan Godard umami cray actually pickled meh PBR kale chips 8-bit 3 wolf moon try-hard street art put a bird on it cred bitters banh mi seitan lomo paleo salvia semiotics butcher blog ennui photo booth viral tofu XOXO hella irony cliche Williamsburg heirloom Intelligentsia Banksy dreamcatcher vinyl shabby chic Wes Anderson mixtape occupy disrupt chillwave church-key squid hoodie deep v ugh High Life Neutra selfies slow-carb four loko fanny pack Blue Bottle synth fingerstache polaroid plaid Tumblr asymmetrical quinoa Kickstarter chambray retro chia DIY Bushwick",
  "kale chips YOLO leggings mustache polaroid 8-bit vinyl PBR&B gastropub keytar single-origin coffee PBR Thundercats bitters hoodie chillwave XOXO actually Pitchfork Austin dreamcatcher deep v Vice cray hella narwhal craft beer street art tote bag readymade letterpress mumblecore put a bird on it Shoreditch locavore irony bespoke brunch Carles pork belly small batch meh sriracha farm-to-table Wes Anderson Intelligentsia Blue Bottle twee chia 90's Banksy distillery vegan lo-fi Tumblr seitan cardigan Bushwick bicycle rights +1 fingerstache Pinterest iPhone Brooklyn food truck synth banjo Marfa occupy mixtape asymmetrical four loko Neutra yr gluten-free fap before they sold out scenester tousled sartorial Cosby sweater kitsch typewriter squid heirloom slow-carb mlkshk direct trade  whatever swag fashion axe salvia forage 3 wolf moon beard viral try-hard Portland literally flannel High Life paleo next level chambray cliche tattooed freegan quinoa organic shabby chic artisan cornhole blog plaid photo booth selfies biodiesel Etsy ugh post-ironic umami selvage drinking vinegar master cleanse American Apparel kogi art party wayfarers trust fund church-key keffiyeh Tonx cred you probably haven't heard of them messenger bag stumptown VHS gentrify ethical tofu Schlitz wolf Williamsburg raw denim pug jean shorts hashtag butcher ennui DIY meggings fixie Kickstarter pickled Odd Future normcore semiotics roof party retro flexitarian Truffaut banh mi pour-over Godard aesthetic crucifix lomo skateboard McSweeney's Echo Park fanny pack authentic disrupt sustainable Helvetica pop-up",
  "artisan gentrify banh mi Wes Anderson deep v selfies aesthetic bitters retro iPhone YOLO Cosby sweater shabby chic Intelligentsia Helvetica tousled readymade American Apparel gluten-free sartorial +1 before they sold out raw denim Kickstarter messenger bag Blue Bottle fap vegan keffiyeh ennui whatever mustache mlkshk try-hard pork belly swag mumblecore biodiesel butcher Austin four loko freegan master cleanse Portland seitan authentic beard asymmetrical flannel High Life gastropub brunch meh direct trade  flexitarian banjo leggings slow-carb polaroid tattooed you probably haven't heard of them blog wayfarers literally pour-over Thundercats pop-up PBR viral photo booth Pitchfork Truffaut cray Carles cliche 3 wolf moon keytar salvia paleo hella lomo heirloom ugh bicycle rights XOXO chillwave occupy stumptown chia cardigan Williamsburg organic VHS Tonx pickled hashtag twee skateboard disrupt next level distillery Bushwick chambray fanny pack plaid umami drinking vinegar 90's Tumblr kogi semiotics typewriter yr sustainable put a bird on it squid 8-bit Schlitz narwhal Odd Future Vice tofu Echo Park PBR&B lo-fi kale chips cornhole crucifix actually synth wolf quinoa normcore dreamcatcher art party vinyl Pinterest mixtape selvage Shoreditch Etsy street art irony Marfa trust fund ethical tote bag Brooklyn letterpress craft beer hoodie scenester single-origin coffee post-ironic meggings food truck McSweeney's Banksy fashion axe bespoke Godard Neutra sriracha farm-to-table locavore forage kitsch small batch fixie fingerstache jean shorts roof party cred church-key pug DIY",
  "brunch next level irony cornhole Bushwick PBR&B Odd Future dreamcatcher normcore biodiesel typewriter farm-to-table blog tousled fanny pack trust fund plaid Truffaut Marfa McSweeney's Blue Bottle tote bag Brooklyn you probably haven't heard of them forage ethical roof party Helvetica Thundercats pork belly wayfarers Tonx shabby chic raw denim ugh umami mumblecore quinoa +1 XOXO wolf letterpress 8-bit Intelligentsia keffiyeh Williamsburg narwhal cray Shoreditch seitan salvia meggings fap Banksy kale chips Carles Tumblr skateboard DIY lo-fi twee gentrify authentic locavore crucifix sartorial tattooed art party organic yr artisan semiotics single-origin coffee bespoke craft beer squid street art pour-over photo booth swag polaroid asymmetrical heirloom direct trade  Pitchfork flexitarian lomo banh mi synth meh kitsch flannel 90's pug small batch Echo Park occupy mlkshk mustache disrupt retro master cleanse food truck fixie Wes Anderson cliche fashion axe hoodie ennui chia keytar butcher aesthetic beard VHS PBR Schlitz iPhone vegan scenester Austin mixtape selvage Godard Vice distillery whatever bitters sriracha banjo Pinterest Portland pop-up Cosby sweater actually drinking vinegar post-ironic church-key vinyl chambray chillwave kogi High Life sustainable cardigan before they sold out Neutra tofu Kickstarter hella try-hard leggings deep v stumptown American Apparel fingerstache readymade freegan Etsy paleo cred messenger bag slow-carb literally viral selfies gluten-free pickled 3 wolf moon gastropub put a bird on it bicycle rights YOLO hashtag jean shorts four loko",
  "keffiyeh you probably haven't heard of them sriracha bitters synth put a bird on it normcore ennui cornhole Godard yr craft beer jean shorts scenester Portland sustainable pop-up Williamsburg single-origin coffee chillwave Truffaut Pinterest Intelligentsia messenger bag shabby chic drinking vinegar ethical bespoke skateboard typewriter beard Tumblr food truck organic gastropub bicycle rights try-hard flannel wolf High Life stumptown cardigan Marfa mixtape Neutra literally deep v kogi PBR American Apparel church-key Tonx meggings quinoa 8-bit swag readymade next level art party Kickstarter lo-fi Bushwick cred seitan whatever pug blog chambray wayfarers Schlitz vegan umami squid aesthetic roof party Vice Wes Anderson Shoreditch Thundercats Pitchfork artisan Banksy salvia keytar four loko iPhone tofu raw denim chia gentrify street art pickled paleo fingerstache crucifix butcher brunch retro dreamcatcher tote bag Helvetica McSweeney's authentic mumblecore cray 90's vinyl tousled hashtag sartorial post-ironic before they sold out XOXO irony plaid banjo freegan pour-over selvage Carles ugh polaroid letterpress farm-to-table disrupt kale chips occupy semiotics banh mi selfies Odd Future narwhal YOLO asymmetrical DIY Cosby sweater fixie heirloom +1 gluten-free meh forage Brooklyn VHS biodiesel photo booth actually viral cliche Blue Bottle leggings lomo master cleanse Austin mlkshk trust fund kitsch direct trade  locavore fashion axe 3 wolf moon pork belly hella Echo Park PBR&B slow-carb distillery twee small batch mustache fap flexitarian Etsy hoodie fanny pack tattooed",
  "leggings Thundercats PBR brunch tote bag food truck McSweeney's distillery keffiyeh hella seitan Brooklyn whatever locavore fap High Life synth jean shorts stumptown heirloom tattooed literally flexitarian Banksy you probably haven't heard of them cray mustache 8-bit irony keytar chia hashtag iPhone ethical four loko artisan fingerstache cliche swag sartorial Marfa farm-to-table pork belly readymade fixie actually Truffaut next level Tumblr shabby chic normcore fashion axe bespoke Odd Future Bushwick drinking vinegar typewriter tofu aesthetic Wes Anderson letterpress Godard American Apparel street art forage dreamcatcher vinyl skateboard meh tousled narwhal umami cornhole Tonx roof party Schlitz sustainable kitsch YOLO gentrify mlkshk sriracha twee direct trade  vegan gluten-free gastropub plaid Kickstarter post-ironic quinoa meggings Cosby sweater crucifix scenester DIY Austin kale chips Carles photo booth wayfarers bitters organic mixtape bicycle rights before they sold out pug selvage PBR&B banh mi Williamsburg Helvetica single-origin coffee chambray lomo cardigan Neutra Pinterest Portland semiotics ennui Pitchfork chillwave polaroid cred disrupt Shoreditch retro small batch authentic salvia beard 90's +1 freegan Blue Bottle XOXO Echo Park church-key viral mumblecore Intelligentsia raw denim butcher flannel pour-over craft beer Etsy kogi ugh deep v hoodie messenger bag VHS pop-up fanny pack master cleanse banjo 3 wolf moon occupy yr try-hard paleo squid slow-carb biodiesel trust fund selfies pickled put a bird on it wolf lo-fi blog art party Vice asymmetrical",
  "kale chips Helvetica banh mi Neutra retro heirloom literally street art biodiesel Vice keffiyeh Bushwick letterpress butcher pork belly actually authentic semiotics Thundercats PBR kitsch lo-fi gastropub Banksy Echo Park chia lomo tote bag wolf fap gluten-free direct trade  irony Etsy 8-bit Intelligentsia freegan PBR&B YOLO shabby chic aesthetic sartorial Tonx ennui polaroid tattooed Odd Future squid drinking vinegar DIY messenger bag slow-carb readymade +1 flannel Shoreditch skateboard vinyl fanny pack cred tofu crucifix before they sold out artisan beard trust fund Williamsburg American Apparel iPhone fashion axe cray cardigan post-ironic distillery McSweeney's selfies Marfa scenester stumptown mlkshk four loko Pitchfork tousled locavore pickled cornhole yr gentrify pop-up salvia meh sustainable craft beer pug Brooklyn small batch single-origin coffee Austin fixie you probably haven't heard of them Truffaut mixtape Cosby sweater roof party cliche Blue Bottle typewriter fingerstache art party next level paleo Pinterest pour-over dreamcatcher raw denim sriracha hella chambray deep v meggings normcore 3 wolf moon mumblecore chillwave hashtag bicycle rights seitan blog plaid leggings try-hard High Life whatever bespoke brunch photo booth bitters Tumblr jean shorts asymmetrical wayfarers keytar occupy twee Portland ugh Kickstarter quinoa forage ethical synth master cleanse hoodie narwhal organic vegan viral swag VHS farm-to-table 90's church-key flexitarian selvage umami mustache disrupt banjo kogi Wes Anderson food truck Carles Schlitz put a bird on it Godard XOXO"
]

const TITLES = []
for (let i = 0; i < DESCRIPTIONS.length; i++) {
  TITLES.push(/(.+?) /i.exec(DESCRIPTIONS[i])[1])
}

function getTimePatterns () {
  const idx = Math.floor(Math.random() * PROGRAM_TIME_PATTERNS.length)
  return PROGRAM_TIME_PATTERNS[idx]
}

function getDescription () {
  const idx = Math.floor(Math.random() * DESCRIPTIONS.length)
  return DESCRIPTIONS[idx]
}

function getName () {
  const idx = Math.floor(Math.random() * TITLES.length)
  return TITLES[idx]
}

let count = 0

function getId () {
  return 'p' + count++
}

function getProgram (id, beginTime, duration, channel) {
  const name = getName()
  const description = getDescription()

  return {
    id,
    name,
    description,
    beginTime,
    duration,
    channel
  }
}

export default function (offset, duration, channels) {
  const programs = []

  channels.forEach(function (channel) {
    // 開始時刻を指定
    let beginTime = offset

    // durationを満たすまで
    while (beginTime < offset + duration) {
      // timePatternを取得
      const timePatterns = getTimePatterns()

      // timePatternそれぞれについてプログラム生成
      timePatterns.forEach(function (d) {
        const p = getProgram(getId(), beginTime, d, channel)
        programs.push(p)
        beginTime += d
      })
    }
  })
  return programs
}
