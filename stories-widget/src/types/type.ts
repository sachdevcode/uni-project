import { RefObject } from "react";
import { EventKey, modalRef, videoData } from "./common";

export interface WidgetProps {
  event: EventKey;
  accountId: string | undefined | null;
}
export interface BubbleProps extends WidgetProps {
  // size: "small" | "medium" | "large";
}
export interface SwiperContainerProps {
  data: videoData[];
  modalRef: RefObject<modalRef>;
}
