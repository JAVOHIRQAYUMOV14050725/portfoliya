import { useGetMessages } from "../../api/contactApi";

const ContactAdmin = () => {
  const { data, isLoading } = useGetMessages();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📥 Received Messages</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {data?.map((msg) => (
            <li
              key={msg.id}
              className="bg-white dark:bg-slate-800 p-4 rounded shadow"
            >
              <p className="font-semibold">
                {msg.fullName} ({msg.email})
              </p>
              <p className="text-sm text-slate-500">{msg.createdAt}</p>
              <p className="mt-2">{msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
