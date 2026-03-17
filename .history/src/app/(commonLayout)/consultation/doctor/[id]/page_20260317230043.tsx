import { getDoctors } from "@/services/doctor.services";
import Image from "next/image";

const ConsultationDoctorByIdPage = async ({ params }: any) => {
  const { id } = params;

  const res = await getDoctors(`id=${id}`);
  const doctor = res?.data?.[0];

  if (!doctor) {
    return <p className="text-center mt-10">Doctor not found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 🔵 LEFT SIDE (Doctor Info) */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6">

          {/* Image */}
          {doctor.profilePhoto && (
            <div className="relative w-full h-60 mb-4">
              <Image
                src={doctor.profilePhoto}
                alt={doctor.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
          )}

          {/* Basic Info */}
          <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
          <p className="text-gray-500 mb-2">{doctor.designation}</p>
          <p className="text-sm mb-2">{doctor.qualification}</p>

          {/* Details */}
          <div className="mt-4 space-y-2 text-sm">
            <p><b>Experience:</b> {doctor.experience} years</p>
            <p><b>Gender:</b> {doctor.gender}</p>
            <p><b>Registration No:</b> {doctor.registrationNumber}</p>
            <p><b>Working Place:</b> {doctor.currentWorkingPlace}</p>
            <p><b>Contact:</b> {doctor.contactNumber || "N/A"}</p>
            <p><b>Address:</b> {doctor.address || "N/A"}</p>
            <p><b>Email:</b> {doctor.email}</p>
          </div>

          {/* Rating */}
          <div className="mt-4">
            <p className="text-yellow-500 text-lg">
              ⭐ {doctor.averageRating || 0} / 5
            </p>
          </div>

        </div>

        {/* 🟢 RIGHT SIDE (Booking Card) */}
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">

          <h2 className="text-xl font-semibold mb-4">
            Book Appointment
          </h2>

          <p className="text-lg font-bold text-green-600 mb-4">
            Fee: ৳{doctor.appointmentFee}
          </p>

          {/* Dummy Inputs */}
          <input
            type="date"
            className="w-full border p-2 rounded-lg mb-3"
          />

          <select className="w-full border p-2 rounded-lg mb-3">
            <option>Select Time Slot</option>
            <option>10:00 AM</option>
            <option>12:00 PM</option>
            <option>4:00 PM</option>
          </select>

          <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">
            Confirm Booking
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConsultationDoctorByIdPage;