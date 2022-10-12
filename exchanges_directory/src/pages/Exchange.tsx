import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import ExternalURLButton from "../components/ExternalURLButton";

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
  const { id } = useParams();
  const [exchange, setExchange] = useState<ExchangeData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getExchange = useCallback(async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const exchangeData = await fetch(
        `https://api.coingecko.com/api/v3/exchanges/${id}`
      ).then((r) => r.json());
      setExchange(exchangeData);
      setIsLoading(false);
    } catch {
      setIsLoading(true);
      setIsError(true);
    }
  }, [id]);
  useEffect(() => {
    getExchange();
  }, [getExchange]);
  // TODO: improve accessibility
  return (
    <>
      <Link
        to="/"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
      >
        Back
      </Link>
      <div className="text-white mt-4 min-h-[300px] ">
        <div className="min-h-[200px] transition-all p-4 w-full bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          {isLoading && <div>Loading...</div>}
          {!isLoading && isError && <div>Error loading data</div>}
          {!isLoading && !isError && exchange && (
            <>
              <img
                className="p-4 rounded-t-lg"
                alt={`Logo of ${exchange.name} exchange`}
                src={exchange.image}
              />
              <div className="px-5 pb-5">
                <h1 className="text-3xl">{exchange.name}</h1>
                <p>{exchange.description}</p>
                <h3>Trust Rank: {exchange.trust_score_rank}</h3>
                <div>Location: {exchange.country}</div>
                <div>Created: {exchange.year_established}</div>
                <h2 className="text-xl mt-5">Links</h2>
                <ExternalURLButton url={exchange.facebook_url} />
                <ExternalURLButton url={exchange.telegram_url} />
                <ExternalURLButton url={exchange.slack_url} />
                <ExternalURLButton url={exchange.other_url_1} />
                <ExternalURLButton url={exchange.other_url_2} />
                <h5 className="mt-4">Trust Score</h5>
                <StarRating
                  starsRating={exchange.trust_score}
                  totalStars={10}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Exchange;
