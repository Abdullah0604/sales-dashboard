import { fetchAuthToken } from "@/lib/api/token";
import { useQuery } from "@tanstack/react-query";

export function useAuthToken() {
  return useQuery({
    queryKey: ["authToken"],
    queryFn: fetchAuthToken,
    staleTime: 1000 * 60 * 115,
    refetchInterval: 1000 * 60 * 115,
    retry: 2,
  });
}
