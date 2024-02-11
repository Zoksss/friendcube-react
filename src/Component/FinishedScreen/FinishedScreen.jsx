import './FinishedScreen.scss';


const FinishedScreen = (props) => {
    return (
        <div className="finished-screen">
            <div className="finished-screen-container">
                <button onClick={() => { props.setIsFinishStatusScreen(false); props.fireTimeToServer("finished");}}>FINISHED</button>
                <div className="finished-screen-bottom-row">
                    <button className="finished-screen-bottom-row-btn" onClick={() => { props.setIsFinishStatusScreen(false); props.fireTimeToServer("dnf") }}>DNF</button>
                    <button className="finished-screen-bottom-row-btn" onClick={() => { props.setIsFinishStatusScreen(false); props.fireTimeToServer("plus2") }}>+2</button>
                    <button className="finished-screen-bottom-row-btn" onClick={() => { props.setIsFinishStatusScreen(false); props.fireTimeToServer("x") }}>x</button>
                </div>
            </div>
        </div>
    );
}

export default FinishedScreen;

