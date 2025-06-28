import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaShoppingCart } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { authContext } from "../../../Context/AuthContext";
import useMenuApi from "../../../apiHooks/useMenuApi";
import useCartApi from "../../../apiHooks/useCartApi";

const MenuCategory = () => {
  const { id } = useParams();
  const { getCategoryFoods, getMenuOffers } = useMenuApi();
  const { addItemToCart } = useCartApi();
  const navigate = useNavigate();
  const { token } = useContext(authContext);
  const role = localStorage.getItem('role');

  const isOffers = id === undefined || id === "offers";

  const [selectedVariants, setSelectedVariants] = useState({});

  const [foodId, setFoodId] = useState(null);

  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Item adden to your cart");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.err || err?.response?.data || "Something went wrong");
    },
  });

  const addItemNewToCart = addToCartMutation.mutateAsync;

  const {
    data: foodOffers,
    isLoading: offersLoading,
    isError: offersError,
    error:foodError
  } = useQuery({
    queryKey: ["foodOffers"],
    queryFn: getMenuOffers,
  });

  const {
    data: categoryData,
    isLoading: categoryLoading,
    isError: categoryError,
    error
  } = useQuery({
    queryKey: ["menuCategory", id],
    queryFn: () => getCategoryFoods(id),
    enabled: !isOffers,
  });

  const menuItems = isOffers ? foodOffers?.foods : categoryData?.category?.[0]?.food;
  const fetchedCategory = isOffers ? "Offers" : categoryData?.category?.[0]?.name;

  useEffect(() => {
    if (menuItems) {
      const defaults = {};
      menuItems.forEach((item) => {
        if (item.variants?.length > 0) {
          defaults[item._id] = item.variants[0]._id;
        }
      });
      setSelectedVariants(defaults);
    }
  }, [menuItems]);

  if (offersError) {
    return (
      <div className="py-6 h-[50vh] text-center">
        <p className="text-red-400">{ foodError?.response?.data?.err || err?.response?.data || "Could not load Offers."}</p>
      </div>
    );
  }
  if (categoryError) {
    return (
      <div className="py-6 h-[50vh] text-center">
        <p className="text-red-400">{ error?.response?.data?.err || err?.response?.data || "Could not load categories."}</p>
      </div>
    );
  }

  if (offersLoading || categoryLoading) {
    return (
      <div className="h-[50vh] w-screen flex justify-center items-center ">
        <ImSpinner9 className=" animate-spin text-6xl main-color" />
      </div>
    );
  }


  return (
    <div className="">
      <h1 className="f-danc text-6xl font-bold mb-4">{isOffers ? "Offers" : fetchedCategory}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {menuItems?.map((item) => {
          return (
            <div
              key={item._id}
              className="animate__animated animate__slideInRight flex flex-col items-center gap-x-4  bg-white dark:bg-gray-600 shadow-2xl rounded-2xl p-4 relative">
              <Link to={`/foodDetails/${item._id}`} className=" cursor-pointer flex flex-col w-full">
                <div className="">
                  <img
                    src={item.image.secure_url}
                    alt={item.title}
                    className="w-full sm:h-[20vh] object-cover rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center mt-4 gap-x-4">
                  <h2 className=" f-nunito text-start text-lg font-bold">{item.title}</h2>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (!(token&&role==="user")) {
                        navigate("/requiredLogin");
                        return;
                      }
                      setFoodId(item._id);
                      await addItemNewToCart({
                        foodId: item._id,
                        variantId: selectedVariants[item._id],
                        quantity: 1,
                      });
                      setFoodId(null);
                    }}
                    aria-label={`Add ${item.title} to cart`}
                    type="button"
                    className="block main-bg-color text-white rounded-lg px-4 py-1.5 hover:bg-green-500! cursor-pointer transition-colors duration-300 ">
                    {foodId === item._id ? (
                      <ImSpinner9 className=" animate-spin text-xl text-white" />
                    ) : (
                      <FaShoppingCart />
                    )}
                  </button>
                </div>
                {(() => {
                  const selectedId = selectedVariants[item._id];
                  const selectedVariant = item.variants.find((v) => v._id === selectedId) || item.variants[0];
                  return (
                    <div className="flex items-center text-lg font-bold mt-2">
                      {item.discount ? (
                        <>
                          <span className="line-through font-normal main-color mr-4">${selectedVariant.price}</span>
                          <span>${selectedVariant.subprice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span>${selectedVariant?.price}</span>
                      )}
                    </div>
                  );
                })()}
              </Link>

              <div className="flex gap-x-3 w-full gap-y-1 mt-4 text-xs flex-wrap">
                {item?.variants?.map((option) => (
                  <label key={option._id} className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name={`variant-${item._id}`}
                      value={option._id}
                      checked={selectedVariants[item._id] === option._id}
                      onChange={() =>
                        setSelectedVariants((prev) => ({
                          ...prev,
                          [item._id]: option._id,
                        }))
                      }
                      className="accent-blue-600"
                    />
                    <span className="capitalize">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuCategory;
