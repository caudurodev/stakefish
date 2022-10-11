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
      <Link to="/">Home</Link>
      <div>{id}</div>
      {exchange && (
        <div>
          <div>{exchange.name}</div>
          <div>{exchange.country}</div>
          <div>{exchange.year_established}</div>
        </div>
      )}
    </>
  );
};

export default Exchange;
