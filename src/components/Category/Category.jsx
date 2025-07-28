// src/components/Category/Category.jsx
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Products from "../Products/Products";
import "./Category.scss";

const Category = () => {
    const { id } = useParams();

    const { data, loading, error } = useFetch(
        `/api/products?populate=*&[filters][categories][id]=${id}`
    );

    if (loading) return <p>Loading category...</p>;
    if (error) return <p>Error loading category.</p>;

    const categoryTitle =
        data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title || "Category";

    return (
        <div className="category-main-content">
            <div className="layout">
                <div className="category-title">{categoryTitle}</div>
                <Products innerPage={true} products={data} />
            </div>
        </div>
    );
};

export default Category;
