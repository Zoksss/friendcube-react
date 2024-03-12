import './App.css';
import React from 'react';

import Timer from './Component/Timer/Timer';
import LoginCreate from './Component/LoginCreate/LoginCreate';
import JoinedPlayers from './Component/JoinedPlayers/JoinedPlayers';

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");




function App() {

  const [isLogin, setIsLogin] = React.useState(true);
  const [isJoinedPlayers, setIsJoinedPlayers] = React.useState(false);
  const [isTimerScreen, setIsTimerScreen] = React.useState(false);

  const [roomInputValue, setRoomInputValue] = React.useState("");
  // eslint-disable-next-line
  const [nickname, setNickname] = React.useState("");
  const [currentPuzzle, setCurrentPuzzle] = React.useState("3x3");



  socket.on("startGame", (puzzle) => {
    setIsJoinedPlayers(false);
    setIsTimerScreen(true);
    setCurrentPuzzle(puzzle);
  })


  return (
    <div className="App">
      <div className="top-notif">Website is in development stage. Bugs are expected!</div>
      {!isJoinedPlayers && !isTimerScreen &&
        <LoginCreate
          socket={socket}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setRoomInputValue={setRoomInputValue}
          roomInputValue={roomInputValue}
          setNickname={setNickname}
          nickname={nickname}
        />}
      {isJoinedPlayers &&
        < JoinedPlayers
          socket={socket}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setIsTimerScreen={setIsTimerScreen}
          roomInputValue={roomInputValue}
          nickname={nickname}
        />}
      <Timer
        socket={socket}
        nickname={nickname}
        roomInputValue={roomInputValue}
        currentPuzzle={currentPuzzle}
      />
    </div >
  );
}

export default App;

// <JoinedPlayers />