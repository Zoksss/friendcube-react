import './Timer.scss';
import Sidebar from './Sidebar';

const Timer = () => {
    return (
        <div className="timer-container">
            < Sidebar />
            <div className="timer-top">
                <p className="timer-container-puzzle-label">3x3</p>
                <p className="timer-container-scramble">L D R2 D2 B R’ D2 L R U2 D’ B’ U2 B’ R</p>
            </div>
            <div className="timer-container-center">
                <p className="time">27.41</p>
                <div className="timers-avg">
                    <p className="ao5">ao5: 31.09</p>
                    <p className="ao12">ao12: --</p>
                </div>
                <p>27.41</p>
            </div>
            <div className="timer-container-opponet">
                <div className="opponet-time">
                    <p className="opponet-nickname">damjan311</p>
                    <p className="opponet-time">25.09</p>
                </div>
                <div className="opponet-avg">
                    <p className="opponet-ao5">ao5: 41.25</p>
                    <p className="opponet-ao12">ao12: 37.19</p>
                </div>
            </div>

        </div>
    );
}

export default Timer;
