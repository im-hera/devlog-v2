'use client';

import styled from 'styled-components';
import Home from './Home';

const S = styled(Home)`
  .title-wrap {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2.4rem;
    margin: 5.2rem 0 4.8rem 0;
    padding: 0 0 3.2rem 0;
    border-bottom: 1px solid var(--border3);
  }

  .title-copy {
    max-width: 58rem;
    color: var(--text1);
  }

  .eyebrow {
    color: var(--text3);
    font-size: 1.3rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .title-row {
    display: flex;
    align-items: flex-end;
    gap: 1.6rem;
    margin-top: 1.2rem;

    h2 {
      font-size: 5.2rem;
      line-height: 0.95;
      color: var(--text1);
    }
  }

  .post-count {
    display: inline-flex;
    align-items: center;
    height: 3.2rem;
    padding: 0 1.2rem;
    border-radius: 999px;
    border: 1px solid var(--border3);
    background: var(--bg-element2);
    color: var(--text2);
    font-size: 1.4rem;
    white-space: nowrap;
  }

  .description {
    margin-top: 1.8rem;
    color: var(--text2);
    font-size: 1.8rem;
    line-height: 1.65;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 0.6rem;
  }

  @media screen and (max-width: 700px) {
    .title-wrap {
      align-items: stretch;
      flex-direction: column;
      margin: 3rem 0 3.6rem 0;
      padding-bottom: 2.4rem;
    }

    .title-row {
      align-items: flex-start;
      flex-direction: column;
      gap: 1rem;

      h2 {
        font-size: 3.8rem;
      }
    }

    .description {
      font-size: 1.6rem;
      line-height: 1.6;
    }

    .actions {
      align-self: flex-end;
      padding-bottom: 0;
    }
  }
`;

export default S;
