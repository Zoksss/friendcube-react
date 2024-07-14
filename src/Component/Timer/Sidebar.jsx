import "./Timer.scss"
import { useTransition, animated } from "react-spring"

import SidebarTime from './SidebarTime';

import Players from "../../assets/players.svg"
import Settings from "../../assets/settings.svg"
import Stacks from "../../assets/sidebar.svg"
import LeaveRoom from "../../assets/leaveRoom.svg"

import React from 'react';


const Sidebar = (props) => {

    const [isSidebarVisible, setIsSidebarVisible] = React.useState((window.innerWidth >= 768)?true:false);

    const timesListed = props.sidebarUI.map((timeObj, i) => (timeObj.playerTime === -1) ? <div key={i} className="sidebar-round"><p>#{timeObj.round}</p></div> : <SidebarTime key={i} playerName={timeObj.playerName} playerTime={timeObj.playerTime} formatTime={props.formatTime} finishedStatus={timeObj.finishedStatus} />)

    const transition = useTransition(isSidebarVisible && !props.isHidden, {
        from: { left: -70, opacity: 0, display: "none" },
        enter: { left: 0, opacity: 1, display: "block" },
        leave: { left: -70, opacity: 0, display: "none" },
    });


    props.socket.on("timeGetFromSocket", (timesArrayFromSrv) => {
        props.setSidebarUI(timesArrayFromSrv);
    })

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsSidebarVisible(true);
            else  setIsSidebarVisible(false);
        }; 

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <>
            {transition((style, item) =>
                item ?
                    <animated.div className="sidebar" style={style}>
                        {timesListed}
                    </animated.div > : ""
            )}
            <div className="sidebar-buttons-container">
                <div className="sidebar-buttons">
                    <div className="sidebar-buttons-top">
                        <button onClick={() => (window.innerWidth < 768) ? setIsSidebarVisible(!isSidebarVisible) : ""}
                            style={{ backgroundColor: isSidebarVisible ? "#616161" : "#ee6c4d" }}><img src={Stacks} alt="" /></button>
                        <button onClick={() => { props.setIsSettingsScreen(true) }} style={{ backgroundColor: props.isSidebarVisible ? "#616161" : "#ee6c4d" }}><img src={Settings} alt="" /></button>
                        <button onClick={() => props.leaveRoom()}><img src={LeaveRoom} alt="" /></button>
                    </div>
                </div>
            </div >

        </>
    );
}

export default Sidebar;

