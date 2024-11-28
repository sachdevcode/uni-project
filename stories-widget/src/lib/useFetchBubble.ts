import { useState, useEffect } from "react";

interface Story {
  title: string;
  content: string;
}

interface UseFetchStoryResult {
  data: Story | null;
  error: string | null;
  loading: boolean;
}

export function useFetchStory(
  storyId: string | null | undefined
): UseFetchStoryResult {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchSingleStory = async () => {
    setLoading(true);
    let url = `http://localhost:5000/api/stories/${storyId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": ` application/json`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }
      const result = await response.json();
      setData([result.story]);
      setError(null);
    } catch (error) {
      setError("Failed to fetch story");
      console.error("Error fetching story:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSingleStory();
  }, [storyId]);

  return { data, error, loading };
}
