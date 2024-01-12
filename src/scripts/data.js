import { v4 as uuidv4 } from 'uuid';
import { convertMinutesToTime } from './dates';

const data = [];

const filterDataByDate = (data, date) => {
  return data.filter(
    (item) =>
      item.year === date.year &&
      item.month === date.month &&
      item.day === date.day
  );
};

const filterDataById = (data, id) => {
  console.log('filtering data by id');
  if (id === null) return null;
  const filteredData = data.filter((item) => item.id === id);

  if (filteredData.length === 0) return null;
  return filteredData[0];
};
const createDefaultTask = () => {
  let startTime = 420;
  let endTime = 720;

  return {
    text: 'Task 1',
    color: 'red',
    month: 8,
    day: 25,
    year: 2023,
    startTime,
    endTime,
    startTimeString: convertMinutesToTime(startTime),
    endTimeString: convertMinutesToTime(endTime),
    id: uuidv4(),
  };
};

const checkPayload = (payload) => {
  if (payload.text > 50) return false;
  return true;
};

const reducer = (state, action) => {
  if (action.type === 'add' || action.type === 'update') {
    const payloadCheck = checkPayload(action.payload);
    if (!payloadCheck) return state;
  }

  if (action.type === 'add') {
    return [
      ...state,
      {
        ...action.payload,
        id: uuidv4(),
      },
    ];
  }

  if (action.type === 'update') {
    return state.map((item) => {
      if (item.id === action.payload.id) return action.payload;
      return item;
    });
  }

  if (action.type === 'delete') {
    // console.log(state, 'the current state');
    // console.log(action, 'the current action');

    const filteredState = state.filter((item) => item.id !== action.id);
    console.log(filteredState, 'the filtered state');

    return filteredState;
  }

  throw new Error('Invalid action type');
};

export { data, createDefaultTask, reducer, filterDataByDate, filterDataById };
