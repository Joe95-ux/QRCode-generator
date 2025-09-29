import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface QRCode {
  id: string;
  title: string;
  type: string;
  content: string;
  qrCodeData?: string;
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
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
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
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useQRCode = (id: string) => {
  return useQuery<QRCode>({
    queryKey: ["qr-code", id],
    queryFn: async () => {
      const response = await fetch(`/api/qr/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch QR code");
      }
      return response.json();
    },
    enabled: !!id,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
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
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
      queryClient.removeQueries({ queryKey: ["qr-code", id] });
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

export const useUpdateQRCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<QRCode> }) => {
      const response = await fetch(`/api/qr/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update QR code");
      }
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
      queryClient.invalidateQueries({ queryKey: ["qr-code", id] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
    },
  });
};
