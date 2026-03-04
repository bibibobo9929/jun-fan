
import { Basket, Author, KELO, Question } from './types';

export const SIX_BASKETS: Basket[] = [
  { id: 1, name: '散文 / 随笔', description: '语言气质强、可学性高' },
  { id: 2, name: '非虚构 / 纪实 / 传记', description: '结构推进、逻辑强' },
  { id: 3, name: '小说 / 故事写作', description: '叙事节奏、悬念与情绪' },
  { id: 4, name: '评论 / 专栏 / 时评', description: '观点锋利、结构明确' },
  { id: 5, name: '思想表达型', description: '哲学、心理、历史的“可读写作”' },
  { id: 6, name: '公共表达者文本', description: '演讲稿、访谈整理、个人写作合集' }
];

export const PHASE1_QUESTIONS: Question[] = [
  {
    id: "Q1",
    type: "single_choice",
    stem: "如果现在给你一个完全自由的下午，可以不受打扰地做任何事，你最可能会选择？",
    options: [
      { id: "A", text: "找个安静的地方，深入研究一个你最近很好奇的新鲜事物或知识。", score: { K: 1 } },
      { id: "B", text: "动手做一个具体的东西，比如烹饪一道复杂的菜、组装一个模型、或者规划一次详细的旅行。", score: { E: 1 } },
      { id: "C", text: "打造一个舒适惬意的环境，比如整理房间、点上香薰，然后邀请朋友来聊聊天或自己静静地待着。", score: { L: 1 } },
      { id: "D", text: "去看一场电影、一个展览，或者读一本小说，然后花时间思考和回味其中的细节与含义。", score: { O: 1 } }
    ],
    extras: [{ id: "Q1_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  { id: "Q2", type: "free_text", stem: "在手机或电脑上，除了聊天和看剧，你花时间最多的三件事是什么？请按顺序写下来。", nlp_enrichment: true },
  {
    id: "Q3",
    type: "single_choice",
    stem: "回顾过去的一个月，你大约花了多少小时，用于“纯粹的内容输出”？",
    options: [
      { id: "A", text: "几乎为 0", reality_index: { output_level: 0 } },
      { id: "B", text: "1-5 小时", reality_index: { output_level: 1 } },
      { id: "C", text: "5-10 小时", reality_index: { output_level: 2 } },
      { id: "D", text: "10 小时以上", reality_index: { output_level: 3 } }
    ],
    extras: [{ id: "Q3_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q4",
    type: "single_choice",
    stem: "除了房租、吃饭等必要开销，回顾过去一年，你花钱最多的三个“非必需品”领域是什么？",
    options: [
      { id: "A", text: "买书、线上课程…", score: { K: 1 } },
      { id: "B", text: "电子产品、工具…", score: { E: 1 } },
      { id: "C", text: "生活品质、氛围感…", score: { L: 1 } },
      { id: "D", text: "精神体验、门票…", score: { O: 1 } }
    ],
    extras: [{ id: "Q4_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q5",
    type: "single_choice",
    stem: "在过去的一年里，是否有陌生人因为你的某个观点或技能，而主动向你付费？",
    options: [
      { id: "A", text: "多次", reality_index: { market_validation: 3 } },
      { id: "B", text: "1-2 次", reality_index: { market_validation: 2 } },
      { id: "C", text: "仅口头感谢", reality_index: { market_validation: 1 } },
      { id: "D", text: "无", reality_index: { market_validation: 0 } }
    ],
    extras: [{ id: "Q5_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q6",
    type: "single_choice",
    stem: "当生活中遇到一个棘手的、全新的问题时，你的第一反应是？",
    options: [
      { id: "A", text: "上网搜原理…", score: { K: 1 } },
      { id: "B", text: "搜教程跟着做…", score: { E: 1 } },
      { id: "C", text: "问朋友…", score: { L: 1 } },
      { id: "D", text: "思考根本原因…", score: { O: 1 } }
    ],
    extras: [{ id: "Q6_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q7",
    type: "single_choice",
    stem: "在朋友聚会或团队合作中，你常常会不自觉地扮演什么角色？",
    options: [
      { id: "A", text: "梳理逻辑…", score: { K: 1 } },
      { id: "B", text: "动手搞定…", score: { E: 1 } },
      { id: "C", text: "调节气氛…", score: { L: 1 } },
      { id: "D", text: "提出异见…", score: { O: 1 } }
    ],
    extras: [{ id: "Q7_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q8",
    type: "single_choice",
    stem: "当你精心完成的一件作品，受到他人的负面评价时，你的第一反应更接近于？",
    options: [
      { id: "A", text: "焦虑沮丧", modifiers: { N_tendency: "High" } },
      { id: "B", text: "好奇兴奋", modifiers: { N_tendency: "Low", O_bonus: true } },
      { id: "C", text: "感到冒犯", modifiers: { A_tendency: "Low", N_tendency: "High" } },
      { id: "D", text: "不受影响", modifiers: { N_tendency: "Low" } }
    ],
    extras: [{ id: "Q8_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q9",
    type: "single_choice",
    stem: "朋友在遇到难题时，最倾向于寻求你哪一方面的“帮助”？",
    options: [
      { id: "A", text: "知识与逻辑", score: { K: 1 } },
      { id: "B", text: "经验与方法", score: { E: 1 } },
      { id: "C", text: "共情与陪伴", score: { L: 1 } },
      { id: "D", text: "观点与洞察", score: { O: 1 } }
    ],
    extras: [{ id: "Q9_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q10",
    type: "single_choice",
    stem: "如果你要给一个新手传授一项你最拿手的技能，你会如何开始你的第一堂课？",
    options: [
      { id: "A", text: "讲历史理论", score: { K: 1 } },
      { id: "B", text: "直接上手做", score: { E: 1 } },
      { id: "C", text: "聊美好改变", score: { L: 1 } },
      { id: "D", text: "讲致命错误", score: { O: 1 } }
    ],
    extras: [{ id: "Q10_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  },
  {
    id: "Q11",
    type: "single_choice",
    stem: "当你在一个合作项目中，与他人的意见发生激烈冲突时，你通常会？",
    options: [
      { id: "A", text: "妥协维护和谐", modifiers: { A_tendency: "High" } },
      { id: "B", text: "坚持逻辑说服", score: { K: 1 } },
      { id: "C", text: "找第三方", modifiers: { E_tendency: "Low" } },
      { id: "D", text: "享受辩论", modifiers: { A_tendency: "Low", O_potential: "High" } }
    ],
    extras: [{ id: "Q11_free_text", type: "free_text", label: "意犹未尽的思绪", required: false }]
  }
];

export const PHASE2_QUESTIONS: Question[] = [
  {
    id: "Q1",
    front_stem: "当你完成了一份你最满意的作品，你最希望它被哪一类人真正读懂？",
    options: [
      { id: "A", logic: "专业", score: { K: 1 }, front_text: "专业读者：同行、研究者、懂专业门道的人" },
      { id: "B", logic: "实战", score: { E: 1 }, front_text: "实用读者：会拿去用、愿意行动的人" },
      { id: "C", logic: "大众", score: { L: 1 }, front_text: "普通读者：能共鸣、愿意转述给他人听的人" },
      { id: "D", logic: "思想", score: { O: 1 }, front_text: "思想读者：愿意被挑战、能解读你更深一层意思的人" }
    ]
  },
  {
    id: "Q2",
    front_stem: "在一个多人交流、讨论、共创的场景里，你最容易“不自觉就开始做”的事是什么？",
    options: [
      { id: "A", logic: "学生", score: { K: 1 }, front_text: "我会开始“记重点”：把信息拆开、归类、总结成清晰的逻辑/步骤" },
      { id: "B", logic: "老师", score: { E: 1 }, front_text: "我会开始“推结论”：抓矛盾、提关键问题、把讨论往一个方向推进" },
      { id: "C", logic: "辩手", score: { O: 1 }, front_text: "我会开始“修表达”：忍不住调整词语、句子、语气——希望说得更精准、更漂亮、更有力量" },
      { id: "D", logic: "伙伴", score: { L: 1 }, front_text: "我会开始“顾人心”：先看大家的情绪和关系——谁紧张、谁沉默、谁需要被接住" }
    ]
  },
  {
    id: "Q3",
    front_stem: "如果让你做一份“只讲你最拿手的那一类表达”的代表作，你更想做哪一种？",
    options: [
      { id: "A", logic: "确定性", score: { K: 1 }, front_text: "把一个复杂问题讲清楚：结构清晰、层层推进，让人看完就懂" },
      { id: "B", logic: "可能性", score: { O: 1 }, front_text: "把一个真实的人写出来：让人感到“我懂你”，并愿意跟下去" },
      { id: "C", logic: "颠覆性", score: { O: 1 }, front_text: "把一句话写到极致：语言有质地、有节奏，让人反复回味" },
      { id: "D", logic: "效率", score: { E: 1 }, front_text: "把一个观点说到锋利：立场明确、敢下判断，让人被点燃或被挑战" }
    ]
  },
  {
    id: "Q4",
    front_stem: "当你陷入一个复杂议题时，你更习惯用哪种方式把它“拆开并看清楚”？",
    options: [
      { id: "A", logic: "浪费", score: { E: 1 }, front_text: "我会先把“事实清单”列出来：哪些是真的、哪些只是猜测、信息从哪来、缺的是什么。" },
      { id: "B", logic: "无意义", score: { L: 1 }, front_text: "我会先把“人”放进来：谁在受影响？谁在难受？背后是什么情绪和处境？" },
      { id: "C", logic: "无序", score: { K: 1 }, front_text: "我会先把“话说清楚”：把模糊的词换掉，把概念捋顺，让一句话不再含糊。" },
      { id: "D", logic: "愚昧", score: { O: 1 }, front_text: "我会先抓“核心矛盾”：大家到底在争什么？关键分歧在哪？必须做哪个判断？" }
    ]
  },
  {
    id: "Q5",
    front_stem: "当别人对你的表达提出质疑或反驳时，你更可能先做哪一步？",
    options: [
      { id: "A", logic: "地图", score: { K: 1 }, front_text: "先补“证据和结构”：把事实、逻辑、步骤补齐，让对方无话可说" },
      { id: "B", logic: "手术刀", score: { O: 1 }, front_text: "先补“感受和动机”：把我为什么这么说讲明白，争取理解与共情" },
      { id: "C", logic: "积木", score: { E: 1 }, front_text: "先补“说法和措辞”：换一种更准确、更不容易被误解的表达方式" },
      { id: "D", logic: "火把", score: { L: 1 }, front_text: "先补“立场和判断”：把关键分歧挑出来，直说我坚持什么、反对什么" }
    ]
  },
  {
    id: "Q6",
    front_stem: "如果要把你的内容做成一种“长期存在、能被人反复用到”的形态，你最想把它变成什么？",
    options: [
      { id: "A", logic: "书", score: { K: 1 }, front_text: "一本能反复翻的书（体系清晰、越读越懂）" },
      { id: "B", logic: "课程", score: { E: 1 }, front_text: "一套能带人上手的课程（讲得明白、学得会）" },
      { id: "C", logic: "工具", score: { E: 1, O: 1 }, front_text: "一个能直接用的工具/模板/流程（拿来就能做）" },
      { id: "D", logic: "社群", score: { L: 1 }, front_text: "一个能一起玩、一起长的社群（长期互动、互相影响）" }
    ]
  },
  {
    id: "Q7",
    front_stem: "在创作过程中，哪一个环节最让你“上头”，会忍不住反复打磨？",
    options: [
      { id: "A", logic: "删减", score: { K: 1 }, front_text: "删掉多余的：把废话砍掉，让它更干净" },
      { id: "B", logic: "重构", score: { K: 1 }, front_text: "重排结构：把顺序、层次重组，让它更顺更稳" },
      { id: "C", logic: "渲染", score: { L: 1 }, front_text: "把画面和语气“写出来”：让文字更有质地、更好读" },
      { id: "D", logic: "提炼", score: { O: 1 }, front_text: "提炼成一句“能站住”的话：抓住核心判断/观点" }
    ]
  },
  {
    id: "Q8",
    front_stem: "你更偏爱的内容气质，最像下面哪一种？",
    options: [
      { id: "A", logic: "博物馆", score: { K: 1 }, front_text: "像博物馆：信息厚、讲究脉络、耐看" },
      { id: "B", logic: "手术刀", score: { O: 1 }, front_text: "像手术刀：锋利、直切要害、不绕弯" },
      { id: "C", logic: "图纸", score: { K: 1 }, front_text: "像图纸：清楚、可复用、能照着搭建" },
      { id: "D", logic: "电影", score: { L: 1 }, front_text: "像电影：有节奏、有情绪、有画面感" }
    ]
  },
  {
    id: "Q9",
    front_stem: "你怎么看“热情”这件事？（写作/表达里的热情）",
    options: [
      { id: "A", logic: "钩子", score: { E: 1 }, front_text: "它是钩子：先把人吸引进来，才有后续" },
      { id: "B", logic: "燃料", score: { L: 1 }, front_text: "它是燃料：没有它我写不动，也传不动" },
      { id: "C", logic: "警惕", score: { K: 1 }, front_text: "要警惕：太热容易上头、失真、跑偏" },
      { id: "D", logic: "无关", score: { O: 1 }, front_text: "不重要：比起热情，我更看重判断与方向" }
    ]
  },
  {
    id: "Q10",
    front_stem: "你的创作更像哪一种节奏？",
    options: [
      { id: "A", logic: "憋大招", score: { K: 1 }, front_text: "先憋一个“大作品/大观点”，不成熟就不发" },
      { id: "B", logic: "迭代", score: { E: 1, O: 1 }, front_text: "边做边迭代：先发一版，再不断修、不断升级" },
      { id: "C", logic: "倾向L", score: { L: 1 }, front_text: "我会先把“句子质地”打磨到舒服：节奏、用词、语气都顺了再继续" },
      { id: "D", logic: "倾向O", score: { O: 1 }, front_text: "我会先把“立场与结论”立住：先定方向，再围绕方向组织材料" }
    ]
  },
  { id: "Q11", front_stem: "你产生“批判性思维”的起点更像什么？", options: [{ id: "A", logic: "防御", score: { E: 1 }, front_text: "一种防御：我得先保护自己不被忽悠/不被带节奏" }, { id: "B", logic: "乐趣", score: { O: 1 }, front_text: "一种乐趣：拆穿漏洞、抓逻辑破绽让我兴奋" }, { id: "C", logic: "责任", score: { K: 1 }, front_text: "一种责任：我必须把事情说清楚、说准确" }, { id: "D", logic: "性格", score: { O: 1 }, front_text: "一种性格：我天生就爱问“凭什么”" }] },
  { id: "Q12", front_stem: "当你要提出异见或不同看法时，你更常见的感受是？", options: [{ id: "A", logic: "职责", score: { K: 1 }, front_text: "这是我的职责：不说出来不踏实" }, { id: "B", logic: "快感", score: { O: 1 }, front_text: "有点快感：终于把我想说的戳出来了" }, { id: "C", logic: "担忧", score: { L: 1 }, front_text: "会担心：怕伤到人、怕场面变僵" }, { id: "D", logic: "无感", score: { O: 1 }, front_text: "没什么感觉：就是顺手说一句而已" }] },
  { id: "Q13", front_stem: "当你发现一个“原本相信的理论/方法”在现实里失效了，你第一反应更像哪一种？", options: [{ id: "A", logic: "现实错", score: { K: 1 }, front_text: "现实出问题：样本不够、条件不同，所以没对上" }, { id: "B", logic: "理论错", score: { O: 1 }, front_text: "理论出问题：它本来就有漏洞，需要推倒重来" }, { id: "C", logic: "执行错", score: { E: 1 }, front_text: "执行出问题：方法没落到位，得换做法/补步骤" }, { id: "D", logic: "反馈", score: { O: 1 }, front_text: "先看反馈：到底哪里不顺？让数据/结果先说话" }] },
  { id: "Q14", front_stem: "当一个你熟悉的系统/规则突然被打破，你更像哪一种反应？", options: [{ id: "A", logic: "不安", score: { K: 1 }, front_text: "不安：我需要重新把边界 and 秩序建起来" }, { id: "B", logic: "好奇", score: { O: 1 }, front_text: "好奇：这会带来什么新的可能？我想试试" }, { id: "C", logic: "警惕", score: { K: 1 }, front_text: "警惕：先别冲动，看看风险在哪里" }, { id: "D", logic: "欣赏", score: { L: 1 }, front_text: "欣赏：旧秩序被拆掉，反而更有生命力" }] },
  { id: "Q15", front_stem: "如果别人要用一个“终极称号”来评价你，你更希望是哪一个？", options: [{ id: "A", logic: "建筑师", score: { K: 1 }, front_text: "建筑师：能搭体系、能把复杂事搭成结构" }, { id: "B", logic: "破壁人", score: { O: 1 }, front_text: "破壁人：敢质疑、敢拆旧框、能开新路" }, { id: "C", logic: "解决者", score: { E: 1 }, front_text: "解决者：能把东西落地、能让问题变好" }, { id: "D", logic: "智者", score: { O: 1 }, front_text: "智者：能说出让人点头又回味的洞见" }] },
  { id: "Q16", front_stem: "你最享受营造哪一种“阅读张力”？", options: [{ id: "A", logic: "密度", score: { K: 1 }, front_text: "密度：信息/观点很浓，读完觉得值" }, { id: "B", logic: "严谨", score: { K: 1 }, front_text: "严谨：每一步都站得住，不给人抓漏洞" }, { id: "C", logic: "犀利", score: { O: 1 }, front_text: "犀利：一刀见血，让人不舒服但清醒" }, { id: "D", logic: "温暖", score: { L: 1 }, front_text: "温暖：让人被理解、被照亮、愿意继续读" }] },
  { id: "Q17", front_stem: "你觉得要破除信息茧房，最有效的方式是哪一种？", options: [{ id: "A", logic: "阅读", score: { K: 1 }, front_text: "持续阅读：读更多体系化的书/资料" }, { id: "B", logic: "对话", score: { L: 1 }, front_text: "持续对话：跟不同的人长期交流" }, { id: "C", logic: "行动", score: { E: 1 }, front_text: "持续行动：做事、试错，用结果纠偏" }, { id: "D", logic: "深度", score: { O: 1 }, front_text: "持续深度：把一个问题挖到底，直到看清结构" }] },
  { id: "Q18", front_stem: "你觉得自己的表达在“传播”上最容易卡在哪？", options: [{ id: "A", logic: "硬核", score: { K: 1 }, front_text: "太硬太难：信息密、门槛高，普通人进不来" }, { id: "B", logic: "思辨", score: { O: 1 }, front_text: "太烧脑：思辨太多，别人看着累、跟不上" }, { id: "C", logic: "冰冷", score: { L: -1 }, front_text: "太冷：缺点人味/情绪温度，让人难共鸣" }, { id: "D", logic: "温吞", score: { O: -1 }, front_text: "太温吞：不够立场/锋芒，别人记不住" }] },
  { id: "Q19", front_stem: "你希望受众在读你的内容时，更像处在什么状态？", options: [{ id: "A", logic: "学生", score: { K: 1 }, front_text: "学生：来学习、来建立知识框架" }, { id: "B", logic: "对手", score: { O: 1 }, front_text: "对手：来较真、来掰扯、来挑战你" }, { id: "C", logic: "同路人", score: { L: 1 }, front_text: "同路人：来共鸣、来互相理解" }, { id: "D", logic: "玩家", score: { E: 1 }, front_text: "玩家：来参与、来尝试、来一起做点事" }] },
  { id: "Q20", front_stem: "如果你的内容最终要留给世界一份“遗产”，你更希望它像什么？", options: [{ id: "A", logic: "模型", score: { K: 1 }, front_text: "一个模型：别人能照着用、照着搭" }, { id: "B", logic: "问题", score: { O: 1 }, front_text: "一串问题：别人会被你逼着继续追问" }, { id: "C", logic: "人文", score: { L: 1 }, front_text: "一份人文：让人更懂人、更懂生活" }, { id: "D", logic: "精神", score: { E: 1 }, front_text: "一种精神：让人获得勇气/信念/行动力" }] }
];

// Mentor Set with 32 authors
const createAuthors = (type: KELO, names: string[]): Author[] => {
  return names.map((name, i) => ({
    author_id: `${type}_${i}`,
    author_name: name,
    country_or_language: '中文',
    six_baskets_main: SIX_BASKETS[i % 6].name,
    KELO_primary: type,
    representative_works: [`${name}代表作一`, `${name}代表作二`],
    why_recommend: `这位作者在${type}维度的表达极具代表性，其作品深入浅出，适合模仿。`,
    learning_handle: `重点观察其${type === 'K' ? '逻辑架构' : type === 'E' ? '案例推进' : type === 'L' ? '氛围营造' : '观点切入'}。`,
    evidence_links: [{ title: '访谈记录', url: '#' }, { title: '深度解析', url: '#' }],
    source_quality: 'A'
  }));
};

export const AUTHOR_LIBRARY: Author[] = [
  ...createAuthors('K', ['梁文道', '刘瑜', '周濂', '陈嘉映', '许知远', '马国川', '江晓原', '葛兆光']),
  ...createAuthors('E', ['吴晓波', '李翔', '罗振宇', '脱不花', '粥左罗', '古典', '采铜', '万维钢']),
  ...createAuthors('L', ['毛尖', '李娟', '止庵', '黄磊', '汪曾祺', '阿城', '金宇澄', '周晓枫']),
  ...createAuthors('O', ['韩寒', '六神磊磊', '和菜头', '押沙龙', '李海鹏', '连岳', '马伯庸', '张佳玮'])
];
