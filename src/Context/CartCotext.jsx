import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useCartApi from "../apiHooks/useCartApi";


export const cartContext = createContext();

export const CartContextProvider = ({ children }) => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("toky");
  const { getCartItems } = useCartApi();

  const {
    data: cartData,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: role === "user" && !!token,
  });

  return (
    <cartContext.Provider value={{ cartData, isLoading, isError, error }}>
      {children}
    </cartContext.Provider>
  );
};


