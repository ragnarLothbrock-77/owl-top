import React, { KeyboardEvent, useEffect, useState } from 'react';
import styles from './Rating.module.css';
import cn from 'classnames';
import { RatingProps } from './Rating.props';
import Star from './star.svg';

export const Rating = ({isEditable = false, rating, setRating, ...props}: RatingProps): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating] ); 


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

  // const handleSpaceKey = (i: number, e: KeyboardEvent<SVGElement>) => {
  //   if (e.code != 'Space' || !setRating) {
  //     return;
  //   }
  //   setRating(i);
  // };

   
  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
          <Star 
            className={cn(styles.star, {
              [styles.filled]: i < currentRating
            })}
            // tabIndex={isEditable ? 0 : -1}
            onClick={() => resetRating(i + 1)}
            // onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpaceKey(i +1, e)}
          />
      );
    });
    setRatingArray(updatedArray);
  };

  return (
    <div {...props}>
      {
        ratingArray.map((r,i) => (
          <span 
            key={i}
            className={cn({[styles.editable]: isEditable})}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
          >
            {r}
        </span>))
      }
    </div>
  );
};