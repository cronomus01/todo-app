import SideBar from "./components/SideBar";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <div className="grid grid-cols-desktop h-full relative">
        <SideBar></SideBar>
        <section className="grid grid-rows-content">
          <Navbar></Navbar>
          <Main></Main>
          <Footer></Footer>
        </section>
      </div>
    </>
  );
}

export default App;
