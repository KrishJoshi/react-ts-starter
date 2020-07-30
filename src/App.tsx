import React from "react";
import NotificationsProvider from "./common/providers/notifications";
import AppRouter from "./pages/AppRouter";
import Toast from "./common/components/Notifications";

export default function App() {
  return (
    <NotificationsProvider>
      <Toast />
      <AppRouter />
    </NotificationsProvider>
  );
}
