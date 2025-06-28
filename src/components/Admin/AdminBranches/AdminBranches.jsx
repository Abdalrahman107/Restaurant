import { useState } from "react";
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import InputsModal from "../InputsModal/InputsModal";
import toast from "react-hot-toast";
import useBranchApi from "../../../apiHooks/useBranchApi";

const AdminBranches = () => {
  const [modalState, setModalState] = useState({ status: false, mode: null, id: "", header: "" });
  const [modalInputs, setModalInputs] = useState([]);

  const [loaderId, setLoaderId] = useState(null);

  const { getBranches, deleteBranch, updateBranch, createBranch } = useBranchApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });

  const queryClient = useQueryClient();

  const addBranchMutation = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      toast.success("Branch added successfully");
      queryClient.invalidateQueries(["branches"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data ||"Something went wrong");
    },
  });

  const deleteBranchMutation = useMutation({
    mutationFn: deleteBranch,
    onSuccess: () => {
      toast.success("Branch delted successfully");
      queryClient.invalidateQueries(["branches"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data ||"Something went wrong");
    },
  });
  const updateBranchMutation = useMutation({
    mutationFn: updateBranch,
    onSuccess: () => {
      toast.success("Branch updated successfully");
      queryClient.invalidateQueries(["branches"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data ||"Something went wrong");
    },
  });

  const handleSubmit = async (formData, mode, id) => {
    if (mode === "add") {
      await addBranchMutation.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        image: formData.image,
      });
    } else if (mode === "delete") {
      await deleteBranchMutation.mutateAsync({ id });
    } else if (mode === "update") {
      await updateBranchMutation.mutateAsync({
        id,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        image: formData.image,
      });
    }
  };

  if (isError) {
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || err?.response?.data || "Could not load Branches."}</p>
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
        <h2 className="text-2xl font-bold mb-4 p-4 dark:text-white">Branches</h2>

        <button
          onClick={() => {
            setModalInputs([
              { type: "text", label: "Name" },
              { type: "text", label: "phone" },
              { type: "text", label: "address" },
              { type: "file", label: "Image" },
            ]);
            setModalState({ status: true, mode: "add", id: "", header: "Add Branch" });
          }}
          type="button"
          className="ml-4 mb-4  cursor-pointer text-white bg-green-600 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 gap-x-2 flex items-center dark:bg-green-600 dark:hover:bg-green-700">
          <IoIosAddCircleOutline className="text-xl" />
          Add Branch
        </button>

        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300 shadow-2xl ">
          <thead className="sticky top-0 text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.branches?.map((branch, index) => {
              return (
                <tr
                  key={branch._id}
                  className={`${
                    index % 2 !== 0 ? "" : "bg-gray-100 dark:bg-gray-800"
                  } border-b dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                  <td className="px-6 py-4">{branch.name}</td>
                  <td className="px-6 py-4">{branch.phone}</td>
                  <td className="px-6 py-4">{branch.address}</td>

                  <td className="px-6 py-4 flex">
                    {/* Modal toggle */}
                    <button
                      onClick={() => {
                        setModalInputs([
                          { type: "text", label: "Name", defaultValue: branch.name },
                          { type: "text", label: "phone", defaultValue: branch.phone },
                          { type: "text", label: "address", defaultValue: branch.address },
                          { type: "file", label: "Image" },
                        ]);
                        setModalState({ status: true, mode: "update", id: branch._id, header: "Edit Branch" });
                      }}
                      type="button"
                      className="font-medium cursor-pointer  text-blue-600 dark:text-blue-500 hover:underline">
                      Edit{" "}
                    </button>

                    <button
                      onClick={async () => {
                        setLoaderId(branch._id);
                        if (window.confirm("Are you sure you want to delete this Branch?")) {
                          await handleSubmit({}, "delete", branch._id);
                        }
                        setLoaderId(null);
                      }}
                      type="button"
                      className="ml-4  cursor-pointer font-medium text-red-600 hover:underline">
                      {loaderId === branch._id ? <ImSpinner9 className="animate-spin text-xl" /> : "Delete"}{" "}
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

export default AdminBranches;
