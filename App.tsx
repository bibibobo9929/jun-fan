
import React, { useState, useMemo } from 'react';
import { PHASE1_QUESTIONS, PHASE2_QUESTIONS, AUTHOR_LIBRARY, SIX_BASKETS } from './constants';
import { generateFullResult } from './services/keloEngine';
import { SurveyResult, KELO } from './types';

// Sub-components
const ProgressBar = ({ current, total, color = "bg-indigo-600" }: { current: number; total: number; color?: string }) => (
  <div className="w-full bg-gray-100 h-1.5 rounded-full mb-6">
    <div 
      className={`${color} h-1.5 rounded-full transition-all duration-500 ease-out`} 
      style={{ width: `${(current / total) * 100}%` }}
    />
  </div>
);

const QuestionView = ({ question, onNext, isLast, phase }: any) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [extraText, setExtraText] = useState('');

  const isFreeTextOnly = question.type === 'free_text';

  const handleNext = () => {
    onNext({ 
      id: question.id, 
      optionId: selected, 
      text: isFreeTextOnly ? text : extraText 
    });
    setSelected(null);
    setText('');
    setExtraText('');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-50 animate-fadeIn transition-all">
      <h2 className="text-2xl font-bold mb-8 text-gray-900 leading-tight">
        {question.stem || question.front_stem}
      </h2>
      
      {isFreeTextOnly ? (
        <textarea
          className="w-full p-5 border-2 border-gray-100 rounded-2xl focus:border-indigo-500 focus:ring-0 outline-none h-40 transition-all text-gray-700 bg-gray-50/30"
          placeholder="请输入您的观察或顺序列表..."
          value={text}
          maxLength={800}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div className="space-y-3">
          {question.options?.map((opt: any) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 group flex items-start ${
                selected === opt.id 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' 
                  : 'border-gray-50 hover:border-gray-200 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span className={`w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 flex items-center justify-center text-xs ${
                selected === opt.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-200'
              }`}>
                {opt.id}
              </span>
              <span className="flex-1">{opt.front_text || opt.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Optional Free Text for Phase 1 */}
      {phase === 1 && question.extras && (
        <div className="mt-8">
          <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
            {question.extras[0].label} (可选)
          </label>
          <textarea
            className="w-full p-4 border-2 border-gray-50 rounded-2xl focus:border-indigo-200 focus:ring-0 outline-none h-24 transition-all text-sm bg-gray-50/50"
            placeholder="关于此题，您还有什么想补充的吗？"
            value={extraText}
            maxLength={800}
            onChange={(e) => setExtraText(e.target.value)}
          />
        </div>
      )}

      <button
        disabled={!isFreeTextOnly && !selected}
        onClick={handleNext}
        className="mt-10 w-full py-5 bg-indigo-600 text-white font-black text-lg rounded-2xl hover:bg-indigo-700 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100 active:scale-95"
      >
        {isLast ? (phase === 1 ? '提交第一轮' : '生成测评报告') : '下一题'}
      </button>
    </div>
  );
};

const ReportPage = ({ result }: { result: SurveyResult }) => {
  const [basketFilter, setBasketFilter] = useState<string | null>(null);

  const descriptionMap = {
    K: { title: '知识建筑师 (Knowledge)', desc: '擅长梳理逻辑、建立知识框架，通过结构化的输出来消除模糊与无序。' },
    E: { title: '实战教练 (Execution)', desc: '注重行动与现实反馈，能够将抽象的理论落地为具体的、可复用的方案。' },
    L: { title: '共鸣者 (Lifestyle)', desc: '具有极强的同理心，擅长通过情绪、氛围和人文关怀连接他人。' },
    O: { title: '思想破壁人 (Observation)', desc: '敢于挑战常规，能一眼看穿事物本质，通过犀利的洞察提出独特见解。' }
  };

  const recommendedAuthors = useMemo(() => {
    let list = AUTHOR_LIBRARY.filter(a => a.KELO_primary === result.primaryType);
    if (basketFilter) {
      list = list.sort((a, b) => (a.six_baskets_main === basketFilter ? -1 : 1));
    }
    return list.slice(0, 6);
  }, [result.primaryType, basketFilter]);

  const exportResult = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "kelo_report.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-12 animate-fadeIn mb-20">
      {/* 1. KELO Type Header */}
      <section className="text-center py-16 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-[3rem] text-white shadow-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <span className="text-[12rem] font-black">{result.primaryType}</span>
        </div>
        <p className="text-indigo-200 font-black tracking-[0.3em] uppercase mb-4 text-sm">KELO DUAL SURVEY ASSESSMENT</p>
        <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tighter">
          {result.primaryType}{result.secondaryType ? <span className="text-indigo-400">+{result.secondaryType}</span> : ''}
        </h1>
        <div className="max-w-xl mx-auto px-6">
            <p className="text-xl text-indigo-100 font-medium mb-8 leading-relaxed">
              您的主导格为 <strong>{descriptionMap[result.primaryType].title}</strong>。<br/>
              {descriptionMap[result.primaryType].desc}
            </p>
            <div className="flex justify-center gap-6">
                <div className="text-center">
                    <div className="text-2xl font-black">{result.consistencyLevel}</div>
                    <div className="text-[0.6rem] uppercase tracking-widest opacity-60">知行一致性</div>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="text-center">
                    <div className="text-2xl font-black">{result.realityIndex.outputLevel}/3</div>
                    <div className="text-[0.6rem] uppercase tracking-widest opacity-60">产出指数</div>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="text-center">
                    <div className="text-2xl font-black">{result.realityIndex.marketValidation}/3</div>
                    <div className="text-[0.6rem] uppercase tracking-widest opacity-60">市场验证</div>
                </div>
            </div>
        </div>
      </section>

      {/* 2 & 3. Scores Analysis */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-black mb-8 text-indigo-950 flex items-center">
            <span className="w-1.5 h-6 bg-indigo-600 rounded-full mr-3"></span>
            第一轮：行为画像 (Behavior)
          </h3>
          <div className="space-y-6">
            {Object.entries(result.phase1Scores).map(([key, score]) => (
              <div key={key}>
                <div className="flex justify-between text-sm font-bold mb-1.5 text-gray-500 uppercase">
                    <span>{key} 维度</span>
                    <span>{score}</span>
                </div>
                <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full transition-all" style={{ width: `${(score / 12) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50">
             <p className="text-sm text-gray-500 italic leading-relaxed">
                这是您在现实生活中的“显影”，代表了您当前最习惯的资源分配方式和行动逻辑。
             </p>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-black mb-8 text-indigo-950 flex items-center">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full mr-3"></span>
            第二轮：深度认知 (Cognition)
          </h3>
          <div className="space-y-6">
            {Object.entries(result.phase2Scores).map(([key, score]) => (
              <div key={key}>
                <div className="flex justify-between text-sm font-bold mb-1.5 text-gray-500 uppercase">
                    <span>{key} 维度</span>
                    <span>{score}</span>
                </div>
                <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full transition-all" style={{ width: `${(score / 20) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-50">
             <p className="text-sm text-gray-500 italic leading-relaxed">
                这是您的“灯塔”，代表了您在潜意识中认同的价值终点和理想的表达状态。
             </p>
          </div>
        </div>
      </div>

      {/* 4. Consistency Rating & Gap */}
      <section className="bg-gray-900 rounded-[3rem] p-10 text-white">
        <h3 className="text-2xl font-black mb-6">知行合一性：{result.consistencyLevel === 'High' ? '极佳' : result.consistencyLevel === 'Medium' ? '良好' : '待对齐'}</h3>
        <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
          根据“联合评估 Gap 模型”，您的认知与行为之间的偏差为 {Object.values(result.gaps).reduce((a, b) => a + Math.abs(b), 0)}。
          {result.consistencyLevel === 'High' ? 
            '您的行为高度服务于您的认知，处于知行合一的巅峰状态。' : 
            '您的理想与现实存在一定的“错位”。这通常意味着您正处于能力的积累期或类型的转型期。建议通过书写来对齐两端的张力。'}
        </p>
        <div className="flex gap-4">
            <button onClick={() => window.print()} className="bg-white text-gray-900 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all">打印报告</button>
            <button onClick={exportResult} className="bg-gray-800 text-white border border-gray-700 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-gray-700 transition-all">导出 JSON</button>
        </div>
      </section>

      {/* 5. Mentor Set */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-2">原装圣体书单推荐</h2>
                <p className="text-gray-500 font-medium">Mentor Set：为您匹配全球视野下的灵魂表达者</p>
            </div>
            <div className="flex flex-wrap gap-2">
                <button 
                    onClick={() => setBasketFilter(null)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${!basketFilter ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                >
                    全部
                </button>
                {SIX_BASKETS.map(b => (
                    <button 
                        key={b.id}
                        onClick={() => setBasketFilter(b.name)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border-2 ${basketFilter === b.name ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                    >
                        {b.name}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedAuthors.map(author => (
            <div key={author.author_id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{author.author_name}</h4>
                  <span className="text-[0.65rem] text-indigo-500 font-black tracking-widest uppercase">{author.six_baskets_main}</span>
                </div>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl text-[0.6rem] font-black uppercase tracking-tighter">LVL: {author.source_quality}</span>
              </div>
              
              <div className="space-y-5 flex-1">
                <div>
                  <p className="text-[0.65rem] text-gray-400 font-black uppercase tracking-widest mb-1.5">代表作</p>
                  <p className="text-sm text-gray-800 font-bold leading-relaxed">{author.representative_works.join(' / ')}</p>
                </div>
                
                <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-50">
                  <p className="text-[0.6rem] text-indigo-400 font-black mb-2 uppercase tracking-widest">推荐理由</p>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium italic">“{author.why_recommend}”</p>
                </div>

                <div className="bg-indigo-50/30 p-5 rounded-3xl">
                  <p className="text-[0.6rem] text-purple-400 font-black mb-2 uppercase tracking-widest">学习抓手</p>
                  <p className="text-xs text-gray-700 leading-relaxed font-bold">{author.learning_handle}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <a href={author.evidence_links[0].url} className="text-[0.6rem] font-black text-indigo-600 uppercase hover:underline">查看深度解析 →</a>
                <span className="text-[0.6rem] font-black text-gray-300">#{author.KELO_primary}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <div className="text-center pt-20">
        <button onClick={() => window.location.reload()} className="text-gray-400 font-black text-xs hover:text-indigo-600 transition-all tracking-[0.2em] uppercase">
          ← 重置所有测评数据
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<'home' | 'phase1' | 'transition' | 'phase2' | 'report'>('home');
  const [qIndex, setQIndex] = useState(0);
  const [p1Answers, setP1Answers] = useState<any[]>([]);
  const [p2Answers, setP2Answers] = useState<any[]>([]);

  const handleP1Next = (ans: any) => {
    const newAnswers = [...p1Answers, ans];
    setP1Answers(newAnswers);
    if (qIndex < PHASE1_QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setStep('transition');
      setQIndex(0);
    }
  };

  const handleP2Next = (ans: any) => {
    const newAnswers = [...p2Answers, ans];
    setP2Answers(newAnswers);
    if (qIndex < PHASE2_QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setStep('report');
    }
  };

  const finalResult = useMemo(() => {
    if (step === 'report') {
      return generateFullResult(p1Answers, p2Answers, PHASE1_QUESTIONS, PHASE2_QUESTIONS);
    }
    return null;
  }, [step, p1Answers, p2Answers]);

  return (
    <div className="min-h-screen pb-20 bg-gray-50/50">
      <nav className="p-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 flex justify-between items-center border-b border-gray-100">
        <div className="font-black text-2xl tracking-tighter text-gray-900 group cursor-default">
          KELO <span className="text-indigo-600 transition-colors">SURVEY</span>
          <span className="ml-2 text-[0.6rem] bg-gray-100 px-2 py-0.5 rounded-full font-black text-gray-400">V1.1_SIQ</span>
        </div>
        <div className="flex gap-4">
            <div className="hidden md:block text-[0.6rem] font-black text-gray-300 uppercase tracking-[0.3em]">Joint Assessment Gap Model</div>
        </div>
      </nav>

      {step === 'home' && (
        <div className="max-w-3xl mx-auto text-center px-6 py-20">
          <div className="relative inline-block mb-12">
            <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] rotate-3 shadow-2xl shadow-indigo-100 flex items-center justify-center animate-pulse">
                <span className="text-white text-6xl font-black -rotate-3">K</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg border border-gray-50 flex items-center justify-center">
                <span className="text-indigo-600 text-xl font-black">E</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-8 text-gray-900 tracking-tighter leading-tight">
            探索您的思想原力 <br/><span className="text-indigo-600">双向显影问卷</span>
          </h1>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl mx-auto font-medium">
            我们拒绝单一的人格标签。通过行为现状与深层认知的两轮对齐，为您锁定最契合的“原装圣体”书单与表达模型。
          </p>
          <button 
            onClick={() => setStep('phase1')}
            className="px-12 py-6 bg-indigo-600 text-white font-black text-xl rounded-3xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-1 active:scale-95"
          >
            开启测评之旅
          </button>
        </div>
      )}

      {step === 'phase1' && (
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto mb-2 text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">Phase 01: The Developer Kit</div>
          <ProgressBar current={qIndex + 1} total={PHASE1_QUESTIONS.length} />
          <QuestionView 
            question={PHASE1_QUESTIONS[qIndex]} 
            onNext={handleP1Next}
            isLast={qIndex === PHASE1_QUESTIONS.length - 1}
            phase={1}
          />
        </div>
      )}

      {step === 'transition' && (
        <div className="max-w-xl mx-auto text-center px-6 py-24 animate-fadeIn">
          <div className="w-20 h-20 bg-green-50 rounded-full mx-auto flex items-center justify-center mb-10 border-4 border-green-100">
             <span className="text-green-600 text-3xl">✓</span>
          </div>
          <h2 className="text-4xl font-black mb-6 text-gray-900 tracking-tighter">第一轮：快速显影已完成</h2>
          <p className="text-gray-500 mb-12 leading-relaxed text-lg font-medium">
            刚才的 11 道题勾勒了您的日常行为逻辑。接下来的第二轮 <strong>“思想灯塔 (Lighthouse)”</strong> 包含 20 道深层认知题。
            它们将揭示您灵魂深处真正向往的价值锚点。
          </p>
          <button 
            onClick={() => setStep('phase2')}
            className="px-12 py-6 bg-gray-900 text-white font-black text-xl rounded-3xl shadow-2xl shadow-gray-200 hover:bg-black transition-all"
          >
            进入第二轮 (20题)
          </button>
        </div>
      )}

      {step === 'phase2' && (
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto mb-2 text-xs font-black text-purple-400 uppercase tracking-[0.2em]">Phase 02: The Lighthouse</div>
          <ProgressBar current={qIndex + 1} total={PHASE2_QUESTIONS.length} color="bg-purple-600" />
          <QuestionView 
            question={PHASE2_QUESTIONS[qIndex]} 
            onNext={handleP2Next}
            isLast={qIndex === PHASE2_QUESTIONS.length - 1}
            phase={2}
          />
        </div>
      )}

      {step === 'report' && finalResult && (
        <ReportPage result={finalResult} />
      )}

      <footer className="fixed bottom-0 left-0 right-0 bg-white/60 backdrop-blur-sm border-t p-4 text-center text-[0.6rem] text-gray-400 font-black tracking-widest uppercase pointer-events-none">
        © 2025 KELO DUAL SURVEY SYSTEM | SI-Q-TECH DATA PROTECTION COMPLIANT
      </footer>
    </div>
  );
}
