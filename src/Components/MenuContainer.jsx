import { useColors } from "../Contexts/ColorsContext";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";

function MenuContainer() {
  const { mobileView } = useColors();
  return <div>{mobileView ? <MobileMenu /> : <Menu />}</div>;
}

export default MenuContainer;
