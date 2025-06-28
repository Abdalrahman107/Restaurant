import React, { useState } from "react";
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import InputsModal from "../InputsModal/InputsModal";
import toast from "react-hot-toast";
import useTablesApi from "../../../apiHooks/useTablesApi";
import useBranchApi from "../../../apiHooks/useBranchApi";

const AdminTables = () => {
  const [modalState, setModalState] = useState({ status: false, mode: null, id: "", branchId: "", header: "" });
  const [modalInputs, setModalInputs] = useState([]);

  const [loaderId, setLoaderId] = useState(null);

  const { getTables, deleteTable, updateTable, createTable } = useTablesApi();
  const { getBranches } = useBranchApi();

  const { data: branchesData } = useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const queryClient = useQueryClient();

  const addTableMutation = useMutation({
    mutationFn: createTable,
    onSuccess: () => {
      toast.success("Table added successfully");
      queryClient.invalidateQueries(["tables"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data || "Something went wrong");
    },
  });

  const deleteTableMutation = useMutation({
    mutationFn: deleteTable,
    onSuccess: () => {
      toast.success("Table delted successfully");
      queryClient.invalidateQueries(["tables"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data || "Something went wrong");
    },
  });
  const updateTableMutation = useMutation({
    mutationFn: updateTable,
    onSuccess: () => {
      toast.success("Table updated successfully");
      queryClient.invalidateQueries(["tables"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data || "Something went wrong");
    },
  });

  const handleSubmit = async (formData, mode, id, branchId) => {
    if (mode === "add") {
      const selectedBranch = branchesData?.branches?.find((branch) => branch._id === formData.branch);
      const updatedFormData = {
        ...formData,
        branch: selectedBranch._id,
      };
      await addTableMutation.mutateAsync(updatedFormData);
    } else if (mode === "delete") {
      await deleteTableMutation.mutateAsync(id);
    } else if (mode === "update") {
      await updateTableMutation.mutateAsync({ formData, id, branchId });
    }
  };

  if (isError) {
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || err?.response?.data || "Could not load Tables."}</p>
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
        <h2 className="text-2xl font-bold mb-4 p-4 dark:text-white">Tables</h2>

        <button
          onClick={() => {
            const branchOptions =
              branchesData?.branches?.map((branch) => ({
                label: branch.name,
                value: branch._id,
              })) || [];
            setModalInputs([
              { type: "number", label: "number", min: 1 },
              { type: "text", label: "capacity", min: 1 },
              {
                type: "select",
                label: "Branch",
                options: branchOptions,
              },
            ]);
            setModalState({ status: true, mode: "add", id: "", branchId: "", header: "Add Table" });
          }}
          type="button"
          className="ml-4 mb-4  cursor-pointer text-white bg-green-600 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 gap-x-2 flex items-center dark:bg-green-600 dark:hover:bg-green-700">
          <IoIosAddCircleOutline className="text-xl" />
          Add Table
        </button>

        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300 shadow-2xl ">
          <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Capcity
              </th>
              <th scope="col" className="px-6 py-3">
                Branch
              </th>
              <th scope="col" className="px-6 py-3">
                Reservation Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.tables?.map((table, index) => {
              return (
                <tr
                  key={table._id}
                  className={`${
                    index % 2 !== 0 ? "" : "bg-gray-100 dark:bg-gray-800"
                  } border-b dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                  <td className="px-6 py-4">{table.number}</td>
                  <td className="px-6 py-4">{table.capacity} persons</td>
                  <td className="px-6 py-4">{table.branchId.name}</td>
                  <td className="px-6 py-4">{table.reserved ? "active" : "not-active"}</td>

                  <td className="px-6 py-4 flex ">
                    {/* Modal toggle */}
                    <button
                      onClick={() => {
                        setModalInputs([
                          { type: "number", label: "number", min: 1, defaultValue: table.number },
                          { type: "text", label: "capacity", min: 1, defaultValue: table.capacity },
                        ]);
                        setModalState({
                          status: true,
                          mode: "update",
                          id: table._id,
                          branchId: table.branchId._id,
                          header: "Edit Table",
                        });
                      }}
                      type="button"
                      className="font-medium cursor-pointer  text-blue-600 dark:text-blue-500 hover:underline">
                      Edit{" "}
                    </button>

                    <button
                      onClick={async () => {
                        setLoaderId(table._id);
                        if (window.confirm("Are you sure you want to delete this Branch?")) {
                          await handleSubmit({}, "delete", table._id);
                        }
                        setLoaderId(null);
                      }}
                      type="button"
                      className="ml-4  cursor-pointer font-medium text-red-600 hover:underline">
                      {loaderId === table._id ? <ImSpinner9 className="animate-spin text-xl" /> : "Delete"}{" "}
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
          closeModal={() => setModalState({ status: false, mode: null, id: "", branchId: "", header: "" })}
          inputs={modalInputs}
          onSubmit={(formData) => handleSubmit(formData, modalState.mode, modalState.id, modalState.branchId)}
        />
      </div>
    </div>
  );
};

export default AdminTables;
