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

  if (!hasStarted) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center max-w-2xl mx-auto mt-12 transition-all">
        <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">
          Discover Your Superpowers
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Select a psychometric model to begin your assessment. The engine supports Big Five, HEXACO, 16pf, and MBTI mappings.
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {['Big Five (120)', 'HEXACO (60)', '16pf (164)', 'MBTI (24)'].map(model => (
            <button 
              key={model}
              onClick={handleStart}
              className="p-4 border-2 border-slate-100 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all font-medium text-slate-700 hover:text-primary-700 shadow-sm"
            >
              {model}
            </button>
          ))}
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
