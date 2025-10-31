import { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <nav className="bg-blue-600 text-white py-3 px-6 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <h1 className="font-bold text-xl">BookIt</h1>

        <input
          type="text"
          placeholder="Search experiences..."
          value={query}
          onChange={handleChange}
          className="px-3 py-2 rounded text-gray-800 w-60 focus:outline-none"
        />
      </div>
    </nav>
  );
}
