import React, { useState, useEffect } from "react";
import ChatBot from 'react-simple-chatbot';
import "./style.scss";

const GoalInfo: React.FC<{goalInfo: any, saveGoal: any, deleteGoal: any}> = ({goalInfo, saveGoal, deleteGoal}) => {
  
  const [goalType, setGoalType] = useState('');
  const [goalCaption, setGoalCaption] = useState('');
  const [goalChatSteps, setGoalChatSteps] = useState('');

  const handleSave = () => {
    const question = goalChatSteps == '' ? null : goalChatSteps;
    if (goalInfo == undefined)
      saveGoal(1, {type: goalType, caption: goalCaption, question: question});
    else saveGoal(0, {id: goalInfo.id, type: goalType, caption: goalCaption, question: question});
  }

  useEffect(() => {
    if (goalInfo != undefined) {
      setGoalType(goalInfo.type);
      setGoalCaption(goalInfo.caption);
      if (goalInfo.question == null)
        setGoalChatSteps("");  
      else setGoalChatSteps(goalInfo.question);
    }else {
      setGoalType('');
      setGoalCaption('');
      setGoalChatSteps('');  
    }
  },[goalInfo])

  return (
    <div className="div-goal">
      <div className="div-goalinfo">
        <div className="div-name">
          <p>Goal Type</p>
          <input type="text" value={goalType} onChange={(e) => setGoalType(e.target.value)}/>
        </div>
        <div className="div-email">
          <p>Goal Caption</p>
          <input type="text" value={goalCaption} onChange={(e) => setGoalCaption(e.target.value)} />
        </div>
        <div className="div-email">
          <p>Goal Chat Steps</p>
          <textarea value={goalChatSteps} rows={5} onChange={(e) => setGoalChatSteps(e.target.value)} />
        </div>
        <div className="div-action">
          <div className="div-save-delete">
            <button onClick={handleSave}>
              Save
            </button>
            <button onClick={deleteGoal}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalInfo;
