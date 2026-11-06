
export interface CitySave {
  money: number;
  population: number;
  buildings: string[];
}

const SAVE_KEY = 'city-builder-save';

export function saveCity(data: CitySave): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erreur de sauvegarde', error);
  }
}

export function loadCity(): CitySave | null {
  try {
    const saved = localStorage.getItem(SAVE_KEY);

    if (!saved) return null;

    return JSON.parse(saved) as CitySave;
  } catch (error) {
    console.error('Erreur de chargement', error);
    return null;
  }
}

export function deleteCity(): void {
  localStorage.removeItem(SAVE_KEY);
}
