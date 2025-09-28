export default function NoData(props) {
  const { string } = props;

  return (
    <div className="no-data">
      <p className="no-colors">You have no saved {string}.</p>
    </div>
  );
}
