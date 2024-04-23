import './RoomClosedScreen.scss';
import { useTransition, animated } from "react-spring"

import RoomClosedCard from './RoomClosedCard';
import React from 'react';

let roundFromServer = 1;

const RoomClosedScreen = (props) => {

    const [roomClosedUsers, setRoomClosedUsers] = React.useState([])
    const roomClosedUsersListed = roomClosedUsers.map((socket, i) => < RoomClosedCard roundFromServer={roundFromServer-1} key={i} nickname={socket.socketNickname} avg={socket.playerAvg} pb={socket.pb} ao5={socket.playerAo5} ao12={socket.playerAo12}/>)

    props.socket.on("roomclosed-data-send", (roomData) => {
        console.log(roomData);
        let bestPbIndex = -1, bestAvgIndex = -1, bestPbTemp = -1, bestAvgTemp = -1;
        let x = [];
        for (let i = 0; i < roomData.sockets.length; i++) {
            x = roomClosedUsers;
            let socket = roomData.sockets[i];
            if (socket.pb > bestPbTemp) {
                bestPbTemp = socket.pb
                bestPbIndex = i;
            }
            if (socket.playerAvg > bestAvgTemp) {
                bestAvgTemp = socket.playerAvg;
                bestAvgIndex = i;
            }
            roundFromServer = roomData.round
            x.push(roomData.sockets[i])
        }
        //x[bestPbIndex].isPb = true;
        //x[bestAvgIndex].isAvg = true;
        setRoomClosedUsers(roomData.sockets);
    })

    const transition = useTransition(props.isRoomClosedScreen, {
        from: { top: -70, opacity: 0 },
        enter: { top: -0, y: 0, opacity: 1 },
        leave: { top: 70, y: 0, opacity: 0 },
    });
    return (
        <>
            {transition((style, item) =>
                item ?
                    <animated.div className="room-closed-screen" style={style}>
                        <div className="room-closed-screen-container">
                            <p className="room-closed-screen-title">Room <span className="room-closed-screen-title-roomcode">05519235</span> Closed</p>
                            <p className="room-closed-screen-subtitle">Final Player Stats</p>
                            <div className="room-closed-screen-card-holder">
                                {roomClosedUsersListed}
                            </div>
                            <button className="room-closed-screen-btn" onClick={() => { props.setIsTimerScreen(false); props.setIsLogin(true); props.setIsRoomClosedScreen(false); }}>Return To Home</button>
                        </div>
                        <p className="made-with-harth-end-screen">thanks for using friendcube ❤️</p>
                    </animated.div > : ""
            )};

        </>
    );
}

export default RoomClosedScreen;

