import React from "react";
import classnames from "classnames";
import "./styles.scss";

const Alert = (props) => {
  const { type, title, msg } = props;

  const classes = classnames
    ("container",
    {
      [type]: !!type,
    });

  return (
    <div className={classes}>
      <p>
        <span>{title} </span>
        {msg}
      </p>
    </div>
  );
};

export default Alert;
