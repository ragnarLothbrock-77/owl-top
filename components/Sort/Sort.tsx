import React from 'react';
import styles from './Sort.module.css';
import { SortEnum, SortProps } from './Sort.props';
import SortIcon from './Sort.svg';
import cn from 'classnames';

export const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <button
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort == SortEnum.Rating
        })}
        aria-selected={sort == SortEnum.Rating}
      >
        <SortIcon className={styles.sortIcon}/> По рейтенгу
      </button>

      <button
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort == SortEnum.Price
        })}
        aria-selected={sort == SortEnum.Price}
      >
        <SortIcon className={styles.sortIcon}/> По цене
      </button>
    </div>
  );
};