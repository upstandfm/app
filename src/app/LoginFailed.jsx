import React from 'react';
import PropTypes from 'prop-types';

function LoginFailed({ errMessage, handleRetry }) {
  return (
    <div>
      <header>
        <h1>Login Failed</h1>
      </header>

      <main>
        <section>
          <p>
            Something went wrong on our end when we tried to log you in. We
            encountered this error:
          </p>

          <pre>{errMessage}</pre>

          <p>We have been notified, but please try again:</p>

          <button onClick={handleRetry}>login</button>
        </section>

        <section>
          <p>
            If retrying didn&apos;t work, please send an email to{' '}
            <a href="mailto:support@upstand.fm">support@upstand.fm</a>. We'll do
            our best to get back to you as soon as possible.
          </p>

          <p>We apologize for this inconvenience.</p>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} upstand.fm</p>
      </footer>
    </div>
  );
}

LoginFailed.protoTypes = {
  errMessage: PropTypes.object.isRequired,
  handleRetry: PropTypes.func.isRequired
};

export default LoginFailed;
