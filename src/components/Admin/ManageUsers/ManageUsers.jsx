import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import { IoIosAddCircleOutline, IoIosSearch } from "react-icons/io";
import InputsModal from "../InputsModal/InputsModal";
import toast from "react-hot-toast";
import useUsersApi from "../../../apiHooks/useUsersApi";

const ManageUsers = () => {
  const [modalState, setModalState] = useState({
    status: false,
    mode: null,
    id: "",
    header: "",
  });
  const [modalInputs, setModalInputs] = useState([]);

  const [loaderId, setLoaderId] = useState(null);

  const { getUsers, createUser, deleteUser, updateUser } = useUsersApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const queryClient = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User added successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data ||"Something went wrong");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User delted successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });

  const handleSubmit = async (formData, mode, id) => {
    if (mode === "add") {
      await addUserMutation.mutateAsync(formData);
    } else if (mode === "delete") {
      await deleteUserMutation.mutateAsync(id);
    } else if (mode === "update") {
      await updateUserMutation.mutateAsync({ formData, id });
    }
  };

  if (isError) {
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || err?.response?.data || "Could not load Users."}</p>
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
        <h2 className="text-2xl font-bold mb-4 p-4 dark:text-white">Manage Users</h2>

        <button
          onClick={() => {
            setModalInputs([
              { type: "text", label: "name" },
              { type: "email", label: "email" },
              { type: "password", label: "password" },
            ]);
            setModalState({
              status: true,
              mode: "add",
              id: "",
              header: "Add User",
            });
          }}
          type="button"
          className="ml-4 mb-4  cursor-pointer text-white bg-green-600 hover:bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-3 py-2 gap-x-2 flex items-center dark:bg-green-600 dark:hover:bg-green-700">
          <IoIosAddCircleOutline className="text-xl" />
          Add Admin
        </button>

        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300 shadow-2xl ">
          <thead className="text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Login Status
              </th>
              <th scope="col" className="px-6 py-3">
                Register Confirmation
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user, index) => {
              return (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 !== 0 ? "" : "bg-gray-100 dark:bg-gray-800"
                  } border-b dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.confirmed ? "done" : "pending"}</td>

                  <td className="px-6 py-4 flex">
                    {/* Modal toggle */}
                    <button
                      onClick={() => {
                        setModalInputs([
                          {
                            type: "text",
                            label: "name",
                            defaultValue: user.name,
                          },
                          {
                            type: "email",
                            label: "email",
                            defaultValue: user.email,
                          },
                        ]);
                        setModalState({
                          status: true,
                          mode: "update",
                          id: user._id,
                          header: "Edit User",
                        });
                      }}
                      type="button"
                      className="font-medium cursor-pointer  text-blue-600 dark:text-blue-500 hover:underline">
                      Edit{" "}
                    </button>

                    <button
                      onClick={async () => {
                        setLoaderId(user._id);
                        if (window.confirm("Are you sure you want to delete this User?")) {
                          await handleSubmit({}, "delete", user._id);
                        }
                        setLoaderId(null);
                      }}
                      type="button"
                      className="ml-4  cursor-pointer font-medium text-red-600 hover:underline">
                      {loaderId === user._id ? <ImSpinner9 className="animate-spin text-xl" /> : "Delete"}{" "}
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

export default ManageUsers;
