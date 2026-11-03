import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-green-900">Farmer Marketplace</h1>
      <p className="mt-3 max-w-md text-gray-600">
        Daily mandi rates, red chilli and cotton listings, farmers and buyers in one place.
      </p>

      <Link
        to="/signup"
        className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        Get started
      </Link>
    </div>
  );
}