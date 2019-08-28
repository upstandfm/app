import React from 'react';
import styled from 'styled-components';

import { useAuth0 } from '../auth0';

import { LogoWithName } from '../components/Logo';
import { GlitchOnInterval } from '../components/Glitch';
import Button from '../components/Button';
import Footer from '../components/Footer';

import {
  Container,
  Header,
  Main,
  Section,
  Center,
  Content,
  ContentHeader
} from './Layout';

const Tagline = styled.h1`
  margin: 1em 0;
  padding: 0;
  font-size: 42px;
  font-weight: normal;

  @media (max-width: 550px) {
    font-size: 34px;
  }
`;

const Intro = styled.div`
  margin: 2em 0;
  padding: 0 0 0 1em;
  font-weight: bold;
  border-left: 8px solid ${props => props.theme.primaryColor};

  @media (max-width: 550px) {
    font-size: 1.1em;
  }
`;

function UnauthenticatedApp() {
  const { login } = useAuth0();

  return (
    <Container>
      <Header>
        <LogoWithName data-cy="logo-with-name" />
      </Header>

      <Main>
        <Section>
          <Center>
            <Tagline data-cy="tagline">
              Async{' '}
              <GlitchOnInterval data-glitch-text="standups">
                standups
              </GlitchOnInterval>{' '}
              for remote teams
            </Tagline>

            <Button
              data-cy="login"
              invertTextColor
              onClick={login}
              aria-label="get started"
            >
              get started
            </Button>
          </Center>
        </Section>

        <Section secondary>
          <Content>
            <Intro>
              <p>
                Hi there!{' '}
                <span role="img" aria-label="waving hand">
                  👋
                </span>
                <br />
                I&apos;m building Upstand FM because I want to explore if
                there&apos;s a better way to do standups when working remotely.
              </p>
            </Intro>

            <ContentHeader>Can I already use this?</ContentHeader>

            <p>
              Not yet, but soon. Signups are <b>disabled</b> at the moment.
            </p>

            <p>
              I just started working on this and the app is not usable yet. But
              if you&apos;d like access, learn more, or just say hello, send me
              (Daniël) an email to{' '}
              <a href="mailto:hi@upstand.fm?subject=Hi there!">hi@upstand.fm</a>
              .
            </p>

            <ContentHeader>What does "async" mean?</ContentHeader>

            <p>
              Async is short for asynchronous. And in this context it refers to
              "how" we communicate within the team.
            </p>

            <p>
              In contrast, synchronous communication usually refers to a
              "face-to-face" exchange of information. Like having a meeting with
              people that are all present in the same room, or doing a
              conference call.
              <br />
              Everyone is (supposed to be) actively listening while the meeting
              takes place. And when someone asks you a question, you&apos;ll
              (usually) respond immediately, as part of the conversation.
            </p>

            <p>
              Asynchronous communication usually refers to an exchange of
              information that happens over time. Like sending and receiving
              emails, or chat messages.
              <br />
              Here, a response doesn&apos;t have to (nor is expected to!) be
              immediate.
            </p>

            <ContentHeader>What&apos;s a standup?</ContentHeader>

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

            <ContentHeader>Why are standups useful?</ContentHeader>

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

            <ContentHeader>What&apos;s the problem then?</ContentHeader>

            <p>
              Well, a fixed time must be picked for the entire team to be
              available. This is especially difficult for distributed teams that
              work remotely (usually due to timezone differences).
            </p>

            <p>
              Additionally, the actual time the standup takes place can
              interfere with people&apos;s schedule, and disrupt someone&apos;s
              workflow&mdash;due to context switching and "deep work"
              interference. This problem tends to be more prominent in a remote
              working environment, where people have different rhythms (because
              of personal preference and/or timezone difference).
            </p>

            <p>Other issues are:</p>

            <ul>
              <li>Discussions during the standup are common (sidebar!).</li>

              <li>
                Participants can "zone out", get distracted or loose interest.
              </li>

              <li>There&apos;s no efficient way to "replay" the standup.</li>

              <li>There&apos;s usually no record of previous standups.</li>
            </ul>

            <p>
              What if team members could easily share- and listen to daily
              standup updates, when it&apos;s most convenient for them?
            </p>

            <ContentHeader>How?</ContentHeader>

            <p>
              Stay <b>tuned</b> for updates!
            </p>
          </Content>
        </Section>
      </Main>

      <Footer />
    </Container>
  );
}

export default UnauthenticatedApp;
