import NavBar from "../components/Navbar";

const PageWrapper = ({ children }) => {
  return (
    <div className="flex h-100 bg-dhuttu">
      <NavBar />
      {children}
      <div className="flex-1 bg-adds"></div>
    </div>
  );
};
export default PageWrapper;
