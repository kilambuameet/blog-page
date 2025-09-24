import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mx-auto md:p-8 p-4">
      <h1 className="text-xl font-semibold mb-4">This is Homepage...</h1>

      <p>
        <strong>Click below to view posts:</strong>
      </p>

      <Link
        to="/posts"
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Posts
      </Link>
    </div>
  );
};

export default HomePage;
