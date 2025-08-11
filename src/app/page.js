import ClientShell from '@/components/ClientWrap'; // we'll create a client wrapper file below
import { fetchThemeApiData } from '@/lib/api';

export default async function Page() {
  let apiData = [];
  try {
    apiData = await fetchThemeApiData();
  } catch (err) {
    console.error('Server fetch failed', err);
  }  

  return (
    <div className="flex gap-6">
      <ClientShell apiData={apiData} />
    </div>
  );
}