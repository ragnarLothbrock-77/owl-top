import React, { useContext } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenu, PageItem } from '../../interfaces/menu.interface';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';
import Link from 'next/link';


const firstLevelMenu: FirstLevelMenu[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses},
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services},
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books},
  { route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Products}
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory } = useContext(AppContext);

  const buildFirstLevelMenu = () => {
    return (
      <>
        {
          firstLevelMenu.map(m => (
            <div key={m.route}>
              <Link href={`/${m.route}`}>
                <a>
                  <div className={cn(
                    styles.firstLevel, {
                      [styles.firstLevelActive]: m.id == firstCategory
                    }
                  )}>
                    {m.icon}
                    <span>{m.name}</span>
                  </div>
                </a>
              </Link>
              {m.id == firstCategory && buildSecondLevelMenu(m)}
            </div>
          ))
        }
      </>
    );
  };

  const buildSecondLevelMenu = (menuItem: FirstLevelMenu) => {
    return (
      <div className={styles.secondBlock}>
        {
          menu.map(item => (
            <div key={item._id.secondCategory}>
              <div className={styles.secondLevel}>{item._id.secondCategory}</div>
              <div className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: item.isOpened
              })}>
                {buildThirdLevelMenu(item.pages, menuItem.route)}
              </div>
            </div>
          ))
        }
      </div>
    );
  };

  const buildThirdLevelMenu = (pages: PageItem[], route: string) => {
    return (
      pages.map(p => (
        <Link href={`/${route}/${p.alias}`}>
          <a className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: false
          })}>
            {p.category}
          </a>
        </Link>
      ))
    );
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevelMenu()}
    </div>
  );
};