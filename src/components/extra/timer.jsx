"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export const Timer = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  let startTime = null;
  let lastTime = parseFloat(sessionStorage.getItem("timeSpent")) || 0;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (startTime) {
          lastTime += (Date.now() - startTime) / 1000;
          setTimeSpent(lastTime);
          sessionStorage.setItem("timeSpent", lastTime);
        }
      } else {
        startTime = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      if (startTime) {
        lastTime += (Date.now() - startTime) / 1000;
        setTimeSpent(lastTime);
        sessionStorage.setItem("timeSpent", lastTime);
      }
    };

    startTime = Date.now();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    setTimeSpent(lastTime);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    setTotalTimeSpent(timeSpent.toFixed(2));
  }, [timeSpent]);

  return (
    <div className="text-center mt-4">
      <Badge className="p-2 bg-blue-100 text-blue-700">
        Time Spent on Page: {totalTimeSpent} seconds
      </Badge>
    </div>
  );
};
