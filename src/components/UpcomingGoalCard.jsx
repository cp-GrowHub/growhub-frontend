import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

function UpcomingGoalCard({ title, daysLeft, isFinished, onToggleFinish }) {
  return (
    <div className="bg-card2 p-4 rounded-lg shadow-md text-text flex flex-row gap-4">
      <button onClick={onToggleFinish} className="text-2xl self-start py-2">
        {isFinished ? (
          <FaCheckCircle className="text-green-500" />
        ) : (
          <FaExclamationCircle className="text-red-500" />
        )}
      </button>
      <div className="flex-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p>{Math.round(daysLeft)} days left</p>
      </div>
    </div>
  );
}

UpcomingGoalCard.propTypes = {
  title: PropTypes.string.isRequired,
  daysLeft: PropTypes.number.isRequired,
  isFinished: PropTypes.bool.isRequired,
  onToggleFinish: PropTypes.func.isRequired,
};

export default UpcomingGoalCard;
