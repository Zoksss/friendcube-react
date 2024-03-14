const calculateAvgs = (currentFinishedStatus) => {    // calculate and if dnf set dnf

    let x = times;       // pushing new time inside of times[] array
    if (currentFinishedStatus === "dnf") currentTime = "dnf"
    else if (currentFinishedStatus === "plus2") currentTime += 2000;

    x.unshift(currentTime);
    if (times.length >= 13) times.pop();
    setTimes(x);

    // eslint-disable-next-line
    ao12Start: if (times.length >= 5) {
      let ao5temp = 0;
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
    if (times.length >= 12) {
      let ao12temp = 0;
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
    console.log(times);
  }

  export {calculateAvgs};