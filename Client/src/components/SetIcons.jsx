import sallery from "../assets/icons/salary.png";
import bank from "../assets/icons/transfer.png";
import petrol from "../assets/icons/petrol.png";
import wifi from "../assets/icons/wifi.png";
import tea from "../assets/icons/tea.png";
import room from "../assets/icons/room.png";
import travel from "../assets/icons/travel.png";
import water from "../assets/icons/water.png";
import recharge from "../assets/icons/recharge.png";
import power from "../assets/icons/power.png";
import market from "../assets/icons/market.png";
import hospital from "../assets/icons/hospital.png";
import food from "../assets/icons/food.png";
import workshop from "../assets/icons/electric.png";
import dating from "../assets/icons/dating.png";
import shopping from "../assets/icons/shopping.png";

const SetIcons = ({ title }) => {
  const icons = [
    sallery,
    bank,
    petrol,
    wifi,
    tea,
    room,
    travel,
    water,
    recharge,
    power,
    market,
    hospital,
    food,
    workshop,
    dating,
    shopping,
  ];
  const getIcon = [
    "sallery",
    "bank",
    "petrol",
    "wifi",
    "tea",
    "room",
    "travel",
    "water",
    "recharge",
    "power",
    "market",
    "hospital",
    "food",
    "workshop",
    "dating",
    "shopping",
  ];
  const indexOf = getIcon.map(
    (icon, index) => icon === title.split(" ")[0] && index
  );
  const mainIndex = indexOf.filter((index) => index !== false);
  return (
    <>
      <img className="img-icon" src={icons[mainIndex[0]]} alt="" />
    </>
  );
};

export default SetIcons;
