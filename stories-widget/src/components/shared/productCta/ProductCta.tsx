import React from "react";

import * as styles from "./ProductCta.css?raw";
import * as SwiperCss from "../SwiperContainer/SwiperContainer.css?raw";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { productCta, productData } from "../../../types/common";

interface Props {
  handleProduct: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    data: productCta
  ) => void;
  productData: productData;
}

const ProductCta = ({ handleProduct, productData }: Props) => {
  return (
    <>
      <style type="text/css">{styles.default}</style>
      <style type="text/css">{SwiperCss.default}</style>

      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        direction={"horizontal"}
        modules={[Navigation, Pagination]}
        className="mySwiper swiper-virtual"
      >
        {productData.products?.map((data) => {
          return (
            <SwiperSlide className="swiper-virtual" key={data?.id}>
              <div className="product-cta">
                <img
                  src={data.photo_url}
                  alt={data?.name}
                  className="product-cta-img"
                />
                <div className="product-cta-text">
                  <h6 className="marquee">{data?.name}</h6>
                  <p>$ {data?.price}</p>
                </div>
                <button
                  onClick={(e) => handleProduct(e, data)}
                  className="product-cta-btn"
                >
                  Buy Now
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ProductCta;
