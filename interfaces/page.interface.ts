export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export interface TopPageAdvantage {
  _id: string;
  title: string;
  description: string;
}

export interface HhData {
  _id: string;
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  updatedAt: Date;
}

export interface Blog {
  _id: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  views: number;
}

export interface Sravnikus {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  qas: unknown[];
}

export interface Learningclub {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  qas: unknown[];
}

export interface TopPageModel {
  _id: string;
  tags: string[];
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  seoText: string;
  tagsTitle: string;
  metaTitle: string;
  metaDescription: string;
  firstCategory: TopLevelCategory;
  advantages: TopPageAdvantage[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  hh: HhData;
  qas: unknown[];
  addresses: unknown[];
  categoryOn: string;
  blog: Blog;
  sravnikus: Sravnikus;
  learningclub: Learningclub;
}