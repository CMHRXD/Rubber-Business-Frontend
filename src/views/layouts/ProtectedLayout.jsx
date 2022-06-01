//Tools
import { Navigate, Outlet } from "react-router-dom";
//Global Context
import useAuth from "../../hooks/useAuth";
//Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProtectedLayout = () => {
    const { auth, isLoading } = useAuth();

    if(isLoading) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <main className=" h-screen bg-gray-300 ">
                {auth._id? <Outlet/> : <Navigate to="/"/>}
            </main>
            <Footer />
        </>
    )
}
export default ProtectedLayout;

