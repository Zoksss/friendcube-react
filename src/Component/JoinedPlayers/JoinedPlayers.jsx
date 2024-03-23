import React from "react";
import "./JoinedPlayers.scss"
import { useTransition, animated } from "react-spring"


const JoinedPlayers = (props) => {

    const [joinedPlayersUI, setJoinedPlayersUI] = React.useState([]);
    const [isStartButton, setIsStartButton] = React.useState(false);

    const transition = useTransition(props.isJoinedPlayers, {
        from: { top: -70, opacity: 0 },
        enter: { top: -0, y: 0, opacity: 1 },
        leave: { top: 70, y: 0, opacity: 0 },
    });

    const usersMap = joinedPlayersUI.map((user, i) => {
        let userTemp = user;
        let isLeader = false;
        if (typeof user === "object") {
            isLeader = true;
            userTemp = user[0] + ` (Leader)`;
        }
        return (
            <div key={i} className={`player ${isLeader ? "leader" : ""}`}><p>{userTemp}</p><p>#{i + 1}</p></div>
        )

    });

    props.socket.on("displayUsers", (users) => {
        setJoinedPlayersUI(users);
    });

    props.socket.on("leaderStartButton", () => {
        setIsStartButton(true);
    })


    return (
        <>
            {transition((style, item) =>
                item ?
                    <animated.div className="joined-players-container" style={style}>
                        <div className="joined-players-card">
                            <div className="joined-players-title">room code: <span className="joined-players-roomcode">{props.roomInputValue}</span></div>
                            <div className="players-wrapper">
                                {usersMap}
                            </div>
                            <div className="joined-players-buttons">
                                {isStartButton && <p className="joinedplayers-waitingforleader">Waiting for leader to start...</p>}
                                {!isStartButton && <button className="start-btn" onClick={() => {
                                    props.setIsTimerScreen(true);
                                    props.setIsJoinedPlayers(false);
                                    props.socket.emit("leaderStartGamee", props.roomInputValue)

                                }}>start</button>}
                                <button className="cancel-btn" onClick={() => props.setIsJoinedPlayers(false)}>cancel</button>
                            </div>
                        </div>
                    </animated.div> : ""
            )}
        </>
    );
}

export default JoinedPlayers;
