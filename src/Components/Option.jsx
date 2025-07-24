const Option = ({ item }) => {
  const [value, numbers] = item;
  return (
    <option value={value} data-numbers={numbers}>
      {value}
    </option>
  );
};
export default Option;
