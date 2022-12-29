import React, { useState } from 'react';
import cn from 'classnames';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import CloseIcon from './close.svg';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import { Controller, useForm } from 'react-hook-form';
import { IReviewForm, IReviewResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';

export const ReviewForm = ({ productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>();

  const submitHandler = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewResponse>(API.review.createDemo, {...formData, productId});
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setIsError('Что то пошло не так');
      }
    } catch (error) {
      if (error instanceof Error) {
        setIsError(error.message);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.reviewForm}>
        <Input 
          {...register('name', {required: {value: true, message: 'Заполните имя'}})} 
          placeholder='Имя'
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
        />
        <Input 
          {...register('title', {required: {value: true, message: 'Заполните заголовок'}})} 
          placeholder='Заголовок отзыва' 
          className={styles.title}
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.rating}>
          <span>Оценка</span>
          <Controller 
            rules={{required: {value: true, message: 'Поставте оценку'}}}
            control={control}
            name={'rating'}
            render={({ field }) => (
              <Rating 
                ref={field.ref}
                rating={field.value}
                setRating={field.onChange}
                isEditable
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea 
          {...register('description', {required: {value: true, message: 'Заполните описание'}})}
          placeholder='Текст отзыва' 
          className={styles.description} 
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.submit}>
          <Button apperarance='primary' children={'Отправить'} tabIndex={isOpened ? 0 : -1} />
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {
        isSuccess &&  
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибоб ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
        </div>
      }
      {
        isError && 
        <div className={cn(styles.error, styles.panel)}>
          Что то пошло не так, попробуйте перезагрузить страницу
          <CloseIcon className={styles.close} onClick={() => setIsError(undefined)} />
        </div>
      }
    </form>
  );
};