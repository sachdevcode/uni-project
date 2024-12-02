import { useRef } from "react";
import Modal from "../shared/Modal/Modal";
import * as StoryCss from "./Story.css?raw";
import { accountId, modalRef } from "../../types/common";
import { WidgetProps } from "../../types/type";

const Story = ({ accountId, event }: WidgetProps) => {
  const modalRef = useRef<modalRef | null>(null);
  const handleOpenModal = () => {
    modalRef.current?.open();
  };
  const videos = [
    "https://videos.pexels.com/video-files/20363746/20363746-sd_640_360_30fps.mp4",
    "https://videos.pexels.com/video-files/12335026/12335026-sd_640_360_24fps.mp4",
    "https://videos.pexels.com/video-files/28295446/12353430_640_360_60fps.mp4",
    "https://videos.pexels.com/video-files/28435443/12381497_640_360_50fps.mp4",
  ];
  return (
    <div>
      <style type="text/css">{StoryCss.default} </style>
      <div className="video-container">
        {videos.map((video) => (
          <video
            key={video}
            src={video}
            width="100%"
            height="100%"
            autoPlay
            muted
            loop
            playsInline
            className="story-video"
          />
        ))}
      </div>

      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal type={event} ref={modalRef}>
        Story Content Here lorem1000
      </Modal>
    </div>
  );
};

export default Story;
