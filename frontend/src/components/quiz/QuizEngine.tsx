import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionCard, type Question } from './QuestionCard';
import { ProgressBar } from './ProgressBar';

// Mock subset of questions for UI prototyping
const mockQuestions: Question[] = [
  { id: 'A1', text: 'I warmly greet people when I enter a room.' },
  { id: 'B1', text: 'I enjoy solving complex logical puzzles.' },
  { id: 'C1', text: 'I like to keep my workspace organized and tidy.' },
  { id: 'O1', text: 'I am frequently fascinated by new abstract ideas.' },
  { id: 'E1', text: 'I feel energized after spending time in large groups.' },
];

export function QuizEngine() {
  const navigate = useNavigate();
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleAnswer = (value: number) => {
    const currentQ = mockQuestions[currentIndex];
    setResponses(prev => ({
      ...prev,
      [currentQ.id]: value
    }));
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Complete! Pass responses to result dashboard stub
      console.log('Final Responses:', responses);
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

const MOCK_PROFILES = [
  {
    id: 'marcus',
    name: "Marcus Chen",
    archetype: "The Campaigner",
    mbti: "ENFP-T / Enthusiastic Innovator",
    description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    superpowers: "Brainstorming, building communities, inspiring others.",
    burnout: "Strict rules, lack of creative freedom, isolation.",
    career: "Best suited for public relations, counseling, or creative direction.",
    traits: [
       { name: 'Openness', score: 90, color: 'bg-purple-500', desc: 'Inventive / Curious' },
       { name: 'Conscientiousness', score: 30, color: 'bg-emerald-500', desc: 'Flexible / Spontaneous' },
       { name: 'Extraversion', score: 95, color: 'bg-orange-500', desc: 'Outgoing / Energetic' },
       { name: 'Agreeableness', score: 85, color: 'bg-blue-500', desc: 'Friendly / Compassionate' },
       { name: 'Neuroticism', score: 70, color: 'bg-rose-500', desc: 'Sensitive / Nervous' },
    ]
  },
  {
    id: 'sarah',
    name: "Sarah Jenkins",
    archetype: "The Architect",
    mbti: "INTJ-A / Strategic Visionary",
    description: "Imaginative and strategic thinkers, with a plan for everything. You navigate complex systems with ease and demand intellectual rigor.",
    superpowers: "Strategic planning, system architecture, identifying inefficiencies, and maintaining long-term vision despite immediate chaos.",
    burnout: "Highly repetitive administrative tasks, strict micromanagement, and environments that prioritize social harmony over objective truth.",
    career: "Best suited for dynamic tech startups, systems engineering, strategic consulting, or academic research.",
    traits: [
       { name: 'Openness', score: 85, color: 'bg-purple-500', desc: 'Inventive / Curious' },
       { name: 'Conscientiousness', score: 65, color: 'bg-emerald-500', desc: 'Efficient / Organized' },
       { name: 'Extraversion', score: 20, color: 'bg-orange-500', desc: 'Reserved / Solitary' },
       { name: 'Agreeableness', score: 40, color: 'bg-blue-500', desc: 'Challenging / Detached' },
       { name: 'Neuroticism', score: 45, color: 'bg-rose-500', desc: 'Secure / Confident' },
    ]
  }
];

  if (!hasStarted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto mt-12 transition-all">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">
            Discover Your Superpowers
          </h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Select a psychometric model to begin your assessment. The engine supports Big Five, HEXACO, 16pf, and MBTI mappings.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-10">
            {['Big Five (120)', 'HEXACO (60)', '16pf (164)', 'MBTI (24)'].map(model => (
              <button 
                key={model}
                onClick={handleStart}
                className="p-4 border-2 border-slate-100 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all font-medium text-slate-700 hover:text-primary-700 shadow-sm cursor-pointer"
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 mt-2">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Past Assessments (Demo Showcase)</h3>
          <div className="space-y-3">
            {MOCK_PROFILES.map(profile => (
              <button
                key={profile.id}
                onClick={() => navigate('/results', { state: { profile } })}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all group cursor-pointer flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-indigo-900 mb-1">{profile.name}'s Assessment</div>
                  <div className="text-xs text-slate-500 group-hover:text-indigo-600 font-medium">{profile.archetype} ({profile.mbti.split(' ')[0]})</div>
                </div>
                <div className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Results →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = mockQuestions[currentIndex];

  return (
    <div className="pt-8 transition-all">
      <ProgressBar 
        currentObject={currentIndex + 1} 
        totalObjects={mockQuestions.length} 
      />
      <QuestionCard
        question={currentQuestion}
        currentValue={responses[currentQuestion.id]}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={currentIndex === 0}
        isLast={currentIndex === mockQuestions.length - 1}
      />
    </div>
  );
}
