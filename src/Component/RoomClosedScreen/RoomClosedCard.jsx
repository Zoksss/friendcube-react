import './RoomClosedScreen.scss';



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

const RoomClosedCard = (props) => {

    return (
        <div className="room-closed-screen-card">
            <p className={props.index === props.bestPbIndex ? "best-pb" : props.index === props.bestAvgIndex ? "best-avg" : ""}>{props.index === props.bestPbIndex ? "Best PB!" : props.index === props.bestAvgIndex ? "Best AVG!" : ""}</p>
            <p className="player-name">{props.nickname}</p>
            <p className="stat">avg: {(props.avg !== -1) ? formatTime(Number(props.avg) / Number(props.roundFromServer)) : "--:--"}</p>
            <p className="stat">pb: {(props.pb !== -1) ? formatTime(Number(props.pb)) : "--:--"}</p>
            <p className="stat">ao5: {(props.ao5 !== -1) ? formatTime(Number(props.ao5)) : "--:--"}</p>
            <p className="stat">ao12: {(props.ao12 !== -1) ? formatTime(Number(props.ao12)) : "--:--"}</p>
        </div>
    );
}

export default RoomClosedCard;

