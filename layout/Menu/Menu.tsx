import React, { useContext, KeyboardEvent } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenu, PageItem } from '../../interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';


export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const variants = {
    vissible: {
      marginBottom: 20,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: {
      marginBottom: 0
    }
  };

  const variantsChildren = {
    vissible: {
      opacity: 1,
      height: "auto"
    },
    hidden: {
      opacity: 0,
      height: 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      console.log();
      if (m._id.secondCategory == secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if(key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevelMenu = () => {
    return <>
      {
        firstLevelMenu.map(m => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <div className={cn(
                styles.firstLevel, {
                  [styles.firstLevelActive]: m.id == firstCategory
                }
              )}>
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id == firstCategory && buildSecondLevelMenu(m)}
          </div>
        ))
      }
    </>;
  };

  const buildSecondLevelMenu = (menuItem: FirstLevelMenu) => {
    return (
      <div className={styles.secondBlock}>
        {
          menu.map(item => {
            if (item.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
              item.isOpened = true;
            }

            return (
              <div key={item._id.secondCategory}>
                <div 
                  tabIndex={0} 
                  onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, item._id.secondCategory)} 
                  className={styles.secondLevel} 
                  onClick={() => openSecondLevel(item._id.secondCategory)}>{item._id.secondCategory}
                </div>
                <motion.div 
                  className={cn(styles.secondLevelBlock)}
                  layout
                  variants={variants}
                  initial={item.isOpened ? 'vissible' : 'hidden'}
                  animate={item.isOpened ? 'vissible' : 'hidden'}
                >
                  {buildThirdLevelMenu(item.pages, menuItem.route, item.isOpened ?? false)}
                </motion.div>
              </div>
            );
          })
        }
      </div>
    );
  };


  const buildThirdLevelMenu = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map(p => (
      (
        <motion.div key={p._id} variants={variantsChildren}>
          <Link
            tabIndex={isOpened ? 0 : -1}
            href={`/${route}/${p.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
            })}>
            {p.category}
          </Link>
        </motion.div>
      )
    ));
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevelMenu()}
    </div>
  );
};