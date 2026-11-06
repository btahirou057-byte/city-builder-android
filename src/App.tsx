
import React, { useState, useEffect } from 'react';
import { saveCity, loadCity } from './storage/save';

const initialCity = loadCity();

export default function App() {
  const [money, setMoney] = useState(
    initialCity?.money ?? 10000
  );

  const [population, setPopulation] = useState(
    initialCity?.population ?? 0
  );

  const [buildings, setBuildings] = useState<string[]>(
    initialCity?.buildings ?? []
  );

  const [message, setMessage] = useState(
    'Bienvenue dans ta nouvelle ville !'
  );

  useEffect(() => {
    saveCity({ money, population, buildings });
  }, [money, population, buildings]);

  const construct = (name: string, price: number) => {
    if (money < price) {
      setMessage("Pas assez d'argent !");
      return;
    }

    setMoney(previous => previous - price);
    setPopulation(previous => previous + 5);
    setBuildings(previous => [...previous, name]);
    setMessage(name + ' construit avec succès !');
  };

  const earnMoney = () => {
    setMoney(previous => previous + 500);
    setMessage('Tu as gagné 500 pièces !');
  };

  return (
    <main className="game">
      <header>
        <h1>🏙️ CITY BUILDER</h1>
        <p>Construis la ville de tes rêves !</p>
      </header>

      <section className="stats">
        <div>💰 Argent : {money} $</div>
        <div>👥 Population : {population}</div>
        <div>🏠 Bâtiments : {buildings.length}</div>
      </section>

      <section className="city">
        <h2>🌳 Ma ville</h2>

        {buildings.length === 0 ? (
          <p>Ta ville est vide. Commence à construire !</p>
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

        <button onClick={() => construct('🏠 Maison', 500)}>
          🏠 Maison - 500 $
        </button>

        <button onClick={() => construct('🏢 Immeuble', 2000)}>
          🏢 Immeuble - 2000 $
        </button>

        <button onClick={() => construct('🏪 Magasin', 1000)}>
          🏪 Magasin - 1000 $
        </button>

        <button onClick={() => construct('🌳 Parc', 700)}>
          🌳 Parc - 700 $
        </button>

        <button onClick={earnMoney}>
          💵 Gagner 500 $
        </button>

        <p>{message}</p>
        <p>💾 Sauvegarde automatique activée</p>
      </section>
    </main>
  );
}
