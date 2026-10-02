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
import StaffLogin from './pages/staff/login';
import StaffDashboard from './pages/staff/dashboard';
import Announcements from './pages/announcements';
import RequireStaffAuth from './components/requireStaffAuth';
import Volunteer from './pages/volunteer';
import ManageAnnouncements from './pages/staff/manageAnnouncements';
import ManageOpportunities from './pages/staff/manageOpportunities';
import VolunteerApplications from './pages/staff/volunteerApplications';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story" element={<Story />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/staff/login" element={<StaffLogin />} />
      <Route path="/staff/dashboard" element={<RequireStaffAuth><StaffDashboard /></RequireStaffAuth>} />
      <Route path="/staff/announcements/new" element={<RequireStaffAuth><AddAnnouncement /></RequireStaffAuth>} />
      <Route path="/staff/announcements/:id/edit" element={<RequireStaffAuth><EditAnnouncement /></RequireStaffAuth>} />
      <Route path="/staff/opportunities/new" element={<RequireStaffAuth><AddOpportunity /></RequireStaffAuth>} />
      <Route path="/staff/opportunities/:id/edit" element={<RequireStaffAuth><EditOpportunity /></RequireStaffAuth>} />
      <Route path="/staff/announcements" element={<RequireStaffAuth><ManageAnnouncements /></RequireStaffAuth>} />
      <Route path="/staff/opportunities" element={<RequireStaffAuth><ManageOpportunities /></RequireStaffAuth>} />
      <Route path="/staff/volunteer-applications" element={<RequireStaffAuth><VolunteerApplications /></RequireStaffAuth>} />
    </Routes>
  );
}

export default App;