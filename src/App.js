import "./_Playground/SCSS/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import HomeTemplate from "./templates/HomeTemplate";
import RoomList from "./pages/RoomList/RoomList";
import RoomDetails from "./pages/RoomDetails/RoomDetails";
import "react-medium-image-zoom/dist/styles.css";
import Register from "./pages/User/Register";
import Login from "./pages/User/Login";
import UserDetail from "./pages/User/UserDetail";
import Reviews from "./pages/Reviews/Reviews";
import NotFound from "./pages/404/NotFound";
import Locations from "./pages/Admin/Locations/Locations";
import EditLocation from "./pages/Admin/Locations/EditLocation";
import AddNewLocation from "./pages/Admin/Locations/AddNewLocation";
import Rooms from "./pages/Admin/Rooms/Rooms";
import EditRoom from "./pages/Admin/Rooms/EditRoom";
import AddNewRoom from "./pages/Admin/Rooms/AddNewRoom";
import ReviewByRoom from "./pages/Admin/Reviews/ReviewByRoom";
import EditReview from "./pages/Admin/Reviews/EditReview";
import User from "./pages/Admin/User/User";
import EditUser from "./pages/Admin/User/EditUser";
import AddNewUser from "./pages/Admin/User/AddNewUser";
import Test from "./components/CustomDropdownMenu/Test";
import Ticket from "./pages/Admin/Ticket/Ticket";
import EditTicket from "./pages/Admin/Ticket/EditTicket";
import AddNewTicket from "./pages/Admin/Ticket/AddNewTicket";
import AdminTemplate from "./templates/AdminTemplate";
import Logout from "./pages/User/Logout";
import LogoutAdmin from "./pages/User/LogoutAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="" element={<HomePage />} />
          <Route path="test" element={<Test />} />
          <Route path="room/:locationId" element={<RoomList />} />
          <Route path="roomDetail/:roomId" element={<RoomDetails />} />
          <Route path="userDetail" element={<UserDetail />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="logout-admin" element={<LogoutAdmin />} />
        <Route path="admin" element={<AdminTemplate />}>
          <Route path="" element={<Locations />} />
          <Route path="locations" element={<Locations />} />
          <Route path="locations/edit/:id" element={<EditLocation />} />
          <Route path="locations/addnew" element={<AddNewLocation />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="room/edit/:id" element={<EditRoom />} />
          <Route path="room/addnew" element={<AddNewRoom />} />
          <Route path="review/byRoom/:id" element={<ReviewByRoom />} />
          <Route path="review/edit/:id" element={<EditReview />} />
          <Route path="user" element={<User />} />
          <Route path="user/edit/:id" element={<EditUser />} />
          <Route path="user/addnew" element={<AddNewUser />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="ticket/edit/:id" element={<EditTicket />} />
          <Route path="ticket/addnew" element={<AddNewTicket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
