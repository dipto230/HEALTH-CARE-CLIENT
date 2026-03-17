import DoctorsList from "@/components/modules/Consultation/DoctorsList";

const ConsultationPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">
        Find Your Doctor
      </h1>

      <DoctorsList />
    </div>
  );
};

export default ConsultationPage;