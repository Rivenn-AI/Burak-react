import { useState } from "react";
import { CartItem } from "../../lib/types/search";

const useBasket = () => {
  const cartJson: string | null = localStorage.getItem("cartData"); // malumotlar saqlandi browser local storegada
  const currentCart = cartJson ? JSON.parse(cartJson) : []; //Agar cartJson mavjud bo'lsa → JSON.parse() orqali JSON stringni JavaScript ma'lumotiga aylantiradi.
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

  const onAdd = (input: CartItem) => {
    // Maxsulot qushish function
    const exist = cartItems.find((item: CartItem) => item._id === input._id); //savat ichda izlaydi biz tanlagan product id bn yangi id

    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id //ID mos kelsa → eski mahsulot ma'lumotlarini saqlaydi va quantity ni 1 taga oshiradi.
          ? //ID mos kelmasa → eski item ni o'zgarishsiz qaytaradi yani boshqa tavarga tegnish yuq
            { ...item, quantity: item.quantity + 1 }
          : item,
      );
      setCartItems(cartUpdate); // react state yangilaydi
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItems, { ...input }]; //eski va yangi maxsulot
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist.quantity === 1) {
      const cartUpdate = cartItems.filter(
        (item: CartItem) => item._id !== input._id,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity - 1 }
          : item,
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };

  const onDelete = (input: CartItem) => {
    const cartUpdate = cartItems.filter(
      (item: CartItem) => item._id !== input._id,
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  };
  const onDeleteAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartData");
  };

  return {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
  };
};

export default useBasket;
