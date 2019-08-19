import React from 'react';
import styled from 'styled-components';

import { useAuth0 } from '../auth0';

import Button from '../components/Button';
import Copyright from '../components/Copyright';

import {
  FOOTER_LINKS_BY_COLUMN,
  Footer,
  FooterWrapper,
  FooterBrand,
  FooterColumns,
  FooterColumn,
  FooterLink
} from '../components/Footer';

import {
  Container,
  Main,
  Section,
  Content,
  ContentHeader,
  ContentSubHeader
} from './Layout';

import { BrandWrapper, Logo, BrandName, BrandDescription } from './Brand';

const MassiveButton = styled(Button)`
  width: 300px;
  margin: 3em 0 0 0;
  padding: 26px;
  font-size: 24px;
  background-color: var(--color-green);

  @media (max-width: 550px) {
    width: 70%;
    padding: 24px;
    font-size: 22px;
  }
`;

const Intro = styled.p`
  font-size: 26px;
  font-weight: bold;
`;

function UnauthenticatedApp() {
  const { login } = useAuth0();

  return (
    <Container>
      <Main>
        <Section>
          <BrandWrapper>
            <Logo />

            <BrandName>Upstand FM</BrandName>

            <BrandDescription>
              Asynchronous standups for remote teams.
            </BrandDescription>

            <MassiveButton onClick={login}>get started</MassiveButton>
          </BrandWrapper>
        </Section>

        <Section secondary>
          <Content>
            <ContentHeader>
              Hi there!{' '}
              <span role="img" aria-label="waving hand">
                👋
              </span>
            </ContentHeader>

            <Intro>
              I&apos;m building this because I want to explore if there&apos;s a{' '}
              <b>better way to do standups, when working remotely</b>.
            </Intro>

            <ContentSubHeader>Can I already use this?</ContentSubHeader>

            <p>
              Not yet, but soon, I&apos;d like to get feedback as soon as
              possible.
              <br />
              However, signups are <b>disabled</b> at the moment.
            </p>

            <p>
              I just started working on this and I'm building the whole thing,
              end-to-end, by myself, in my free time{' '}
              <span role="img" aria-label="flexed bicep">
                💪
              </span>
              .
            </p>

            <p>
              But if you&apos;d like access, learn more, or just say hello, send
              me (Daniël) an email to{' '}
              <a href="mailto:hi@upstand.fm?subject=Hi there!">hi@upstand.fm</a>
              .
            </p>

            <p>
              I also plan to build the whole thing in the open, all code can be
              found on{' '}
              <a
                href="https://github.com/upstandfm"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>

            <ContentSubHeader>What does asynchronous mean?</ContentSubHeader>

            <p>
              Synchronous communication usually refers to a "face-to-face"
              exchange of information. Like having a meeting with people that
              are all present in the same room, or doing a conference call.
              <br />
              Everyone is (supposed to be) actively listening while the meeting
              takes place. And when someone asks you a question, you'll
              (usually) respond immediately, as part of the conversation.
            </p>

            <p>
              Asynchronous communication usually refers to communication that
              happens over time. Like sending and receiving emails, or chat
              messages.
              <br />
              Here, a response doesn&apos;t have to (and isn&apos;t expected
              to!) be immediate.
            </p>

            <ContentSubHeader>What&apos;s a standup?</ContentSubHeader>

            <p>
              It&apos;s a common ritual among agile/scrum teams. Usually every
              day all team members will gather in person, and each person will
              answer 3 questions:
            </p>

            <ol>
              <li>What did you work on yesterday?</li>
              <li>What will you work on today?</li>
              <li>Do you have any impediments?</li>
            </ol>

            <p>
              After each team member answers these questions&mdash;usually
              referred to as "the update"&mdash;work will resume (in theory{' '}
              <span
                role="img"
                aria-label="grinning face with aquinting eyes and sweat drop"
              >
                😅
              </span>
              ).
            </p>

            <ContentSubHeader>Why are standups useful?</ContentSubHeader>

            <p>
              When executed correctly, standups make the team aware of what
              everyone is working on, and what they might be struggling with.
            </p>

            <p>
              In general, standups improve the flow of information. They help
              participants with getting a deeper understanding of the problem
              space they are working in. They also stimulate everyone to help
              each other, and share/synchronize their understanding of shared
              goals.
            </p>

            <p>
              Effectively, they contribute to a stimulating work environment.
            </p>

            <ContentSubHeader>What&apos;s the problem then?</ContentSubHeader>

            <p>
              Well, a fixed time must be picked for the entire team to be
              available. This is especially difficult for distributed teams that
              work remotely (usually due to timezone differences).
            </p>

            <p>
              Additionally, the actual time the standup takes place can
              interfere with people&apos;s schedule, or disrupt someone&apos;s
              workflow&mdash;due to context switching and "deep work"
              interference. This problem tends to be more prominent in a remote
              working environment, where people have different rhythms&mdash;due
              to personal preference and/or timezone difference.
            </p>

            <p>Other issues are:</p>

            <ul>
              <li>
                Discussions during the standup are common (sidebar!), making the
                meeting less efficient.
              </li>

              <li>
                Participants can "zone out", get distracted or loose interest
                (especially if the standup takes a long time).
              </li>

              <li>
                There&apos;s no efficient way to "replay" the standup&mdash;in
                case someone couldn&apos;t attend, or when an "indirect" team
                member (like a manager) would like to be kept in the loop.
              </li>

              <li>There&apos;s usually no record of previous standups.</li>
            </ul>

            <p>
              What if team members could easily share- and listen to standup
              updates, whenever they want?
            </p>

            <ContentSubHeader>How?</ContentSubHeader>

            <p>Stay tuned for updates!</p>
          </Content>
        </Section>

        <Footer>
          <FooterWrapper>
            <FooterBrand>
              <Copyright />
            </FooterBrand>

            <FooterColumns>
              {FOOTER_LINKS_BY_COLUMN.map((links, i) => {
                return (
                  <FooterColumn key={`footer-column-${i}`}>
                    {links.map(link => {
                      return (
                        <FooterLink
                          key={`footer-column-link-${link.name}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.name}
                        </FooterLink>
                      );
                    })}
                  </FooterColumn>
                );
              })}
            </FooterColumns>
          </FooterWrapper>
        </Footer>
      </Main>
    </Container>
  );
}

export default UnauthenticatedApp;
