import "./spinner.css";

const Spinner = () => {
  return (
    <div
      className={"spinner-container"}
      data-testid={"spinner-container-data-id"}
    >
      <div className={"spinner"} />
    </div>
  );
};

export default Spinner;
