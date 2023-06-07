import React, { useState } from "react";
import Board from "./Board";
import Loader from "./Loader";
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <Loader />;
  }
  return (
    <div className="gameContainer flex flex-col items-center">
      <Board result={result} setResult={setResult} />
      {result.state === "won" && <div className="text-2xl text-green-700"> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div className="text-2xl text-green-700"> Game Tieds</div>}
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
        className="px-4 py-3 bg-red-600 w-36 rounded-lg mt-4 text-white"
      >
        {" "}
        Leave Game
      </button>
      
    </div>
  );
}

export default Game;
