// src/components/Products/Products.jsx
import { useNavigate } from "react-router-dom";
import "./Products.scss";

const Products = ({ products, innerPage, headingText }) => {
    const navigate = useNavigate();

    return (
        <div className="products-container">
           {!innerPage && (
  <div className="sec-heading" style={{ marginTop: "-30px" }}>
    {headingText}
  </div>
)}

            <div className={`products-grid ${innerPage ? "innerPage" : ""}`}>
                {products?.data?.map((item) => {
                    const image =
                        item?.img?.[0]?.formats?.thumbnail?.url ||
                        item?.img?.[0]?.url;

                    return (
                        <div
                            key={item.id}
                            className="product-card"
                            onClick={() => navigate("/product/" + item.id)}
                        >
                            <div className="thumbnail">
                                <img
                                    src={`${process.env.REACT_APP_STRIPE_APP_DEV_URL}${image}`}
                                    alt={item?.Title || "Product"}
                                />
                            </div>
                            <div className="prod-details">
                                <span className="name">{item?.Title}</span>
                                <span className="price">&#8377;{item?.Pric}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
