import { useNavigate } from "react-router-dom";
import "./Category.scss";

const Category = ({ categories }) => {
   // console.log(categories);
    const navigate = useNavigate();

    return (
        <div className="shop-by-category">
            <div className="categories">
                {categories?.data?.map((item) => (
                    <div
                        key={item.id}
                        className="category"
                        onClick={() => navigate(`/category/${item.id}`)}
                    >
                        {/* {item.images.map((image) => ( */}
                             <img
                            src= {
                                process.env.REACT_APP_STRIPE_APP_DEV_URL + '' +
                                item.images.formats.thumbnail.url
                            }
                            alt={item?.images?.name}
                        />
                         {/* ))} */}
                       
                        <b>{item.name}</b>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
