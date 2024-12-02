import { ENDPOINT_BASE_URL } from '@/utils/constant';
import { setCookie } from 'cookies-next';


export async function signUpApi(data: {
  username: string;
  email: string;
  password: string;
}): Promise<any> {
  try {
    const response = await fetch(`${ENDPOINT_BASE_URL}/api/signup`, {
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
