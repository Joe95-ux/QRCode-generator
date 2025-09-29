"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Hash,
  Palette,
  Square,
  Image as ImageIcon,
  Upload,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface QRDesignStepProps {
  settings: {
    size: number;
    color: string;
    backgroundColor: string;
    errorCorrection: "L" | "M" | "Q" | "H";
  };
  onSettingsChange: (settings: any) => void;
  qrCodePreview: string;
}

export default function QRDesignStep({ settings, onSettingsChange, qrCodePreview }: QRDesignStepProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [frameSettings, setFrameSettings] = useState({
    useGradient: false,
    transparent: false,
    size: 50,
    style: "rounded",
    text: "Scan me!",
    color: "#C4923C"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File size must be less than 1MB");
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const frameStyles = ["None", "Square", "Rounded", "Circle", "Diamond", "Hexagon"];

  return (
    <div className="space-y-4">
      {/* Frame & Style Section */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-4 h-auto">
            <div className="flex items-center space-x-3">
              <Hash className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="font-semibold">Frame & Style</div>
                <div className="text-sm text-slate-500">Add frames and customize the outer appearance</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="border-0 shadow-none mx-4 mb-4">
            <CardContent className="space-y-6 pt-6">
              {/* Frame Style Buttons */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Frame Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {frameStyles.map((style) => (
                    <Button
                      key={style}
                      variant={frameSettings.style === style.toLowerCase() ? "default" : "outline"}
                      size="sm"
                      className="h-10"
                      onClick={() => setFrameSettings(prev => ({ ...prev, style: style.toLowerCase() }))}
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Frame Text */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Frame Text</Label>
                <Input
                  value={frameSettings.text}
                  onChange={(e) => setFrameSettings(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Scan me!"
                  className="w-full"
                />
              </div>

              {/* Frame Color */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Frame Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={frameSettings.color}
                    onChange={(e) => setFrameSettings(prev => ({ ...prev, color: e.target.value }))}
                    className="w-12 h-10 p-1 border rounded"
                  />
                  <Input
                    value={frameSettings.color}
                    onChange={(e) => setFrameSettings(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="#C4923C"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Frame Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gradient" className="text-sm font-medium">Use gradient frame</Label>
                  <Switch
                    id="gradient"
                    checked={frameSettings.useGradient}
                    onCheckedChange={(checked) => setFrameSettings(prev => ({ ...prev, useGradient: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="transparent" className="text-sm font-medium">Transparent background</Label>
                  <Checkbox
                    id="transparent"
                    checked={frameSettings.transparent}
                    onCheckedChange={(checked) => setFrameSettings(prev => ({ ...prev, transparent: checked }))}
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Frame Size</Label>
                  <Slider
                    value={[frameSettings.size]}
                    onValueChange={(value) => setFrameSettings(prev => ({ ...prev, size: value[0] }))}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-1">{frameSettings.size}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* QR Pattern Section */}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-4 h-auto">
            <div className="flex items-center space-x-3">
              <Palette className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="font-semibold">QR Pattern</div>
                <div className="text-sm text-slate-500">Customize the QR code pattern and color</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="border-0 shadow-none mx-4 mb-4">
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-2 block">QR Code Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={settings.color}
                      onChange={(e) => onSettingsChange({ ...settings, color: e.target.value })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={settings.color}
                      onChange={(e) => onSettingsChange({ ...settings, color: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => onSettingsChange({ ...settings, backgroundColor: e.target.value })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={settings.backgroundColor}
                      onChange={(e) => onSettingsChange({ ...settings, backgroundColor: e.target.value })}
                      placeholder="#FFFFFF"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  For optimal QR code reading results, we recommend using high-contrast colors.
                </p>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Corner Style Section */}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-4 h-auto">
            <div className="flex items-center space-x-3">
              <Square className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="font-semibold">Corner Style</div>
                <div className="text-sm text-slate-500">Design the corner detection squares</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="border-0 shadow-none mx-4 mb-4">
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Corner Frame Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Square", "Rounded", "Diamond", "Circle", "Hexagon", "Star"].map((style) => (
                      <Button
                        key={style}
                        variant="outline"
                        size="sm"
                        className="h-10"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-3 block">Corner Dots Type</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Solid", "Hollow", "Diamond", "Star", "Square", "Triangle"].map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        className="h-10"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Add Logo Section */}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-4 h-auto">
            <div className="flex items-center space-x-3">
              <ImageIcon className="h-5 w-5 text-emerald-600" />
              <div className="text-left">
                <div className="font-semibold">Add Logo</div>
                <div className="text-sm text-slate-500">Upload and position your logo</div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="border-0 shadow-none mx-4 mb-4">
            <CardContent className="space-y-6 pt-6">
              {logoPreview ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                    <img 
                      src={logoPreview} 
                      alt="Logo preview" 
                      className="max-w-32 max-h-32 object-contain"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Change Logo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleRemoveLogo}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Upload your logo
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Maximum size: 1 MB • PNG, JPG, SVG supported
                  </p>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}