import * as React from "react";
import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default Loader;
