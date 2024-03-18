import "./Notification.scss"

import Error from "../../assets/warning.svg" // #D62929
import WarningSquare from "../../assets/warningSquare.svg"  // DF9525
import Tick from "../../assets/tick.svg"; //#39aa37

const Notification = (props) => {

    return (
        <div className="notification-container" style={{backgroundColor:(props.notificationType)==="Error!"?"#D62929":(props.notificationType)==="Warning!"?"#DF9525":"#39aa37"}}>
            <p className="notification-title">{props.notificationType}</p>
            <p className="notification-desc">{props.notificationDesc}</p>
            <img className="notification-image" src={(props.notificationType)==="Error!"?Error:(props.notificationType)==="Warning!"?WarningSquare:Tick} alt="" />
        </div>
    );
}

export default Notification;
