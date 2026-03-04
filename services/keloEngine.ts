
import { KELO, Score, SurveyResult } from '../types';

export function calculateScores(responses: any[], questions: any[]): { scores: Score, realityIndex: any, modifiers: any } {
  const score: Score = { K: 0, E: 0, L: 0, O: 0 };
  let output_level = 0;
  let market_validation = 0;
  const modifiers: any = {
    N_tendency: null,
    A_tendency: null,
    E_tendency: null
  };

  const nlpKeywords = {
    K: ['学习', '文档', '笔记'],
    E: ['剪辑', '修图', '运动'],
    L: ['聊天', '朋友圈', '看剧'],
    O: ['评论', '辩论', '资讯']
  };
  const nlpHit = { K: false, E: false, L: false, O: false };

  responses.forEach((resp) => {
    const q = questions.find(question => question.id === resp.id);
    if (!q) return;

    // Handle single choice options
    if (resp.optionId && q.options) {
      const opt = q.options.find((o: any) => o.id === resp.optionId);
      if (opt) {
        if (opt.score) {
          Object.keys(opt.score).forEach((key) => {
            score[key as KELO] += opt.score[key as KELO] || 0;
          });
        }
        if (opt.reality_index) {
          if (opt.reality_index.output_level !== undefined) output_level = opt.reality_index.output_level;
          if (opt.reality_index.market_validation !== undefined) market_validation = opt.reality_index.market_validation;
        }
        if (opt.modifiers) {
          Object.assign(modifiers, opt.modifiers);
        }
      }
    }

    // Handle NLP bonus for Q2
    if (resp.id === 'Q2' && resp.text && q.nlp_enrichment) {
      const text = resp.text.toLowerCase();
      Object.entries(nlpKeywords).forEach(([key, words]) => {
        if (!nlpHit[key as KELO] && words.some(w => text.includes(w))) {
          score[key as KELO] += 1;
          nlpHit[key as KELO] = true; // Cap per class = 1
        }
      });
    }
  });

  return { scores: score, realityIndex: { outputLevel: output_level, marketValidation: market_validation }, modifiers };
}

export function generateFullResult(p1Data: any, p2Data: any, p1Questions: any[], p2Questions: any[]): SurveyResult {
  const p1 = calculateScores(p1Data, p1Questions);
  const p2 = calculateScores(p2Data, p2Questions);

  const totalScores: Score = {
    K: p1.scores.K + p2.scores.K,
    E: p1.scores.E + p2.scores.E,
    L: p1.scores.L + p2.scores.L,
    O: p1.scores.O + p2.scores.O,
  };

  // Gap Model: Gap = Cognition - Behavior (P2 - P1)
  const gaps: Score = {
    K: p2.scores.K - p1.scores.K,
    E: p2.scores.E - p1.scores.E,
    L: p2.scores.L - p1.scores.L,
    O: p2.scores.O - p1.scores.O,
  };

  const sorted = Object.entries(totalScores).sort((a, b) => b[1] - a[1]);
  const primaryType = sorted[0][0] as KELO;
  
  // Secondary type: check if next is significant (> 60% of primary)
  let secondaryType: KELO | null = null;
  if (sorted[1] && sorted[1][1] > (sorted[0][1] * 0.6)) {
      secondaryType = sorted[1][0] as KELO;
  }

  // Consistency Level: Aggregate difference between Behavior and Cognition
  const diffs = Object.keys(p1.scores).map(k => Math.abs(p1.scores[k as KELO] - p2.scores[k as KELO]));
  const totalDiff = diffs.reduce((a, b) => a + b, 0);
  let consistencyLevel: 'High' | 'Medium' | 'Low' = 'High';
  if (totalDiff > 12) consistencyLevel = 'Low';
  else if (totalDiff > 6) consistencyLevel = 'Medium';

  return {
    phase1Scores: p1.scores,
    phase2Scores: p2.scores,
    totalScores,
    realityIndex: p1.realityIndex,
    modifiers: p1.modifiers,
    primaryType,
    secondaryType,
    consistencyLevel,
    gaps
  };
}
