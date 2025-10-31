import { useEffect, useState } from "react";
import { getExperiences } from "../api";
import type { Experience } from "../types/types";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  searchQuery: string;
}

export default function Home({ searchQuery }: HomeProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getExperiences()
      .then((res) => setExperiences(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExperiences.length === 0 ? (
        <p className="text-gray-500 text-center col-span-full">No experiences found.</p>
      ) : (
        filteredExperiences.map((exp) => (
          <div key={exp._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-all">
            <img src={exp.image} alt={exp.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-lg">{exp.title}</h2>
              <p className="text-sm text-gray-600">{exp.description.slice(0, 60)}...</p>
              <p className="mt-2 font-semibold">₹{exp.price}</p>
              <button
                onClick={() => navigate(`/details/${exp._id}`)}
                className="bg-blue-600 text-white w-full py-2 rounded mt-3 hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
