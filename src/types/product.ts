interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string | Category;
  stock: number;
  images: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  category: string;
  categoryName?: string;
  stock: number;
  images?: File[];
}

export interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
