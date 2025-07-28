import React, { useEffect, useContext } from "react";
import "./Home.scss";

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";

import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Home = () => {
    const { products, setProducts, categories, setCategories } = useContext(Context);

    useEffect(() => {
        // Fetch products
        fetchDataFromApi("/api/products?populate=*")
            .then((res) => setProducts(res))
            .catch((err) => console.error("Product fetch error:", err));

        // Fetch categories
        fetchDataFromApi("/api/categories?populate=*")
            .then((res) => setCategories(res))
            .catch((err) => console.error("Category fetch error:", err));
    }, [setProducts, setCategories]);

    return (
        <div className="home">
            {/* Banner with Slider */}
            <Banner />

            {/* Categories Section */}
            <section className="section category-section py-8 px-4 bg-gray-50">
                <div className="container mx-auto">
                    <h2 className="section-title text-2xl font-bold mb-4 text-gray-800">Shop by Category</h2>
                    <Category categories={categories} />
                </div>
            </section>

            {/* Products Section */}
            <section className="section products-section py-10 px-4">
                <div className="container mx-auto">
                  <Products headingText="Popular Products" products={products} />
                </div>
            </section>
        </div>
    );
};

export default Home;
