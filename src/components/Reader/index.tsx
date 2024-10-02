import {
  Component,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { A } from '@solidjs/router'
import { styled } from '~styled-system/jsx'
import PhArrowCircleLeftFill from '~icons/ph/arrow-circle-left-fill'
import PhNotebook from '~icons/ph/notebook'
import Detail from '~/components/Reader/Detail'
import PhX from '~icons/ph/x'
import style from './Reader.module.css'

const Reader: Component = () => {
  let headingEl: HTMLHeadingElement
  const [titleVisible, setTitleVisible] = createSignal(true)
  const text = createMemo(() =>
    titleVisible() ? '三国演义' : '第二十四回 国贼行凶杀贵妃 皇叔败走投袁绍',
  )
  const handleTitleVisible = () => {
    const rect = headingEl.getBoundingClientRect()
    setTitleVisible(rect.top > 0)
  }
  onMount(() => {
    handleTitleVisible()
    document.addEventListener('scroll', handleTitleVisible)
    onCleanup(() => document.removeEventListener('scroll', handleTitleVisible))
  })
  const [detailVisible, setDetailVisible] = createSignal(false)
  const handleDetailVisible = () => {
    setDetailVisible((v) => !v)
  }
  return (
    <styled.div position={'relative'}>
      <styled.div
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        fontSize={'sm'}
        padding={'2'}
        position={'sticky'}
        top={'0'}
        left={'0'}
        width={'full'}
        backgroundColor={'Background'}
      >
        <styled.div display={'flex'} columnGap={'1'} alignItems={'center'}>
          <A href={'/'}>
            <PhArrowCircleLeftFill />
          </A>
          <styled.span opacity={'0.6'} fontWeight={'light'}>
            {text()}
          </styled.span>
        </styled.div>
        <styled.button cursor={'pointer'} onClick={handleDetailVisible}>
          <PhNotebook />
        </styled.button>
      </styled.div>
      <styled.article
        textWrap={'wrap'}
        padding={'2'}
        marginBottom={'4'}
        paddingTop={'0'}
        fontFamily={'serif'}
        lineHeight={'loose'}
        class={style.Reader}
      >
        <styled.h1 ref={headingEl!} fontSize={'xl'} fontWeight={'bold'}>
          {'第二十四回 国贼行凶杀贵妃 皇叔败走投袁绍'}
        </styled.h1>
        <p>
          却说曹操见了衣带诏，与众谋士商议，欲废却献帝，更择有德者立之。程昱谏曰：“明公所以能威震四方，号令天下者，以奉汉家名号故也。今诸侯未平，遽行废立之事，必起兵端矣”操乃止。只将董承等五人，并其全家老小，押送各门处斩。死者共七百馀人。城中官民见者，无不下泪。后人有诗叹董承曰：
        </p>

        <blockquote>
          <p>密诏传衣带，天言出禁门。</p>
          <p>当年曾救驾，此日更承恩。</p>
          <p>忧国成心疾，除奸入梦魂。</p>
          <p>忠贞千古在，成败复谁论！</p>
        </blockquote>

        <p>又有叹王子服等四人诗曰：</p>

        <blockquote>
          <p>书名尺素矢忠谋，慷慨思将君父酬。</p>
          <p>赤胆可怜捐百口，丹心自是足千秋。</p>
        </blockquote>

        <p>
          且说曹操既杀了董承等众人，怒气未消，遂带剑入宫，来弑董贵妃。贵妃乃董承之妹，帝幸之，已怀孕五月。当日帝在后宫，正与伏皇后私论董承之事，至今尚无音耗。忽见曹操带剑入宫，面有怒容，帝大惊失色。操曰：“董承谋反，陛下知否？”帝曰：“董卓已诛矣。”操大声曰：“不是董卓！是董承！”帝战栗曰：“朕实不知。”操曰：“忘了破指修诏耶？”帝不能答。操叱武士擒董妃至。帝告曰：“董妃有五月身孕，望丞相见怜。”操曰：“若非天败，吾已被害。岂得复留此女，为吾后患？”伏后告曰：“贬于冷宫，待分娩了，杀之未迟。”操曰：“欲留此逆种，为母报仇乎？”董妃泣告曰：“乞全尸而死，勿令彰露。”操令取白练至面前。帝泣谓妃曰：“卿于九泉之下，勿怨朕躬！”言讫，泪下如雨。伏后亦大哭。操怒曰：“犹作儿女态耶！”叱武士牵出，勒死于宫门之外。后人有诗叹董妃曰：
        </p>

        <blockquote>
          <p>春殿承恩亦枉然，伤哉龙种并时捐。</p>
          <p>堂堂帝主难相救，掩面徒看泪涌泉。</p>
        </blockquote>

        <p>
          操谕监宫官曰：“今后但有外戚宗族，不奉吾旨，辄入宫门者斩。守御不严，与同罪。”又拨心腹人三千充御林军，令曹洪统领，以为防察。操谓程昱曰：“今董承等虽诛，尚有马腾、刘备，亦在此数，不可不除。”昱曰：“马腾屯军西凉，未可轻取；但当以书慰劳，勿使生疑，诱入京师图之，可也。刘备现在徐州，分布犄角之势，亦不可轻敌。况今袁绍屯兵官渡，常有图许都之心。若我一旦东征，刘备势必求救于绍。绍趁虚来袭，何以当之？”操曰：“非也，备乃人杰也。今若不击，待其羽翼既成，急难图矣。袁绍虽强，事多怀疑不决，何足忧乎？”
        </p>

        <p>
          正议间，郭嘉自外而入。操问曰：“吾欲东征刘备，奈有袁绍之忧，如何？”嘉曰：“绍性迟而多疑，某谋士各相妒忌，不足忧也。刘备新整军兵，众心未服，丞相引兵东征，一战可定矣。”操大喜曰：“正合吾意。”遂起二十万大军，分兵五路下徐州。
        </p>

        <p>
          细作探知，报入徐州。孙乾先往下邳报知关公，随至小沛报知玄德。玄德与孙乾计议曰：“此必求救于袁绍，方可解危。”于是玄德修书一封，遣孙乾至河北。干乃先见田丰，具言其事，求其引进。丰即引孙乾入见绍，呈上书信。只见绍形容憔悴，衣冠不整。丰曰：“今日主公何故如此？”绍曰：“我将死矣！”丰曰：“主公何出此言？”绍曰：“吾生五子，惟最幼者，极快吾意。今患疥疮，命已垂绝。吾有何心更论他事乎？”丰曰：“今曹操东征刘玄德，许昌空虚。若以义兵虚而入，上可以保天子，下可以救万民。此不易得之机会也，惟明公裁之。”绍曰：“吾亦知此最好，奈我心中恍惚，恐有不利。”丰曰：“何恍惚之有？”绍曰：“五子中惟此子生得最异，倘有疏虞，吾命休矣。”遂决意不肯发兵，乃谓孙乾曰：“汝回见玄德，可言其故。倘有不如意，可来相投，吾自有相助之处。”田丰以杖击地曰：“遭此难遇之时，乃以婴儿之病，失此机会，大事去矣！可痛惜哉！”跌足长叹而出。
        </p>

        <p>
          孙乾见绍不肯发兵，只得星夜回小沛见玄德，具说此事。玄德大惊曰：“似此如之奈何？”张飞曰：“兄长勿忧。曹兵远来，必然困乏；乘其初至，先去劫寨，可破曹操。”玄德曰：“素以汝为一勇夫耳，前者捉刘岱时，颇能用计；今献此策，亦中兵法。”乃从其言，分兵劫寨。
        </p>

        <p>
          且说曹操引军往小沛来。正行间，狂风骤至，忽听一声响亮，将一面牙旗吹折。操便令军兵且住，聚众谋士问吉凶。荀彧曰：“风从何方来？吹折甚颜色旗？”操曰：“风自东南方来，吹折角上牙旗，旗乃青红二色。”彧曰：“不主别事，今夜刘备必来劫寨。”操点头。忽毛玠入见曰：“方才东南风起，吹折青红牙旗一面。主公以为主何吉凶？”操曰：“公意若何？”毛玠曰：“愚意以为今夜必主有人来劫寨。”后人有诗叹曰：
        </p>

        <blockquote>
          <p>吁嗟帝胄势孤穷，全仗分兵劫寨功。</p>
          <p>争奈牙旗折有兆，老天何故纵奸雄？</p>
        </blockquote>

        <p>
          操曰：“天报应我，当即防之。”遂分兵九队，只留一队向前虚扎营寨，馀众八面埋伏。是夜月色微明。玄德在左，张飞在右，分兵两队进发，只留孙乾守小沛。
        </p>

        <p>
          且说张飞自以为得计，领轻骑在前，突入操寨，但见零零落落，无多人马，四边火光大起，喊声齐举。飞知中计，急出寨外。正东张辽、正西许褚、正南于禁、正北李典、东南徐晃、西南乐进、东北夏侯惇、西北夏侯渊，八处军马杀来。张飞左冲右突，前遮后当，所领军兵原是曹操手下旧军，见事势已急，尽皆投降去了。飞正杀间，逢著徐晃大杀一阵，后面乐进赶到。飞杀条血路突围而出，只有数十骑跟定。欲还小沛，去路已断；欲投徐州、下邳，又恐曹军截住。寻思无路，只得望芒砀山而去。
        </p>

        <p>
          却说玄德引军劫寨，将近寨门，喊声大震，后面冲出一军，先截去了一半人马。夏侯惇又到。玄德突围而走，夏侯渊又从后赶来。玄德回顾，止有三十馀骑跟随；急欲奔还小沛，早望见小沛城中火起，只得弃了小沛，欲投徐州、下邳；又见曹军漫山塞野，截住去路。玄德自思无路可归，想：“袁绍有言：‘倘不如意，可来相投’，今不若暂往依栖，别作良图。”遂望青州路而走，正逢李典拦住。玄德匹马落荒望北而逃，李典掳将从骑去了。
        </p>

        <p>
          且说玄德匹马投青州，日行三百里，奔至青州城下叫门；门吏问了姓名，来报刺史。刺史乃袁绍长子袁谭。谭素敬玄德，闻知匹马到来，即便开门相迎，接入公廨，细问其故。玄德备言兵败相投之意。谭乃留玄德于馆驿中住下，发书报父袁绍；一面差本州人马，护送玄德。至平原界口，袁绍亲自引众出邺郡三十里迎接玄德。玄德拜谢，绍忙答礼曰：“昨为小儿抱病，有失救援，于心怏怏不安。今幸得相见，大慰平生渴想之思。”玄德曰：“孤穷刘备，久欲投于门下，奈机缘未遇，今为曹操所攻，妻子俱陷，想将军容纳四方之士，故不避羞惭，迳来相投。望乞收录，誓当图报。”绍大喜，相待甚厚，同居冀州。
        </p>

        <p>
          且说曹操当夜取了小沛，随即进兵攻徐州。糜竺、简雍，守把不住，只得弃城而走。陈登献了徐州。曹操大军入城，安民己毕，随唤众谋士议取下邳。荀彧曰：“云长保护玄德妻小，死守此城。若不速取，恐为袁绍所窃。”操曰：“吾素爱云长武艺人材，欲得之以为己用，不若令人说之使降。”郭嘉曰：“云长义气深重，必不肯降。若使人说之，恐被其害。”帐下一人出曰：“某与关公有一面之交，愿往说之。”众视之，乃张辽也。程昱曰：“文远虽与云长有旧，吾观此人，非可以言词说也。某有一计，使此人进退无路，然后用文远说之，彼必归丞相矣。”正是：
        </p>

        <blockquote>
          <p>整备窝弓射猛虎，安排香饵钓鳌鱼。</p>
        </blockquote>

        <p>未知其计若何，且看下文分解。 </p>
      </styled.article>
      <Detail visible={detailVisible()}>
        <styled.button cursor={'pointer'} onClick={handleDetailVisible}>
          <PhX />
        </styled.button>
      </Detail>
    </styled.div>
  )
}

export default Reader
