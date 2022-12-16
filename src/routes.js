import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";

const routes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/blogs",
    element: ListPage,
  },
  {
    path: "/blogs/create",
    element: CreatePage,
  },
  {
    path: "/blogs/edit",
    element: EditPage,
  },
];

export default routes;
