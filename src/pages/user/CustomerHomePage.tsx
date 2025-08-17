import { Link } from "react-router-dom";
import { useGetProducts } from "../../services/product";
import { Customer_Path } from "../../constants/customerPaths";
import styles from "./CustomerHomePage.module.css";

const CustomerHomePage = () => {
  const { data: productsData, isLoading, error } = useGetProducts(1, 8);

  const featuredProducts = productsData?.products.slice(0, 4) || [];

  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to E-com Store</h1>
          <p className={styles.heroSubtitle}>
            Discover amazing products at great prices
          </p>
          <Link to={Customer_Path.PRODUCTS} className={styles.ctaButton}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <Link to={Customer_Path.PRODUCTS} className={styles.viewAllLink}>
            View All Products
          </Link>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading featured products...</div>
        ) : error ? (
          <div className={styles.error}>Error loading products</div>
        ) : (
          <div className={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <div key={product._id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img
                    src={product.images[0] || "/placeholder-image.jpg"}
                    alt={product.name}
                    className={styles.image}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${product.price}</p>
                  <Link
                    to={`/home/${Customer_Path.PRODUCT_DETAIL.replace(":id", product._id)}`}
                    className={styles.viewProductBtn}
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🚚</div>
            <h3 className={styles.featureTitle}>Fast Delivery</h3>
            <p className={styles.featureDescription}>
              Quick and reliable shipping to your doorstep
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💰</div>
            <h3 className={styles.featureTitle}>Best Prices</h3>
            <p className={styles.featureDescription}>
              Competitive prices on all our products
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3 className={styles.featureTitle}>Secure Shopping</h3>
            <p className={styles.featureDescription}>
              Safe and secure payment processing
            </p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📞</div>
            <h3 className={styles.featureTitle}>24/7 Support</h3>
            <p className={styles.featureDescription}>
              Round the clock customer support
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerHomePage;
