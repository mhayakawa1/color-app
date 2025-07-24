const Circle = ({ changeColorInfo, colorInfo }) => {
  const { color, active } = colorInfo;
  return (
    <button
      onClick={() => changeColorInfo(false, color)}
      className={`circle ${color} ${active && "dropshadow"}`}
    ></button>
  );
};
export default Circle;
