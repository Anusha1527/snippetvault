import Navbar from "@/components/Navbar";
import CreateSnippetForm from "@/components/CreateSnippetForm";
import SnippetList from "@/components/SnippetList";
export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Your Snippets
          </h1>

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + New Snippet
          </button>
        </div>

        <p className="mt-4 text-gray-400">
          Manage and share your code snippets.
        </p>
        <CreateSnippetForm />
        <SnippetList />
      </div>
    </div>
  );
}