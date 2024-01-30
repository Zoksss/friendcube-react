import './Timer.scss';
import SidebarTime from './SidebarTime';

import Players from "../../assets/players.svg"
import Settings from "../../assets/settings.svg"
import Stacks from "../../assets/stack.svg"


const Sidebar = (props) => {

    const timesListed = (props.sidebarTimesArray.length === 0)?"":props.sidebarTimesArray.map((playerObjectArr, i) =>< SidebarTime key={i}playerName={playerObjectArr[0].playerName} playerTime={playerObjectArr[0].playerTime} currentRound={playerObjectArr[0].round} formatTime={props.formatTime}/>)


    return (
        <div className="sidebar">
            {timesListed}
            <div className="sidebar-buttons">
                <div className="sidebar-buttons-top">
                    <button><img src={Settings} alt="" /></button>
                    <button><img src={Stacks} alt="" /></button>
                    <button><img src={Players} alt="" /></button>
                </div>
                <button className="leave-room-btn">leave room</button>
            </div>
        </div>
    );
}

export default Sidebar;
