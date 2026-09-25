import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Story from './pages/story';
import Terms from './pages/terms';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story" element={<Story />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;