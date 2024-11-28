import Grid from "../components/Grid/Grid";
import Story from "../components/Story/Story";
import Bubble from "../components/Bubble/Bubble";
import Carousel from "../components/Carousel/Carousel";
import { EventKey } from "../types/common";

export const render = (event: EventKey, accountId: string) => {
  const EventFunction = {
    stories: <Story accountId={accountId} event={event} />,
    grid: <Grid accountId={accountId} />,
    bubble: <Bubble event={event} accountId={accountId} />,
    carousel: <Carousel accountId={accountId} />,
  };

  return EventFunction[event];
};
