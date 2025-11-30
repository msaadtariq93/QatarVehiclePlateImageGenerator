import { useState, useRef } from "react";
import { Download, RefreshCcw, Car } from "lucide-react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
          pixelRatio: 3,
          backgroundColor: 'transparent'
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
      <div className="w-full max-w-4xl space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-800">
            Qatar Plate Generator
          </h1>
          <p className="text-slate-500">
            Enter a number to generate a Qatar vehicle license plate.
          </p>
        </div>

        <Card className="p-8 bg-white shadow-xl border-slate-200/60 rounded-2xl space-y-8">
          
          {/* Plate Preview Area */}
          <div className="flex justify-center items-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-200 overflow-hidden">
            
            {/* The Plate Component */}
            <div 
              ref={plateRef}
              className="relative flex w-[700px] h-[150px] bg-white rounded-xl overflow-hidden shadow-2xl border-[6px] border-black items-stretch"
              style={{
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)"
              }}
            >
              
              {/* Left Maroon Section with Serrated Edge */}
              <div className="relative w-[140px] h-full bg-[#801634] z-10 flex flex-col items-center justify-center shrink-0">
                
                {/* Serrated Pattern */}
                <div className="absolute top-0 bottom-0 -right-[18px] w-[20px] h-full flex flex-col z-20">
                   {/* Using SVG for perfect jagged edge */}
                   <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 20 100">
                     <defs>
                       <pattern id="serration" x="0" y="0" width="20" height="12.5" patternUnits="userSpaceOnUse">
                         <path d="M0,0 L20,6.25 L0,12.5 Z" fill="#801634" />
                       </pattern>
                     </defs>
                     <rect x="0" y="0" width="20" height="100" fill="url(#serration)" />
                   </svg>
                </div>

                {/* QATAR Vertical Text */}
                <div className="flex flex-col items-center justify-center space-y-1 translate-x-[-4px]">
                  {['Q', 'A', 'T', 'A', 'R'].map((char, i) => (
                    <span key={i} className="text-white font-bold text-xl leading-none font-sans">
                      {char}
                    </span>
                  ))}
                </div>
              </div>

              {/* Middle & Right Section */}
              <div className="flex-1 flex items-center pl-8 pr-4 bg-white relative z-0">
                
                {/* Arabic Text "Qatar" */}
                <div className="flex flex-col items-center justify-center mr-12 pt-2">
                  <span className="text-black text-[80px] leading-none" 
                        style={{ fontFamily: "'Noto Sans Arabic', sans-serif", fontWeight: 700 }}>
                    قطر
                  </span>
                </div>

                {/* Number */}
                <div className="flex-1 flex justify-center items-center">
                  <span 
                    className="text-black font-bold tracking-tight leading-none"
                    style={{ 
                      fontSize: "110px",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "-0.02em"
                    }}
                  >
                    {plateNumber || "0000"}
                  </span>
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
            </div>

            <Button 
              onClick={handleDownload}
              disabled={!plateNumber || isGenerating}
              className="w-full h-12 text-lg font-medium bg-[#801634] hover:bg-[#601026] text-white transition-all"
            >
              {isGenerating ? (
                <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Download className="w-5 h-5 mr-2" />
              )}
              {isGenerating ? "Generating..." : "Download Plate"}
            </Button>
          </div>

        </Card>
      </div>
    </div>
  );
}
