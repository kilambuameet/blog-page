import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/posts");
        setPosts(res.data.posts);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="p-8 text-gray-600">Loading posts…</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="bg-black/50 ">
      <div className="p-4 md:p-8 container mx-auto ">
        {/* Grid of Post Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-xl p-5 bg-white shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <Link to={`/posts/${post.id}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-400 transition">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-700 mb-4">{post.body.slice(0, 100)}…</p>
              <Link
                to={`/posts/${post.id}`}
                className="inline-block text-blue-600 hover:text-blue-800 font-medium transition"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex gap-2 justify-center mt-8">
          {Array.from(
            { length: Math.ceil(posts.length / postsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
