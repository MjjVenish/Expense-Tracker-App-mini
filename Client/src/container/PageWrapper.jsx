import NavBar from "../components/Navbar";

const PageWrapper = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
export default PageWrapper;
