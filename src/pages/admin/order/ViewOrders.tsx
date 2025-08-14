import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { useDispatch } from "react-redux";

import DataTable from "../../../components/table/DataTable";
import { useGetOrders } from "../../../services/order";
import type { Order } from "../../../types/order";
import { setOrders } from "../../../store/slices/orderSlice";
import "./Order.css";

const ViewOrders: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: ordersData, isLoading, error } = useGetOrders(page, limit);

  useEffect(() => {
    if (ordersData?.data) {
      dispatch(setOrders(ordersData.data));
    }
  }, [ordersData, dispatch]);

  const handleViewOrder = (id: string) => {
    navigate(`/orders/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const columns = [
    {
      key: "orderId",
      header: "Order ID",
      render: (item: Order) => item._id.substring(0, 8) + "...",
      width: "15%",
    },
    {
      key: "customer",
      header: "Customer",
      render: (item: Order) => item.user?.username || "Guest",
      width: "15%",
    },
    {
      key: "products",
      header: "Products",
      render: (item: Order) => `${item.products.length} items`,
      width: "15%",
    },
    {
      key: "totalAmount",
      header: "Total",
      render: (item: Order) => `$${item.totalAmount.toFixed(2)}`,
      width: "10%",
    },
    {
      key: "status",
      header: "Status",
      render: (item: Order) => (
        <span className={`status-badge ${item.status}`}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
      width: "15%",
    },
    {
      key: "createdAt",
      header: "Date",
      render: (item: Order) => new Date(item.createdAt).toLocaleDateString(),
      width: "15%",
    },
    {
      key: "actions",
      header: "Actions",
      align: "center" as const,
      render: (item: Order) => (
        <div className="action-buttons">
          <button
            className="view-btn"
            onClick={() => handleViewOrder(item._id)}
          >
            <FiEye />
          </button>
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="view-order-container">
      <div className="order-header">
        <h2 className="order-title">Orders</h2>
      </div>

      {error && <div className="error-message">{error.message}</div>}

      <DataTable<Order>
        data={ordersData?.data || []}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No orders found"
        pageSize={limit}
        currentPage={page}
        onPageChange={handlePageChange}
        totalItems={ordersData?.total || 0}
      />

      <div className="pagination-controls">
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          disabled={isLoading}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
};

export default ViewOrders;
