import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { authContext } from "../../../Context/AuthContext";
import useCartApi from "../../../apiHooks/useCartApi";
import useMenuApi from "../../../apiHooks/useMenuApi";

const MenuItemDetails = () => {
  const { token } = useContext(authContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addItemToCart } = useCartApi();
  const { getFoodDetails } = useMenuApi();

  const addToCartMutation = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.err || error?.response?.data || "Something went wrong");
    },
  });

  const addItemNewToCart = addToCartMutation.mutateAsync;
  const isAdding = addToCartMutation.isPending;

  const [qty, setQty] = useState(1);
  const [variantId, setVariantId] = useState(null);
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const role = localStorage.getItem('role');

  const { foodId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["foodDetails", foodId],
    queryFn: () => getFoodDetails(foodId),
  });

  const itemdetails = data?.food;

  useEffect(() => {
    if (itemdetails?.variants?.length > 0) {
      setVariantId(itemdetails.variants[0]._id);
      setPrice(itemdetails.variants[0].subprice.toFixed(2));
      setSize(itemdetails.variants[0].label);
    }
  }, [itemdetails]);

  if (isError) {
    console.log(error);
    return (
      <div className="py-6 min-h-screen text-center">
        <p className="text-red-400">{ error?.response?.data?.err || error?.response?.data || "Could not load Food."}</p>
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
    <div className="min-h-screen py-7 bg-neutral-50 dark:bg-gray-900 dark:text-white">
      <div className="w-[95%] mx-auto  flex flex-col md:flex-row  gap-4 bg-white dark:bg-gray-700 shadow-2xl rounded-2xl p-4">
        <div className="md:w-1/2">
          <img src={itemdetails?.image?.secure_url} className="w-full h-full object-center object-cover" alt="food image" />
        </div>
        <div className="flex flex-col gap-y-4 p-4 md:w-1/2 w-">
          <div className="flex flex-col gap-y-2">
            <h2 className="f-nunito text-2xl font-bold">{itemdetails?.title}</h2>
            <p className="mt-2">{itemdetails?.description}</p>
            <h2 className="mt-2 f-nunito sm:text-xl font-bold">Options:</h2>
            <div className="flex flex-col gap-4 mt-2">
              {itemdetails?.variants.map((variant) => {
                return (
                  <button
                    key={variant._id}
                    onClick={() => {
                      setPrice(variant.subprice);
                      setSize(variant.label);
                      setVariantId(variant._id);
                    }}
                    className={`${
                      size === variant.label ? "main-bg-color text-white" : "bg-gray-200"
                    } px-5 py-1 dark:bg-gray-500 rounded-full hover:bg-gray-400 transition-colors duration-300 hover:text-white cursor-pointer md:text-lg`}>
                    {variant.label} - <span>${variant.subprice.toFixed(2)}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-x-4 mt-4">
              <h2 className="f-nunito sm:text-xl font-bold">Quantity:</h2>
              <button
                onClick={() => {
                  if (qty > 1) setQty(qty - 1);
                }}
                className={`${
                  qty > 1 ? "main-bg-color" : "bg-gray-400"
                } w-4 h-4 p-3 sm:p-4 text-lg bg-gray-200 dark:bg-gray-500 rounded-full hover:bg-gray-400 transition-colors duration-300 hover:text-white cursor-pointer inline-flex justify-center items-center`}>
                -
              </button>
              <span className="sm:text-xl">{qty}</span>
              <button
                onClick={() => {
                  setQty(qty + 1);
                }}
                className="w-4 h-4 p-3 sm:p-4 text-lg main-bg-color dark:bg-gray-500 rounded-full hover:bg-gray-400 transition-colors duration-300 hover:text-white cursor-pointer inline-flex justify-center items-center">
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 md:p-5 border-t">
            <p className="font-bold sm:text-xl">
              Total: <span>{(qty * price).toFixed(2)}</span>
            </p>
            <button
              onClick={async () => {
                if (!(token&&role==="user")) {
                  navigate("/requiredLogin");
                  return;
                }
                await addItemNewToCart({
                  foodId: itemdetails?._id,
                  variantId: variantId,
                  quantity: qty,
                });
              }}
              disabled={isAdding}
              type="button"
              className="text-white main-bg-color hover:bg-red-700! transition-colors cursor-pointer rounded-full text-sm px-4 sm:px-6 py-2 text-center ">
              {isAdding ? <ImSpinner9 className="animate-spin sm:text-xl text-white" /> : "Add to Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetails;
