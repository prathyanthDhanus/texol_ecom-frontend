import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { Customer_Path } from "../../constants/customerPaths";
import { useAuth } from "../../hooks/useAuth";
import styles from "./CustomerNavbar.module.css";

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cartItems = useAppSelector((state) => state.cart?.items || []);

  const handleLogout = () => {
    logout();
            navigate(`/auth/${Customer_Path.LOGIN}`);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to={`/home/${Customer_Path.HOME}`} className={styles.logo}>
          E-com Store
        </Link>

        <div className={styles.navLinks}>
          <Link to={`/home/${Customer_Path.HOME}`} className={styles.navLink}>
            Home
          </Link>
          <Link to={`/home/${Customer_Path.PRODUCTS}`} className={styles.navLink}>
            Products
          </Link>
        </div>

        <div className={styles.rightSection}>
          <Link to={`/home/${Customer_Path.CART}`} className={styles.cartIcon}>
            <span className={styles.cartText}>Cart</span>
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>{cartItemCount}</span>
            )}
          </Link>

          {user ? (
            <div className={styles.userSection}>
              <span className={styles.username}>Hello, {user.username}</span>
              <Link to={`/home/${Customer_Path.ORDERS}`} className={styles.navLink}>
                Orders
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authSection}>
              <Link to={`/auth/${Customer_Path.LOGIN}`} className={styles.authLink}>
                Login
              </Link>
              <Link to={`/auth/${Customer_Path.REGISTER}`} className={styles.authLink}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
