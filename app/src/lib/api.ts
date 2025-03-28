import fetcher from '@/utils/fetcher';
import { ApiResponse } from '@/utils/types';

export const getRecommendations = async (
	query: string
): Promise<ApiResponse> => {
	return await fetcher(query);
};
