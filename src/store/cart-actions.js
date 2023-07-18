import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-37c9c-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

			if(!response.ok) {
				throw new Error('no cart data')
			}
			const data = await response.json();

			return data;
    };
		try {
			const cartData = await fetchData();
			dispatch(cartActions.replaceCart({
				items: cartData.items || [],
				totalQuantity: cartData.totalQuantity,
			}));
		} catch (error) {
			dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "fetching Cart Data failed",
        })
      );
		}
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-37c9c-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify({	items: cart.items, totalQuantity: cart.totalQuantity}) }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "Send cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error",
          message: "Sending Cart Data failed",
        })
      );
    }
  };
};
