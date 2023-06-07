import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";
import Loader from "./Loader";
function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame text-white">
          <h4 className="text-center text-2xl pb-3">Create Game</h4>
          <div className="flex items-center my-4">
            <input
              placeholder="Enter opponent's name"
              className="mr-3 p-3 rounded-lg text-black"
              onChange={(event) => {
                setRivalUsername(event.target.value);
              }}
            />
            <button
              onClick={createChannel}
              className="px-4 py-3 bg-green-600 w-36 rounded-lg text-white whitespace-nowrap"
            >
              {" "}
              Join/Start Game
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default JoinGame;
