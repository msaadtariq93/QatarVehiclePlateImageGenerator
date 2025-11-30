import { useState, useRef } from "react";
import { Download, RefreshCcw } from "lucide-react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function PlateGenerator() {
  const [plateNumber, setPlateNumber] = useState("974");
  const plateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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
        download(dataUrl, `qatar-plate-${plateNumber}.png`);
      } catch (err) {
        console.error("Failed to generate image", err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPlateNumber(value);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">
            Qatar Plate Generator
          </h1>
          <p className="text-slate-500">
            Enter a number (up to 6 digits) to generate the plate image.
          </p>
        </div>

        <Card className="p-8 bg-white shadow-xl border-slate-200/60 rounded-2xl space-y-8">
          
          {/* Preview Area - Centered */}
          <div className="flex justify-center overflow-auto py-4">
            {/* 
                The Export Container 
                Dimensions: 820px x 510px
                Background: #00426D
            */}
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
              {/* The Plate Itself - Scaled up 2x to fit the larger frame */}
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
                         <pattern id="serration" x="0" y="0" width="10" height="12.5" patternUnits="userSpaceOnUse">
                           <path d="M0,0 L10,6.25 L0,12.5 Z" fill="#801634" />
                         </pattern>
                       </defs>
                       <rect x="0" y="0" width="10" height="100" fill="url(#serration)" />
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
                        // Dynamic font size based on length to fit 6 digits
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
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6 max-w-md mx-auto w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 ml-1">
                Plate Number
              </label>
              <div className="relative group">
                <Input 
                  type="text" 
                  value={plateNumber}
                  onChange={handleNumberChange}
                  className="h-14 text-3xl font-bold text-center border-slate-200 bg-slate-50 focus:bg-white transition-all shadow-sm group-hover:border-slate-300"
                  placeholder="123456"
                  maxLength={6}
                />
              </div>
              <p className="text-xs text-center text-slate-400">
                {plateNumber.length}/6 digits
              </p>
            </div>

            <Button 
              onClick={handleDownload}
              disabled={!plateNumber || isGenerating}
              className="w-full h-12 text-lg font-medium bg-[#00426D] hover:bg-[#003355] text-white transition-all"
            >
              {isGenerating ? (
                <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Download className="w-5 h-5 mr-2" />
              )}
              {isGenerating ? "Generating..." : "Download Image (820x510)"}
            </Button>
          </div>

        </Card>
      </div>
    </div>
  );
}
