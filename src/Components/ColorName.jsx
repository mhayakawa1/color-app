const ColorName = ({ colorInfo }) => {
  return (
    <li className="color-name">
      {colorInfo.color
        .split("-")
        .map((i) => i[0].toUpperCase() + i.substring(1, i.length))
        .join(" ")}
    </li>
  );
};
export default ColorName;
