import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type ExchangeData = {
  name: string;
  country: string;
  trust_score: number;
  trust_score_rank: number;
  image: string;
  year_established: string;
  facebook_url: string;
  reddit_url: string;
  telegram_url: string;
  twitter_handle: string;
  slack_url: string;
  other_url_1: string;
  other_url_2: string;
  description: string;
};

const Exchange = () => {
  // TODO: add loading status visually
  const { id } = useParams();
  const [exchange, setExchange] = useState<ExchangeData>();
  const getExchange = useCallback(async () => {
    try {
      const exchange = await fetch(
        `https://api.coingecko.com/api/v3/exchanges/${id}`
      ).then((r) => r.json());
      setExchange(exchange);
    } catch (e) {
      // TODO: handle error visually
      console.error(e);
    }
  }, [id]);
  useEffect(() => {
    getExchange();
  }, [getExchange]);
  return (
    <>
      <Link
        to="/"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
      >
        Home
      </Link>
      <div className="text-white mt-4">
        <div className="p-4 w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          {exchange && (
            <div>
              <img
                className="p-4 rounded-t-lg"
                alt={`Logo of ${exchange.name} exchange`}
                src={exchange.image}
              />
              <div className="px-5 pb-5">
                <h3>Trust Rank: {exchange.trust_score_rank}</h3>
                <div>{exchange.name}</div>
                <div>{exchange.country}</div>
                <div>{exchange.year_established}</div>
              </div>
            </div>
          )}
        </div>{" "}
      </div>
    </>
  );
};

export default Exchange;
