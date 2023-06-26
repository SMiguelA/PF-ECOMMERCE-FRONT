import { format } from "timeago.js";
import "./message.css";

export default function Message({ message, own, pictureOwn, pictureSender }) {
  const pictureSrc = own ? pictureOwn : pictureSender;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={pictureSrc} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
