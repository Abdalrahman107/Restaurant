import { IoIosAddCircleOutline } from "react-icons/io";
import { ImSpinner9 } from "react-icons/im";

const AdminFoodTable = ({ foods, categories, setModalState, setModalInputs, loaderId, setLoaderId, onSubmit }) => {
  const categoryOptions = categories?.map((cat) => ({ label: cat.name, value: cat._id })) || [];

  return (
    <>
      <button
        onClick={() => {
          setModalInputs([
            { type: "text", label: "Title" },
            { type: "textarea", label: "Description" },
            { type: "select", label: "Category", options: categoryOptions },
            { type: "number", label: "Discount", min: 0, max: 100 },
            {
              type: "select",
              label: "Variant Type",
              options: [
                { label: "size", value: "size" },
                { label: "quantity", value: "quantity" },
                { label: "extra", value: "extra" },
              ],
            },
            { type: "text", label: "Variant Label" },
            { type: "number", label: "Variant Price", min: 1 },
            { type: "file", label: "Image" },
          ]);
          setModalState({ status: true, mode: "add", id: "", header: "Add Food", variantId: "" });
        }}
        type="button"
        className="ml-4 mb-4 cursor-pointer text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm px-3 py-2 gap-x-2 flex items-center dark:bg-green-600 dark:hover:bg-green-700">
        <IoIosAddCircleOutline className="text-xl" />
        Add Food
      </button>

      <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300 shadow-2xl">
        <thead className="sticky top-0 text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Variation Type</th>
            <th className="px-6 py-3">Variation Label</th>
            <th className="px-6 py-3">Variation Price</th>
            <th className="px-6 py-3">Variation SubPrice</th>
            <th className="px-6 py-3">Variants Actions</th>
            <th className="px-6 py-3">Food Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(foods || {}).map(([, groupFoods], index1) =>
            groupFoods.map((food, index) => (
              <tr
                key={food.variation._id}
                className={`${
                  index1 % 2 !== 0 ? "" : "bg-gray-100 dark:bg-gray-800"
                } border-b dark:border-gray-700 border-gray-200`}>
                {index === 0 && (
                  <>
                    <td className="px-6 py-4" rowSpan={groupFoods.length}>
                      {food.title}
                    </td>
                    <td className="px-6 py-4" rowSpan={groupFoods.length}>
                      {food.categoryName}
                    </td>
                    <td className="px-6 py-4" rowSpan={groupFoods.length}>
                      {food.description.split(" ").slice(0, 2).join(" ")}...
                    </td>
                  </>
                )}
                <td className="px-6 py-4">{food.variation?.type}</td>
                <td className="px-6 py-4">{food.variation?.label}</td>
                <td className="px-6 py-4">{food.variation?.price.toFixed(2)}</td>
                <td className="px-6 py-4">{food.variation?.subprice.toFixed(2)}</td>
                <td className="px-6 py-4 flex">
                  <button
                    onClick={() => {
                      setModalInputs([
                        {
                          type: "select",
                          label: "Type",
                          options: [
                            { label: "size", value: "size" },
                            { label: "quantity", value: "quantity" },
                            { label: "extra", value: "extra" },
                          ],
                        },
                        { type: "text", label: "label", defaultValue: food.variation.label },
                        { type: "number", label: "price", min: 1, defaultValue: food.variation.price },
                      ]);
                      setModalState({
                        status: true,
                        mode: "Update Variant",
                        id: food._id,
                        header: "Edit Variant",
                        variantId: food.variation._id,
                      });
                    }}
                    className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      setLoaderId(food.variation._id);
                      if (window.confirm("Are you sure you want to delete this Variant?")) {
                        await onSubmit({}, "Delete Variant", food._id, food.variation._id);
                      }
                      setLoaderId(null);
                    }}
                    disabled={groupFoods.length <= 1}
                    className={`${
                      groupFoods.length <= 1 ? "text-gray-400" : "text-red-600 hover:underline"
                    } ml-4 cursor-pointer font-medium`}>
                    {loaderId === food.variation._id ? <ImSpinner9 className="animate-spin text-xl" /> : "Delete"}
                  </button>
                </td>
                {index === 0 && (
                  <td className="px-6 py-4 text-nowrap" rowSpan={groupFoods.length}>
                    <button
                      onClick={() => {
                        setModalInputs([
                          {
                            type: "select",
                            label: "Type",
                            options: [
                              { label: "size", value: "size" },
                              { label: "quantity", value: "quantity" },
                              { label: "extra", value: "extra" },
                            ],
                          },
                          { type: "text", label: "Label" },
                          { type: "number", label: "Price", min: 1 },
                        ]);
                        setModalState({
                          status: true,
                          mode: "Add Variant",
                          id: food._id,
                          header: "Add Variant",
                          variantId: "",
                        });
                      }}
                      className="mr-4 font-medium cursor-pointer text-green-600 hover:underline">
                      Add Variant
                    </button>
                    <button
                      onClick={() => {
                        setModalInputs([
                          { type: "text", label: "Title", defaultValue: food.title },
                          { type: "textarea", label: "Description", defaultValue: food.description },
                          { type: "select", label: "Category", options: categoryOptions },
                          { type: "number", label: "Discount", min: 1, max: 99, defaultValue: food.discount },
                          { type: "file", label: "Image" },
                        ]);
                        setModalState({
                          status: true,
                          mode: "update",
                          id: food._id,
                          header: "Edit Food",
                          variantId: "",
                        });
                      }}
                      className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        setLoaderId(food._id);
                        if (window.confirm("Are you sure you want to delete this Food?")) {
                          await onSubmit({}, "delete", food._id);
                        }
                        setLoaderId(null);
                      }}
                      className="ml-4 cursor-pointer font-medium text-red-600 hover:underline">
                      {loaderId === food._id ? <ImSpinner9 className="animate-spin text-xl" /> : "Delete"}
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default AdminFoodTable;
