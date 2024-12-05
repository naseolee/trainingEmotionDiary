import { useSearchParams } from "react-router-dom"; // for QueryString

const Home = () => {
    // QueryString not used
    const [paramz, setParams] = useSearchParams();
    paramz.get("value");
    // QueryString not used

    return <div>Home</div>;
};

export default Home;