import { STRINGS } from '../strings';

interface LinkItemsParams {
  name: string;
  link: string;
}

export const navBarItems: LinkItemsParams[] = [
  {
    name: STRINGS.about,
    link: '#About Surge'
  },
  {
    name: STRINGS.perks,
    link: '#Perks'
  },
  {
    name: STRINGS.roadmap,
    link: '#Roadmap'
  },
  {
    name: STRINGS.team,
    link: '#Team'
  },
  {
    name: STRINGS.faq,
    link: '#FAQ'
  }
];
