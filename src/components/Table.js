import { useGlobalContext } from "../context";

function Table() {
  const { loading, handleClick, cardPrices } = useGlobalContext();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="box-border p-0 m-0 bg-slate-400 ">
      <section className="pt-20 mt-4  bg-slate-700 sm:container sm:mx-auto">
        {cardPrices.map((item, index) => {
          const { cardName, ethPrice, godsPrice } = item;
          return (
            <p className="ml-3 text-cyan-200" key={index}>
              {cardName}----{ethPrice}----{godsPrice}
            </p>
          );
        })}
        <button
          onClick={() => handleClick()}
          className="px-4 py-2 mt-4 mb-4 ml-3 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
        >
          Click Me
        </button>
      </section>
    </main>
  );
}

export default Table;
