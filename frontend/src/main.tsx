import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";
import Home from "./pages/Home/index.tsx";
import { User } from "./pages/Users/index.tsx";
import { UserCreate } from "./pages/Users/create.tsx";
import { UserList } from "./pages/Users/list.tsx";
import { ShowUser } from "./pages/Users/show.tsx";
import { UserUpdate } from "./pages/Users/edit.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // ✅ 5 minutos
      refetchOnWindowFocus: false, // ✅ Não refetch no foco
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />}>
            <Route index element={<UserList />} />
            <Route path="new" element={<UserCreate />} />
            <Route path=":id" element={<ShowUser />} />
            <Route path="edit/:id" element={<UserUpdate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
