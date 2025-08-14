import React from "react";
import Pagination from "../pagination/Pagination";
import "./DataTable.css";

interface ColumnDefinition<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  isLoading?: boolean;
  emptyMessage?: string;
}

const DataTable = <T extends object>({
  data,
  columns,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  totalItems,
  isLoading = false,
  emptyMessage = "No data available",
}: DataTableProps<T>) => {
  const totalPages = Math.ceil((totalItems || data.length) / pageSize);
  const displayData = totalItems
    ? data
    : data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="data-table-container">
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    width: column.width || "auto",
                    textAlign: column.align || "left",
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="loading-cell">
                  <div className="loading-spinner"></div>
                  <span>Loading data...</span>
                </td>
              </tr>
            ) : displayData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="empty-cell">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((item, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td
                      key={`${index}-${column.key}`}
                      style={{ textAlign: column.align || "left" }}
                    >
                      {column.render
                        ? column.render(item)
                        : (item as any)[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="table-pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
