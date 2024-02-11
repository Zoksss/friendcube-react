import './Timer.scss';
import SidebarTime from './SidebarTime';

import Players from "../../assets/players.svg"
import Settings from "../../assets/settings.svg"
import Stacks from "../../assets/stack.svg"

import React from 'react';


const Sidebar = (props) => {

    const [sidebarUI, setSidebarUI] = React.useState([]);

    const timesListed = sidebarUI.map((timeObj, i) => (timeObj.playerTime === -1) ? <div key={i} className="sidebar-round"><p>#{timeObj.round}</p></div> : <SidebarTime key={i} playerName={timeObj.playerName} playerTime={timeObj.playerTime} formatTime={props.formatTime} finishedStatus={timeObj.finishedStatus} />)

    props.socket.on("timeGetFromSocket", (timesArrayFromSrv) => {
        setSidebarUI(timesArrayFromSrv);
    })

    return (
        <>
            <div className="sidebar">
                {timesListed}
            </div>
            <div className="sidebar-buttons-container">
                <div className="sidebar-buttons">
                    <div className="sidebar-buttons-top">
                        <button><img src={Settings} alt="" /></button>
                        <button><img src={Stacks} alt="" /></button>
                        <button><img src={Players} alt="" /></button>
                    </div>
                    <button className="leave-room-btn">leave room</button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;

