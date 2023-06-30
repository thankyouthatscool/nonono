import { useCallback, useEffect } from "react";

import { MonthsCarousel } from "@components/MonthsCarousel";
import { useAppDispatch } from "@hooks";
import { setIsLoading } from "@store";

export const AppRoot = () => {
  const dispatch = useAppDispatch();

  const handleInit = useCallback(() => {
    dispatch(setIsLoading(false));
  }, []);

  useEffect(() => {
    handleInit();
  }, []);

  return <MonthsCarousel />;
};
