import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useListenMessages from "../../hooks/useListenMessages";

const Home = () => {
  useListenMessages();
  return (
    <div className="flex sm:w-full sm:h-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 min-w-[600px]">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
