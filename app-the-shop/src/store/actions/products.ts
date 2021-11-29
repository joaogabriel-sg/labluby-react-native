export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export function deleteProduct(productId: string) {
  return { type: DELETE_PRODUCT, productId };
}

export function createProduct(
  title: string,
  description: string,
  imageUrl: string,
  price: number
) {
  return {
    type: CREATE_PRODUCT,
    productData: {
      title,
      description,
      imageUrl,
      price,
    },
  };
}

export function updateProduct(
  id: string,
  title: string,
  imageUrl: string,
  description: string
) {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title,
      imageUrl,
      description,
    },
  };
}
