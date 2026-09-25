import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Story from './pages/story';
import Terms from './pages/terms';
import Contact from './pages/contact';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story" element={<Story />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;