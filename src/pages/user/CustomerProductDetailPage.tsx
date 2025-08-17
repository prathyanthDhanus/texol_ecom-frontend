import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAddToCart } from "../../services/cart";
import { useGetProductById } from "../../services/product";
import { Customer_Path } from "../../constants/customerPaths";
import styles from "./CustomerProductDetailPage.module.css";

const CustomerProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useGetProductById(id || "");

  const addToCart = useAddToCart();

  const handleAddToCart = () => {
    if (product && id) {
      addToCart.mutate(
        { productId: id, quantity },
        {
          onSuccess: () => {
            console.log("Successfully added to cart");
            navigate(`/home/${Customer_Path.CART}`);
          },
          onError: (error) => {
            console.error("Failed to add to cart:", error);
          },
        }
      );
    } else {
      console.error("Cannot add to cart: missing product or id", { product, id });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  if (error || !product) {
    return <div className={styles.error}>Product not found</div>;
  }

  return (
    <div className={styles.productDetailPage}>
      <div className={styles.productContainer}>
        {/* Product Images */}
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <img
              src={product.images && product.images[selectedImage] ? product.images[selectedImage] : "/placeholder-image.jpg"}
              alt={product.name}
              className={styles.mainImageImg}
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnailImages}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.selectedThumbnail : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          
          <div className={styles.productPrice}>
            <span className={styles.price}>${product.price}</span>
          </div>

          <div className={styles.productStock}>
            <span className={`${styles.stockStatus} ${
              product.stock > 0 ? styles.inStock : styles.outOfStock
            }`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          <div className={styles.productDescription}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.stock > 0 && (
            <div className={styles.addToCartSection}>
              <div className={styles.quantitySelector}>
                <label htmlFor="quantity">Quantity:</label>
                <div className={styles.quantityControls}>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className={styles.quantityBtn}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max={product.stock}
                    className={styles.quantityInput}
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className={styles.quantityBtn}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={styles.addToCartBtn}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
          )}

          <div className={styles.productMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category:</span>
              <span className={styles.metaValue}>
                {typeof product.category === 'object' ? product.category.name : product.category}
              </span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Product ID:</span>
              <span className={styles.metaValue}>{product._id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProductDetailPage;
