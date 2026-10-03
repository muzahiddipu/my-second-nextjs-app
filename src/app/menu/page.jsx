import MenuExplorer from "../components/MenuExplorer";
import { getTopFoods } from "../../lib/foods";

export const metadata = {
  title: "Explore the menu",
  description:
    "Search and compare dishes, ingredients, ratings, and local price estimates.",
};

const MenuPage = async () => {
  let foods = [];
  let loadError = false;

  try {
    foods = await getTopFoods();
  } catch {
    loadError = true;
  }

  return <MenuExplorer foods={foods} loadError={loadError} />;
};

export default MenuPage;
