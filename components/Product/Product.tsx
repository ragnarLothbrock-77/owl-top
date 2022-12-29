import React, { ForwardedRef, forwardRef, useRef, useState } from 'react';
import styles from './Product.module.css';
import { ProductProps } from './Product.props';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { decOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    reviewRef.current?.focus();
  };

  const variants = {
    visible: {
      height: 'auto'
    },
    hidden: {
      height: 0,
      overflow: 'hidden'
    },
  };


  return (
    <div className={className} {...props} ref={ref}>
      <Card color={'white'} className={styles.product}>
        <div className={styles.logo}>
          <img 
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && <Tag className={styles.oldPrice} color='green'>{priceRu(product.oldPrice - product.price)}</Tag>}
        </div>
        <div className={styles.credit}>
          {priceRu(product.credit)}
          / 
          <span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}><Rating rating={product.reviewAvg ?? product.initialRating} /></div>
        <div className={styles.tags}>{product.categories.map(c => (<Tag className={styles.category} key={c} color={'ghost'}>{c}</Tag>))}</div>
        <div className={styles.priceTitle}>цена</div>
        <div className={styles.creditTitle}>кредит</div>
        <div className={styles.rateTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {decOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{ product.description}</div>
        <div className={styles.feature}>
          {
            product.characteristics.map(c => (
              <div className={styles.characteristics} key={c.name}>
                <span className={styles.characteristicsName}>{c.name}</span>
                <span className={styles.characteristicsDots}></span>
                <span className={styles.characteristicsValue}>{c.value}</span>
              </div>
            ))
          }
        </div>
        <div className={styles.advBlock}>
          {
            product.advantages && 
            <div className={styles.advantages}>
              <p className={styles.advTitle}>Преимущества</p>
              <div>{product.advantages}</div>
            </div>
          }
          {
            product.disadvantages && 
            <div className={styles.disadvantages}>
              <p className={styles.advTitle}>Недостатки</p>
              <div>{product.disadvantages}</div>
            </div>
          }
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button className={styles.infoButton} apperarance='primary' children={'Узнать подробнее'}/>
          <Button 
            className={styles.reviewButton} 
            apperarance='ghost' 
            children={'Читать отзывы'} 
            arrow={isReviewOpened ? 'down' : 'right'} 
            onClick={() => setIsReviewOpened(!isReviewOpened)}
          />
        </div>
      </Card>

      <motion.div 
        className={styles.reviewWrapper}
        variants={variants}
        initial={'hidden'}
        animate={isReviewOpened ? 'visible' : 'hidden'}
      >
        <Card color='blue' className={cn(styles.reviews, className)} ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1}>
          {
            product.reviews.map(r => (
              <div key={r._id}>
                <Review  review={r}/>
                <Divider />
              </div>
            ))
          }
          <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
        </Card>
      </motion.div>
    </div>
  );
}));