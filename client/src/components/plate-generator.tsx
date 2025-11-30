import { useState, useRef } from "react";
import { Download, RefreshCcw, Car } from "lucide-react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PlateGenerator() {
  const [plateNumber, setPlateNumber] = useState("123456");
  const plateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (plateRef.current) {
      setIsGenerating(true);
      try {
        // Wait a bit for images/fonts to be fully ready if needed
        const dataUrl = await toPng(plateRef.current, { 
          cacheBust: true, 
          pixelRatio: 3, // Higher resolution for download
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
    // Allow only numbers and limit to 6 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPlateNumber(value);
  };

  return (
    <div className="min-h-screen w-full bg-stone-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-3xl space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-stone-800">
            Qatar Plate Generator
          </h1>
          <p className="text-stone-500">
            Enter a number to generate a realistic Qatar vehicle license plate.
          </p>
        </div>

        <Card className="p-8 bg-white shadow-xl border-stone-200/60 rounded-2xl space-y-8">
          
          {/* Plate Preview Area */}
          <div className="flex justify-center items-center py-12 bg-stone-50/50 rounded-xl border border-dashed border-stone-200 overflow-hidden relative">
            
            {/* The Plate Component */}
            <div 
              ref={plateRef}
              className="relative flex w-[600px] h-[130px] bg-white rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-300 border border-stone-300"
              style={{
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3), inset 0 0 0 2px rgba(0,0,0,0.05)"
              }}
            >
              {/* Texture Overlay (CSS Noise) */}
              <div className="absolute inset-0 opacity-20 pointer-events-none z-20 mix-blend-multiply"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
                   }}>
              </div>
              
              {/* Light Sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/5 pointer-events-none z-20 mix-blend-overlay opacity-50"></div>

              {/* Left Maroon Section */}
              <div className="w-[25%] h-full bg-[#8D1B3D] relative flex flex-col items-center justify-center z-10 overflow-hidden">
                
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.2)] pointer-events-none"></div>

                {/* QATAR Text (English) - Rotated Style */}
                <div className="relative flex items-center justify-center h-full w-full">
                  <span className="text-white font-bold tracking-[0.2em] text-3xl -rotate-90 absolute whitespace-nowrap opacity-95 drop-shadow-sm" 
                        style={{ fontFamily: "Oswald" }}>
                    QATAR
                  </span>
                </div>
              </div>

              {/* Right White Section (Number) */}
              <div className="flex-1 h-full bg-white flex items-center justify-center relative z-10">
                
                {/* Subtle Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none scale-150">
                  <span className="text-6xl font-bold tracking-widest rotate-12">QATAR</span>
                </div>

                <span 
                  className="text-[#1a1a1a] font-bold tracking-widest leading-none relative z-10"
                  style={{ 
                    fontSize: plateNumber.length > 5 ? "110px" : "120px",
                    fontFamily: "Oswald", 
                    textShadow: "1px 1px 1px rgba(0,0,0,0.1), -1px -1px 0px rgba(255,255,255,0.5)"
                  }}
                >
                  {plateNumber || "000000"}
                </span>
              </div>

              {/* Bolts */}
              <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,1)] border border-gray-400 z-30 flex items-center justify-center">
                <div className="w-1.5 h-0.5 bg-gray-400 rotate-45"></div>
              </div>
              <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,1)] border border-gray-400 z-30 flex items-center justify-center">
                <div className="w-1.5 h-0.5 bg-gray-400 rotate-12"></div>
              </div>
              <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-full bg-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,1)] border border-gray-400 z-30 flex items-center justify-center">
                 <div className="w-1.5 h-0.5 bg-gray-400 rotate-90"></div>
              </div>
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,1)] border border-gray-400 z-30 flex items-center justify-center">
                <div className="w-1.5 h-0.5 bg-gray-400 rotate-45"></div>
              </div>

            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-600 ml-1">
                Plate Number (3-6 Digits)
              </label>
              <div className="relative group">
                <Input 
                  type="text" 
                  value={plateNumber}
                  onChange={handleNumberChange}
                  className="h-16 text-3xl tracking-[0.2em] font-mono text-center uppercase border-stone-200 bg-stone-50 focus:bg-white transition-all shadow-sm group-hover:border-stone-300"
                  placeholder="123456"
                  maxLength={6}
                  data-testid="input-plate-number"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 pointer-events-none">
                  <Car className="w-8 h-8" />
                </div>
              </div>
              <div className="flex justify-between items-center px-1">
                <p className="text-xs text-stone-400">
                  Enter digits only
                </p>
                <p className={cn("text-xs font-medium transition-colors", 
                  plateNumber.length === 6 ? "text-green-600" : "text-stone-400"
                )}>
                  {plateNumber.length}/6 digits
                </p>
              </div>
            </div>

            <Button 
              onClick={handleDownload}
              disabled={!plateNumber || isGenerating}
              className="w-full h-14 text-lg font-medium bg-[#8D1B3D] hover:bg-[#701530] text-white shadow-lg shadow-pink-900/10 transition-all active:scale-[0.99] rounded-xl"
              data-testid="button-download"
            >
              {isGenerating ? (
                <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Download className="w-5 h-5 mr-2" />
              )}
              {isGenerating ? "Generating Image..." : "Download Plate Image"}
            </Button>
          </div>

        </Card>
        
        <div className="text-center text-stone-400 text-xs">
          <p>Designed for visualization and novelty purposes only. Not for official use.</p>
        </div>
      </div>
    </div>
  );
}
