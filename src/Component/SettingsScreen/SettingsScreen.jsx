import React from "react";
import "./SettingsScreen.scss"

import DefaultTheme from "../../assets/themesIcon/fc-theme.png"
import Light from "../../assets/themesIcon/light.png"
import PinkLight from "../../assets/themesIcon/pinkLight.png"
import Purple from "../../assets/themesIcon/purple.png"

const SettingsScreen = (props) => {
    return (
        <div className="settings-screen-container">
            <div className="settings-screen-card">
                <div className="settings-screen-title">Settings</div>
                <div className="settings-wrapper">
                    <div className="settings-timer-delay">
                        <p>timer delay</p>
                        <input type="number" defaultValue={props.timerDelay} onChange={(e) => props.setTimerDelay(e.target.value<200?200:e.target.value)}/>
                    </div>
                    <div className="settings-theme">
                        <p>themes:</p>
                        <div className="themes-buttons-container">
                            <button ><img className="active" src={DefaultTheme} alt="" /></button>
                            <button><img src={Light} alt="" /></button>
                            <button><img src={PinkLight} alt="" /></button>
                            <button><img src={Purple} alt="" /></button>
                        </div>
                    </div>
                </div>
                <div className="settings-screen-buttons">
                    <button className="cancel-btn" onClick={() => props.setIsSettingsScreen(false)}>Return</button>
                </div>
            </div>
        </div>
    );
}

export default SettingsScreen;
