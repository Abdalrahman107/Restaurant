import { useQuery } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import useOrdersApi from "../../../apiHooks/useOrdersApi";

const getStatusColor = (status) => {
  switch (status) {
    case "placed":
      return "bg-sky-500";
    case "waitPayment":
      return "bg-yellow-500";
    case "onWay":
      return "bg-blue-500";
    case "delivered":
      return "bg-green-600";
    case "cancelled":
      return "bg-orange-600";
    case "rejected":
      return "bg-red-600";
    default:
      return "bg-gray-400";
  }
};

const Orders = () => {
  const { getOrders } = useOrdersApi();

  const {
    data: ordersData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });



  if (isError) {
    console.log(error);
    return (
      <div className="py-6 min-h-screen text-center">
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load Orders."}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex justify-center items-center ">
        <ImSpinner9 className=" animate-spin text-6xl main-color" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-gray-900 min-h-screen">
      <div className="p-6 w-[95%] mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Your Orders</h2>

        {ordersData?.orders.map((order, index) => (
          <div key={order._id} className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold dark:text-gray-100">Order #{index + 1}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Date: {order.createdAt.slice(0, 10).split("-").reverse().join("-")}
                </p>
              </div>
              <span className={`text-white text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="divide-y divide-gray-300 dark:divide-gray-600">
              {order.foods.map((food, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between py-2">
                  <div className="flex gap-x-4">
                    <div className="w-24">
                      <img src={food.foodId.image.secure_url} className="w-full h-[10vh] object-cover" alt="food image" />
                    </div>
                    <div>
                      <span className="text-sm md:text-lg dark:text-gray-100">
                        {food.foodId.title} x {food.quantity}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{food.variant.label}</p>
                    </div>
                  </div>
                  <span className="dark:text-gray-100 text-sm self-end sm:self-start ">
                    {(food.price * food.quantity).toFixed(2)} EGP
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4 text-base font-semibold dark:text-white">
              Total: {order.totalPrice.toFixed(2)} EGP
            </div>
          </div>
        ))}
        {!ordersData?.orders.length > 0 && <p className="text-center mt-6 text-2xl main-color">No Orders Yet</p>}
      </div>
    </div>
  );
};

export default Orders;
