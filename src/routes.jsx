import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={<h1>Have you heard of the Dark Side?</h1>}
    >
      <Route index element={<Home />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Route>
  )
);
