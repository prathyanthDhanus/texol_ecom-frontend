import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { clearCart } from "../../store/slices/cartSlice";
import { useCreateOrder } from "../../services/order";
import { useGetCart, useClearCart } from "../../services/cart";
import { useQueryClient } from "@tanstack/react-query";
import { Customer_Path } from "../../constants/customerPaths";
import { useAuth } from "../../hooks/useAuth";
import styles from "./CustomerCheckoutPage.module.css";

interface CheckoutFormData {
  shippingAddress: string;
  paymentMethod: string;
}

const CustomerCheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { data: cartData, isLoading: cartLoading, error: cartError } = useGetCart();
  const createOrderMutation = useCreateOrder();
  const clearCartMutation = useClearCart();

  const items = cartData?.items || [];
  const total = cartData?.total || 0;

  const [formData, setFormData] = useState<CheckoutFormData>({
    shippingAddress: "",
    paymentMethod: "cash",
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  // Handle navigation in useEffect to avoid render-time navigation
  useEffect(() => {
    if (!user) {
      navigate(`/auth/${Customer_Path.LOGIN}`);
      return;
    }

    if (items.length === 0) {
      navigate(`/home/${Customer_Path.CART}`);
      return;
    }
  }, [user, items.length, navigate]);

  // Show loading state
  if (cartLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading checkout...</p>
      </div>
    );
  }

  // Show error state
  if (cartError) {
    return (
      <div className={styles.error}>
        <p>Error loading cart: {cartError.message}</p>
      </div>
    );
  }

  // Show loading or return null while redirecting
  if (!user || items.length === 0) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof CheckoutFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const orderData = {
      products: items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      shippingAddress: formData.shippingAddress,
      paymentMethod: formData.paymentMethod === "cash" ? "cash_on_delivery" : 
                    formData.paymentMethod === "card" ? "credit_card" : 
                    formData.paymentMethod === "bank" ? "bank_transfer" : "cash_on_delivery"
    };

    createOrderMutation.mutate(orderData, {
      onSuccess: () => {
        // Clear cart after successful order
        clearCartMutation.mutate(undefined, {
          onSuccess: () => {
            // Also clear Redux state
            dispatch(clearCart());
            
            // Navigate to orders page
            navigate(`/home/${Customer_Path.ORDERS}`);
          },
          onError: (error) => {
            console.error("Error clearing cart:", error);
            // Still navigate to orders page even if cart clearing fails
            navigate(`/home/${Customer_Path.ORDERS}`);
          }
        });
      },
      onError: (error: any) => {
        console.error("Error creating order:", error);
        // Show error message to user
        const errorMessage = error?.response?.data?.message || 
                           error?.response?.data?.errors?.join(", ") || 
                           "Failed to create order. Please try again.";
        alert(errorMessage); // You can replace this with a proper toast notification
      }
    });
  };

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.checkoutHeader}>
        <h1 className={styles.checkoutTitle}>Checkout</h1>
        <p className={styles.checkoutSubtitle}>Complete your order</p>
      </div>

      <div className={styles.checkoutContainer}>
        {/* Checkout Form */}
        <div className={styles.checkoutForm}>
          <h2 className={styles.formTitle}>Shipping Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="shippingAddress" className={styles.label}>
                Shipping Address *
              </label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleInputChange}
                className={`${styles.textarea} ${errors.shippingAddress ? styles.error : ""}`}
                placeholder="Enter your complete shipping address"
                rows={3}
              />
              {errors.shippingAddress && (
                <span className={styles.errorMessage}>{errors.shippingAddress}</span>
              )}
            </div>



            <div className={styles.formGroup}>
              <label htmlFor="paymentMethod" className={styles.label}>
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className={styles.select}
              >
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={createOrderMutation.isPending || clearCartMutation.isPending}
            >
              {createOrderMutation.isPending || clearCartMutation.isPending ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.orderItems}>
            {items.map((item) => (
              <div key={item._id} className={styles.orderItem}>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.product.name}</h4>
                  <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                </div>
                <div className={styles.itemPrice}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.customerInfo}>
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCheckoutPage;
