const SOURCE = 'https://astrothemes.club/data/themes.json';

export async function fetchThemeApiData() {
  try {
    const res = await fetch(SOURCE, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    const data = await res.json();    
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('fetchThemeApiData', err);
    throw err;
  }
}