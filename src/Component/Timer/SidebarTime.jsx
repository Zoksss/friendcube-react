import './Timer.scss';

const SidebarTime = (props) => {
    return (
        <div className="sidebar-time">

            <div className="sidebar-round">
                <p>#{props.currentRound}</p>
            </div>
            <div className="sidebar-player-row">
                <p className="sidebar-player-nickname">{props.playerName}</p>
                <p className="sidebar-player-time">{props.formatTime(props.playerTime)}</p>
            </div>
        </div>
    );
}

export default SidebarTime;
