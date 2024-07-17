import './App.css';
import HallDetails from './components/admin/adminboard';
import Addhall from './components/admin/add';
import ManageHalls from './components/admin/delete';
import HallViewing from './components/user/viewhall';
import HallManagementSystem from './components/user/dashboard';
import HallForm from './components/user/bookhall';
import EventStatus from './components/user/viewstatus';
import Login from './components/login/login';
import Signup from './components/login/signup';
import OrganizerViewing from './components/organizer/viewevent';
import Organizerboard from './components/organizer/organizerboard';
import Eventadmin from './components/admin/eventbook';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route index element={<Login />}/>
        <Route path="/components/login/login" element={<Login/>}/>
        <Route path="/components/login/signup" element={<Signup/>}/>
        <Route path="/components/admin/admindashboard" element={<HallDetails />} />
        <Route path="/components/admin/add" element={<Addhall />}/>
        <Route path="/components/admin/delete" element={<ManageHalls />}/>
        <Route path="/components/admin/eventbook" element={<Eventadmin />}/>
        <Route path="/components/user/dashboard" element={<HallManagementSystem />}/>
        <Route path="/components/user/viewhall" element={<HallViewing />}/>
        <Route path="/components/user/bookhall" element={<HallForm />}/>
        <Route path="/components/user/viewstatus" element={<EventStatus />}/>
        <Route path="/components/organizer/Organizerboard" element={<Organizerboard />}/>
        <Route path="/components/organizer/viewevent" element={<OrganizerViewing />}/>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
