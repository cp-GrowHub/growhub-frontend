import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DiscussionCard from '../components/Discussion/DiscussionCard';
import SearchForm from '../components/common/SearchForm';
import useInput from '../hooks/useInput';
import { asyncGetDiscussions } from '../states/discussions/thunk';
import { asyncReceiveUsers } from '../states/users/thunk';
import OutlineButton from '../components/common/OutlineButton';

export default function DiscussionPage() {
  const [keyword, onKeywordChange, resetKeyword] = useInput('');
  const [filter, setFilter] = useState('Latest');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const discussions = useSelector(
    (state) => state.discussions.discussions || []
  );
  const users = useSelector((state) => state.users || []);

  useEffect(() => {
    dispatch(asyncGetDiscussions());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  const filteredDiscussions = useMemo(() => {
    let filtered = [...discussions];

    if (keyword) {
      filtered = filtered.filter(
        (discussion) =>
          discussion.title.toLowerCase().includes(keyword.toLowerCase()) ||
          discussion.body.toLowerCase().includes(keyword.toLowerCase()) ||
          discussion.tags.some((tag) =>
            tag.toLowerCase().includes(keyword.toLowerCase())
          )
      );
    }

    if (filter === 'Latest') {
      return filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (filter === 'Top') {
      return filtered.sort((a, b) => b.comments.length - a.comments.length);
    }

    return filtered;
  }, [discussions, keyword, filter]);

  return (
    <div className="flex flex-col min-h-[90vh]">
      <header className="bg-card1 flex flex-row p-3 px-10 justify-between items-center">
        <div className="flex items-center text-text">
          <h1 className="text-2xl font-semibold">Discussion Page</h1>
        </div>
        <SearchForm
          searchKeyword={keyword}
          onSearch={onKeywordChange}
          resetSearch={resetKeyword}
        />
      </header>
      <div className="flex flex-col text-text p-3 gap-3">
        <div className="flex flex-row justify-between p-4">
          <div className="flex flex-row gap-4">
            <OutlineButton
              text="Latest"
              onClick={() => setFilter('Latest')}
              isActive={filter === 'Latest'}
            />
            <OutlineButton
              text="Top"
              onClick={() => setFilter('Top')}
              isActive={filter === 'Top'}
            />
          </div>
          <button
            className="text-bekgron bg-text px-6 p-2 rounded-3xl border-2 border-transparent hover:text-text hover:bg-bekgron hover:border-text"
            onClick={() => {
              navigate('/goals/createGoal');
            }}
          >
            + Create new post
          </button>
        </div>
        <div>
          <DiscussionCard discussions={filteredDiscussions} users={users} />
        </div>
      </div>
    </div>
  );
}
