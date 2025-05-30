import { FunctionComponent } from "react";
import "./Dice.css";

export const Dice: FunctionComponent<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="dice-container absolute size-full flex flex-row justify-center items-center bg-black"
    >
      <div className="die">
        <div className="die-face front">
          <span className="pip center"></span>
        </div>
        <div className="die-face back">
          <span className="pip top-left"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face right">
          <span className="pip top-left"></span>
          <span className="pip center"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face left">
          <span className="pip top-left"></span>
          <span className="pip top-right"></span>
          <span className="pip bottom-left"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face top">
          <span className="pip top-left"></span>
          <span className="pip top-right"></span>
          <span className="pip center"></span>
          <span className="pip bottom-left"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face bottom">
          <span className="pip top-left"></span>
          <span className="pip top-right"></span>
          <span className="pip middle-left"></span>
          <span className="pip middle-right"></span>
          <span className="pip bottom-left"></span>
          <span className="pip bottom-right"></span>
        </div>
      </div>

      <div className="die">
        <div className="die-face front">
          <span className="pip center"></span>
        </div>
        <div className="die-face back">
          <span className="pip top-left"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face right">
          <span className="pip top-left"></span>
          <span className="pip center"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face left">
          <span className="pip top-left"></span>
          <span className="pip top-right"></span>
          <span className="pip bottom-left"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face top">
          <span className="pip top-left"></span>
          <span className="pip top-right"></span>
          <span className="pip center"></span>
          <span className="pip bottom-left"></span>
          <span className="pip bottom-right"></span>
        </div>
        <div className="die-face bottom">
          <span className="pip top-left"></span>
          <span className="pip top-right"></span>
          <span className="pip middle-left"></span>
          <span className="pip middle-right"></span>
          <span className="pip bottom-left"></span>
          <span className="pip bottom-right"></span>
        </div>
      </div>
    </div>
  );
};
