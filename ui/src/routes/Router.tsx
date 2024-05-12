import { Role } from "../api/models/UserInfo";
import { Route, Routes } from "react-router-dom";
import AuthorizedRoute from "./AuthorizedRoute";
import { Landing, Events, Login, SignUp, ProcessPayment, MyEvents, AdminDashboard, EditProfile } from "../pages";

export default function Router() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<AuthorizedRoute title="" permissions={[]}>
						<Landing />
					</AuthorizedRoute>
				}
			/>
			<Route
				path="/events"
				element={
					<AuthorizedRoute title="Events" permissions={[]}>
						<Events />
					</AuthorizedRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<AuthorizedRoute title="Log in" permissions={[]}>
						<Login />
					</AuthorizedRoute>
				}
			/>
			<Route
				path="/signup"
				element={
					<AuthorizedRoute title="Sign up" permissions={[]}>
						<SignUp />
					</AuthorizedRoute>
				}
			/>
			<Route
				path="/payment/process"
				element={
					<AuthorizedRoute title="Payment" permissions={[Role.GUEST, Role.ATTENDEE, Role.ORGANIZER, Role.ADMIN]}>
						<ProcessPayment />
					</AuthorizedRoute>
				}
			/>
			<Route
				path="/me/events"
				element={
					<AuthorizedRoute title="My Events" permissions={[Role.GUEST, Role.ATTENDEE, Role.ORGANIZER, Role.ADMIN]}>
						<MyEvents />
					</AuthorizedRoute>
				}
			/>
			<Route
				path="/admin"
				element={
					<AuthorizedRoute title="Admin Dashboard" permissions={[Role.ADMIN]}>
						<AdminDashboard />
					</AuthorizedRoute>
				}
			/>

			<Route
				path="/me/edit"
				element={
					<AuthorizedRoute title="Edit Profile" permissions={[Role.GUEST, Role.ATTENDEE, Role.ORGANIZER, Role.ADMIN]}>
						<EditProfile />
					</AuthorizedRoute>
				}
			/>
		</Routes>
	);
}
