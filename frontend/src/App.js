import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Story from './pages/story';
import Terms from './pages/terms';
import Contact from './pages/contact';
import Opportunities from './pages/opportunities';
import AddAnnouncement from './pages/staff/addAnnouncement';
import EditAnnouncement from './pages/staff/editAnnouncement';
import AddOpportunity from './pages/staff/addOpportunity';
import EditOpportunity from './pages/staff/editOpportunity';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story" element={<Story />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/staff/announcements/new" element={<AddAnnouncement />} />
      <Route path="/staff/announcements/:id/edit" element={<EditAnnouncement />} />
      <Route path="/staff/opportunities/new" element={<AddOpportunity />} />
      <Route path="/staff/opportunities/:id/edit" element={<EditOpportunity />} />
    </Routes>
  );
}

export default App;