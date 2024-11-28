import { ENDPOINT_BASE_URL } from '@/utils/constant';
import { setCookie } from 'cookies-next';
const BASEURL = process.env.BASEURL;
console.log(BASEURL)
export async function signInApi(data: {
  email: string;
  password: string;
}): Promise<any> {
  try {
    const response = await fetch(`${ENDPOINT_BASE_URL}/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong!');
    }

    const responseData = await response.json();

    // Store the access_token in a cookie
    setCookie('token', responseData.access_token);

    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
