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
  if (id === null) return null;
  return data.filter((item) => item.id === id)[0];
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
  if (action.type === 'add' || action.type === 'edit') {
    const payloadCheck = checkPayload(action.payload);
    if (!payloadCheck) return state;
  }

  if (action.type === 'add') {
    console.log(
      [
        ...state,
        {
          ...action.payload,
          id: uuidv4(),
        },
      ],
      'the current data'
    );

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
    return state.filter((item) => item.id !== action.id);
  }

  throw new Error('Invalid action type');
};

export { data, createDefaultTask, reducer, filterDataByDate, filterDataById };
