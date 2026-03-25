import classNames from 'classnames';

export interface Question {
  id: string;
  text: string;
}

interface QuestionCardProps {
  question: Question;
  currentValue?: number;
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function QuestionCard({
  question,
  currentValue,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast
}: QuestionCardProps) {

  const options = [
    { value: 1, label: 'Strongly Disagree', color: 'bg-rose-500', hover: 'hover:bg-rose-50', border: 'border-rose-400', ring: 'ring-rose-200' },
    { value: 2, label: 'Disagree', color: 'bg-rose-400', hover: 'hover:bg-rose-50', border: 'border-rose-300', ring: 'ring-rose-100' },
    { value: 3, label: 'Neutral', color: 'bg-slate-400', hover: 'hover:bg-slate-50', border: 'border-slate-300', ring: 'ring-slate-200' },
    { value: 4, label: 'Agree', color: 'bg-teal-400', hover: 'hover:bg-teal-50', border: 'border-teal-300', ring: 'ring-teal-100' },
    { value: 5, label: 'Strongly Agree', color: 'bg-teal-500', hover: 'hover:bg-teal-50', border: 'border-teal-400', ring: 'ring-teal-200' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-12 transition-all">
      <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-800 text-center mb-12 leading-snug">
        "{question.text}"
      </h2>

      {/* Likert Scale Container */}
      <div className="relative mb-14" role="radiogroup" aria-labelledby="question-text">
        {/* Connecting line behind circles */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-100 -translate-y-1/2 rounded-full hidden sm:block z-0" />

        <div className="flex justify-between items-center relative z-10 w-full max-w-[500px] mx-auto">
          {options.map((opt) => {
            const isSelected = currentValue === opt.value;
            // Scale sizing: End points slightly larger than middle points
            const sizeClasses = (opt.value === 1 || opt.value === 5) 
              ? "w-14 h-14 sm:w-16 sm:h-16" 
              : "w-11 h-11 sm:w-12 sm:h-12";

            return (
              <button
                key={opt.value}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => {
                  onAnswer(opt.value);
                  if (!isLast) {
                    setTimeout(onNext, 400); // Slightly longer delay for animation to play out
                  }
                }}
                className={classNames(
                  "group relative flex flex-col items-center justify-center focus:outline-none focus-visible:ring-4 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  isSelected ? "scale-110" : "hover:scale-105"
                )}
                aria-label={opt.label}
              >
                <div 
                  className={classNames(
                    "rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm",
                    sizeClasses,
                    isSelected 
                      ? `${opt.color} border-transparent shadow-lg text-white` 
                      : `bg-white ${opt.border} ${opt.hover} group-hover:shadow-md text-slate-400`
                  )}
                >
                  {/* Subtle inner ring when selected */}
                  {isSelected && (
                    <div className="w-[40%] h-[40%] rounded-full bg-white opacity-90 shadow-inner" />
                  )}
                </div>
                
                {/* Always show labels, optimized for readability */}
                <span className={classNames(
                  "absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 text-center text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors duration-200",
                  isSelected ? "text-slate-800" : "text-slate-400 group-hover:text-slate-600"
                )}>
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-8 mt-4">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="px-6 py-2.5 rounded-xl font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition-colors disabled:opacity-0 disabled:pointer-events-none"
        >
          Previous
        </button>
        
        <button
          onClick={onNext}
          disabled={!currentValue}
          className={classNames(
            "px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm flex items-center gap-2",
            !currentValue
              ? "bg-slate-100 text-slate-400 cursor-not-allowed hidden sm:flex"
              : isLast
                ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                : "bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          )}
        >
          {isLast ? 'Complete Assessment' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
