import { v4 as uuidv4 } from 'uuid';
import { convertMinutesToTime } from './dates';

const data = [
  {
    text: 'Task 1',
    color: 'red',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 300,
    endTime: 720,
    startTimeString: convertMinutesToTime(300),
    endTimeString: convertMinutesToTime(720),
    id: uuidv4(),
  },
  {
    text: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
    color: 'red',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 240,
    endTime: 1489,
    startTimeString: convertMinutesToTime(240),
    endTimeString: convertMinutesToTime(1439),
    id: uuidv4(),
  },
  {
    text: 'Task 1',
    color: 'blue',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 420,
    endTime: 780,
    startTimeString: convertMinutesToTime(420),
    endTimeString: convertMinutesToTime(780),
    id: uuidv4(),
  },
  {
    text: 'Task 1',
    color: 'yellow',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 485,
    endTime: 720,
    startTimeString: convertMinutesToTime(485),
    endTimeString: convertMinutesToTime(720),
    id: uuidv4(),
  },
  {
    text: 'Task 1',
    color: 'yellow',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 420,
    endTime: 720,
    startTimeString: convertMinutesToTime(420),
    endTimeString: convertMinutesToTime(720),
    id: uuidv4(),
  },
];

const getTemporaryState = () => {};
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
