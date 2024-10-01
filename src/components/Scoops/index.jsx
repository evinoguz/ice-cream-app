import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card";

const Scoops = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/scoops").then((res) => setData(res.data));
  }, []);

  const addToBasket = (item) => {
    const found = basket.find((i) => i.id === item.id);

    if (found) {
      const updated = { ...found, amount: found.amount + 1 };

      const temp = basket.map((i) => (i.id === found.id ? updated : i));

      setBasket(temp);
    } else {
      setBasket([...basket, { ...item, amount: 1 }]);
    }
  };

  const removeFromBasket = (id) => {
    const found = basket.find((i) => i.id === id);

    if (found.amount > 1) {
      const updated = { ...found, amount: found.amount - 1 };

      const temp = basket.map((i) => (i.id === found.id ? updated : i));

      setBasket(temp);
    } else {
      setBasket(basket.filter((i) => i.id !== id));
    }
  };

  const total = basket.reduce((total, i) => total + i.amount * 20, 0);

  return (
    <div>
      <h1>Dondurma Çeşitleri</h1>
      <p>
        Tanesi <span className="text-success">20</span>$
      </p>
      <h3>
        Çeşitler Ücreti{" "}
        <span data-testid="total" className="text-success">
          {total}
        </span>
        $
      </h3>
      <div className="p-3 row gap-5 mt-4 flex-wrap">
        {data.map((i) => {
          const found = basket.find((item) => item.id === i.id);

          return (
            <Card
              amount={found?.amount || 0}
              addToBasket={addToBasket}
              removeFromBasket={removeFromBasket}
              item={i}
              key={i.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Scoops;
