import { useState } from 'react';
import { BarChart3, Download, TrendingUp, AlertTriangle, Briefcase, Zap, Brain, Target, Hexagon } from 'lucide-react';
import { FactorChart } from './FactorChart';
import classNames from 'classnames';

export function ResultDashboard() {
  const [activeTab, setActiveTab] = useState<'mbti' | 'bigfive' | 'hexaco' | '16pf'>('mbti');

  return (
    <div className="max-w-6xl mx-auto font-sans mt-4 sm:mt-8 pb-20 fade-in">
      
      {/* 1. Hero Archetype Header (16Personalities Style) */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 rounded-3xl p-8 sm:p-14 mb-10 overflow-hidden shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-md border border-white/20">
              Your Archetype
            </span>
            <h1 className="text-5xl md:text-6xl font-heading font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
              The Architect
            </h1>
            <p className="text-indigo-200 text-xl md:text-2xl font-medium mb-2">INTJ-A / Strategic Visionary</p>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed mt-6">
              Imaginative and strategic thinkers, with a plan for everything. You navigate complex systems with ease and demand intellectual rigor.
            </p>
          </div>
          
          {/* Circular Avatar Placeholder */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
            <div className="relative w-full h-full bg-white/10 border border-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
               <Brain className="w-24 h-24 text-white opacity-90" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'mbti', label: 'MBTI', icon: Zap },
            { id: 'bigfive', label: 'Big Five', icon: BarChart3 },
            { id: 'hexaco', label: 'HEXACO', icon: Hexagon },
            { id: '16pf', label: '16pf', icon: Target },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={classNames(
                  "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-white text-indigo-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-md group w-full sm:w-auto">
          <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          Export JSON Report
        </button>
      </div>

      {/* Model-Specific Content Tabs */}
      
      {activeTab === 'mbti' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <div className="bg-white p-8 rounded-3xl border-t-4 border-t-emerald-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-5 text-emerald-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">Superpowers</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Strategic planning, system architecture, identifying inefficiencies, and maintaining long-term vision despite immediate chaos.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border-t-4 border-t-rose-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-5 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">Burnout Triggers</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Highly repetitive administrative tasks, strict micromanagement, and environments that prioritize social harmony over objective truth.</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border-t-4 border-t-blue-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 text-blue-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">Career Alignment</h3>
            <p className="text-slate-600 leading-relaxed text-sm">Best suited for dynamic tech startups, systems engineering, strategic consulting, or academic research.</p>
          </div>
        </div>
      )}

      {activeTab === 'bigfive' && (
        <div className="animate-fade-in bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                O.C.E.A.N. Dimensionality
              </h2>
              <p className="text-slate-500 mb-8">Your Big Five trait distribution rendered dynamically from your raw assessment inputs.</p>
              
              <div className="space-y-6">
                 {/* Trait Bars */}
                 {[
                   { name: 'Openness', score: 85, color: 'bg-purple-500', desc: 'Inventive / Curious' },
                   { name: 'Conscientiousness', score: 65, color: 'bg-emerald-500', desc: 'Efficient / Organized' },
                   { name: 'Extraversion', score: 92, color: 'bg-orange-500', desc: 'Outgoing / Energetic' },
                   { name: 'Agreeableness', score: 78, color: 'bg-blue-500', desc: 'Friendly / Compassionate' },
                   { name: 'Neuroticism', score: 45, color: 'bg-rose-500', desc: 'Sensitive / Nervous' },
                 ].map(trait => (
                    <div key={trait.name}>
                      <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                        <span>{trait.name}</span>
                        <span>{trait.score}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 mb-1 overflow-hidden">
                        <div className={`h-3 rounded-full ${trait.color} transition-all duration-1000 ease-out`} style={{ width: `${trait.score}%` }}></div>
                      </div>
                      <p className="text-xs text-slate-400 text-right">{trait.desc}</p>
                    </div>
                 ))}
              </div>
            </div>
            <div className="flex-1 min-h-[400px] flex items-center justify-center bg-slate-50 rounded-2xl border border-slate-100">
              <FactorChart />
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'hexaco' || activeTab === '16pf') && (
        <div className="animate-fade-in bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center">
          <Hexagon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{activeTab.toUpperCase()} Data Matrix</h2>
          <p className="text-slate-500">Deep structural analysis for {activeTab.toUpperCase()} is currently synthesizing based on your responses.</p>
        </div>
      )}

    </div>
  );
}
