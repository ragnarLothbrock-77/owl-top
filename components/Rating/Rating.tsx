import React, { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styles from './Rating.module.css';
import cn from 'classnames';
import { RatingProps } from './Rating.props';
import Star from './star.svg';

export const Rating = forwardRef(({className, isEditable = false, rating, error, tabIndex, setRating, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, tabIndex] ); 


  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }
    if (!rating && i == 0) {
      return tabIndex ?? 0;
    }
    if (r == i + 1) {
      return tabIndex ?? 0;
    }
    return -1;
  };


  const changeDisplay = (i: number) => {
    if (isEditable && setRating) {
      constructRating(i);
    }
  };

  const resetRating = (i: number) => {
    if (isEditable && setRating) {
      setRating(i);
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if (!isEditable || !setRating) {
      return;
    }
    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      if (!rating) {
        setRating(1);
      } else {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
      }
      ratingRef.current[rating]?.focus();
    }
    if (e.code == 'ArrowDown' || e.code == 'ArrowLeft') {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
      ratingRef.current[rating - 2]?.focus();
    }
  };

   
  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
          <Star 
            className={cn(styles.star, {
              [styles.filled]: i < currentRating
            })}
          />
      );
    });
    setRatingArray(updatedArray);
  };

  return (
    <div 
      {...props} 
      ref={ref}
      className={cn(className, styles.ratingWrapper)}
    >
      {
        ratingArray.map((r,i) => (
          <span 
            key={i}
            className={cn({
              [styles.editable]: isEditable,
              [styles.error]: error
            })}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            tabIndex={computeFocus(rating, i)}
            ref={r => ratingRef.current?.push(r)}
            onClick={() => resetRating(i + 1)}
            onKeyDown={handleKey}
          >
            {r}
        </span>))
      }
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});