import './Timer.scss';
import Sidebar from './Sidebar';
import React from 'react';
import FinishedScreen from '../FinishedScreen/FinishedScreen';
import SettingsScreen from '../SettingsScreen/SettingsScreen';


let isSpace = false;
let currentTime = 0;
let currentRound = 1;
let finishStatus = "finished"


let playerNicknames = [];
let playerNicknamesIndex = 0;


let isRoundReady = true;

const Timer = (props) => {

  // misc states 
  const [timerColor, setTimerColor] = React.useState("white");
  const [times, setTimes] = React.useState([]);


  const [timerDelay, setTimerDelay] = React.useState(1000);

  const [ao5, setAo5] = React.useState(-1);
  const [ao12, setAo12] = React.useState(-1);

  const [opponetName, setOpponetName] = React.useState("");
  const [opponetTime, setOpponetTime] = React.useState(-1);
  const [opponetAo5, setOpponetAo5] = React.useState(-1);
  const [opponetAo12, setOpponetAo12] = React.useState(-1);

  const [opponetsStats, setOpponetsStats] = React.useState({});

  const [sidebarUI, setSidebarUI] = React.useState([]);


  const [currentScramble, setCurrentScramble] = React.useState("waiting for players...");
  const [isFinishedStatusScreen, setIsFinishStatusScreen] = React.useState(false);
  const [isSettingScreen, setIsSettingsScreen] = React.useState(false);


  // space handler
  const [holdTimeout, setHoldTimeout] = React.useState(null);
  const [isSpaceHeld, setIsSpaceHeld] = React.useState(false);

  const [isHidden, setIsHidden] = React.useState(false);



  // stopwatch
  const [isRunning, setIsRunning] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);


  // socket events //

  props.socket.on("setScramble", (scramble) => {
    setCurrentScramble(scramble);
  })

  props.socket.on("ready", () => {
    isRoundReady = true;
  })

  props.socket.on("updatePlayerNicknnameArray", nicknameArray => {
    playerNicknames = nicknameArray;
  })


  props.socket.on("timeGetFromSocket", (timesArrayFromSrv) => {
    let x = opponetsStats;

    let arrayItem = timesArrayFromSrv[1];
    console.log("ao5 from server: " + arrayItem.ao5)
    x[arrayItem.playerName] = { playerName: arrayItem.playerName, playerTime: arrayItem.playerTime, ao5: arrayItem.ao5, ao12: arrayItem.ao12 }
    setOpponetsStats(x);
    setOpponetName(playerNicknames[playerNicknamesIndex]);
    if (x[playerNicknames[playerNicknamesIndex]] && x[playerNicknames[playerNicknamesIndex]].playerTime) {
      setOpponetTime(x[playerNicknames[playerNicknamesIndex]].playerTime);
      setOpponetAo5(x[playerNicknames[playerNicknamesIndex]].ao5);
      setOpponetAo12(x[playerNicknames[playerNicknamesIndex]].ao12);
    }
  })


  // stopwatch logic and useEffect
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    let intervalId;

    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalId = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
        currentTime = elapsedTime;
      }, 10); // Update every 10 milliseconds (100th of a second)
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, elapsedTime]);


  // space handling logic and useEffect
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      console.log("touch")
      if (event.touches || (event.code === 'Space' && !isSpaceHeld)) {
        spacePressed();
        setIsSpaceHeld(true);
        setHoldTimeout(setTimeout(spaceHolded, timerDelay));
      }
    };

    const handleKeyUp = (event) => {
      if (event.touches || event.code === 'Space') {
        if (isSpaceHeld) {
          if (isSpace) startStopwatch();
          spaceDepressed();
          clearTimeout(holdTimeout);
          setIsSpaceHeld(false);

        }
      }
    };

    const spacePressed = () => {
      console.log('Space pressed');
      setTimerColor("red")
      if (isRunning && !isSpace) stopStopwatch();
    };

    const spaceDepressed = () => {
      console.log('Space depressed');
      setTimerColor("white")
    };

    const spaceHolded = () => {
      console.log('Space holded');
      if (isRoundReady) {
        isSpace = true;
        setTimerColor("green")
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    window.addEventListener('touchstart', handleKeyDown);
    window.addEventListener('touchend', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', handleKeyDown);
      window.removeEventListener('touchend', handleKeyUp);
      clearTimeout(holdTimeout);
    };
  }, [holdTimeout, isSpaceHeld]);

  const startStopwatch = () => {
    resetStopwatch()
    setIsHidden(true);
    setIsRunning(true);
    isSpace = false;
  };

  const stopStopwatch = () => {
    setIsHidden(false);
    setIsRunning(false);
    // new scramble
    setIsFinishStatusScreen(true);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };



  // other functions

  const resettUI = () => {
    setAo5(-1);
    setAo12(-1);
    setOpponetName("N/A")
    setOpponetTime(-1);
    setOpponetAo5(-1);
    setOpponetAo12(-1);
    setCurrentScramble("waiting for players...");
    setSidebarUI([]);
  }

  const fireTimeToServer = (currentFinishedStatus) => {
    let avgs = calculateAvgs(currentFinishedStatus);
    if (currentFinishedStatus !== "x") {
      props.socket.emit("finalTime", {
        roomCode: props.roomInputValue
        , playerTime: currentTime
        , ao5: avgs[0]
        , ao12: avgs[1]
        , finishedStatus: currentFinishedStatus // finished, dnf, plus2, x
      });
      isRoundReady = false;
      setIsHidden(false);
      setCurrentScramble("Waiting for others to finish...")
    }
  }

  const calculateAvgs = (currentFinishedStatus) => {    // calculate and if dnf set dnf
    let x = times;
    if (currentFinishedStatus === "dnf") currentTime = "dnf"
    else if (currentFinishedStatus === "plus2") currentTime += 2000;

    x.unshift(currentTime);
    if (times.length >= 13) times.pop();
    setTimes(x);

    let ao5temp = -1;
    // eslint-disable-next-line
    ao12Start: if (times.length >= 5) {
      ao5temp = -1;
      for (let i = 0; i < 5; i++) {
        if (times[i] === "dnf") {
          setAo5("dnf");
          // eslint-disable-next-line
          break ao12Start;
        }
        ao5temp += times[i];
      }

      ao5temp = ao5temp / 5;
      setAo5(ao5temp);
    }
    let ao12temp = -1;
    if (times.length >= 12) {
      ao12temp = -1;
      for (let i = 0; i < 12; i++) {
        if (times[i] === "dnf") {
          setAo12("dnf");
          return;
        }
        ao12temp += times[i];
      }
      ao12temp = ao12temp / 12;
      setAo12(ao12temp);
    }
    return [ao5temp, ao12temp]
  }



  // check +1, not 0 index
  const changeOpponetTimeDisplay = (initial) => {
    if (initial) {
      setOpponetName(playerNicknames[0]);
      return;
    }
    if (playerNicknamesIndex === playerNicknames.length - 1) playerNicknamesIndex = 0;
    else playerNicknamesIndex++;

    setOpponetName(playerNicknames[playerNicknamesIndex]);
    if (opponetsStats[playerNicknames[playerNicknamesIndex]] && opponetsStats[playerNicknames[playerNicknamesIndex]].playerTime) {
      setOpponetTime(opponetsStats[playerNicknames[playerNicknamesIndex]].playerTime);
      setOpponetAo5(opponetsStats[playerNicknames[playerNicknamesIndex]].ao5);
      setOpponetAo12(opponetsStats[playerNicknames[playerNicknamesIndex]].ao12);
      console.log("opponet of ao5: ", opponetsStats[playerNicknames[playerNicknamesIndex]].ao5)
    }
  }


  const formatTime = (time) => {
    const milliseconds = String(time % 1000).padStart(3, '0');
    const seconds = String(Math.floor(time / 1000) % 60).padStart(2, '0');
    const minutes = Math.floor(time / 60000);
    let formattedTime = '';
    if (minutes > 0) {
      formattedTime += `${minutes}:`;
    }
    formattedTime += `${seconds}.${milliseconds.slice(0, 2)}`;
    return formattedTime;
  };

  const leaveRoom = () => {
    console.log("socket leaving")
    props.socket.emit("roomclosed-data", props.roomInputValue)
    resettUI();
    props.setIsRoomClosedScreen(true);

  }

  return (
    <>
      {isSettingScreen &&
        <SettingsScreen
          setIsSettingsScreen={setIsSettingsScreen}
          setTimerDelay={setTimerDelay}
          timerDelay={timerDelay}
        />}

      {isFinishedStatusScreen &&
        <FinishedScreen
          setIsFinishStatusScreen={setIsFinishStatusScreen}
          finishStatus={finishStatus}
          fireTimeToServer={fireTimeToServer} />}

      <div className="timer-container">
        {< Sidebar
          username={props.nickname}
          currentRound={currentRound}
          formatTime={formatTime}
          socket={props.socket}
          isRoundReady={isRoundReady}
          setIsSettingsScreen={setIsSettingsScreen}
          isSettingScreen={isSettingScreen}
          isHidden={isHidden}
          leaveRoom={leaveRoom}
          sidebarUI={sidebarUI}
          setSidebarUI={setSidebarUI}
        />}
        {!isHidden && <div className="timer-top">
          <p className="timer-container-puzzle-label">{props.currentPuzzle}</p>
          <p className="timer-container-scramble">{currentScramble}</p>
        </div>
        }
        <div className="timer-container-center">
          <p className="time" style={{ color: `${timerColor}` }}>{formatTime(elapsedTime)}</p>
          {!isHidden && <div className="timers-avg">
            <p className="ao5">ao5: {ao5 !== -1 ? ao5 !== "dnf" ? formatTime(ao5) : "DNF" : "--:--"}</p>
            <p className="ao12">ao12: {ao12 !== -1 ? ao12 !== "dnf" ? formatTime(ao12) : "DNF" : "--:--"}</p>
          </div>}
        </div>
        {!isHidden &&
          <div className="timer-container-opponet">
            <div className="opponet-time">
              <button onClick={() => { changeOpponetTimeDisplay(false) }} className="opponet-nickname">{opponetName}</button>
              <p className="opponet-time">{opponetTime !== -1 ? formatTime(opponetTime) : "--:--"}</p>
            </div>
            <div className="opponet-avg">
              <p className="opponet-ao5">ao5: {opponetAo5 !== -1 ? formatTime(opponetAo5) : "--:--"}</p>
              <p className="opponet-ao12">ao12: {opponetAo12 !== -1 ? formatTime(opponetAo12) : "--:--"}</p>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Timer;
