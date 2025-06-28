import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useOrdersApi from "../../../apiHooks/useOrdersApi";

const AdminOrders = () => {

  const { getAllOrders} = useOrdersApi();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  console.log(data);
  

  if (isError) {
    console.log(error);
    
    return (
      <div className="py-6 text-center">
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load Orders."}</p>
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
        <h2 className="text-2xl font-bold mb-4 p-4 dark:text-white">Orders</h2>


        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300 shadow-2xl ">
<thead className="sticky top-0 text-xs text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
  <tr>
    <th className="px-6 py-3">Food Name</th>
    <th className="px-6 py-3">Quantity</th>
    <th className="px-6 py-3">Variant Price</th>
    <th className="px-6 py-3">Variant Label</th>
    <th className="px-6 py-3">Address</th>
    <th className="px-6 py-3">Phone</th>
    <th className="px-6 py-3">Payment Method</th>
    <th className="px-6 py-3">Total Price</th>
    <th className="px-6 py-3">Date</th>
  </tr>
</thead>
     <tbody>
          {data.orders.map((order, orderIndex) =>
            order.foods.map((food, foodIndex) => (
              <tr
                key={food.variantId + order._id}
                className={`${
                  orderIndex % 2 === 0 ? "bg-gray-100 dark:bg-gray-800" : ""
                } border-b dark:border-gray-700 border-gray-200`}
              >
                <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600">{food.foodId.title}</td>
                <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600">{food.quantity}</td>
                <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600">{food.finalPrice} EGP</td>
                <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600">{food.variant.label}</td>

                {foodIndex === 0 && (
                  <>
                    <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600" rowSpan={order.foods.length}>
                      {order.address}
                    </td>
                    <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600" rowSpan={order.foods.length}>
                      {order.phone}
                    </td>
                    <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600" rowSpan={order.foods.length}>
                      {order.paymentMethod}
                    </td>
                    <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600" rowSpan={order.foods.length}>
                      {order.totalPrice} EGP
                    </td>
                    <td className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-600" rowSpan={order.foods.length}>
                      {new Date(order.createdAt).toLocaleString("en-GB", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>

        </table>

      </div>
    </div>
  );
};

export default AdminOrders;
