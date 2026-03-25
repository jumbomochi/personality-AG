import { useState } from 'react';
import { MessageSquareText, Send } from 'lucide-react';

export function AiMentorChat() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: "Welcome back! Based on your high Honesty-Humility and strong Reasoning (Factor B), I've prepared some insights on navigating your upcoming salary negotiation. Would you like to review them?" },
    { id: 2, role: 'user', text: "Yes, please. I usually struggle with asserting my value in those situations." }
  ]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: inputValue }]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 h-[70vh] flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
            <MessageSquareText className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h2 className="text-white font-medium">Athena (AI Career Mentor)</h2>
            <p className="text-slate-400 text-xs">Utilizing your 16pf & HEXACO traits</p>
          </div>
        </div>
        <div className="flex bg-slate-800 rounded-lg p-1">
          <button className="px-3 py-1 rounded text-xs text-white bg-slate-700 shadow-sm">Athena</button>
          <button className="px-3 py-1 rounded text-xs text-slate-400 hover:text-white transition-colors">Marcus</button>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-6">
        {messages.map((msg) => (
          msg.role === 'assistant' ? (
            <div key={msg.id} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center mt-1">
                <MessageSquareText className="w-4 h-4 text-primary-600" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-slate-700 shadow-sm leading-relaxed rounded-tl-none">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 mt-1"></div>
              <div className="bg-primary-600 text-white rounded-2xl p-4 shadow-sm leading-relaxed rounded-tr-none">
                {msg.text}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your mentor for tailored advice..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <button 
            onClick={handleSend}
            aria-label="Send Message"
            className="absolute right-2 top-2 p-1.5 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
