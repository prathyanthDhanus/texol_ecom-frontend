import { Link } from "react-router-dom";
import { useGetCart, useUpdateCartItem, useRemoveFromCart } from "../../services/cart";
import { Customer_Path } from "../../constants/customerPaths";
import styles from "./CustomerCartPage.module.css";

const CustomerCartPage = () => {
  const { data: cartData, isLoading, error } = useGetCart();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();

  const handleRemoveItem = (itemId: string) => {
    removeFromCart.mutate(itemId);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateCartItem.mutate({ itemId, quantity: newQuantity });
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading cart: {error.message}</p>
      </div>
    );
  }

  const items = cartData?.items || [];
  const total = cartData?.total || 0;

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyCartContent}>
          <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
          <p className={styles.emptyCartMessage}>
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to={`/home/${Customer_Path.PRODUCTS}`} className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>Shopping Cart</h1>
        <p className={styles.cartSubtitle}>
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className={styles.cartContainer}>
        {/* Cart Items */}
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img
                  src={item.product.images[0] || "/placeholder-image.jpg"}
                  alt={item.product.name}
                  className={styles.image}
                />
              </div>

              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.product.name}</h3>
                <p className={styles.itemPrice}>${item.product.price}</p>
                <div className={styles.stockStatus}>
                  <span className={`${styles.status} ${styles[item.stockStatus]}`}>
                    {item.stockStatus === 'in-stock' ? 'In Stock' : 
                     item.stockStatus === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className={styles.itemQuantity}>
                <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
                <div className={styles.quantityControls}>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1 || item.stockStatus === 'out-of-stock'}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id={`quantity-${item._id}`}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 1)}
                    min="1"
                    max={item.product.stock}
                    className={styles.quantityInput}
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock || item.stockStatus === 'out-of-stock'}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.itemTotal}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalAmount}>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>

              <button
                onClick={() => handleRemoveItem(item._id)}
                className={styles.removeBtn}
                title="Remove item"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className={styles.cartSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryItem}>
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryItem}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className={styles.summaryActions}>
            <Link to={`/home/${Customer_Path.PRODUCTS}`} className={styles.continueShoppingBtn}>
              Continue Shopping
            </Link>
            <Link to={`/home/${Customer_Path.CHECKOUT}`} className={styles.checkoutBtn}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCartPage;
