
import React, { useState, useEffect } from 'react';
import { generateDecisionMemo } from './services/geminiService';
import { DecisionMemo, AppStatus } from './types';
import { Button } from './components/Button';
import { MemoRenderer } from './components/MemoRenderer';

const INITIAL_TRANSCRIPT = `Speaker 1 (Sarah - PM): Okay, thanks for joining, everyone. Um, we need to make a final go/no-go decision for the "GreenLight" feature launch. The original plan was to push to production this Friday, right?
Speaker 2 (Mike - Engineering): Yeah, about that... look, technically we can deploy, but the payment gateway API is throwing 500 errors on about 10% of transactions during stress testing. It's unstable.
Speaker 3 (David - Sales): Wait, 10%? We can't launch like that. I have three enterprise clients onboarding Monday morning. If they can't pay, I look like an idiot. We need to delay.
Speaker 1 (Sarah): David, I get that, but marketing already scheduled the email blast for Friday. Jessica, can we push the emails back?
Speaker 4 (Jessica - Marketing): I mean, I *can*, but we risk losing the momentum from the conference. Ideally, we launch Friday. But... if the payments don't work, the momentum doesn't matter.
Speaker 2 (Mike): Look, if I pull the whole backend team onto this tonight, we might be able to patch it. But I need approval for overtime budget. And I need David to stop messaging my developers directly so they can focus.
Speaker 1 (Sarah): Okay, let's pause. Here is the decision: We are NOT launching Friday. We are pushing to next Tuesday to be safe.
Mike, you have approval for overtime—get the payment gateway fixed by Sunday night.
Jessica, please reschedule the blast for Tuesday morning.
David, contact your three enterprise clients personally and give them a "white glove" manual invoice so they don't have to use the gateway yet.
Speaker 3 (David): Fine. I'll email them today.
Speaker 1 (Sarah): Great. Let's reconvene Monday at 10 AM to confirm. Thanks, guys.`;

const LOADING_MESSAGES = [
  "Parsing speakers and dialogue...",
  "Identifying key executive decisions...",
  "Extracting action items and deadlines...",
  "Analyzing debate dynamics...",
  "Synthesizing meeting tone and energy...",
  "Finalizing your Decision Memo..."
];

const App: React.FC = () => {
  const [transcript, setTranscript] = useState(INITIAL_TRANSCRIPT);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [memo, setMemo] = useState<DecisionMemo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  useEffect(() => {
    let interval: number;
    if (status === AppStatus.PROCESSING) {
      interval = window.setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleProcess = async () => {
    if (!transcript.trim()) return;

    setStatus(AppStatus.PROCESSING);
    setError(null);
    try {
      const result = await generateDecisionMemo(transcript);
      setMemo(result);
      setStatus(AppStatus.COMPLETED);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the transcript. Please ensure your API key is configured correctly.");
      setStatus(AppStatus.ERROR);
    }
  };

  const handleReset = () => {
    setMemo(null);
    setStatus(AppStatus.IDLE);
    setTranscript("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-1000">
      {/* Navbar - hidden on print */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 px-6 sticky top-0 z-50 transition-all duration-300 print:hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={handleReset}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">Chief of Staff AI</h1>
          </div>
          <div className="flex gap-4">
            {status === AppStatus.COMPLETED && (
              <Button variant="outline" onClick={handleReset} className="hover:scale-105 transition-transform">New Transcript</Button>
            )}
            <Button 
              variant="secondary" 
              onClick={handlePrint} 
              disabled={status !== AppStatus.COMPLETED}
              className="hover:scale-105 active:scale-95 transition-all"
            >
              Export PDF
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 relative print:p-0 print:max-w-none">
        {status === AppStatus.PROCESSING ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-500">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center text-white animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-500 font-medium text-lg animate-pulse transition-all duration-500">
              {LOADING_MESSAGES[loadingMsgIdx]}
            </p>
          </div>
        ) : status === AppStatus.IDLE || status === AppStatus.ERROR ? (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4 mb-12">
              <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-2">Powered by Gemini 3</span>
              <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">Transcript to Intelligence</h2>
              <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
                Transform unstructured meeting chaos into a high-fidelity Executive Decision Memo in seconds.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-2xl shadow-indigo-100/50 border border-white/50 transition-all hover:shadow-indigo-200/50 duration-500">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Meeting Transcript
                </label>
                <div className="text-xs text-slate-400 font-mono">
                  {transcript.length} characters
                </div>
              </div>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your meeting transcript here..."
                className="w-full h-80 p-6 bg-white border border-slate-200 rounded-2xl shadow-inner focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all outline-none resize-none font-mono text-sm leading-relaxed text-slate-900 placeholder:text-slate-300"
              />
              {error && (
                <div className="mt-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl text-sm flex items-center gap-3 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 py-4 text-lg shadow-indigo-200 shadow-lg hover:-translate-y-1 transition-all duration-300" 
                  onClick={handleProcess} 
                  isLoading={false}
                >
                  Generate Decision Memo
                </Button>
                {transcript !== INITIAL_TRANSCRIPT && (
                  <Button variant="outline" onClick={() => setTranscript(INITIAL_TRANSCRIPT)} className="hover:bg-white transition-all">
                    Reset to Sample
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12">
              {[
                { title: 'Decision Log', desc: 'Captures critical forks in the project roadmap.', icon: '🎯' },
                { title: 'Action Items', desc: 'Identifies assignees and strictly enforces deadlines.', icon: '📋' },
                { title: 'Tone Analysis', desc: 'Synthesizes meeting energy for cultural insights.', icon: '🎭' }
              ].map((feature, i) => (
                <div key={i} className="bg-white/40 p-6 rounded-2xl border border-white/60 shadow-sm text-center hover:bg-white/80 transition-all duration-300 group">
                  <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300 inline-block">{feature.icon}</div>
                  <h4 className="font-bold text-slate-800 mb-2">{feature.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          memo && <MemoRenderer memo={memo} />
        )}
      </main>

      {/* Footer - hidden on print */}
      <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-sm print:hidden">
        <p className="mb-2">Built for high-performance leadership teams.</p>
        <p>&copy; {new Date().getFullYear()} Chief of Staff AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;