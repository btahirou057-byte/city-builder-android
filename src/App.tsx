
import React, { useState } from 'react';

export default function App() {
  const [money, setMoney] = useState(10000);
  const [population, setPopulation] = useState(0);
  const [buildings, setBuildings] = useState<string[]>([]);

  const construct = (name: string, price: number) => {
    if (money < price) {
      alert("Pas assez d'argent !");
      return;
    }

    setMoney(money - price);
    setPopulation(population + 5);
    setBuildings([...buildings, name]);
  };

  return (
    <main className="game">
      <header>
        <h1>🏙️ CITY BUILDER</h1>
        <p>Construis ta propre ville !</p>
      </header>

      <section className="stats">
        <div>💰 Argent : {money} $</div>
        <div>👥 Population : {population}</div>
        <div>🏠 Bâtiments : {buildings.length}</div>
      </section>

      <section className="city">
        <h2>🌳 Ma ville</h2>
        {buildings.length === 0 ? (
          <p>Ta ville est encore vide. Construis ton premier bâtiment !</p>
        ) : (
          <div className="buildings">
            {buildings.map((building, index) => (
              <div className="building" key={index}>
                {building}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="shop">
        <h2>🏗️ Construction</h2>
        <button onClick={() => construct("🏠 Maison", 500)}>
          🏠 Maison - 500 $
        </button>
        <button onClick={() => construct("🏢 Immeuble", 2000)}>
          🏢 Immeuble - 2000 $
        </button>
        <button onClick={() => construct("🏪 Magasin", 1000)}>
          🏪 Magasin - 1000 $
        </button>
        <button onClick={() => construct("🌳 Parc", 700)}>
          🌳 Parc - 700 $
        </button>
      </section>
    </main>
  );
      }
