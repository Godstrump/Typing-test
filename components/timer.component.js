import { forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { styled } from '@mui/system';
import { Box } from '@mui/material';


const Time = styled('span')(({ theme, limit }) => ({
    fontSize: '2vw',
    fontFamily: theme.palette.fontFamily,
    color: limit
}))

const Timer = ({ timeup }, ref) => {
  const [timer, setTimer] = useState({ mins: null, secs: null });
  const [start, setStart] = useState(false);
  const [timeout, settimeout] = useState(null);
  

  const { mins, secs } = timer;

  const transformTime = (time) => {
    if (+time < 10) {
        return '0' + +time
    }
    return time
  }

  useImperativeHandle(ref, () => ({
    saveTimer: (name, value) => {
        if (name === 'secs' && value > 60) {
            setTimer((state) => ({ ...state, mins: value % 60 === 0 ? +state.mins + +value/60 : +Math.floor(value/60) + +state.mins, [name]: value % 60 }))
        } else {
            setTimer((state) => ({ ...state, [name]: value }));
        }
    },

    selectTimer: (val) => {
        setTimer((state) => ({ ...state, mins: val, secs: 0 }));
    },

    start: () => {
        startTimer();
    },

    stopTime: () => {
        clearTimeout(timeout)
        setStart(false)
        return timer
    }
}));
 
  const tick = () => {
    if (secs == 0 && +mins >= 1) {
      setTimer((state) => ({
        ...state,
        mins:
          +state.mins < 11 && state.mins != 0
            ? '0' + (state.mins - 1)
            : +state.mins - 1,
      }));
      setTimer((state) => ({ ...state, secs: 1 * 59 }));
    } else if (mins == 0 && secs == 0 && start) {
        timeup()
        setStart((state) => !state);
        setTimer({ mins: null, secs: null });
    } else {
        setTimer((state) => ({
          ...state,
          secs: state.secs < 11 ? '0' + +(state.secs - 1) : +state.secs - 1,
        }));
    }
  };

  const startTimer = () => {
    if (mins === null || secs === null) return;
    setStart(true);
  };

  useEffect(() => {
    if (start) {
      settimeout(setTimeout(() => tick(), 1000));
    }

    return () => {
      clearTimeout(timeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, secs]);

  return (
    <Box component="div" data-testid="timer">
      <Time data-testid="time" limit={mins == 0 && +secs < 11 ? 'red' : 'black'}>{mins !== null && secs !== null ? <span>{transformTime(mins) + ':' + transformTime(secs)}</span> : '0:00'}</Time>
    </Box>
  );
}

export default forwardRef(Timer)
