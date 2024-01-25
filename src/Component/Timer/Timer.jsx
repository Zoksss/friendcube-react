import './Timer.scss';
import Sidebar from './Sidebar';
import React from 'react';

const Timer = () => {

  // misc states 
  const [timerColor, setTimerColor] = React.useState("white");


  // space handler
  const [holdTimeout, setHoldTimeout] = React.useState(null);
  const [isSpaceHeld, setIsSpaceHeld] = React.useState(false);


  // stopwatch
  const [isRunning, setIsRunning] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);


  // stopwatch logic and useEffect
  React.useEffect(() => {
    let intervalId;

    if (isRunning) {
      const startTime = Date.now() - elapsedTime;
      intervalId = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 10); // Update every 10 milliseconds (100th of a second)
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, elapsedTime]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };


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


  // space handling logic and useEffect
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space' && !isSpaceHeld) {
        spacePressed();
        setIsSpaceHeld(true);
        setHoldTimeout(setTimeout(spaceHolded, 1000));
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        if(isSpaceHeld) startStopwatch();
        spaceDepressed();
        setIsSpaceHeld(false);
        clearTimeout(holdTimeout);
      }
    };

    const spacePressed = () => {
      console.log('Space pressed');
      setTimerColor("red")
    };

    const spaceDepressed = () => {
      if(isRunning) stopStopwatch()
      console.log('Space depressed');
      setTimerColor("white")
    };

    const spaceHolded = () => {
      console.log('Space holded');
      setTimerColor("green")
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(holdTimeout);
    };
  }, [holdTimeout, isSpaceHeld]);



  return (
    <div className="timer-container">
      < Sidebar />
      <div className="timer-top">
        <p className="timer-container-puzzle-label">3x3</p>
        <p className="timer-container-scramble">L D R2 D2 B R’ D2 L R U2 D’ B’ U2 B’ R</p>
      </div>
      <div className="timer-container-center">
        <p className="time" style={{ color: `${timerColor}` }}>{formatTime(elapsedTime)}</p>
        <div className="timers-avg">
          <p className="ao5">ao5: 31.09</p>
          <p className="ao12">ao12: 27.41</p>
        </div>
      </div>
      <div className="timer-container-opponet">
        <div className="opponet-time">
          <p className="opponet-nickname">damjan311</p>
          <p className="opponet-time">25.09</p>
        </div>
        <div className="opponet-avg">
          <p className="opponet-ao5">ao5: 41.25</p>
          <p className="opponet-ao12">ao12: 37.19</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;
