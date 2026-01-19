import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Home';
import EpisodePage from '@/pages/EpisodePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/episodes/:slug" element={<EpisodePage />} />
      </Routes>
    </Router>
  );
}

export default App;
