import { ENDPOINT_BASE_URL } from '@/utils/constant';
import { getCookie } from 'cookies-next';
export async function createStories(data: any, type = "create", id="") {
  let api = '/api/stories'
  let Method = 'POST'
   if (type === "update"&& id) {
      api = `/api/stories/${id}`
      Method = 'PUT'
   }
  const token = getCookie('token');
  if (!token) {
    console.error('Token not found in cookies');
    return null;
  }
  // Create FormData
  const formData = new FormData();
  if (data.video && data.video[0]) {
    formData.append('video_file', data.video[0]);
  }
  formData.append('title', data.title);
  formData.append('description', data.description);
  data.product.map((curElm : any)=>{
      formData.append('product_ids[]' ,curElm)
  })
  formData.append('type', 'shoppable');
  try {
    const response = await fetch(`${ENDPOINT_BASE_URL}${api}`, {
      method: Method,
      headers: {
        Authorization: `Bearer ${token}`, // Add token to authorization header
        // Note: Do not set 'Content-Type', as the browser will set it automatically for FormData
      },
      body: formData // Send the FormData as the body
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error creating story:', error);
    return null;
  }
}
