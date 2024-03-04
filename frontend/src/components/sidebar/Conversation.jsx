import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../store/useConversation";

// STARTER CODE SNIPPET
const Conversation = ({ conversation, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers?.includes(conversation._id);

  console.log();

  return (
    <>
      <div
        className={`flex gap-5 items-center hover:bg-[#1e1e2d] rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-[#1e1e2d]" : " "}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-extralight uppercase text-gray-200">
              {conversation.fullName}
            </p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
