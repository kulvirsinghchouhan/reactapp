import React, { useState, useContext } from "react";
import { Context } from "../../utils/context";
import { makePaymentRequest } from "../../utils/api";
import "./Checkout.scss";

const Checkout = () => {
    const { cartItems, cartSubTotal } = useContext(Context);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            data: {
                ...form,
                total: grandTotal,
                products: cartItems,
            },
        };

        try {
            const res = await makePaymentRequest.post("/api/orders", payload);
            alert("🎉 Order placed successfully!");
            console.log(res.data);
        } catch (err) {
            alert("❌ Order failed.");
            console.error(err);
        }
    };

    const shippingCharge = 40;
    const tax = Math.round(cartSubTotal * 0.18);
    const grandTotal = cartSubTotal + tax + shippingCharge;

    return (
        <div className="checkout-wrapper">
            <div className="checkout-container fade-in">
                {/* Left Section: Form */}
                <div className="checkout-form">
                    <h3>Shipping Information</h3>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                        <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Street Address" value={form.address} onChange={handleChange} required />
                        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                        <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                        <input type="text" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
                        <button className="place-order-btn" type="submit">Place Order</button>
                    </form>
                </div>

                {/* Right Section: Summary */}
                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-item">
                        <span>Subtotal</span>
                        <span>₹{cartSubTotal}</span>
                    </div>
                    <div className="summary-item">
                        <span>Tax (18%)</span>
                        <span>₹{tax}</span>
                    </div>
                    <div className="summary-item">
                        <span>Shipping</span>
                        <span>₹{shippingCharge}</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>₹{grandTotal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
