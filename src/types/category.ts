export interface CategoryData {
  _id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: CategoryData;
}

export interface CategoriesResponse {
  status: string;
  message: string;
  data: CategoryData[];
}

export interface CategoryFormValues {
  name: string;
  description: string;
}
export interface EditCategoryFormValues extends CategoryFormValues {
  isDeleted: boolean;
}
