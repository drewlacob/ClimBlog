import React from 'react';
import { useScrollTrigger } from '@mui/material';

export default function TransparentOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
      opacity: trigger ? 0.8 : 1,
    },
  });
}
