
import React from 'react';
import { DecisionMemo } from '../types';

interface MemoRendererProps {
  memo: DecisionMemo;
}

export const MemoRenderer: React.FC<MemoRendererProps> = ({ memo }) => {
  return (
    <div className="bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] rounded-3xl overflow-hidden border border-slate-200 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out print:shadow-none print:border-none print:max-w-none print:w-full print:rounded-none print:m-0">
      {/* Header */}
      <div className="bg-slate-900 text-white p-10 md:p-16 border-b border-slate-800 relative overflow-hidden print:bg-slate-900 print:text-white print:p-12">
        <div className="absolute top-0 right-0 p-2 opacity-10 print:hidden">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45z"/>
            </svg>
        </div>
        <div className="relative z-10 flex justify-between items-start mb-10">
          <div className="space-y-2">
            <span className="text-indigo-400 font-bold tracking-[0.2em] text-[10px] uppercase block mb-1">Internal Distribution Only</span>
            <h2 className="text-4xl md:text-5xl font-serif tracking-tight">Executive Memo</h2>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-1">Ref ID: COS-{Math.floor(Math.random() * 9000 + 1000)}</p>
            <p className="text-slate-400 text-sm">{new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
          </div>
        </div>
      </div>

      <div className="p-10 md:p-16 space-y-16 print:p-12 print:space-y-10">
        {/* Abstract */}
        <section className="animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-slate-200 flex-1"></div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Summary</h3>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>
          <p className="text-slate-800 leading-[1.8] text-xl md:text-2xl font-serif italic text-center px-4">
            "{memo.abstract}"
          </p>
        </section>

        {/* Action Tracker */}
        <section className="animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center print:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            </div>
            Action Tracker
          </h3>
          <div className="overflow-hidden border border-slate-100 rounded-2xl shadow-sm print:rounded-none print:shadow-none print:border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 print:bg-slate-50">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Deliverable</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Owner</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 print:divide-slate-200">
                {memo.actions.map((action, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group print:hover:bg-transparent">
                    <td className="px-8 py-6 text-slate-800 font-medium group-hover:text-indigo-600 transition-colors print:group-hover:text-slate-800">{action.task}</td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 print:bg-white print:border-slate-300">
                        {action.assignee}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-slate-500 font-mono text-sm">{action.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Debate Log */}
        <section className="animate-in fade-in slide-in-from-left-4 duration-700 delay-500">
          <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center print:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
            </div>
            Strategic Debate Log
          </h3>
          <div className="space-y-10 print:space-y-8">
            {memo.debates.map((debate, idx) => (
              <div key={idx} className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 group hover:border-indigo-100 transition-all print:bg-white print:border-slate-200 print:rounded-none">
                <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-4">
                    <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                    {debate.decision}
                </h4>
                <div className="grid md:grid-cols-2 gap-8 print:grid-cols-1">
                  <div className="space-y-4">
                    <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Arguments For
                    </span>
                    <ul className="space-y-3">
                      {debate.argumentsFor.map((arg, i) => (
                        <li key={i} className="text-sm text-slate-600 leading-relaxed pl-4 border-l border-emerald-100 print:border-emerald-200">
                          {arg}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <span className="text-rose-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                        Arguments Against
                    </span>
                    <ul className="space-y-3">
                      {debate.argumentsAgainst.map((arg, i) => (
                        <li key={i} className="text-sm text-slate-600 leading-relaxed pl-4 border-l border-rose-100 print:border-rose-200">
                          {arg}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tone Analysis */}
        <section className="bg-slate-900 p-10 md:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group animate-in fade-in slide-in-from-left-4 duration-700 delay-700 print:bg-slate-900 print:rounded-none print:shadow-none print:text-white">
          <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:rotate-12 transition-transform duration-700 print:hidden">
             <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/>
             </svg>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-10 relative z-10 print:flex-row print:gap-8">
            <div className="flex-shrink-0 print:hidden">
               <div className="h-24 w-24 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-indigo-400 font-bold text-4xl shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-500">
                 {memo.tone.label.charAt(0)}
               </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold">Meeting Vibe: {memo.tone.label}</h3>
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] uppercase font-bold tracking-widest border border-indigo-500/30 print:hidden">Verified Analysis</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg font-light max-w-2xl print:text-slate-200">{memo.tone.description}</p>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <div className="bg-slate-50/50 p-10 text-center border-t border-slate-100 space-y-2 print:bg-white print:border-slate-200">
        <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em]">Chief of Staff Intelligence Engine v3.1</p>
        <p className="text-slate-300 text-xs print:text-slate-400">This document is confidential and intended solely for the recipient. Unauthorized access is prohibited.</p>
      </div>
    </div>
  );
};