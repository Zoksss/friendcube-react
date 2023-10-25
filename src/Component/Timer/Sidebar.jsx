import './Timer.scss';
import Sidebar_Time from './Sidebar_Time';

import Players from "../../assets/players.svg"
import Settings from "../../assets/settings.svg"
import Stacks from "../../assets/stack.svg"

const Sidebar = () => {
    return (
        <div className="sidebar">
            < Sidebar_Time />
            < Sidebar_Time />
            < Sidebar_Time />
            < Sidebar_Time />
            < Sidebar_Time />
            < Sidebar_Time />
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
