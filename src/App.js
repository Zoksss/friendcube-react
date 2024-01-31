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
  const [username, setUsername] = React.useState("Zoksss");



  return (
    <div className="App">
      {!isJoinedPlayers && !isTimerScreen &&
        <LoginCreate
          socket={socket}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setRoomInputValue={setRoomInputValue}
          roomInputValue={roomInputValue}
        />}
      {isJoinedPlayers &&
        < JoinedPlayers
          socket={socket}
          setIsJoinedPlayers={setIsJoinedPlayers}
          setIsTimerScreen={setIsTimerScreen}
          roomInputValue={roomInputValue}
        />}
      <Timer username={username} />
    </div>
  );
}

export default App;

// <JoinedPlayers />