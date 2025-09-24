import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import PostListPage from "./pages/PostListPage";

const App = () => {
  return (
    <BrowserRouter>
      <nav className="flex gap-6 p-4 bg-gray-800 text-white">
        <Link className="hover:text-blue-400" to="/">
          Home
        </Link>
        <Link className="hover:text-blue-400" to="/posts">
          Posts
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
