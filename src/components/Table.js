import { React, useEffect, useState, useCallback } from "react";
import axios from "axios";

const url = "https://api.godsunchained.com/v0/proto";
const ethURL = "https://api.x.immutable.com/v1/orders?";

function Table() {
  const [cards, setCards] = useState([1]);
  const [loading, setLoading] = useState(true);
  const [ethPrices, setEthPrices] = useState([]);

  const fetchTotal = async () => {
    try {
      let response = await axios(url);
      const total = response.data.total;
      // console.log(total);
      response = await axios(
        `https://api.godsunchained.com/v0/proto?perPage=${total}`
      );
      const cardData = response.data.records;
      // console.log(cardData);
      setCards(cardData.slice(0, 10));
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  const fetchEthOrder = async (cardID) => {
    try {
      const response = await axios(ethURL, {
        params: {
          direction: "asc",
          include_fees: "true",
          order_by: "buy_quantity",
          page_size: "1",
          sell_metadata: `{"proto":["${cardID}"],"quality":["Meteorite"]}`,
          sell_token_type: "ERC721",
          status: "active",
          sell_token_address: "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c",
          buy_token_type: "ETH",
        },
      });
      const cardName = response.data.result[0].sell.data.properties.name;
      const ethPrice =
        response.data.result[0].buy.data.quantity / 1000000000000000000;
      // console.log(`${cardName} ${ethPrice}`);
      return { cardName, ethPrice };
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleClick = () => {
    cards.map((item) => {
      const { id } = item;
      let jsonPromise = fetchEthOrder(id);
      jsonPromise.then((result) =>
        console.log(result.cardName + result.ethPrice)
      );
    });
  };
  useEffect(() => {
    fetchTotal();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="box-border p-0 m-0 bg-slate-400 ">
      <section className="pt-20 mt-4 bg-slate-700 sm:container sm:mx-auto ">
        {cards.map((item) => {
          const { name, id } = item;
          return (
            <p className="text-cyan-200" key={id}>
              {name}
            </p>
          );
        })}
      </section>
      <button
        onClick={() => handleClick()}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
      >
        Click Me
      </button>
    </main>
  );
}

export default Table;
