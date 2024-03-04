import { useEffect } from "react";
import useConversation from "../../store/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  //Reseteamos el selected cuando el componente se desmonte
  useEffect(() => {
    return () => {
      useConversation.setState({ selectedConversation: null });
    };
  }, []);

  return (
    <div className="flex flex-col sm:w-full p-3">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-[#32324b] px-4 py-2 mb-2 rounded-md flex gap-3 text-center align-center">
            <span className="label-text text-[#ddd] font-bold justify-center text-xl">
              To: {selectedConversation.fullName}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
