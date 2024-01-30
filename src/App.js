import './App.css';
import React from 'react';
import useLongPress from "./Component/useLongPress";


import Timer from './Component/Timer/Timer';
import LoginCreate from './Component/LoginCreate/LoginCreate';
import JoinedPlayers from './Component/JoinedPlayers/JoinedPlayers';


function App() {

  const [isLogin, setIsLogin] = React.useState(true);
  const [isJoinedPlayers, setIsJoinedPlayers] = React.useState(false);
  const [isTimerScreen, setIsTimerScreen] = React.useState(false);
  const [username, setUsername] = React.useState("Zoksss");

  const onLongPress = () => {
    console.log('longpress is triggered');
  };

  const onClick = () => {
    console.log('click is triggered')
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  return (
    <div className="App">
      {!isJoinedPlayers && !isTimerScreen && <LoginCreate isLogin={isLogin} setIsLogin={setIsLogin} setIsJoinedPlayers={setIsJoinedPlayers} />}
      {isJoinedPlayers && < JoinedPlayers setIsJoinedPlayers={setIsJoinedPlayers} setIsTimerScreen={setIsTimerScreen} />}
      <Timer username={username}/>
    </div>
  );
}

export default App;

// <JoinedPlayers />