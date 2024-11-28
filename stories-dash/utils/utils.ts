import { Active, DataRef, Over } from '@dnd-kit/core';
import { ColumnDragData } from '@/sections/bubble/view/bubble';
import { ENDPOINT_BASE_URL } from './constant';

type DraggableData = ColumnDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === 'Column') {
    return true;
  }

  return false;
}

function generateRandomName(): string { return `video_${Date.now()}.mp4`;}

export async function getVideoFromUrl(
  url: string,
  defaultType: string = 'video/mp4'
): Promise<File> {
  const URL = `${ENDPOINT_BASE_URL}/api${url}`
  console.log(URL,"abcser")
  const response = await fetch(URL);
  console.log(response)
  const data = await response.blob();
  const name = generateRandomName();
  return new File([data], name, {
    type: data.type || defaultType,
  });
}