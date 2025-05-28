// cartStore.js
import { reactive } from 'vue';
import selectedProductServices from "../services/selectedProduct.services"
import imageServices from "../services/image.services"

type sProduct = {
  selectedProductId: number,
  quantitySelected: number,
  sellingPrice: number,
  created_at: string,
  updated_at: string,
  proId: number,
  orderId: number,
  accountId: number,
  typeId: number,
  block: number,
  name: string
}

type images = {
  imageId: number,
  created_at: string,
  updated_at: string,
  base64: string,
  belongId: string
}

export const cartState = reactive({
  products: [] as sProduct[],       // List of products in the cart
  images: [] as images[],         // List of associated product images
  totalCount: 0,      // Total item count in the cart
});

export function updateCartState(newProducts: any, newImages: any) {
  cartState.products = newProducts;
  cartState.images = newImages;
  cartState.totalCount = newProducts.reduce((total: any, item: any) => total + item.quantity, 0);
}

export async function getAllSProducts(accountId: number) {
    try {
      // Fetch products in the cart
      const respSProducts = await selectedProductServices.getAllByAccountIdInCart(accountId);
      const products = respSProducts.data.sProducts;
  
      // Fetch images for each product
      const images = [];
      for (const product of products) {
        const respImage = await imageServices.getAllByBelongIdLimit1(product.proId);
        images.push(respImage.data.image[0]);
      }
  
      // Update the shared cart state
      updateCartState(products, images);
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  }