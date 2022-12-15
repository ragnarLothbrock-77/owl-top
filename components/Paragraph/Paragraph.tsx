import React from 'react';
import styles from './Paragraph.module.css';
import { ParagraphProps } from './Paragraph.props';
import cn from 'classnames';

export const Paragraph = ({size = 'm', children, className, ...props}: ParagraphProps): JSX.Element => {
  return (
    <p 
      className={
        cn(styles.p, className, {
          [styles.small]: size == 's',
          [styles.regular]: size == 'm',
          [styles.large]: size == 'l',
        })
    }
    {...props}
    >{children}</p>
  );
};