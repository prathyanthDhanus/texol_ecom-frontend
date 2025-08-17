import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiRefreshCw } from "react-icons/fi";
import { useDispatch } from "react-redux";

import DataTable from "../../../components/table/DataTable";
import {
  useDeleteCategory,
  useGetCategories,
  useRestoreCategory,
} from "../../../services/category";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import Button from "../../../components/buttons/Button";
import { setCategories } from "../../../store/slices/categorySlice";
import "./category.css";

interface Category {
  _id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

const ViewCategory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useGetCategories(page, limit);

  const {
    mutate: deleteCategory,
    error: deleteCategoryError,
    isPending: deleteCategoryLoading,
    isSuccess: deleteCategorySuccess,
  } = useDeleteCategory();

  const {
    mutate: restoreCategory,
    error: restoreCategoryError,
    isPending: restoreCategoryLoading,
    isSuccess: restoreCategorySuccess,
  } = useRestoreCategory();

  // Extract data and pagination info
  const categories = categoriesResponse?.data || [];
  const totalItems = categoriesResponse?.total || 0;

  useEffect(() => {
    if (deleteCategorySuccess || restoreCategorySuccess) {
      toastSuccess(
        deleteCategorySuccess 
          ? "Category deleted successfully" 
          : "Category restored successfully"
      );
      refetchCategories();
    }
    if (deleteCategoryError || restoreCategoryError) {
      toastError(
        (deleteCategoryError || restoreCategoryError)?.message || 
        (deleteCategoryError ? "Failed to delete category" : "Failed to restore category")
      );
    }
  }, [
    deleteCategorySuccess, 
    deleteCategoryError,
    restoreCategorySuccess,
    restoreCategoryError,
    refetchCategories
  ]);

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories));
    }
  }, [categories, dispatch]);

  const handleCategoryEdit = (id: string) => {
    navigate(`/admin/edit/category/${id}`);
  };

  const handleCategoryDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategory(id);
    }
  };

  const handleCategoryRestore = (id: string) => {
    if (window.confirm("Are you sure you want to restore this category?")) {
      restoreCategory({ 
        id,
        data: { isDeleted: false } 
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const columns = [
    {
      key: "name",
      header: "Category Name",
      width: "30%",
    },
    {
      key: "description",
      header: "Description",
      width: "40%",
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (item: Category) => new Date(item.createdAt).toLocaleDateString(),
      width: "15%",
    },
    {
      key: "actions",
      header: "Actions",
      align: "center" as const,
      render: (item: Category) => (
        <div className="action-buttons">
          {!item.isDeleted && (
            <button
              className="edit-btn"
              onClick={() => handleCategoryEdit(item._id)}
              disabled={deleteCategoryLoading || restoreCategoryLoading}
            >
              <FiEdit2 />
            </button>
          )}
          {item.isDeleted ? (
            <button
              className="restore-btn"
              onClick={() => handleCategoryRestore(item._id)}
              disabled={restoreCategoryLoading}
            >
              {restoreCategoryLoading ? "Restoring..." : <FiRefreshCw />}
            </button>
          ) : (
            <button
              className="delete-btn"
              onClick={() => handleCategoryDelete(item._id)}
              disabled={deleteCategoryLoading}
            >
              {deleteCategoryLoading ? "Deleting..." : <FiTrash2 />}
            </button>
          )}
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="view-category-container">
      <div className="category-button-container">
        <h2>Categories</h2>
        <div className="category-actions">
       
          <Button 
            onClick={() => navigate("/admin/add/category")}
            disabled={deleteCategoryLoading || restoreCategoryLoading}
            className="add-category-btn"
          >
            Add Category
          </Button>
        </div>
      </div>
      {errorCategories && (
        <div className="error-message">{errorCategories.message}</div>
      )}
      <DataTable<Category>
        data={categories}
        columns={columns}
        isLoading={loadingCategories || deleteCategoryLoading || restoreCategoryLoading}
        emptyMessage="No categories found"
        pageSize={limit}
        currentPage={page}
        onPageChange={handlePageChange}
        totalItems={totalItems}
      />  
      <div style={{display:"flex",justifyContent:"end"}}>
         <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // Reset to first page when changing items per page
            }}
            disabled={loadingCategories}
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

export default ViewCategory;