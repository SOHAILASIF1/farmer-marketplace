const rates = [
  { crop: "Red Chilli", mandi: "Kunri", price: 18500, change: 250, unit: "maund" },
  { crop: "Red Chilli", mandi: "Faisalabad", price: 19200, change: -100, unit: "maund" },
  { crop: "Red Chilli", mandi: "Karachi", price: 19800, change: 0, unit: "maund" },
  { crop: "Cotton (Phutti)", mandi: "Kunri", price: 7200, change: 120, unit: "maund" },
  { crop: "Cotton (Phutti)", mandi: "Multan", price: 7450, change: -50, unit: "maund" },
  { crop: "Maize", mandi: "Faisalabad", price: 2900, change: 30, unit: "maund" },
];

function Change({ value }) {
  if (value > 0) return <span className="text-xs font-semibold text-green-600">▲ {value}</span>;
  if (value < 0) return <span className="text-xs font-semibold text-red-500">▼ {Math.abs(value)}</span>;
  return <span className="text-xs text-gray-400">-</span>;
}

export default function RateBox() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="border-b border-green-100 bg-green-50">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-green-900">Today's Mandi Rates</h2>
          <span className="text-xs text-gray-500">{today} | Sample data</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {rates.map((r, i) => (
            <div key={i} className="rounded-lg border border-green-100 bg-white p-3 shadow-sm">
              <p className="text-sm font-semibold text-gray-800">{r.crop}</p>
              <p className="text-xs text-gray-500">{r.mandi}</p>

              <p className="mt-2 text-lg font-bold text-green-700">
                Rs {r.price.toLocaleString()}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">per {r.unit}</span>
                <Change value={r.change} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}