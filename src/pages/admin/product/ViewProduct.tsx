import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { useDispatch } from "react-redux";

import DataTable from "../../../components/table/DataTable";
import { useDeleteProduct, useGetProducts, useRestoreProduct } from "../../../services/product";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import Button from "../../../components/buttons/Button";
import { setProducts } from "../../../store/slices/productSlice";
import "./Product.css";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  isDeleted: boolean;
  createdAt: string;
}

const ViewProducts: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: productsResponse,
    isLoading: loadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetProducts(page, limit);

  const {
    mutate: deleteProduct,
    error: deleteError,
    isPending: deleteLoading,
    isSuccess: deleteSuccess,
  } = useDeleteProduct();

  const {
    mutate: restoreProduct,
    error: restoreError,
    isPending: restoreLoading,
    isSuccess: restoreSuccess,
  } = useRestoreProduct();

  // Extract data and pagination info
  const products = productsResponse?.products || [];
  const totalItems = productsResponse?.total || 0;
  const totalPages = productsResponse?.totalPages || 1;

  useEffect(() => {
    if (deleteSuccess || restoreSuccess) {
      const message = deleteSuccess ? "Product deleted successfully" : "Product restored successfully";
      toastSuccess(message);
      refetchProducts();
    }
    if (deleteError || restoreError) {
      const error = deleteError || restoreError;
      toastError(
        (error as AxiosError<{ message: string }>)?.response?.data?.message || 
        "Operation failed"
      );
    }
  }, [deleteSuccess, restoreSuccess, deleteError, restoreError, refetchProducts]);

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  const handleProductEdit = (id: string) => {
    navigate(`/edit/product/${id}`);
  };

  const handleProductDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleProductRestore = (id: string) => {
    if (window.confirm("Are you sure you want to restore this product?")) {
      restoreProduct(id);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const columns = [
    {
      key: "name",
      header: "Product Name",
      width: "20%",
    },
    {
      key: "description",
      header: "Description",
      width: "30%",
      render: (item: Product) => (
        <div className="truncate-text">{item.description}</div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (item: Product) => `$${item.price.toFixed(2)}`,
      width: "10%",
    },
    {
      key: "stock",
      header: "Stock",
      width: "10%",
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (item: Product) => new Date(item.createdAt).toLocaleDateString(),
      width: "15%",
    },
    {
      key: "actions",
      header: "Actions",
      align: "center" as const,
      render: (item: Product) => (
        <div className="action-buttons">
          {item.isDeleted ? (
            <button
              className="restore-btn"
              onClick={() => handleProductRestore(item._id)}
              disabled={restoreLoading}
            >
              <FiRefreshCw />
              {restoreLoading ? " Restoring..." : " Restore"}
            </button>
          ) : (
            <>
              <button
                className="edit-btn"
                onClick={() => handleProductEdit(item._id)}
                disabled={deleteLoading}
              >
                <FiEdit2 />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleProductDelete(item._id)}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : <FiTrash2 />}
              </button>
            </>
          )}
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="view-product-container">
      <div className="product-button-container">
        <h2>Products</h2>
        <div className="product-actions">
          <Button 
            onClick={() => navigate("/add/product")}
            disabled={deleteLoading || restoreLoading}
            className="add-product-btn"
          >
            Add Product
          </Button>
        </div>
      </div>
      {errorProducts && (
        <div className="error-message">{errorProducts.message}</div>
      )}
      <DataTable<Product>
        data={products}
        columns={columns}
        isLoading={loadingProducts || deleteLoading || restoreLoading}
        emptyMessage="No products found"
        pageSize={limit}
        currentPage={page}
        onPageChange={handlePageChange}
        totalItems={totalItems}
      />  
      <div style={{ display: "flex", justifyContent: "end" }}>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          disabled={loadingProducts}
          className="limit-selector"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default ViewProducts;