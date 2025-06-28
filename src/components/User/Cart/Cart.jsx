import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useCartApi from "../../../apiHooks/useCartApi";
import { cartContext } from "../../../Context/CartCotext";

const Cart = () => {
  const queryClient = useQueryClient();

  const [cartItemId, setCartItemId] = useState(null);
  
  const { cartData:cartItems, isLoading: cartItemsLoading, isError: cartItemsEroor, error } = useContext(cartContext);

  const { clearCart, removeCartItem, updateCartItemQty } = useCartApi();

  const handleSuccess = () => {
    queryClient.invalidateQueries(["cart"]);
  };

  const handleError = (error) => {
    console.log(error);
    toast.error(error?.response?.data?.err || err?.response?.data || "Something went wrong");
  };

  const removeItemMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const removeItem = removeItemMutation.mutateAsync;

  const updateQtyMutation = useMutation({
    mutationFn: updateCartItemQty,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const updateItem = updateQtyMutation.mutateAsync;

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const clearAll = clearCartMutation.mutateAsync;
  const isClearing = clearCartMutation.isPending;

  if (cartItemsEroor) {
    console.log(error);
    return (
      <div className="py-6 text-center text-red-400 min-h-screen">
        <p>{ error?.response?.data?.err || err?.response?.data || "Could not load Cart."}</p>
      </div>
    );
  }

  if (cartItemsLoading) {
    return (
      <div className="min-h-screen w-screen flex justify-center items-center ">
        <ImSpinner9 className=" animate-spin text-6xl main-color" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-gray-900 min-h-screen">
      <div className="w-[95%] mx-auto py-7 grid grid-cols-3 gap-4 dark:text-white">
        {/* Cart */}

        <div className="col-span-3 md:col-span-2 animate__animated animate__slideInRight mt-6 md:mt-0 md:overflow-y-auto f-nanito bg-white dark:bg-gray-700 p-4 shadow-2xl rounded-2xl  md:ml-4">
          <div className="flex justify-between items-center f-nunito text-2xl font-bold ">
            <h2>Cart</h2>
            <span className="main-color">
              <FaShoppingCart />
            </span>
          </div>
          {cartItems?.cart?.map((item) => {
            return (
              <div key={item.variant._id} className="flex gap-4 mt-4 border-t border-slate-300 pt-4">
                <div className="w-1/4">
                  <img src={item.food.image.secure_url} className="w-full" alt="food image" />
                </div>
                <div className="w-3/4 gap-x-4 flex justify-between">
                  <div className="flex flex-col gap-y-2">
                    <h3>{item?.food?.title}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {item.variant.type}: {item.variant.label}
                    </span>
                    {cartItemId !== item.variant._id ? (
                      <div className="flex items-center gap-x-3">
                        <button
                          onClick={async () => {
                            if (item.quantity > 1) {
                              setCartItemId(item.variant._id);
                              await updateItem({
                                foodId: item.food._id,
                                variantId: item.variant._id,
                                count: -1,
                              });
                              setCartItemId(null);
                            }
                          }}
                          className={`w-6 h-6 cursor-pointer text-white ${
                            item.quantity > 1 ? "main-bg-color" : "bg-gray-400"
                          }`}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={async () => {
                            setCartItemId(item.variant._id);
                            await updateItem({
                              foodId: item.food._id,
                              variantId: item.variant._id,
                              count: 1,
                            });
                            setCartItemId(null);
                          }}
                          className="w-6 h-6 cursor-pointer text-white main-bg-color">
                          +
                        </button>
                        <span> | </span>
                        <button
                          onClick={async () => {
                            setCartItemId(item.variant._id);
                            await removeItem({
                              foodId: item.food._id,
                              variantId: item.variant._id,
                            });
                            setCartItemId(null);
                          }}
                          className="hover:text-red-500 transition-colors duration-300 cursor-pointer">
                          <FaTrashAlt />
                        </button>
                      </div>
                    ) : (
                      <ImSpinner9 className="animate-spin" />
                    )}
                  </div>
                  <div className="flex flex-col sm:text-lg font-bold">
                    <span
                      className={`${
                        item.variant.price !== item.variant.subprice ? "" : "hidden"
                      } line-through font-normal main-color`}>
                      ${item.variant.price.toFixed(2)}
                    </span>
                    <span>${item.variant.subprice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {cartItems?.cart?.length > 0 ? (
            <button
              onClick={async () => {
                await clearAll();
              }}
              className="cursor-pointer mt-8 ml-auto block bg-red-700 text-white px-4 py-1 rounded-full">
              {isClearing ? <ImSpinner9 className="animate-spin" /> : "Clear Cart"}
            </button>
          ) : (
            <p className="text-center mt-6 text-2xl main-color">Cart is Empty</p>
          )}
        </div>

        {/*Order Summary*/}

        <div className="col-span-3 md:col-span-1 animate__animated animate__slideInRight mt-6 md:mt-0 md:overflow-y-auto f-nanito bg-white dark:bg-gray-700 p-4 shadow-2xl rounded-2xl md:max-h-[35vh]">
          <div className="flex justify-between items-center mt-2 font-bold">
            <p>Cart's Total</p>
            <span className="main-color">
              $
              {(cartItems?.totalCartPrice)?.toFixed(2)}
            </span>
          </div>
          {cartItems?.cart?.length > 0 && (
            <Link
              to="/payment"
              className="block text-center text-lg font-bold w-full mt-8 bg-green-600 text-white py-2 rounded-2xl hover:bg-green-700 transition-colors cursor-pointer">
              Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
