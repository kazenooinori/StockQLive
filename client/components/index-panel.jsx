import React from "react";

const IndexPanel = ({ name, index, difference }) => (
    <div className="index-panel">
        <div className="name">{name}</div>
        <div className="index">{index}</div>
        <div className="difference">{difference >= 0 ? "+" + difference : "-" + difference}</div>
    </div>
);

export default IndexPanel;
