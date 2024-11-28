import { ENDPOINT_BASE_URL } from '@/utils/constant';
import { getCookie } from 'cookies-next';
export async function deleteStory(storyId: string) {
  const token = getCookie('token');
  if (!token) {
    console.error('Token not found in cookies');
    return null;
  }
  try {
    const response = await fetch(`${ENDPOINT_BASE_URL}/api/stories/${storyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error deleting story:', error);
    return null;
  }
}