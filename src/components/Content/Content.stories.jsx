import React from 'react';

import Content from './Content';

export default {
  title: 'components/Content',
  component: Content,
  parameters: {
    componentSubtitle: 'For primary page content'
  }
};

export const DefaultContent = () => {
  return (
    <Content title="This is a title" subtitle="And this is a subtitle.">
      <p>Pass the main content as child components.</p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis, harum
        magnam nesciunt, architecto facere nulla sit similique explicabo ducimus
        eveniet iusto alias! Fugiat provident eveniet maiores odit architecto
        reprehenderit!
      </p>
    </Content>
  );
};

DefaultContent.story = {
  name: 'title + subtitle + children'
};
