import * as CartCss from "./Cart.css?raw";
import { productCta } from "../../../types/common";
import { limitString } from "../../../utils/helperfunction";
interface cartProps {
  product: productCta | null;
  onClose: () => void;
}

const Cart = ({ product, onClose }: cartProps) => {
  return (
    <div key={product?.productId}>
      <style type="text/css">{CartCss.default}</style>
      <div className="cart-modal">
        <div className="cart-content">
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
          <div className="cart-image-slider">
            <img
              src={product?.photo_url}
              alt={product?.name}
              className="product-image"
            />
          </div>
          <div className="product-info">
            <h2 className="product-title">{product?.name}</h2>
            <p className="product-price"> $ {product?.price}</p>
            <div className="product-description">
              <h3
                style={{
                  marginBottom: "10px",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#000",
                }}
              >
                Description :
              </h3>
              <p className="prd-description">
                {limitString(product?.description || "", 150)}
              </p>
            </div>

            <button className="add-to-cart">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
