export const name = "ingredients";
export const LOAD_ITEMS = "LOAD_ITEMS";
export const LOAD_ITEMS_SUCCESS = "LOAD_ITEMS_SUCCESS";
export const LOAD_ITEMS_FAILED = "LOAD_ITEMS_FAILED";

export function getItems() {
  return async function (dispatch) {
    const FETCH_URL = `https://norma.nomoreparties.space/api/ingredients`;
    dispatch({
      type: LOAD_ITEMS,
    });
    // Запрашиваем данные у сервера
    try {
      const res = await fetch(FETCH_URL);
      const isJson =
        res.headers.get("content-type").indexOf("application/json") !== -1;
      if (!res.ok) {
        dispatch({
          type: LOAD_ITEMS_FAILED,
        });
        throw new Error("Ответ сети не ok");
      }
      if (!isJson) {
        dispatch({
          type: LOAD_ITEMS_FAILED,
        });
        throw new Error("Ответ сети не json");
      }
      const { data } = await res.json();
      dispatch({
        type: LOAD_ITEMS_SUCCESS,
        data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: LOAD_ITEMS_FAILED,
      });
    }
  };
}