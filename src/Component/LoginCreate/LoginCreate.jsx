import React from 'react';
import './LoginCreate.scss';
import { useTransition, animated } from "react-spring"

import Coffee from "../../assets/coffee.svg"

import _2x2 from "../../assets/222.svg"
import _3x3 from "../../assets/333.svg"
import _4x4 from "../../assets/444.svg"
import _megaminx from "../../assets/megaminx.svg"
import _pyraminx from "../../assets/pyraminx.svg"
import _square1 from "../../assets/square1.svg"


const LoginCreate = (props) => {

    const [selectedPuzzle, setSelectedPuzzle] = React.useState("3x3");

    const makeRoomId = (length) => {
        let result = '';
        let characters = '0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const validateInput = (nickname, roomCode, puzzle) => {
        if (nickname === "") {
            props.addNotification("Error!", "Nickname cannot be empty!");
            return false;
        }
        if (!isLetter(nickname.charAt(0))) {
            props.addNotification("Error!", "Nickname must start with a letter!");
            return false;
        }
        if (nickname.length < 3) {
            props.addNotification("Error!", "Nickname must be 3 or more characters!");
            return false;
        }
        if (roomCode.length != 8) {
            props.addNotification("Error!", "Room code must be 8 numbers long!");
            return false;
        }
        for (let i = 0; i < roomCode.length; i++) if (isNaN(roomCode.charAt(i))) {
            props.addNotification("Error!", "Room code must be all numbers!");
            return false;
        }
        if (puzzle != "3x3" && puzzle != "2x2" && puzzle != "pyraminx") {
            props.addNotification("Error!", "0x01: Puzzle error");
            return false;
        }
        return true;
    }
    function isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }

    const transition = useTransition(!props.isJoinedPlayers && !props.isTimerScreen && !props.isRoomClosedScreen, {
        from: {top: -70, opacity: 0 },
        enter: {top: -0, y: 0, opacity: 1 },
        leave: {top: 70, y: 0, opacity: 0 },
    });




    return (
        <>
            {transition((style, item) =>
                item ?
                    <animated.div className="logincreate-container" style={style}>
                        <div className="login-info ">
                            <h1>FriendCube</h1>
                            <h2>solve <span>with</span> friends</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                            <div className="login-info-buttons">
                                <button><img src={Coffee} alt="" /></button>
                                <a className="buy-me-the-coffee" href="#">buy me a coffee :)</a>
                            </div>
                        </div>
                        <div className="login-create-input">
                            <div className="login-create-input-mobile-top">
                                <h1 className="login-create-input-mobile-title">FriendCube</h1>
                                <h2 className="login-create-input-mobile-subititle">solve <span>with</span> friends</h2>
                            </div>
                            <div className="login-create-input-title">
                                <p className="join-label">{props.isLogin ? "Login" : "Create"}</p>
                                <button href="/" onClick={() => props.setIsLogin(!props.isLogin)}>{!props.isLogin ? "or Login" : "or Create"}</button>
                            </div>

                            {props.isLogin && <form action="/" className="login-form">
                                <label htmlFor="">Nickname</label>
                                <input type="text" placeholder="eg. Zoks" maxLength="8" onChange={(e) => props.setNickname(e.target.value)} />
                                <label htmlFor="">Room Code</label>
                                <input type="text" placeholder="eg. 01344122" maxLength="8" onChange={(e) => props.setRoomInputValue(e.target.value)} />
                                <button className="join-btn" onClick={(e) => {
                                    e.preventDefault();
                                    let x = validateInput(props.nickname, props.roomInputValue, "3x3");
                                    if (x) {
                                        props.setIsJoinedPlayers(true);
                                        props.socket.emit('join', props.nickname, props.roomInputValue, "3x3"); // makeRoomId();
                                    }
                                }}>{props.isLogin ? "Join Room" : "Create Room"} </button>
                            </form>}


                            {!props.isLogin && <form action="/" className="login-form">
                                <label htmlFor="">Nickname</label>
                                <input type="text" placeholder="eg. Zoks" onChange={(e) => props.setNickname(e.target.value)} />
                                <label htmlFor="">Puzzle</label>
                                <select name="puzzle" className="puzzle-input" defaultValue="3x3" onChange={(e) => setSelectedPuzzle(e.target.value)}>
                                    <option value="2x2">2x2</option>
                                    <option value="3x3"  >3x3</option>
                                    <option value="pyraminx">Pyraminx</option>
                                    <option value="megaminx">Megaminx</option>
                                </select>
                                <button className="join-btn" onClick={(e) => {
                                    e.preventDefault();
                                    props.setIsJoinedPlayers(true);
                                    let roomId = makeRoomId(8);
                                    props.setRoomInputValue(roomId);
                                    let x = validateInput(props.nickname, roomId, selectedPuzzle);
                                    if (x) {
                                        props.socket.emit('join', props.nickname, roomId, selectedPuzzle);
                                    }
                                }}>{props.isLogin ? "Join Room" : "Create Room"} </button>
                            </form>}
                        </div>
                        <p className="made-with-harth">made with ❤️ by zoks</p>
                    </animated.div > : ""
            )}
        </>
    );
}

export default LoginCreate;
