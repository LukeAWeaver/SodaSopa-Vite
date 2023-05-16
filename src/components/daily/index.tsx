import React, { useState, useEffect } from "react";
import { Typography, Paper, Stack } from "@mui/material";

const getNextInterval = () => {
  const now = new Date();
  const nextInterval = new Date(now);
  nextInterval.setUTCHours(Math.ceil(now.getUTCHours() / 4) * 4, 0, 0, 0);
  if (nextInterval.getTime() <= now.getTime()) {
    nextInterval.setUTCHours(nextInterval.getUTCHours() + 4);
  }
  return nextInterval;
};

const getRemainingTime = () => {
  const now = new Date();
  const nextInterval = getNextInterval();
  return nextInterval.getTime() - now.getTime();
};

const DailyComponent: React.FC = () => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(getRemainingTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(remainingTime / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  return (
    <Paper elevation={2}>
      <Stack direction={"column"}>
        <Typography align="center" variant="body1">
          Next loot crate in
        </Typography>
        <Typography align="center" variant="body2">
          {hours}h {minutes}m {seconds}s
        </Typography>
      </Stack>
    </Paper>
  );
};

export default DailyComponent;
