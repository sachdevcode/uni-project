import { render } from "./lib/Data";
import { WidgetProps } from "./types/type";

const Widget = ({ event, accountId }: WidgetProps) => {
  if (event && accountId) {
    return <div>{render(event, accountId)}</div>;
  } else {
    <div>account ID and event ID is not provided</div>;
  }
};

export default Widget;
