import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

type ExchangesData = {
  id: string;
  name: string;
  country: string;
  url: string;
  image: string;
  trust: string;
};

const Home = () => {
  // TODO: add loading status visually
  const [exchanges, setExchanges] = useState<ExchangesData[]>([]);
  const getExchanges = useCallback(async () => {
    try {
      const exchanges = await fetch(
        "https://api.coingecko.com/api/v3/exchanges?per_page=10"
      ).then((r) => r.json());
      setExchanges(exchanges);
    } catch (e) {
      // TODO: handle error visually
      console.error(e);
    }
  }, []);
  useEffect(() => {
    getExchanges();
  }, [getExchanges]);
  return (
    <div>
      {!!exchanges.length &&
        exchanges.map(({ id, name }) => (
          <Link key={id} to={`/exchange/${id}`}>
            {name}
          </Link>
        ))}
    </div>
  );
};

export default Home;
