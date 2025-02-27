import { redirect } from 'next/navigation';

export default async function Home() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  redirect(`/month/${currentYear}/${currentMonth}`);
  
  return null;
}
