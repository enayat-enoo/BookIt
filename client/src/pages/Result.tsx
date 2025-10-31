import { useSearchParams } from "react-router-dom";

export default function Result() {
  const [params] = useSearchParams();
  const success = params.get("success") === "true";
  const bookingId = params.get("id");

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      {success ? (
        <>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed 🎉</h2>
          <p>Your booking ID: <strong>{bookingId}</strong></p>
        </>
      ) : (
        <h2 className="text-2xl font-bold text-red-600">Booking Failed 😞</h2>
      )}
      <a href="/" className="mt-4 text-blue-600 underline">Back to Home</a>
    </div>
  );
}
