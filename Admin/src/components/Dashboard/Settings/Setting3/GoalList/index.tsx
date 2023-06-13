import React, {useEffect} from "react";

import './style.scss';

const GoalList: React.FC<{ goals: any[], selectHandle: any }> = ({goals, selectHandle}) => {

  return (
    <>
      <div className="goal-list">
        <div className="goal-list-buttons">
          {goals.length && goals.map((item: any, index: number) => (
            item.id &&
            <button
              key={index}
              type="button"
              className="btn btn-sm btn-mindmail btn-mindmail-primary font-weight-500"
              onClick={() => selectHandle(item)}
            >
              {item.type}
            </button>
          ))}
          <button
              key={0}
              type="button"
              className="btn btn-sm btn-mindmail btn-mindmail-primary font-weight-500"
              onClick={() => selectHandle(undefined)}
            >
              +
            </button>
        </div>
      </div>
      
    </>
  );
};

export default GoalList;
