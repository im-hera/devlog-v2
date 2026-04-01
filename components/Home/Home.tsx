'use client';

import { useState, useCallback } from 'react';
import Posts from '@components/Posts';
import CategoryFilter from '@components/CategoryFilter';
import TextFilter from '@components/TextFilter';

import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { Response } from '@interfaces/index';

interface IHomeProps {
  className?: string;
  initialPosts: Response<PageObjectResponse[]>;
}

const Home: React.FC<IHomeProps> = ({ className, initialPosts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [enteredText, setEnteredText] = useState<string>('');
  const totalPosts = initialPosts.data.length;

  const handleChangeFilter = useCallback((value: string) => {
    setSelectedCategory((prev) =>
      prev.find((v) => v === value)
        ? prev.filter((v) => v !== value)
        : prev.concat(value)
    );
  }, []);

  const handleSubmitTextFilter = useCallback((value: string) => {
    setEnteredText(value);
  }, []);

  return (
    <div className={`contents ${className}`}>
      <div className="title-wrap">
        <div className="title-copy">
          <p className="eyebrow">im-hera archive</p>
          <div className="title-row">
            <h2>Posts</h2>
            <span className="post-count">{totalPosts}개의 기록</span>
          </div>
          <p className="description">
            우당탕탕 개발 생활
          </p>
        </div>
        <div className="actions">
          <TextFilter
            onSubmit={handleSubmitTextFilter}
            enteredText={enteredText}
          />
          <CategoryFilter
            onChange={handleChangeFilter}
            value={selectedCategory}
          />
        </div>
      </div>

      <Posts
        initialPosts={initialPosts}
        selectedCategory={selectedCategory}
        enteredText={enteredText}
      />
    </div>
  );
};

export default Home;
