import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { QuizEngine } from './components/quiz/QuizEngine';
import { ResultDashboard } from './components/results/ResultDashboard';
import { AiMentorChat } from './components/mentor/AiMentorChat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QuizEngine />} />
          <Route path="results" element={<ResultDashboard />} />
          <Route path="mentor" element={<AiMentorChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
