import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductReview, Routine } from "../../utils/types/Skincare";

type SkincareState = {
  products: Product[];
  routine: Routine;
};

const initialState: SkincareState = {
  products: [],
  routine: {
    morning: [],
    night: [],
  },
};

const skincareSlice = createSlice({
  name: "skincare",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      const newProduct: Product = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.products.push(newProduct);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.routine.morning = state.routine.morning.filter(
        (id) => id !== action.payload
      );
      state.routine.night = state.routine.night.filter(
        (id) => id !== action.payload
      );
    },
    addReview: (
      state,
      action: PayloadAction<{ productId: string; review: ProductReview }>
    ) => {
      const { productId, review } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.review = review;
      }
    },
    addToRoutine: (
      state,
      action: PayloadAction<{ type: "morning" | "night"; productId: string }>
    ) => {
      const { type, productId } = action.payload;
      if (!state.routine[type].includes(productId)) {
        state.routine[type].push(productId);
      }
    },
    removeFromRoutine: (
      state,
      action: PayloadAction<{ type: "morning" | "night"; productId: string }>
    ) => {
      const { type, productId } = action.payload;
      state.routine[type] = state.routine[type].filter(
        (id) => id !== productId
      );
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  addReview,
  addToRoutine,
  removeFromRoutine,
} = skincareSlice.actions;

export default skincareSlice.reducer;
