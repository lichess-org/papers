import { type RawPaper } from '~/lib/types';
import { formatPaper } from '~/lib/utils';
import HomeScene from '~/scenes/HomeScene';

import paperData from '../public/data.json';

const papers = (paperData as RawPaper[]).map(formatPaper).filter(paper => paper.title !== 'Untitled paper');

export default function Home() {
  return <HomeScene papers={papers} />;
}
