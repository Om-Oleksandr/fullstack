import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store/countSlice';

const CounterRedux = () => {
  const { count, step } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const handleAdd = () => dispatch(actions.addCount(step));
  const handleSub = () => dispatch(actions.subCount(step));
  const handleStep = ({ target: { value } }) =>
    dispatch(actions.setStep(Number(value)));
  return (
    <>
      <h2>count: {count}</h2>
      <button onClick={handleAdd}>add</button>
      <button onClick={handleSub}>sub</button>
      <input type="number" value={step} onChange={handleStep} />
    </>
  );
};

export default CounterRedux;
