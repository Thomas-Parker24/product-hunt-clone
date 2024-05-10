import { useReducer } from 'react';
import { ProductContext } from './ProductContext.jsx';
import { ProductReducer } from './Reducers';
import { ProductReducerTypes } from './Types';
import { getProductById } from '../../Firebase/Functions';

const initialState = {
  productToShowInModal: undefined,
  productToEdit: undefined,
};

const init = () => {
  const productToShowInModal = JSON.parse(
    localStorage.getItem('productToShowInModal')
  );
  const productToEdit = JSON.parse(localStorage.getItem('productToEdit'));

  return {
    productToShowInModal,
    productToEdit,
  };
};

export const ProductProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(
    ProductReducer,
    initialState,
    init
  );

  async function deleteProdutToShowInModal() {
    try {
      localStorage.removeItem('productToShowInModal');
      dispatch({ type: ProductReducerTypes.deleteProductToShowInModal });
    } catch (error) {
      dispatch({ type: ProductReducerTypes.error, payload: error });
      return;
    }
  }

  async function deleteProdutToEdit() {
    try {
      localStorage.removeItem('productToEdit');
      dispatch({ type: ProductReducerTypes.deleteProductToEdit });
    } catch (error) {
      dispatch({ type: ProductReducerTypes.error, payload: error });
      return;
    }
  }

  async function SetProductToShowInModal(product) {
    try {
      if (!product) throw "Product can't be null.";

      localStorage.setItem('productToShowInModal', JSON.stringify(product));

      dispatch({
        type: ProductReducerTypes.setProductToShowInModal,
        payload: product,
      });
    } catch (error) {
      dispatch({ type: ProductReducerTypes.error, payload: error });
    }
  }

  async function SetProductToEdit(product) {
    try {
      if (!product) throw "ProductUID can't be null.";
      localStorage.setItem('productToEdit', JSON.stringify(product));
      dispatch({
        type: ProductReducerTypes.setProductEdit,
        payload: product,
      });
    } catch (error) {
      dispatch({ type: ProductReducerTypes.error, payload: error });
    }
  }

  return (
    <>
      <ProductContext.Provider
        value={{
          ...productState,
          deleteProdutToShowInModal,
          deleteProdutToEdit,
          SetProductToShowInModal,
          SetProductToEdit,
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
};
