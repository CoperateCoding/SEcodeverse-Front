const PopupObjective = () => {
    return(
        <div className="objective-container">
            <div className="objective-wrapper">
                <div className="objective-top-wrapper">
                    <span className="objective-title">문제이름</span>
                    <div className="objective-cancel-img"></div>
                </div>
                <div className="objective-middle-wrapper">
                    <div className="objective-description"></div>
                    <div className="objective-answer"></div>
                </div>
                <div className="objective-bottom-wrapper">
                    <button className="objective-submit"></button>
                </div>
            </div>
        </div>
    );
}

export default PopupObjective;