import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss} // when user click out of the modal, should dismiss the modal
      className="ui dimmer modals visible active"
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        // must stop cause is user clicks inside of the modal, event will bubble up,
        // and catched by the onClick function we defined
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
