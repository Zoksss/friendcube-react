import "./JoinedPlayers.scss"

const JoinedPlayers = (props) => {


    let usersMap;
    props.socket.on("displayUsers", (users) => {
        console.log(users);
    });

    return (
        <div className="joined-players-container">
            <div className="joined-players-card">
                <div className="joined-players-title">room code: <span className="joined-players-roomcode">{props.roomInputValue}</span></div>
                <div className="players-wrapper">
                    <div className="player leader"><p>Zoks</p><p>#1</p></div>
                    <div className="player"><p>Simkeee</p><p>#2</p></div>
                    <div className="player"><p>Damjan311</p><p>#3</p></div>
                    <div className="player"><p>Dimeee</p><p>#4</p></div>
                </div>
                <div className="joined-players-buttons">
                    <button className="start-btn" onClick={() => { props.setIsTimerScreen(true); props.setIsJoinedPlayers(false) }}>start</button>
                    <button className="cancel-btn" onClick={() => props.setIsJoinedPlayers(false)}>cancel</button>
                </div>
            </div>
        </div>
    );
}

export default JoinedPlayers;
