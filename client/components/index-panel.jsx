import React from "react";
import classNames from "classnames";

const IndexPanel = ({ name, index, difference }) => (
    <div className={classNames("index-panel", {red: difference >= 0 })}>
        <div className="name">{name}</div>
        <div className="index">{index}</div>
        <div className="difference">{difference >= 0 ? "+" + difference.toFixed(2) : difference.toFixed(2)}</div>
    </div>
);

export default IndexPanel;
