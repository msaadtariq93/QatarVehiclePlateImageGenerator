import { useState, useRef } from "react";
import { Download, RefreshCcw, Code, Copy, Check } from "lucide-react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type GeneratorType = "vehicle" | "mobile";
type PlateType = "private" | "commercial";
type MobileProvider = "ooredoo" | "vodafone";

function generateSvgCode(
  type: GeneratorType, 
  plateNumber: string, 
  plateType?: PlateType,
  provider?: MobileProvider
): string {
  const displayNumber = plateNumber || "00000000";
  
  if (type === "mobile") {
    if (provider === "ooredoo") {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 510" width="820" height="510">
  <!-- Background -->
  <rect width="820" height="510" fill="#00426D"/>
  
  <!-- Mobile Card Container -->
  <g transform="translate(160, 120)">
    <!-- Card Background with Border -->
    <rect x="0" y="0" width="500" height="270" rx="8" ry="8" fill="white" stroke="black" stroke-width="4"/>
    
    <!-- Ooredoo Logo Text -->
    <text x="250" y="90" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#E30613" text-anchor="middle">ooredoo</text>
    
    <!-- Phone Number -->
    <text x="250" y="200" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="black" text-anchor="middle" letter-spacing="2">${displayNumber}</text>
  </g>
</svg>`;
    } else {
      // Vodafone
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 510" width="820" height="510">
  <!-- Background -->
  <rect width="820" height="510" fill="#00426D"/>
  
  <!-- Mobile Card Container -->
  <g transform="translate(160, 120)">
    <!-- Card Background with Border -->
    <rect x="0" y="0" width="500" height="270" rx="8" ry="8" fill="white" stroke="black" stroke-width="4"/>
    
    <!-- Vodafone Text -->
    <text x="250" y="90" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#E60000" text-anchor="middle">vodafone</text>
    
    <!-- Phone Number -->
    <text x="250" y="200" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="black" text-anchor="middle" letter-spacing="2">${displayNumber}</text>
  </g>
</svg>`;
    }
  }
  
  // Vehicle plate logic
  if (plateType === "commercial") {
    const fontSize = plateNumber.length > 5 ? 100 : 130;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 510" width="820" height="510">
  <!-- Background -->
  <rect width="820" height="510" fill="#00426D"/>
  
  <!-- Plate Container (Taller commercial plate) -->
  <g transform="translate(130, 50)">
    <!-- Plate Background (Black) with Border -->
    <rect x="0" y="0" width="560" height="220" rx="16" ry="16" fill="black" stroke="#444" stroke-width="6"/>
    
    <!-- QATAR Vertical Text (White) -->
    <text x="50" y="50" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">Q</text>
    <text x="50" y="85" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">A</text>
    <text x="50" y="120" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">T</text>
    <text x="50" y="155" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">A</text>
    <text x="50" y="190" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="bold" fill="white" text-anchor="middle">R</text>
    
    <!-- Arabic Text قطر (White) -->
    <text x="340" y="85" font-family="Noto Sans Arabic, Arial" font-size="70" font-weight="700" fill="white" text-anchor="middle" direction="rtl">قطر</text>
    
    <!-- Number (White) -->
    <text x="340" y="175" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="white" text-anchor="middle">${displayNumber}</text>
  </g>
</svg>`;
  }
  
  // Private plate
  const fontSize = plateNumber.length > 5 ? 96 : 130;
  const numberX = plateNumber.length > 5 ? 560 : 580;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 510" width="820" height="510">
  <!-- Background -->
  <rect width="820" height="510" fill="#00426D"/>
  
  <!-- Plate Container -->
  <g transform="translate(30, 85)">
    <!-- Plate Background with Border -->
    <rect x="0" y="0" width="760" height="170" rx="16" ry="16" fill="white" stroke="black" stroke-width="8"/>
    
    <!-- Maroon Section -->
    <rect x="4" y="4" width="140" height="162" fill="#801634"/>
    
    <!-- Serrated Edge Pattern -->
    <defs>
      <pattern id="serration" x="0" y="0" width="20" height="25" patternUnits="userSpaceOnUse">
        <path d="M0,0 L20,12.5 L0,25 Z" fill="#801634"/>
      </pattern>
    </defs>
    <rect x="144" y="4" width="20" height="162" fill="url(#serration)"/>
    
    <!-- QATAR Vertical Text -->
    <text x="74" y="35" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">Q</text>
    <text x="74" y="60" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">A</text>
    <text x="74" y="85" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">T</text>
    <text x="74" y="110" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">A</text>
    <text x="74" y="135" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="bold" fill="white" text-anchor="middle">R</text>
    
    <!-- Arabic Text قطر -->
    <text x="260" y="115" font-family="Noto Sans Arabic, Arial" font-size="76" font-weight="700" fill="black" text-anchor="middle" direction="rtl">قطر</text>
    
    <!-- Number -->
    <text x="${numberX}" y="120" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="black" text-anchor="middle">${displayNumber}</text>
  </g>
</svg>`;
}

export default function PlateGenerator() {
  const [generatorType, setGeneratorType] = useState<GeneratorType>("vehicle");
  const [plateNumber, setPlateNumber] = useState("974");
  const [phoneNumber, setPhoneNumber] = useState("50505050");
  const [plateType, setPlateType] = useState<PlateType>("private");
  const [provider, setProvider] = useState<MobileProvider>("ooredoo");
  const plateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    if (plateRef.current) {
      setIsGenerating(true);
      try {
        const dataUrl = await toPng(plateRef.current, { 
          cacheBust: true, 
          pixelRatio: 1, 
          width: 820,
          height: 510,
        });
        const filename = generatorType === "vehicle" 
          ? `qatar-${plateType}-plate-${plateNumber}.png`
          : `qatar-${provider}-mobile-${phoneNumber}.png`;
        download(dataUrl, filename);
      } catch (err) {
        console.error("Failed to generate image", err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handlePlateNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPlateNumber(value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
    setPhoneNumber(value);
  };

  const handleCopySvg = async () => {
    const svgCode = generatorType === "vehicle"
      ? generateSvgCode("vehicle", plateNumber, plateType)
      : generateSvgCode("mobile", phoneNumber, undefined, provider);
    try {
      await navigator.clipboard.writeText(svgCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy SVG", err);
    }
  };

  const svgCode = generatorType === "vehicle"
    ? generateSvgCode("vehicle", plateNumber, plateType)
    : generateSvgCode("mobile", phoneNumber, undefined, provider);

  const currentNumber = generatorType === "vehicle" ? plateNumber : phoneNumber;

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">
            Qatar Plate Generator
          </h1>
          <p className="text-slate-500">
            Generate vehicle plates or mobile number images.
          </p>
        </div>

        <Card className="p-8 bg-white shadow-xl border-slate-200/60 rounded-2xl space-y-8">
          
          {/* Preview Area - Centered */}
          <div className="flex justify-center overflow-auto py-4">
            <div 
              ref={plateRef}
              style={{
                width: '820px',
                height: '510px',
                backgroundColor: '#00426D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {generatorType === "mobile" ? (
                /* Mobile Number Card */
                <div 
                  className="relative bg-white rounded-lg border-[2px] border-black overflow-hidden"
                  style={{
                    width: '250px',
                    height: '135px',
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    transform: "scale(2)",
                    transformOrigin: "center"
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full px-4 py-3">
                    {/* Logo */}
                    <div className="mb-3">
                      {provider === "ooredoo" ? (
                        <span className="text-[24px] font-bold tracking-tight" style={{ color: "#E30613" }}>
                          ooredoo
                        </span>
                      ) : (
                        <span className="text-[24px] font-bold tracking-tight" style={{ color: "#E60000" }}>
                          vodafone
                        </span>
                      )}
                    </div>
                    
                    {/* Phone Number */}
                    <div className="text-black font-bold text-[40px] tracking-wider leading-none">
                      {phoneNumber || "00000000"}
                    </div>
                  </div>
                </div>
              ) : plateType === "private" ? (
                /* Private Plate - White with Maroon Flag */
                <div 
                  className="relative flex bg-white rounded-lg overflow-hidden border-[4px] border-black items-stretch box-border"
                  style={{
                    width: '380px', 
                    height: '85px',
                    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                    transform: "scale(2)",
                    transformOrigin: "center"
                  }}
                >
                  {/* Left Maroon Section with Serrated Edge */}
                  <div className="relative w-[70px] h-full bg-[#801634] z-10 flex flex-col items-center justify-center shrink-0">
                    {/* Serrated Pattern */}
                    <div className="absolute top-0 bottom-0 -right-[9px] w-[10px] h-full flex flex-col z-20">
                       <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 10 100">
                         <defs>
                           <pattern id="serration-private" x="0" y="0" width="10" height="12.5" patternUnits="userSpaceOnUse">
                             <path d="M0,0 L10,6.25 L0,12.5 Z" fill="#801634" />
                           </pattern>
                         </defs>
                         <rect x="0" y="0" width="10" height="100" fill="url(#serration-private)" />
                       </svg>
                    </div>

                    {/* QATAR Vertical Text */}
                    <div className="flex flex-col items-center justify-center -space-y-[1px] translate-x-[-2px]">
                      {['Q', 'A', 'T', 'A', 'R'].map((char, i) => (
                        <span key={i} className="text-white font-bold text-[10px] leading-tight font-sans">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Middle & Right Section */}
                  <div className="flex-1 flex items-center pl-4 pr-2 bg-white relative z-0 justify-between">
                    {/* Arabic Text "Qatar" */}
                    <div className="flex flex-col items-center justify-center pt-1 mr-2 shrink-0">
                      <span className="text-black text-[38px] leading-none" 
                            style={{ fontFamily: "'Noto Sans Arabic', sans-serif", fontWeight: 700 }}>
                        قطر
                      </span>
                    </div>

                    {/* Number */}
                    <div className="flex-1 flex justify-end items-center mr-4">
                      <span 
                        className="text-black font-bold tracking-tight leading-none"
                        style={{ 
                          fontSize: plateNumber.length > 5 ? "48px" : "65px",
                          fontFamily: "Inter, sans-serif",
                          letterSpacing: plateNumber.length > 5 ? "0em" : "-0.02em"
                        }}
                      >
                        {plateNumber || "0000"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Commercial Plate - Black with White Text - TALLER */
                <div 
                  className="relative flex bg-black rounded-xl overflow-hidden border-[3px] border-gray-600 items-stretch box-border"
                  style={{
                    width: '280px', 
                    height: '110px',
                    boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
                    transform: "scale(2)",
                    transformOrigin: "center"
                  }}
                >
                  {/* Left Section - QATAR Vertical */}
                  <div className="w-[50px] h-full flex flex-col items-center justify-center shrink-0 border-r border-gray-700">
                    <div className="flex flex-col items-center justify-center -space-y-[2px]">
                      {['Q', 'A', 'T', 'A', 'R'].map((char, i) => (
                        <span key={i} className="text-white font-bold text-[14px] leading-tight font-sans tracking-wide">
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Section - Arabic + Number */}
                  <div className="flex-1 flex flex-col items-center justify-center pr-2">
                    {/* Arabic Text "Qatar" */}
                    <span className="text-white text-[32px] leading-none mb-1" 
                          style={{ fontFamily: "'Noto Sans Arabic', sans-serif", fontWeight: 700 }}>
                      قطر
                    </span>

                    {/* Number */}
                    <span 
                      className="text-white font-bold tracking-tight leading-none"
                      style={{ 
                        fontSize: plateNumber.length > 5 ? "48px" : "62px",
                        fontFamily: "Inter, sans-serif",
                        letterSpacing: plateNumber.length > 5 ? "-0.01em" : "-0.02em"
                      }}
                    >
                      {plateNumber || "0000"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6 max-w-md mx-auto w-full">
            
            {/* Type Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 ml-1">
                Type
              </label>
              <Select value={generatorType} onValueChange={(v) => setGeneratorType(v as GeneratorType)}>
                <SelectTrigger className="h-12 text-lg border-slate-200 bg-slate-50 focus:bg-white" data-testid="select-generator-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vehicle" data-testid="option-vehicle">Vehicle Plate</SelectItem>
                  <SelectItem value="mobile" data-testid="option-mobile">Mobile Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {generatorType === "vehicle" ? (
              <>
                {/* Plate Type Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">
                    Plate Type
                  </label>
                  <Select value={plateType} onValueChange={(v) => setPlateType(v as PlateType)}>
                    <SelectTrigger className="h-12 text-lg border-slate-200 bg-slate-50 focus:bg-white" data-testid="select-plate-type">
                      <SelectValue placeholder="Select plate type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private" data-testid="option-private">Private</SelectItem>
                      <SelectItem value="commercial" data-testid="option-commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Plate Number Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">
                    Plate Number
                  </label>
                  <div className="relative group">
                    <Input 
                      type="text" 
                      value={plateNumber}
                      onChange={handlePlateNumberChange}
                      className="h-14 text-3xl font-bold text-center border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-sm group-hover:border-slate-300"
                      placeholder="123456"
                      maxLength={6}
                      data-testid="input-plate-number"
                    />
                  </div>
                  <p className="text-xs text-center text-slate-400">
                    {plateNumber.length}/6 digits
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Provider Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">
                    Provider
                  </label>
                  <Select value={provider} onValueChange={(v) => setProvider(v as MobileProvider)}>
                    <SelectTrigger className="h-12 text-lg border-slate-200 bg-slate-50 focus:bg-white" data-testid="select-provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ooredoo" data-testid="option-ooredoo">Ooredoo</SelectItem>
                      <SelectItem value="vodafone" data-testid="option-vodafone">Vodafone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600 ml-1">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <Input 
                      type="text" 
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="h-14 text-3xl font-bold text-center border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-sm group-hover:border-slate-300"
                      placeholder="12345678"
                      maxLength={8}
                      data-testid="input-phone-number"
                    />
                  </div>
                  <p className="text-xs text-center text-slate-400">
                    {phoneNumber.length}/8 digits
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <Button 
                onClick={handleDownload}
                disabled={!currentNumber || isGenerating}
                className="flex-1 h-12 text-lg font-medium bg-[#00426D] hover:bg-[#003355] text-white transition-all"
                data-testid="button-download"
              >
                {isGenerating ? (
                  <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 mr-2" />
                )}
                {isGenerating ? "Generating..." : "Download PNG"}
              </Button>

              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline"
                    className="h-12 px-4 border-slate-300 hover:bg-slate-50"
                    data-testid="button-svg-code"
                  >
                    <Code className="w-5 h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[85vh]">
                  <DrawerHeader>
                    <DrawerTitle>SVG Code</DrawerTitle>
                    <DrawerDescription>
                      Copy the SVG code below to use in your projects.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 pb-4">
                    <div className="relative">
                      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-auto max-h-[50vh] text-sm font-mono">
                        <code>{svgCode}</code>
                      </pre>
                      <Button
                        onClick={handleCopySvg}
                        size="sm"
                        className="absolute top-3 right-3 bg-slate-700 hover:bg-slate-600"
                        data-testid="button-copy-svg"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

        </Card>
      </div>
    </div>
  );
}
