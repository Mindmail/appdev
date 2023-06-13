import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GoalList from "./GoalList";
import { getGoals, addGoal, updateGoal, deleteGoal } from "../../../../store/Goals/actions";
import GoalInfo from './GoalInfo';

import "./style.scss";
//
const Setting3: React.FC = () => {
  const dispatch = useDispatch();
  const [goals, setGoals] = useState<any[]>([]);
  const [goalInfo, setGoalInfo] = useState<any>(undefined);

  useEffect(() => {
    getGoals().then((res) => {
      setGoals(res.data.data);
    });
  }, [])

  const onSelectHandle = (selectedGoal: any) => {
    setGoalInfo(selectedGoal);
  }

  const onSaveGoal = (isNew: number, changedGoalInfo: any) => {

    if (isNew == 1) {
      addGoal(changedGoalInfo).then((res) => {
        const newGoals = [...goals]; 
        newGoals.push({id: res.data.id, ...changedGoalInfo});
        setGoalInfo({id: res.data.id, ...changedGoalInfo});
        setGoals(newGoals); 
      })
    } else {
      updateGoal(changedGoalInfo).then((res) => {
        const newGoals = goals.map((item) => {
          if (item.id == changedGoalInfo.id)
            return changedGoalInfo;
          else return item;
        });
        setGoals(newGoals);
      })
    }
  }

  const onDeleteGoal = () => {
    if (goalInfo != undefined)
      deleteGoal(goalInfo).then((res) => {
        const newGoals = goals.filter((item) => item.id != goalInfo.id);
        setGoals(newGoals);
        setGoalInfo(undefined);
      })
  }

  return (
    <div className="setting-container">
      <div className="setting-body">
        <div className="setting-content">
          <GoalList goals={goals} selectHandle={onSelectHandle}/>
          <GoalInfo goalInfo={goalInfo} saveGoal={onSaveGoal} deleteGoal={onDeleteGoal}/>
        </div>
      </div>
    </div>
  );
};

export default Setting3;
