import { useState } from "react";
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import InputsModal from "../InputsModal/InputsModal";
import toast from "react-hot-toast";
import useMenuApi from "../../../apiHooks/useMenuApi";

const AadminCategories = () => {
  const [modalState, setModalState] = useState({ status: false, mode: null, id: "", header: "" });
  const [modalInputs, setModalInputs] = useState([]);

  const [loaderId, setLoaderId] = useState(null);

  const { updateCategory, deleteCategory, createCategory, getFoodCategories } = useMenuApi();

  const queryClient = useQueryClient();

  const addCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Category added successfully");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category delted successfully");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });
  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });

  const handleSubmit = async (formData, mode, id) => {
    if (mode === "add") {
      await addCategoryMutation.mutateAsync({ name: formData.name, image: formData.image });
    } else if (mode === "delete") {
      await deleteCategoryMutation.mutateAsync({ id });
    } else if (mode === "update") {
      await updateCategoryMutation.mutateAsync({ id, name: formData.name, image: formData.image });
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getFoodCategories,
  });

  if (isError) {
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load Categories."}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-6">
        <ImSpinner9 className="animate-spin text-4xl main-color mx-auto" />
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900">
      <div className=" relative max-w-full">
        <h2 className="text-2xl font-bold mb-4 p-4 dark:text-white">Categories</h2>
        
          <button
            onClick={() => {
              setModalInputs([
                { type: "text", label: "Name" },
                { type: "file", label: "Image" },
              ]);
              setModalState({ status: true, mode: "add", id: "", header: "Add Category" });
            }}
            type="button"
            className="ml-4 mb-4 cursor-pointer text-white bg-green-600 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 gap-x-2 flex items-center dark:bg-green-600 dark:hover:bg-green-700">
            <IoIosAddCircleOutline className="text-xl" />
            Add Category
          </button>


          <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300 shadow-2xl ">
            <thead className="sticky top-0 text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.categories?.map((category, index) => {
                return (
                  <tr
                    key={category._id}
                    className={`${
                      index % 2 !== 0 ? "" : "bg-gray-100 dark:bg-gray-800"
                    } border-b dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                    <td className="px-6 py-4">{category.name}</td>

                    <td className="px-6 py-4 flex">
                      {/* Modal toggle */}
                      <button
                        onClick={() => {
                          setModalInputs([
                            { type: "text", label: "Name", defaultValue: category.name },
                            { type: "file", label: "Image" },
                          ]);
                          setModalState({ status: true, mode: "update", id: category._id, header: "Edit Category" });
                        }}
                        type="button"
                        className="font-medium cursor-pointer  text-blue-600 dark:text-blue-500 hover:underline">
                        Edit{" "}
                      </button>

                      <button
                        onClick={async () => {
                          setLoaderId(category._id);
                          if (window.confirm("Are you sure you want to delete this category?")) {
                            await handleSubmit( {}, "delete", category._id);
                          }
                          setLoaderId(null);
                        }}
                        type="button"
                        className="ml-4  cursor-pointer font-medium text-red-600 hover:underline">
                        {loaderId === category._id ? <ImSpinner9 className="animate-spin text-xl" /> : "Delete"}{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <InputsModal
            header={modalState.header}
            isModalOpen={modalState.status}
            closeModal={() => setModalState({ status: false, mode: null, id: "", header: "" })}
            inputs={modalInputs}
            onSubmit={(formData) => handleSubmit(formData, modalState.mode, modalState.id)}
          />

      </div>
    </div>
  );
};

export default AadminCategories;
