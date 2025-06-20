import React from "react";
import { useForm } from "react-hook-form";
import {
  useContactInfoQuery,
  useUpdateContactInfo,
} from "../../api/contactInfoApi";

const AdminContactInfo = () => {
  const { data, isLoading } = useContactInfoQuery();
  const updateMutation = useUpdateContactInfo();
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const onSubmit = (values) => {
    updateMutation.mutate({ id: data.id, ...values });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">📇 Edit Contact Info</h2>

      {["phone", "email", "location", "github", "telegram", "linkedin"].map(
        (field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input {...register(field)} className="input" />
          </div>
        )
      )}

      <button
        type="submit"
        className="bg-cyan-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </form>
  );
};

export default AdminContactInfo;
