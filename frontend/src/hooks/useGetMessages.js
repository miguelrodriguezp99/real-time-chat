import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import { toast } from "sonner";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        console.log(data);
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages(); //Si hay una conversación seleccionada, obtenemos los mensajes
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
