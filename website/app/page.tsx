import HomeScene from '~/scenes/HomeScene';

export default function Home() {
  const dataUrl = process.env.NODE_ENV === 'production' ? './data.json' : '/data.json';

  return <HomeScene dataUrl={dataUrl} />;
}
