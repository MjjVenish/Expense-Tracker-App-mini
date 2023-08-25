const DeleteOption = ({ options, handleOption }) => {
  return (
    <div className="just h-fit grid item-center">
      <div
        className="text-white border-white  text-center grid"
        style={{
          width: "40vw",
          height: "30vh",
          borderRadius: "10px",
          paddingTop: "30px",
          background: "#345477",
        }}
      >
        <h2>{options.message}</h2>
        <div>
          <button
            className="login-but border-none"
            onClick={() => handleOption(false)}
          >
            Cancel
          </button>
          <button
            className="login-but border-none"
            onClick={() => handleOption(true)}
          >
            {options.use}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOption;
