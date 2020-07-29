import React from "react";
import NotificationsProvider from "./common/providers/notifications";
import AppRouter from "./pages/AppRouter";
import Notifications from "./common/components/Notifications";

export default function App() {
  return (
    <NotificationsProvider>
      <Notifications />
      <AppRouter />
    </NotificationsProvider>
  );
}
