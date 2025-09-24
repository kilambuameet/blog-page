import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Reactions {
  likes: number;
  dislikes: number;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  views: number;
  reactions: Reactions;
  tags: string[];
}

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const res = await axios.get<Post>(`https://dummyjson.com/posts/${id}`);
        setPost(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="p-8 text-gray-600">Loading post…</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!post) return <div className="p-8 text-gray-600">Post not found</div>;

  return (
    <div className="bg-black/50">
      <div className="p-4 md:p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
        >
          ← Back to Posts
        </button>

        {/* Post Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

        {/* Post Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
          <span>Views: {post.views}</span>
          <span>User ID: {post.userId}</span>
        </div>

        {/* Post Body */}
        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          {post.body}
        </p>

        {/* Reactions */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-semibold">👍</span>
            <span>{post.reactions.likes}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold">👎</span>
            <span>{post.reactions.dislikes}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">Tags:</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
