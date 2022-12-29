import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, Input, Paragraph, Rating, Tag, Textarea } from "../components/";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";


function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(0);
  
  return (
    <>
      <Htag tag="h1">Hi</Htag>
      <Button apperarance="primary" arrow="down">Button</Button>
      <Button apperarance="ghost" arrow="right">Button</Button>
      <Paragraph size="m">{"Студенты освоят не только hard skills, необходимые для работы веб-дизайнером, но и soft skills — навыки, которые позволят эффективно взаимодействовать в команде с менеджерами, разработчиками и маркетологами. Выпускники факультета могут успешно конкурировать с веб-дизайнерами уровня middle."}</Paragraph>
      <Tag color="ghost" size="m">Ghost</Tag>
      <Tag color="green" size="s">Green</Tag>
      <Tag color="primary" size="m">Primary</Tag>
      <Tag color="red" size="m">Red</Tag>
      <Tag color="grey" size="s">Grey</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
      <Input />
      <Textarea />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}
