const DeleteOption = ({ options, handleOption }) => {
  return (
    <div className="just-algin grid items-center">
      <div>
        <h3>{options.message}</h3>
        <div>
          <button
            className="login-but border-none"
            onClick={() => handleOption(false)}
          >
            No
          </button>
          <button
            className="login-but border-none"
            onClick={() => handleOption(true)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOption;
