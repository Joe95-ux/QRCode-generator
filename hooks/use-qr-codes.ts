import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface QRCode {
  id: string;
  title: string;
  type: string;
  content: string;
  downloadCount: number;
  scanCount: number;
  createdAt: string;
}

export interface UserStats {
  totalQRCodes: number;
  totalDownloads: number;
  totalScans: number;
  thisMonth: number;
}

export const useQRCodes = () => {
  return useQuery<QRCode[]>({
    queryKey: ["qr-codes"],
    queryFn: async () => {
      const response = await fetch("/api/qr");
      if (!response.ok) {
        throw new Error("Failed to fetch QR codes");
      }
      const data = await response.json();
      return data.qrCodes;
    },
  });
};

export const useUserStats = () => {
  return useQuery<UserStats>({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const response = await fetch("/api/user/stats");
      if (!response.ok) {
        throw new Error("Failed to fetch user stats");
      }
      return response.json();
    },
  });
};

export const useDeleteQRCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/qr/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete QR code");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
    },
  });
};

export const useDownloadQRCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/qr/${id}/download`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to update download count");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
    },
  });
};
