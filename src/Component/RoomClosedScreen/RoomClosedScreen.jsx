import './RoomClosedScreen.scss';
import { useTransition, animated } from "react-spring"


const RoomClosedScreen = (props) => {

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
                                <div className="room-closed-screen-card">
                                    <p className="best-avg">Best AVG!</p>
                                    <p className="player-name">Zoks</p>
                                    <p className="stat">avg: 30.07</p>
                                    <p className="stat">pb: 21.59</p>
                                    <p className="stat">ao5: 35.01</p>
                                    <p className="stat">ao12: 34.94</p>
                                </div>
                                <div className="room-closed-screen-card">
                                    <p className="best-pr">Best PR!</p>
                                    <p className="player-name">Zoks</p>
                                    <p className="stat">avg: 30.07</p>
                                    <p className="stat">pb: 21.59</p>
                                    <p className="stat">ao5: 35.01</p>
                                    <p className="stat">ao12: 34.94</p>
                                </div>
                                <div className="room-closed-screen-card">
                                    <p className="player-name">Zoks</p>
                                    <p className="stat">avg: 30.07</p>
                                    <p className="stat">pb: 21.59</p>
                                    <p className="stat">ao5: 35.01</p>
                                    <p className="stat">ao12: 34.94</p>
                                </div>
                                <div className="room-closed-screen-card">
                                    <p className="player-name">Zoks</p>
                                    <p className="stat">avg: 30.07</p>
                                    <p className="stat">pb: 21.59</p>
                                    <p className="stat">ao5: 35.01</p>
                                    <p className="stat">ao12: 34.94</p>
                                </div>
                            </div>
                            <button className="room-closed-screen-btn" onClick={() => { props.setIsLogin(true); props.setIsRoomClosedScreen(false); }}>Return To Home</button>
                        </div>
                        <p className="made-with-harth-end-screen">thanks for using friendcube ❤️</p>
                    </animated.div > : ""
            )};

        </>
    );
}

export default RoomClosedScreen;

