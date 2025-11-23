import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import RoleSelect from "./pages/auth/RoleSelect";
import OrganizerDashboard from "./pages/dashboards/OrganizerDashboard";
import SupplierDashboard from "./pages/dashboards/SupplierDashboard";
import GuestDashboard from "./pages/dashboards/GuestDashboard";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Events
import EventsList from "./pages/events/EventsList";
import EventCreate from "./pages/events/EventCreate";
import EventEdit from "./pages/events/EventEdit";
import EventDetails from "./pages/events/EventDetails";
import EventManage from "./pages/events/EventManage";
import EventAlbum from "./pages/events/EventAlbum";
import SeatsConfig from "./pages/events/SeatsConfig";
import TicketTypes from "./pages/events/TicketTypes";

// Chat
import ChatList from "./pages/chat/ChatList";
import ChatRoom from "./pages/chat/ChatRoom";

// Marketplace
import ProvidersList from "./pages/marketplace/ProvidersList";
import ProviderPage from "./pages/marketplace/ProviderPage";
import Home from "./pages/Home";
import ExploreEvents from "./pages/events/ExploreEvents";
import ServiceRequestsList from "./pages/marketplace/ServiceRequestsList";
import ServiceRequestDetails from "./pages/marketplace/ServiceRequestDetails";
import ChatPage from "./pages/chat/ChatPage";
import Ticket from "./pages/ticket";

// Plans / Payments / Invitations
import Plans from "./pages/plans/Plans";
import Checkout from "./pages/payments/Checkout";
import Invitations from "./pages/invitations/Invitations";
import InvitationEnvelope from "./pages/invitations/InvitationEnvelope";
import PaymentsHistory from "./pages/payments/PaymentsHistory";

// Content Pages
import Features from "./pages/content/Features";
import Blog from "./pages/content/Blog";
import About from "./pages/content/About";
import Careers from "./pages/content/Careers";
import Terms from "./pages/content/Terms";
import Privacy from "./pages/content/Privacy";

export default function App() {
    return (
        <Routes>
            <Route path="/auth">
                <Route
                    index
                    element={
                        <Navigate
                            to="/auth/login"
                            replace
                        />
                    }
                />
                <Route
                    path="login"
                    element={<Login />}
                />
                <Route
                    path="register"
                    element={<Register />}
                />
                <Route
                    path="forgot"
                    element={<ForgotPassword />}
                />
                <Route
                    path="role"
                    element={<RoleSelect />}
                />
            </Route>

            {/* Public Guest Event View */}
            <Route
                path="/guest/event/:eventId"
                element={<GuestDashboard />}
            />

            {/* Public Explore Events */}
            <Route
                path="/explore"
                element={<ExploreEvents />}
            />

            {/* Content Pages */}
            <Route path="/features" element={<Features />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Public Invitation View */}
            <Route path="/invitation/:id" element={<InvitationEnvelope />} />

            <Route
                element={
                    <ProtectedRoute allowedProfile={["organizer", "supplier"]}>
                        <Layout />
                    </ProtectedRoute>
                }>
                <Route
                    path="/organizer"
                    element={
                        <ProtectedRoute allowedProfile={["organizer"]}>
                            <OrganizerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/supplier"
                    element={
                        <ProtectedRoute allowedProfile={["supplier"]}>
                            <SupplierDashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Events */}
                <Route
                    path="/events"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <EventsList />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/create"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <EventCreate />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/:id"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                        <EventDetails />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/:id/manage"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <EventManage />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/:id/edit"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <EventEdit />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/:id/album"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <EventAlbum />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/:id/seats"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <SeatsConfig />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/events/:id/tickets"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <TicketTypes />
                        // </ProtectedRoute>
                    }
                />

                {/* Chat */}
                <Route
                    path="/chat"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                        <ChatPage />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat/:chatId"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                        <ChatPage />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat/new"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                        <ChatPage />
                        // </ProtectedRoute>
                    }
                />


                {/* Plans / Payments / Invitations */}
                <Route
                    path="/plans"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer", "supplier"]}>
                        <Plans />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/payments/checkout"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                        <Checkout />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/payments/history"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                        <PaymentsHistory />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/invitations"
                    element={
                        // <ProtectedRoute allowedProfile={["organizer"]}>
                        <Invitations />
                        // </ProtectedRoute>
                    }
                />
            </Route>

            <Route
                path="/"
                element={<Home />}
            />

            {/* Marketplace */}
            <Route
                path="/marketplace"
                element={
                    // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                    <ProvidersList />
                    // </ProtectedRoute>
                }
            />
            <Route
                path="/marketplace/:id"
                element={
                    // <ProtectedRoute allowedProfile={["organizer", "supplier", "guest"]}>
                    <ProviderPage />
                    // </ProtectedRoute>
                }
            />
            <Route
                path="/marketplace/requests"
                element={
                    // <ProtectedRoute allowedProfile={["supplier"]}>
                    <ServiceRequestsList />
                    // </ProtectedRoute>
                }
            />
            <Route
                path="/marketplace/requests/:id"
                element={
                    // <ProtectedRoute allowedProfile={["supplier"]}>
                    <ServiceRequestDetails />
                    // </ProtectedRoute>
                }
            />

            <Route
                path="/guest"
                element={
                    // <ProtectedRoute allowedProfile={["guest"]}>
                    <GuestDashboard />
                    // </ProtectedRoute>
                }
            />

        </Routes>
    );
}
