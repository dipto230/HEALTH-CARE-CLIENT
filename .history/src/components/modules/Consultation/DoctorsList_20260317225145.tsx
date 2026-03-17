"use client";

import { getDoctors } from "@/services/doctor.services";
import { useQuery } from "@tanstack/react-query";

const DoctorsList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(""), // queryString empty দিলে সব doctor আসবে
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Something went wrong</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data?.map((doctor: any) => (
        <div
          key={doctor.id}
          className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition"
        >
          {/* ✅ Image optional */}
          {doctor.image && (
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
          )}

          {/* Doctor Info */}
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p className="text-gray-500">{doctor.qualification}</p>
          <p className="text-sm">
            Experience: {doctor.experience || 0} years
          </p>
          <p className="text-sm font-medium text-green-600">
            Fee: ৳{doctor.appointmentFee || 0}
          </p>

          {/* Button */}
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
};

export default DoctorsList;