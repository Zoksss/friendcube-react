import './FinishedScreen.scss';


const FinishedScreen = (props) => {
    return (
        <div className="finished-screen">
            <div className="finished-screen-container">
                <button onClick={() => { props.setfinishStatus("finished"); props.setIsFinishStatusScreen(false); props.fireTimeToServer() }}>FINISHED</button>
                <div className="finished-screen-bottom-row">
                    <button className="finished-screen-bottom-row-btn" onClick={() => { props.setfinishStatus("dnf"); props.setIsFinishStatusScreen(false); props.fireTimeToServer() }}>DNF</button>
                    <button className="finished-screen-bottom-row-btn" onClick={() => { props.setfinishStatus("+2"); props.setIsFinishStatusScreen(false); props.fireTimeToServer() }}>+2</button>
                    <button className="finished-screen-bottom-row-btn" onClick={() => { props.setfinishStatus("x"); props.setIsFinishStatusScreen(false); props.fireTimeToServer() }}>x</button>
                </div>
            </div>
        </div>
    );
}

export default FinishedScreen;

