import React, { useEffect, useReducer } from 'react';
import styles from './TopPageComponent.module.css';
import { TopPageComponentProps } from './TopPageComponent.props';
import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { SortReducer } from './sort.reducer';
import { useScrollY } from '../../hooks/useScrollY';

export const TopPageComponent = ({ page, firstCategory, products }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort}, dispatchSort] = useReducer(SortReducer, {products, sort: SortEnum.Rating});

  const y = useScrollY();

  const setSort = (sort: SortEnum) => {
    dispatchSort({type: sort});
  };

  useEffect(() => {
    dispatchSort({type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag color='grey' size='m' aria-label={products.length + 'элементов'}>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        {sortedProducts && sortedProducts.map(p => (<Product layout key={p._id} product={p}/>))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag='h2'>Вакакнсии - {page.category}</Htag>
        <Tag color='red' size='m'>hh.ru</Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && 
        <>
          <Htag tag='h2' children={'Преимущества'} />
          <Advantages advantages={page.advantages}></Advantages>
        </>
      }
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText}}/>}
      <Htag tag='h2' children={'Получаемые навыки'} />
      {page.tags.map(t => (
        <Tag key={t} children={t} color='primary' />
      ))}
    </div>
  );
};