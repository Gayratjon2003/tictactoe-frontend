import "./App.css";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
  const api_key = "mu628s5phwqa";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("userId");
    cookies.remove("token");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <div className="flex flex-col items-center">
            <JoinGame />
            <button onClick={logOut} className="px-4 py-3 bg-red-600 w-36 rounded-lg mt-4 text-white">
              {" "}
              Log Out
            </button>
          </div>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
