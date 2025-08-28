import { Link } from "react-router-dom";

export default function ReportOverview() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-8xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go back Home
      </Link>
    </div>
  );
}
