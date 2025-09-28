"use client";

import { useState } from "react";
import Link from "next/link";
import { useQRCodes, useUserStats, useDeleteQRCode, useDownloadQRCode } from "@/hooks/use-qr-codes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  Download, 
  Eye, 
  MoreHorizontal, 
  Trash2, 
  Edit,
  QrCode,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Search,
  Filter
} from "lucide-react";

// Remove mock data - we'll use real data from API

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  
  const { data: qrCodes = [], isLoading: qrCodesLoading } = useQRCodes();
  const { data: stats, isLoading: statsLoading } = useUserStats();
  const deleteQRCode = useDeleteQRCode();
  const downloadQRCode = useDownloadQRCode();

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qr.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || qr.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this QR code?")) {
      try {
        await deleteQRCode.mutateAsync(id);
        toast.success("QR code deleted successfully");
      } catch (error) {
        toast.error("Failed to delete QR code");
      }
    }
  };

  const handleDownload = async (id: string) => {
    try {
      await downloadQRCode.mutateAsync(id);
      toast.success("Download count updated");
    } catch (error) {
      toast.error("Failed to update download count");
    }
  };

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      WEBSITE: "Website",
      VCARD: "vCard", 
      WIFI: "WiFi",
      TEXT: "Text",
      EMAIL: "Email",
      PHONE: "Phone",
      SMS: "SMS"
    };
    return typeMap[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      WEBSITE: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      VCARD: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      WIFI: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      TEXT: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      EMAIL: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      PHONE: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      SMS: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300"
    };
    return colorMap[type] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Manage your QR codes and track performance
            </p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <Link href="/generate">
              <Plus className="mr-2 h-4 w-4" />
              Create QR Code
            </Link>
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                  <QrCode className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total QR Codes
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stats?.totalQRCodes || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Download className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Downloads
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stats?.totalDownloads || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Total Scans
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stats?.totalScans || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    This Month
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stats?.thisMonth || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Codes Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Your QR Codes</CardTitle>
                <CardDescription>
                  Manage and track all your QR codes
                </CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search QR codes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="all">All Types</option>
                  <option value="WEBSITE">Website</option>
                  <option value="VCARD">vCard</option>
                  <option value="WIFI">WiFi</option>
                  <option value="TEXT">Text</option>
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Phone</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>QR Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Scans</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQRCodes.map((qr) => (
                    <TableRow key={qr.id}>
                      <TableCell>
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center">
                          <QrCode className="h-6 w-6 text-slate-400" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{qr.title}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(qr.type)}>
                          {getTypeLabel(qr.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {qr.content}
                      </TableCell>
                      <TableCell>{qr.downloadCount}</TableCell>
                      <TableCell>{qr.scanCount}</TableCell>
                      <TableCell>
                        {new Date(qr.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(qr.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600 dark:text-red-400"
                              onClick={() => handleDelete(qr.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredQRCodes.length === 0 && (
              <div className="text-center py-12">
                <QrCode className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No QR codes found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {searchTerm || filterType !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first QR code to get started"
                  }
                </p>
                {!searchTerm && filterType === "all" && (
                  <Button asChild>
                    <Link href="/generate">
                      <Plus className="mr-2 h-4 w-4" />
                      Create QR Code
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest QR code activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">QR code "My Website" was scanned</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">QR code "Business Card" was downloaded</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New QR code "WiFi Network" created</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance
              </CardTitle>
              <CardDescription>
                Your QR code performance this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Most Popular</span>
                  <span className="font-medium">WiFi Network</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Scans</span>
                  <span className="font-medium">35</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Avg. Scans/Day</span>
                  <span className="font-medium">2.3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Success Rate</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">98%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
