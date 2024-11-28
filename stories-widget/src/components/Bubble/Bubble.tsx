import { useRef } from "react";

import Modal from "../shared/Modal/Modal";

import * as BubbleCss from "./Bubble.css?raw";
import * as ModalCss from "../shared/Modal/Modal.css?raw";

import SwiperContainer from "../shared/SwiperContainer/SwiperContainer";

import { BubbleProps } from "../../types/type";
import { modalRef } from "../../types/common";

import { useFetchStory } from "../../lib/useFetchBubble";

const Bubble = ({ accountId, event }: BubbleProps) => {
  const { data : videoData, error, loading } = useFetchStory(accountId);
  console.log(videoData)
  const modalRef = useRef<modalRef | null>(null);
  // let videoData = [
  //   {
  //      logo: "https://images.pexels.com/photos/28291066/pexels-photo-28291066/free-photo-of-two-women-are-working-in-a-tea-field.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //     title: "Video Title 1",
  //     id: "JEsGy9ISIesSJQkq8UgEL500BKUwvuPt902hKZzRTPUtk",
  //     products: [
  //       {
  //         images: [
  //           "https://images.pexels.com/photos/6442646/pexels-photo-6442646.jpeg?auto=compress&cs=tinysrgb&w=600",
  //           "https://images.pexels.com/photos/6208062/pexels-photo-6208062.jpeg?auto=compress&cs=tinysrgb&w=600",
  //         ],
  //         price: "$ 29.99",
  //         title: "Organic Tea Set",
  //         description:
  //           "A high-quality organic tea set for a refreshing experience.",
  //         productId: "P101",
  //       },
  //       {
  //         images: [
  //           "https://images.pexels.com/photos/14014270/pexels-photo-14014270.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //           "https://images.pexels.com/photos/10432459/pexels-photo-10432459.jpeg?auto=compress&cs=tinysrgb&w=600",
  //         ],
  //         price: "$ 19.99",
  //         title: "Tea Brewing Kit",
  //         description: "An affordable kit for brewing tea with ease.",
  //         productId: "P102",
  //       },
  //       {
  //         images: [
  //           "https://images.pexels.com/photos/13920418/pexels-photo-13920418.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //           "https://images.pexels.com/photos/6802043/pexels-photo-6802043.jpeg?auto=compress&cs=tinysrgb&w=600",
  //         ],
  //         price: "$ 39.99",
  //         title: "Luxury Coffee Grinder",
  //         description:
  //           "Premium grinder for coffee lovers seeking a perfect brew.",
  //         productId: "P103",
  //       },
  //     ],
  //   },

  // ];

  // let videoData = [
  //   {
  //     description: "Trending styles for winter",
  //     id: 5,

  //     title: "Shop Winter Looks",
  //     type: "shoppable",
  //     video: {
  //       id: 5,
  //       mux_playback_id: null,
  //       url: "https://videos.pexels.com/video-files/4040354/4040354-sd_360_640_30fps.mp4",
  //     },

  //     products: [
  //       {
  //         id: 1,
  //         name: "Awesome Steel Ball",
  //         description:
  //           "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
  //         created_at: "2023-03-01T09:19:26.496Z",
  //         price: 43.5,
  //         photo_url:
  //           "https://images.pexels.com/photos/6208062/pexels-photo-6208062.jpeg?auto=compress&cs=tinysrgb&w=600",
  //         updated_at: "2024-11-24T20:02:37.681Z",
  //       },
  //       {
  //         id: 2,
  //         name: "Electronic Wooden Cheese",
  //         description:
  //           "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  //         created_at: "2023-08-29T03:11:14.703Z",
  //         price: 335.59,
  //         photo_url:
  //           "https://images.pexels.com/photos/13920418/pexels-photo-13920418.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  //         category: "Electronics",
  //         updated_at: "2024-11-25T04:42:16.453Z",
  //       },
  //     ],
  //   },
  // ];

  const handleOpenModal = () => {
    modalRef.current?.open();
  };

  return (
    <>
      <style type="text/css">{BubbleCss.default}</style>
      <style type="text/css">{ModalCss.default}</style>
      <div className={`video-container container-medium`}>
        {videoData?.map((data) => (
          <div key={data?.id} onClick={() => handleOpenModal()}>
            <video
              key={data?.id}
              src={`http://localhost:5000/api${data?.video?.url}`}
              autoPlay={true}
              loop
              muted
              playsInline
              className={`story-video story-video-medium`}
            />
          </div>
        ))}
      </div>
      <Modal type={"bubble"} ref={modalRef}>
        <SwiperContainer data={videoData} modalRef={modalRef} />
      </Modal>
      {/* </div> */}
    </>
  );
};

export default Bubble;
