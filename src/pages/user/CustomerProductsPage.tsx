import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetProducts } from "../../services/product";
import { useGetCategories } from "../../services/category";
import { Customer_Path } from "../../constants/customerPaths";
import Pagination from "../../components/pagination/Pagination";
import styles from "./CustomerProductsPage.module.css";

const CustomerProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const { data: productsData, isLoading, error } = useGetProducts(currentPage, 12);
  const { data: categoriesData } = useGetCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSortChange = (sortValue: string) => {
    setSortBy(sortValue);
    setCurrentPage(1);
  };

  const filteredProducts = productsData?.products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Products</h1>
        <p className={styles.subtitle}>Discover our amazing collection</p>
      </div>

      {/* Filters and Search */}
      <div className={styles.filters}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>

        <div className={styles.filterControls}>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="">All Categories</option>
            {categoriesData?.data.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : error ? (
        <div className={styles.error}>Error loading products</div>
      ) : sortedProducts.length === 0 ? (
        <div className={styles.noProducts}>
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className={styles.productsGrid}>
            {sortedProducts.map((product) => (
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
                  <p className={styles.productDescription}>
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </p>
                  <p className={styles.productPrice}>${product.price}</p>
                  <p className={styles.productStock}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                  </p>
                  <Link
                    to={`/home/${Customer_Path.PRODUCT_DETAIL.replace(":id", product._id)}`}
                    className={styles.viewProductBtn}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {productsData && productsData.totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <Pagination
                currentPage={currentPage}
                totalPages={productsData.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerProductsPage;
