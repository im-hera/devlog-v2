'use client';

import styled from 'styled-components';
import Posts from './Posts';

const S = styled(Posts)`
  > ul {
    display: flex;
    flex-direction: column;
  }

  > ul > li + li {
    margin-top: 5.6rem;
    padding-top: 5.6rem;
    border-top: 1px solid var(--border3);
  }
`;

export default S;
