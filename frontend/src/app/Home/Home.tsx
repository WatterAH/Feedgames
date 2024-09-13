import PageLoader from "../../components/Global/PageLoader";
import Menu from "../../components/Menu/Menu";
import Feed from "./Feed";
import Profile from "../Explorer/Profile";
import Search from "../Explorer/Search";
import { useToken } from "../../hooks/useToken";
import { Route, Routes } from "react-router-dom";

const Home = () => {
  const { loading } = useToken();

  return loading ? (
    <div className="h-screen flex items-center justify-center">
      <PageLoader />
    </div>
  ) : (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/explore" element={<Search />} />
        <Route path="/u/:id" element={<Profile />} />
      </Routes>
    </>
  );
};

export default Home;
