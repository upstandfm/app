import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Form,
  Section as FormSection,
  InlineLabel,
  Input,
  Description
} from '../components/Form';

import Button from '../components/Button';

export const CustomFormLabel = styled(InlineLabel)`
  grid-template-columns: 1fr auto;
`;

function NewInvite({ inviterFullName, createInvite, isCreating }) {
  const [email, setEmail] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState('');

  const emailInput = React.createRef();

  React.useEffect(() => {
    emailInput.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInput = e => {
    const isValid = emailInput.current.checkValidity();

    if (!isValid) {
      setFeedbackText('Invalid email address.');
    } else {
      setFeedbackText('');
    }

    setIsValid(isValid);
    setEmail(e.target.value);
  };

  const handleCreate = async e => {
    e.preventDefault();

    const data = {
      email,
      inviterFullName
    };

    try {
      await createInvite(data);

      // When the invite has been created, "reset" the form input
      setEmail('');
      setIsValid(false);
    } catch {
      // We need a try catch so we only reset the email when creating an invite
      // succeeds
      //
      // NOTE: "createInvite()" re-throws the error (which it handles) to make
      // this possible
      //
      // TODO: look into a more elegant way of doing this
    }
  };

  return (
    <Form>
      <FormSection>
        <CustomFormLabel htmlFor="email">
          <Input
            type="email"
            id="email"
            placeholder="user@domain"
            ref={emailInput}
            onChange={handleInput}
            value={email}
            disabled={isCreating}
          />

          <Button
            tertiary
            onClick={handleCreate}
            disabled={!isValid || isCreating}
          >
            {isCreating ? 'Sending..' : 'Send invite'}
          </Button>
        </CustomFormLabel>

        <Description error>{feedbackText}</Description>
      </FormSection>
    </Form>
  );
}

NewInvite.propTypes = {
  inviterFullName: PropTypes.string.isRequired,
  createInvite: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired
};

export default NewInvite;

export const LoadingNewInvite = () => (
  <Form>
    <FormSection>
      <CustomFormLabel htmlFor="email">
        <Input type="email" id="email" placeholder="user@domain" disabled />

        <Button tertiary disabled>
          Send invite
        </Button>
      </CustomFormLabel>

      <Description error></Description>
    </FormSection>
  </Form>
);
