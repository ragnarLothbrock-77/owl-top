import React from 'react';
import styles from './Tag.module.css';
import { TagProps } from './Tag.props';
import cn from 'classnames';

export const Tag = ({size = 's', children, color = 'ghost', href, className, ...props}: TagProps): JSX.Element => {
  return (
    <div 
      className={
        cn(styles.tag, className, {
          [styles.small]: size == 's',
          [styles.regular]: size == 'm',
          [styles.ghost]: color == 'ghost',
          [styles.red]: color == 'red',
          [styles.green]: color == 'green',
          [styles.grey]: color == 'grey',
          [styles.primary]: color == 'primary'
        })
    }
    {...props}
    >
      {
        href 
        ? <a href={href}>{children}</a>
        : <>{children}</>
      }
    </div>
  );
};