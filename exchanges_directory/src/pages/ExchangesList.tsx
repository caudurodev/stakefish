import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";

// POSSIBLE IMMEDIATE IMPROVEMENTS:
// - pagination
// - search
// - multiple languages
// - filter by properties
// - sort by properties

type ExchangesData = {
  id: string;
  name: string;
  country: string;
  url: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
};

const ExchangesList = () => {
  const [exchanges, setExchanges] = useState<ExchangesData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getExchanges = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const fetchedExchanges = await fetch(
        "https://api.coingecko.com/api/v3/exchanges?per_page=10"
      ).then((r) => r.json());
      setExchanges(fetchedExchanges);
      setIsLoading(false);
    } catch {
      setIsLoading(true);
      setIsError(true);
    }
  }, []);
  useEffect(() => {
    getExchanges();
  }, [getExchanges]);
  // TODO: improve accessibility
  return (
    <div className="text-2xl font-semibold">
      <h1 className="text-2xl">Top 10 Exchanges</h1>
      <h2 className="text-xl mb-4">By Trust Score</h2>
      {isLoading && <div>Loading...</div>}
      {!isLoading && isError && <div>Error loading data</div>}
      {!isLoading &&
        !isError &&
        !!exchanges.length &&
        exchanges.map(
          ({
            country,
            id,
            name,
            image,
            trust_score,
            trust_score_rank,
            url,
          }) => (
            <div className="text-white mb-4" key={id}>
              <div className="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/exchange/${id}`}>
                  <img
                    className="p-4 rounded-t-lg"
                    alt={`Logo of ${name} exchange`}
                    src={image}
                  />
                </Link>
                <div className="px-5 pb-5">
                  <h3>Trust Rank: {trust_score_rank}</h3>
                  <Link to={`/exchange/${id}`} className="text-3xl">
                    {name}
                  </Link>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {country}
                  </h5>
                  <h5 className="mt-4">Trust Score</h5>
                  <StarRating starsRating={trust_score} totalStars={10} />
                  <div className="flex justify-between items-center">
                    <a
                      href={url ? url : "#"}
                      className="
                      text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
                      focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                      dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      {url ? "Open" : "n/a"}
                    </a>
                    <Link
                      to={`/exchange/${id}`}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default ExchangesList;
