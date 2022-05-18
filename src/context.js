import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const url = "https://api.godsunchained.com/v0/proto";
const immutableURL = "https://api.x.immutable.com/v1/orders?";
const coinURL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum%2Cgods-unchained&vs_currencies=usd";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardPrices, setCardPrices] = useState([]);
  const [coinPrices, setCoinPrices] = useState({});

  //Fetch all cards from GODS API
  const fetchTotal = async () => {
    setLoading(true);
    try {
      let response = await axios(url);
      const total = response.data.total;
      response = await axios(
        `https://api.godsunchained.com/v0/proto?perPage=${total}`
      );
      const cardData = response.data.records;
      setCards(cardData.slice(0, 25));
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  //Fetch card prices from IMMU API
  const axiosAll = async (cardID) => {
    if (loading) {
      return;
    }
    axios
      .all([
        await axios.get(immutableURL, {
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
        }),
        await axios.get(immutableURL, {
          params: {
            direction: "asc",
            include_fees: "true",
            order_by: "buy_quantity",
            page_size: "1",
            sell_metadata: `{"proto":["${cardID}"],"quality":["Meteorite"]}`,
            sell_token_type: "ERC721",
            status: "active",
            sell_token_address: "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c",
            buy_token_address: "0xccc8cb5229b0ac8069c51fd58367fd1e622afd97",
          },
        }),
      ])
      .then((responseArr) => {
        const cardName =
          responseArr[0].data.result[0].sell.data.properties.name;
        const ethPrice =
          responseArr[0].data.result[0].buy.data.quantity / 1000000000000000000;
        const godsPrice =
          responseArr[1].data.result[0].buy.data.quantity / 1000000000000000000;

        const difference = calculateArbitrage(ethPrice, godsPrice);

        setCardPrices((prevCards) => [
          ...prevCards,
          {
            id: cardID,
            cardName: cardName,
            ethPrice: ethPrice,
            godsPrice: godsPrice,
            difference: difference,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClick = () => {
    if (loading) {
      return;
    }
    let promise = Promise.resolve();
    setCardPrices([]);

    cards.map(function (item) {
      promise = promise.then(function () {
        const { id } = item;
        axiosAll(id);
        return new Promise(function (resolve) {
          setTimeout(resolve, 500);
        });
      });
    });
  };

  const calculateArbitrage = (ethPrice, godsPrice) => {
    const ethPriceDollar = coinPrices.eth * ethPrice;
    const godsPriceDollar = coinPrices.gods * godsPrice;

    if (ethPriceDollar === godsPriceDollar) {
      return 0;
    }
    let priceChange =
      (Math.abs(godsPriceDollar - ethPriceDollar) / ethPriceDollar) * 100;
    if (godsPriceDollar < ethPriceDollar) {
      priceChange = priceChange * -1;
    }
    return priceChange;
  };

  const fetchCoins = async () => {
    let response = await axios(coinURL);
    let eth = response.data.ethereum.usd;
    let gods = response.data["gods-unchained"].usd;
    setCoinPrices({ eth, gods });
  };

  useEffect(() => {
    fetchTotal();
    fetchCoins();
  }, []);

  useEffect(() => {
    handleClick();
  }, [loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCoins();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider
      value={{ loading, cardPrices, handleClick, coinPrices }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
