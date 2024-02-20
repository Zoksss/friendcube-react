import './Timer.scss';
import SidebarTime from './SidebarTime';

import Players from "../../assets/players.svg"
import Settings from "../../assets/settings.svg"
import Stacks from "../../assets/sidebar.svg"

import React from 'react';


const Sidebar = (props) => {

    const [sidebarUI, setSidebarUI] = React.useState([]);
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(true);

    const timesListed = sidebarUI.map((timeObj, i) => (timeObj.playerTime === -1) ? <div key={i} className="sidebar-round"><p>#{timeObj.round}</p></div> : <SidebarTime key={i} playerName={timeObj.playerName} playerTime={timeObj.playerTime} formatTime={props.formatTime} finishedStatus={timeObj.finishedStatus} />)

    props.socket.on("timeGetFromSocket", (timesArrayFromSrv) => {
        setSidebarUI(timesArrayFromSrv);
    })

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsSidebarVisible(true);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            <div className="sidebar" style={{ display: isSidebarVisible ? "block" : "none" }}>
                {timesListed}
            </div>
            <div className="sidebar-buttons-container">
                <div className="sidebar-buttons">
                    <div className="sidebar-buttons-top">
                        <button onClick={() => (window.innerWidth < 768) ? setIsSidebarVisible(!isSidebarVisible) : ""}
                            style={{ backgroundColor: isSidebarVisible ? "#616161" : "#ee6c4d" }}><img src={Stacks} alt="" /></button>
                        <button onClick={() => { props.setIsSettingsScreen(true) }} style={{ backgroundColor: props.isSidebarVisible ? "#616161" : "#ee6c4d" }}><img src={Settings} alt="" /></button>
                        <button><img src={Players} alt="" /></button>
                    </div>
                    <button className="leave-room-btn">leave room</button>
                </div>
            </div >
        </>
    );
}

export default Sidebar;

