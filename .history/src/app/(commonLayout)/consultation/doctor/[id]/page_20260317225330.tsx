import { getDoctors } from "@/services/doctor.services";

const ConsultationDoctorByIdPage = async ({ params }: any) => {
  const { id } = params;

  // 👉 API call (example)
  const res = await getDoctors(`id=${id}`);
  const doctor = res?.data?.[0];

  if (!doctor) {
    return <p className="text-center mt-10">Doctor not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        
        {/* Image optional */}
        {doctor.image && (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-60 object-cover rounded-xl mb-4"
          />
        )}

        <h1 className="text-3xl font-bold mb-2">{doctor.name}</h1>
        <p className="text-gray-500 mb-2">{doctor.qualification}</p>

        <p className="mb-1">Experience: {doctor.experience} years</p>
        <p className="mb-1 text-green-600 font-semibold">
          Fee: ৳{doctor.appointmentFee}
        </p>

        <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default ConsultationDoctorByIdPage;