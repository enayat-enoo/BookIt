import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperienceById } from "../api";
import type { Experience } from "../types/types";

export default function Details() {
  const { id } = useParams();
  const [exp, setExp] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getExperienceById(id!)
      .then((res) => setExp(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!exp) return <p className="text-center mt-10">Experience not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src={exp.image} className="w-full h-64 object-cover rounded-lg" />
      <h2 className="text-2xl font-bold mt-4">{exp.title}</h2>
      <p className="text-gray-600 mt-2">{exp.description}</p>

      <h3 className="mt-6 font-semibold text-lg">Available Slots</h3>
      <div className="flex flex-wrap gap-3 mt-3">
        {exp.slots.map((s, i) => (
          <button
            key={i}
            disabled={s.available === 0}
            onClick={() => navigate("/checkout", { state: { exp, slot: s.date } })}
            className={`px-4 py-2 rounded border ${
              s.available === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {s.date} ({s.available})
          </button>
        ))}
      </div>
    </div>
  );
}
