import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import ShowPage from "./pages/ShowPage";

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
    path: "/blogs/:id",
    element: ShowPage,
  },
  {
    path: "/blogs/create",
    element: CreatePage,
  },
  {
    path: "/blogs/:id/edit",
    element: EditPage,
  },
];

export default routes;
