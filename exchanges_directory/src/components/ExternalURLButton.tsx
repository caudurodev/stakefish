import { useEffect, useState } from "react";

type ExternalURLButtonProps = {
  url?: string;
};

const ExternalURLButton = ({ url }: ExternalURLButtonProps) => {
  const [displayURL, setDisplayURL] = useState("");
  useEffect(() => {
    if (!url) return;
    // TODO: standardise TLD display (remove www.)
    const TLD = new URL(url);
    setDisplayURL(TLD?.hostname ? TLD.hostname : url);
  }, [url]);
  if (!url) return <></>;
  return (
    <a
      href={url}
      className="
          block max-w-[200px] my-4 px-5 py-2.5 text-white bg-green-700 hover:bg-green-800 
          focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  
          text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
        "
      title={`Link to ${displayURL}`}
    >
      {displayURL}
    </a>
  );
};

export default ExternalURLButton;
