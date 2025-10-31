import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking, validatePromo } from "../api";

export default function Checkout() {
  const { state } = useLocation();
  const { exp, slot } = state;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePromo = async () => {
    const res = await validatePromo(promo);
    if (res.data.valid) setDiscount(res.data.discount);
    else alert("Invalid promo code");
  };

  const handleSubmit = async () => {
    if (!name || !email) return alert("Please enter name and email");
    setLoading(true);

    const data = {
      experienceId: exp._id,
      name,
      email,
      slot,
      price: exp.price - discount,
    };

    try {
      const res = await createBooking(data);
      navigate(`/result?success=true&id=${res.data.bookingId}`);
    } catch {
      navigate(`/result?success=false`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <p>Experience: <strong>{exp.title}</strong></p>
      <p>Date: <strong>{slot}</strong></p>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border rounded px-3 py-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border rounded px-3 py-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Promo Code"
            className="flex-1 border rounded px-3 py-2"
            onChange={(e) => setPromo(e.target.value)}
          />
          <button onClick={handlePromo} className="bg-gray-800 text-white px-4 py-2 rounded">
            Apply
          </button>
        </div>
        <p>Total: ₹{exp.price - discount}</p>
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-blue-600 text-white w-full py-2 mt-4 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
