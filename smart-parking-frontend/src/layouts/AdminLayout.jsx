import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function AdminLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default AdminLayout;