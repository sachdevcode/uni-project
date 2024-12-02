import { useRef, useState } from "react";
import { Minimize2 } from "lucide-react";
import * as SwiperCss from "./SwiperContainer.css?raw";
import Cart from "../cart/Cart";
import ProductCta from "../productCta/ProductCta";
import { productCta } from "../../../types/common";
import { SwiperContainerProps } from "../../../types/type";
import { limitString } from "../../../utils/helperfunction";

const SwiperContainer = ({
  data,

  modalRef,
}: SwiperContainerProps) => {
  const [progress, setProgress] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartProduct, setCartProduct] = useState<productCta | null>(null);
  const muxPlayerRef = useRef<HTMLVideoElement>(null);

  const handleProduct = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    playbackId: productCta
  ) => {
    e.stopPropagation();
    setCartProduct(playbackId);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleTimeUpdate = () => {
    const current: number = muxPlayerRef.current?.currentTime ?? 0;
    const total: number = muxPlayerRef.current?.duration ?? 1;
    setProgress((current / total) * 100);
  };

  return (
    <>
      <style type="text/css">{SwiperCss.default}</style>
      <div>
        <Minimize2
          onClick={() => modalRef.current?.close()}
          className="minimize"
          size={25}
        />

        {data?.map((story) => {
          return (
            <div key={story?.id} className="video-cnt">
              <video
                ref={muxPlayerRef}
                src={`http://localhost:5000/api${story?.video?.url}`}
                autoPlay
                loop
                playsInline
                className="video-container"
                onTimeUpdate={handleTimeUpdate}
              />
              <div className="progress-bar">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                  className="progress"
                ></div>
              </div>

              <div className="video-title">
                <img
                  src="data:image/png;base64,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"
                  alt={story?.title}
                  className="bubble-logo"
                />
                <h2>{limitString(story?.title, 25)}</h2>
              </div>
              {isCartOpen && story && (
                <Cart product={cartProduct} onClose={closeCart} />
              )}

              {story?.products && (
                <div className="products">
                  <ProductCta
                    handleProduct={handleProduct}
                    productData={story}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SwiperContainer;
