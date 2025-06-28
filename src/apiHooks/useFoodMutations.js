import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useMenuApi from "./useMenuApi";

export const useFoodMutations = (queryClient) => {
  const { createFood, updateFood, deleteFood, createVariant, updateVariant, deleteVariant } = useMenuApi();

  const handleSuccess = (message) => () => {
    toast.success(message);
    queryClient.invalidateQueries(["foods"]);
  };

  const handleError = (err) => {
    toast.error(err?.response?.data?.err || "Something went wrong");
  };

  return {
    addFoodMutation: useMutation({
      mutationFn: createFood,
      onSuccess: handleSuccess("Food added successfully"),
      onError: handleError,
    }),
    updateFoodMutation: useMutation({
      mutationFn: updateFood,
      onSuccess: handleSuccess("Food updated successfully"),
      onError: handleError,
    }),
    deleteFoodMutation: useMutation({
      mutationFn: deleteFood,
      onSuccess: handleSuccess("Food deleted successfully"),
      onError: handleError,
    }),
    addVariantMutation: useMutation({
      mutationFn: createVariant,
      onSuccess: handleSuccess("Variant added successfully"),
      onError: handleError,
    }),
    updateVariantMutation: useMutation({
      mutationFn: updateVariant,
      onSuccess: handleSuccess("Variant updated successfully"),
      onError: handleError,
    }),
    deleteVariantMutation: useMutation({
      mutationFn: deleteVariant,
      onSuccess: handleSuccess("Variant deleted successfully"),
      onError: handleError,
    }),
  };
};
