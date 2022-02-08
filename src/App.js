import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("");
  const [authorData, setAuthorData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const handleRandomQuote = async () => {
    await fetch("https://api.quotable.io/random")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => console.error(error));
    setIsVisible(true);
  };
  const handleAllQuotes = async (author) => {
    await fetch("http://api.quotable.io/quotes?author=" + author)
      .then((res) => res.json())
      .then((res) => setAuthorData(res.results));
    setIsVisible(false);
  };

  useEffect(() => {
    handleRandomQuote();
  }, []);
  return (
    <div className="p-5 w-full h-full justify-center items-center">
      {isVisible ? (
        <div>
          <div className="block mt-52 justify-center items-center flex-col">
            <p className="text-xl w-4/12 mx-auto border-l-4 border-yellow-200 pl-12">
              "{data.content}"
            </p>
            <div
              onClick={() => handleAllQuotes(data.authorSlug)}
              className="bg-neutral-700 mt-12 mx-auto my-auto w-3/12 px-4 py-6 flex flex-row items-center justify-between hover:cursor-pointer"
            >
              <div className="text-white">
                <h1>{data.author}</h1>
                <h3 className="text-xs text-neutral-500">
                  {data.tags ? data.tags[0] : ""}
                </h3>
              </div>
              <i className="fas fa-long-arrow-alt-right text-white"></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-20 mx-auto">
          <h1 className="ml-14 text-xl">{data.author}</h1>
          {authorData.map((data) => (
            <div className="block mt-32 justify-center items-center flex-col">
              <p className="text-xl w-4/12 mx-auto border-l-4 border-yellow-200 pl-12">
                "{data.content}"
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="py-[20px]">
        <button
          className="h-auto items-center justify-between flex mx-auto py-[20px] block bg-neutral-700 text-white"
          onClick={handleRandomQuote}
        >
          Random
        </button>
      </div>
    </div>
  );
}

export default App;
