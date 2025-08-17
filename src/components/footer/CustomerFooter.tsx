import styles from "./CustomerFooter.module.css";

const CustomerFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.title}>Texol Store</h3>
            <p className={styles.description}>
              Your one-stop shop for quality products at great prices.
            </p>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Quick Links</h4>
            <ul className={styles.links}>
              <li><a href="/" className={styles.link}>Home</a></li>
              <li><a href="/products" className={styles.link}>Products</a></li>
              <li><a href="/cart" className={styles.link}>Cart</a></li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4 className={styles.subtitle}>Customer Service</h4>
            <ul className={styles.links}>
              <li><a href="/orders" className={styles.link}>Order History</a></li>
              <li><a href="/contact" className={styles.link}>Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2024 E-com Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;
