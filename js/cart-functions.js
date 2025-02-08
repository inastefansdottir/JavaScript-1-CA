import { cart, updateCartIcon } from "./cart.js";

export function addToCartFromPage(game) {
  cart.addItem({
    id: game.id,
    title: game.title,
    price: game.price,
    image: game.image.url,
  });
  updateCartIcon(); // This function updates the visual cart icon with item count
}
