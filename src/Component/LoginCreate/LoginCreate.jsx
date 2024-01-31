import React from 'react';
import './LoginCreate.scss';
import Coffee from "../../assets/coffee.svg"

import _2x2 from "../../assets/222.svg"
import _3x3 from "../../assets/333.svg"
import _4x4 from "../../assets/444.svg"
import _megaminx from "../../assets/megaminx.svg"
import _pyraminx from "../../assets/pyraminx.svg"
import _square1 from "../../assets/square1.svg"


const LoginCreate = (props) => {
    const [inputValue, setInputValue] = React.useState("");


    const makeRoomId = (length) => {
        let result = '';
        let characters = '0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }



    return (
        <>
            <div className="logincreate-container">
                <div className="login-info ">
                    <h1>FriendCube</h1>
                    <h2>solve <span>with</span> friends</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                    <div className="login-info-buttons">
                        <button><img src={Coffee} alt="" /></button>
                        <p className="buy-me-the-coffe">made with ❤️ by zoks</p>
                    </div>
                </div>
                <div className="login-create-input">
                    <div className="login-create-input-title">
                        <p className="join-label">{props.isLogin ? "Login" : "Create"}</p>
                        <button href="/" onClick={() => props.setIsLogin(!props.isLogin)}>{!props.isLogin ? "or Login" : "or Create"}</button>
                    </div>
                    {props.isLogin && <form action="/" className="login-form">
                        <label htmlFor="">Nickname</label>
                        <input type="text" placeholder="eg. Zoks" maxLength="8" onChange={(e) => setInputValue(e.target.value)} />
                        <label htmlFor="">Room Code</label>
                        <input type="text" placeholder="eg. 01344122" maxLength="8" onChange={(e) => props.setRoomInputValue(e.target.value)} />
                        <button className="join-btn" onClick={(e) => {
                            e.preventDefault();
                            props.setIsJoinedPlayers(true);
                            props.socket.emit('join', inputValue, props.roomInputValue, "3x3"); // makeRoomId();
                        }}>{props.isLogin ? "Join Room" : "Create Room"} </button>
                    </form>}
                    {!props.isLogin && <form action="/" className="login-form">
                        <label htmlFor="">Nickname</label>
                        <input type="text" placeholder="eg. Zoks" onChange={(e) => setInputValue(e.target.value)} />
                        <label htmlFor="">Puzzle <span className="selected-puzzle-label">(3x3)</span></label>
                        <div className="puzzle-buttons">
                            <button className="puzzle-button">
                                <img src={_2x2} alt="" />
                            </button>
                            <button className="puzzle-button puzzle-button-active">
                                <img src={_3x3} alt="" />
                            </button>
                            <button className="puzzle-button">
                                <img src={_4x4} alt="" />
                            </button>
                            <button className="puzzle-button">
                                <img src={_pyraminx} alt="" />
                            </button>
                            <button className="puzzle-button">
                                <img src={_megaminx} alt="" />
                            </button>
                            <button className="puzzle-button">
                                <img src={_square1} alt="" />
                            </button>
                        </div>
                        <button className="join-btn" onClick={(e) => { e.preventDefault(); props.setIsJoinedPlayers(true) }}>{props.isLogin ? "Join Room" : "Create Room"} </button>
                    </form>}
                </div>
            </div>
        </>
    );
}

export default LoginCreate;
