import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

type ExchangesData = {
  id: string;
  name: string;
  country: string;
  url: string;
  image: string;
  trust_score: number;
  trust_score_rank: number;
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
    <div className="text-2xl font-semibold">
      <h1 className="text-2xl">Top 10 Exchanges</h1>
      <h2 className="text-xl mb-4">By Trust Score</h2>
      {!!exchanges.length &&
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
            <div className="text-white mb-4">
              <div className="w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <Link key={id} to={`/exchange/${id}`}>
                  <img
                    className="p-4 rounded-t-lg"
                    alt={`Logo of ${name} exchange`}
                    src={image}
                  />
                </Link>
                <div className="px-5 pb-5">
                  <h3>Trust Rank: {trust_score_rank}</h3>
                  <Link key={id} to={`/exchange/${id}`} className="text-3xl">
                    {name}
                  </Link>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {country}
                  </h5>
                  <h5 className="mt-4">Trust Score</h5>
                  <StarRating starsRating={trust_score} stars={10} />
                  <div className="flex justify-between items-center">
                    <a
                      key={id}
                      href={url}
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Open
                    </a>
                    <Link
                      key={id}
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

type StarRatingProps = {
  stars?: number;
  starsRating?: number;
};

const StarRating = ({ stars = 5, starsRating = 3 }: StarRatingProps) => (
  <div className="flex items-center mt-2.5 mb-5">
    {stars &&
      Array.from(Array(stars)).map((_, i) => (
        <svg
          aria-hidden="true"
          className={`w-5 h-5  ${
            i < starsRating ? "text-yellow-300" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
      {`${(starsRating / stars) * 10} / ${stars}`}
    </span>
  </div>
);

export default Home;
