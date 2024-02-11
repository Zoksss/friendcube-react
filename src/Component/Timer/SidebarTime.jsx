import './Timer.scss';

const SidebarTime = (props) => {
    return (
        <div className="sidebar-time">
            <div className="sidebar-player-row">
                <p className="sidebar-player-nickname">{props.playerName}</p>
                <p className="sidebar-player-time">{(props.finishedStatus==="dnf")?"DNF":props.formatTime(props.playerTime)}{props.finishedStatus==="plus2"?"+":""}</p>
            </div>
        </div>
    );
}

export default SidebarTime;
