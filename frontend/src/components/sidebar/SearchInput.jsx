import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../store/useConversation";
import { toast } from "sonner";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-2xl h-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn rounded-2xl bg-[#32324b] text-[#ddd]"
      >
        <IoSearchSharp className="w-5 h-5 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
