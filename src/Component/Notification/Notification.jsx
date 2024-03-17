import "./Notification.scss"

import Warning from "../../assets/warning.svg" // #D62929
import WarningSquare from "../../assets/warningSquare.svg"  // DF9525
import Tick from "../../assets/tick.svg"; //#39aa37

const Notification = (props) => {

    return (
        <div className="notification-container">
            <p className="notification-title">Error!</p>
            <p className="notification-desc">Nickname alredy in the room!</p>
            <img className="notification-image" src={Warning} alt="" />
        </div>
    );
}

export default Notification;
