import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useMenuApi from "../../../apiHooks/useMenuApi";
import InputsModal from "../InputsModal/InputsModal";
import AdminFoodTable from "./AdminFoodTable";
import { useFoodMutations } from "../../../apiHooks/useFoodMutations";


const AdminFoods = () => {
  const [modalState, setModalState] = useState({ status: false, mode: null, id:"", header:"", variantId: "" });
  const [modalInputs, setModalInputs] = useState([]);
  const [loaderId, setLoaderId] = useState(null);

  const { getAllFoods, getFoodCategories } = useMenuApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getAllFoods,
  });

  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: getFoodCategories,
  });

  const queryClient = useQueryClient();
  const mutations = useFoodMutations(queryClient);

  const handleSubmit = async (formData, mode, id, variantId) => {
    try {
      if (mode === "add") {
        const selectedCategory = categoryData?.categories?.find((cat) => cat._id === formData.category);
        const updatedFormdata = {
          ...formData,
          categoryId: selectedCategory?._id,
          category: selectedCategory?.name,
        };
        await mutations.addFoodMutation.mutateAsync(updatedFormdata);
      } else if (mode === "delete") {
        await mutations.deleteFoodMutation.mutateAsync(id);
      } else if (mode === "update") {
        await mutations.updateFoodMutation.mutateAsync({ ...formData, foodId: id });
      } else if (mode === "Add Variant") {
        await mutations.addVariantMutation.mutateAsync({ ...formData, foodId: id });
      } else if (mode === "Update Variant") {
        await mutations.updateVariantMutation.mutateAsync({ ...formData, foodId: id, variantId });
      } else if (mode === "Delete Variant") {
        await mutations.deleteVariantMutation.mutateAsync({ foodId: id, variantId });
      }
      setModalState({ status: false, mode: null, id: "", header: "", variantId: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const groupedFoods = data?.foods?.reduce((acc, food) => {
    const key = food._id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(food);
    return acc;
  }, {});

  if (isError) return <div className="py-6 text-center text-red-400">{ error?.response?.data?.err || err?.response?.data || "Could not load Foods."}</div>;

  if (isLoading)
    return (
      <div className="py-6">
        <ImSpinner9 className="animate-spin text-4xl main-color mx-auto" />
      </div>
    );

  return (
    <div className="dark:bg-gray-900">
      <div className="relative  max-w-full">
        <h2 className="text-2xl font-bold mb-4 p-4 dark:text-white">Foods</h2>
        <AdminFoodTable
          foods={groupedFoods}
          categories={categoryData?.categories}
          setModalState={setModalState}
          setModalInputs={setModalInputs}
          loaderId={loaderId}
          setLoaderId={setLoaderId}
          onSubmit={handleSubmit}
        />
        <InputsModal
          header={modalState.header}
          isModalOpen={modalState.status}
          closeModal={() => setModalState({ status: false, mode: null, id: "", header: "", variantId: "" })}
          inputs={modalInputs}
          onSubmit={(formData) => handleSubmit(formData, modalState.mode, modalState.id, modalState.variantId)}
        />
      </div>
    </div>
  );
};

export default AdminFoods;
