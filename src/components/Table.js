import { React, useEffect, useState } from "react";
import axios from "axios";

const url = "https://api.godsunchained.com/v0/proto";

function Test() {
  const [cards, setCards] = useState([]);

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
      setCards(cardData);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, [url]);
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
    </main>
  );
}

export default Test;
