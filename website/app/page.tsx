import HomeScene from '~/scenes/HomeScene';

const basePath = process.env.GITHUB_ACTIONS === 'true' ? '/lichess-papers' : '';

export default function Home() {
  return <HomeScene dataUrl={`${basePath}/data.json`} />;
}
