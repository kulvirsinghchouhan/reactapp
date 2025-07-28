// src/components/Products/Product.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({id, data }) => {
      
   // console.log(data);

    const navigate = useNavigate();
    const imageUrl = data?.image?.data?.[0]?.attributes?.url;
 
    return (
        <div
            className="product-card"
            onClick={() => navigate("/product/" + id)}
        >
             {data.map((item)=> {
                <>
                 <div className="thumbnail">
                
                {data.img.map((image)=> {
                   <img
                        src={process.env.REACT_APP_STRAPI_URL + image.formats.thumbnail.url}
                        alt={data.Title}
                    />
                
                    // <div className="no-image">No Image</div>
                })}
                     
                
                 
            </div>

            <div className="prod-details">
                <span className="name">{item?.Title || "Untitled Product"}</span>
                <span className="price">&#8377;{item?.Price || "N/A"}</span>
            </div>
            </>
             }
            )}
        </div>


    );
};

export default Product;
