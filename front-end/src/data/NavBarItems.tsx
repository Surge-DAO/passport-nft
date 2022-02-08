import { STRINGS } from '../strings';

interface LinkItemsParams {
  name: string;
  link: string;
}

export const navBarItems: LinkItemsParams[] = [{
  name: STRINGS.about,
  link: '#'
}, {
  name: STRINGS.perks,
  link: '#'
}, {
  name: STRINGS.roadmap,
  link: '#'
}, {
  name: STRINGS.team,
  link: '#'
}, {
  name: STRINGS.faq,
  link: '#'
}];
