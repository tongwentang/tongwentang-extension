import { FC, Reducer, useReducer } from 'react';
import { AboutPage } from '../../pages/about/AboutPage';
import { FilterPage } from '../../pages/filter/FilterPage';
import { GeneralPage } from '../../pages/general/GeneralPage';
import { MenuPage } from '../../pages/menu/MenuPage';
import { WordPage } from '../../pages/word/WordPage';

export enum PageType {
  general = 'GENERAL',
  menu = 'MENU',
  filter = 'FILTER',
  word = 'WORD',
  about = 'ABOUT',
}

export type PageAction = { type: PageType };

export type PageState = { type: PageType; node: FC };

const pageReducer: Reducer<PageState, PageAction> = (s, { type }) => {
  switch (type) {
    case PageType.general:
      return { type, node: GeneralPage };
    case PageType.menu:
      return { type, node: MenuPage };
    case PageType.filter:
      return { type, node: FilterPage };
    case PageType.word:
      return { type, node: WordPage };
    case PageType.about:
      return { type, node: AboutPage };
  }
};

export const usePage = () => useReducer(pageReducer, { type: PageType.general, node: GeneralPage });
