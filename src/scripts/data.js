import { v4 as uuidv4 } from 'uuid';
import { convertMinutesToTime } from './dates';

const data = [
  {
    text: 'Task 1',
    color: 'red',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 420,
    endTime: 720,
    startTimeString: convertMinutesToTime(420),
    endTimeString: convertMinutesToTime(720),
    id: uuidv4(),
  },
  {
    text: 'Task 1',
    color: 'red',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 420,
    endTime: 720,
    startTimeString: convertMinutesToTime(420),
    endTimeString: convertMinutesToTime(720),
    id: uuidv4(),
  },
  {
    text: 'Task 1',
    color: 'red',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 420,
    endTime: 720,
    startTimeString: convertMinutesToTime(420),
    endTimeString: convertMinutesToTime(720),
    id: uuidv4(),
  },
  {
    text: 'Task 1',
    color: 'red',
    month: 8,
    day: 25,
    year: 2023,
    startTime: 420,
    endTime: 720,
    startTimeString: convertMinutesToTime(420),
    endTimeString: convertMinutesToTime(720),
    id: uuidv4(),
  },
  {
    text: 'Task 1',
    color: 'red',
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

const reducer = (state, action) => {
  console.log('');
  switch (action.type) {
    case 'add':
      return [...state, action.payload];

    case 'update':
      return state.map((item) => {
        if (item.id === action.payload.id) return action.payload;
        return item;
      });

    case 'delete':
      return state.filter((item) => item.id !== action.id);
    default:
      throw new Error('Invalid action type');
  }
};

export { data, createDefaultTask, reducer };
