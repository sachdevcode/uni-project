
import { getCookie } from 'cookies-next';
export async function fetchSingleStory(storyId:string) {
  const token = getCookie('token');
  if (!token) {
    console.error('Token not found in cookies');
    return null;
  }
  try {
    const response = await fetch(
      `http://localhost:5000/api/stories/${storyId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          redirect: 'follow'
        }
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json(); // Return parsed data directly
  } catch (error) {
    console.error('Error fetching products:', error);
    return null; // Return null in case of an error
  }
}