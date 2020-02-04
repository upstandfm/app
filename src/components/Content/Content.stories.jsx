import React from 'react';

import Content, { Title, Subtitle, Section, SectionTitle } from './Content';

export default {
  title: 'components/Content',
  component: Content,
  parameters: {
    componentSubtitle: 'For primary page content'
  }
};

export const DefaultContent = () => {
  return (
    <Content>
      <Title>This is a title</Title>
      <Subtitle>And this is a subtitle</Subtitle>

      <Section>
        <p>Pass the main content as child components.</p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>
      </Section>
    </Content>
  );
};

DefaultContent.story = {
  name: 'title + subtitle + children'
};

export const ContentSections = () => {
  return (
    <Content>
      <Title>This is a title</Title>
      <Subtitle>And this is a subtitle</Subtitle>

      <Section>
        <p>You can add multiple sections for more semantic grouping.</p>
      </Section>

      <Section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>
      </Section>

      <Section>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>
      </Section>
    </Content>
  );
};

ContentSections.story = {
  name: 'sections'
};

export const ContentSectionSubtitles = () => {
  return (
    <Content>
      <Title>This is a title</Title>
      <Subtitle>And this is a subtitle</Subtitle>

      <Section>
        <p>Sections can have subtitles.</p>
      </Section>

      <Section>
        <SectionTitle>Subtitle One</SectionTitle>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>
      </Section>

      <Section>
        <SectionTitle>Subtitle Two</SectionTitle>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nobis,
          harum magnam nesciunt, architecto facere nulla sit similique explicabo
          ducimus eveniet iusto alias! Fugiat provident eveniet maiores odit
          architecto reprehenderit!
        </p>
      </Section>
    </Content>
  );
};

ContentSectionSubtitles.story = {
  name: 'section subtitles'
};
