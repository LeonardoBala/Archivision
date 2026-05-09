'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { editDesignAction } from '@/actions/editDesign';
import { deleteRoomAction } from '@/actions/deleteRoom';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronDown,
  Info,
  Palette,
  Plus,
  Search,
  Wand2,
  Eye,
  Eraser,
  X,
  Layers,
  Trash2,
  AlertTriangle,
  ShoppingBag,
  ExternalLink,
  Tag,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  estimatedPrice: number | null;
  shopLink: string | null;
  productImageUrl?: string | null;
}

interface RoomData {
  id: string;
  name: string;
  type: string;
  originalImage: string | null;
  designs: {
    id: string;
    style: string;
    resultImageMain: string;
    baseImageUrl: string | null;
    promptUsed: string;
    createdAt: Date;
    furnitureItems?: FurnitureItem[];
  }[];
}

interface ProjectInterfaceProps {
  projectId: string;
  projectName: string;
  rooms: RoomData[];
}

type CanvasEvent = React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>;

export default function ProjectInterface({ projectId, projectName, rooms }: ProjectInterfaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fromSource = searchParams.get('from');
  const backUrl = fromSource === 'my-projects' ? '/my-projects' : '/dashboard';
  const backLabel = fromSource === 'my-projects' ? 'My Projects' : 'Dashboard';

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isFurniturePanelOpen, setIsFurniturePanelOpen] = useState(false);
  const [isSearchingFurniture, setIsSearchingFurniture] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const [isZoomToolActive, setIsZoomToolActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [isMagicToolActive, setIsMagicToolActive] = useState(false);
  const [magicPrompt, setMagicPrompt] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [deletingRoomId, setDeletingRoomId] = useState<string | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [promptError, setPromptError] = useState<string | null>(null);

  useEffect(() => {
    const newRoomId = searchParams.get('newRoom');
    if (newRoomId) {
      const foundIndex = rooms.findIndex(r => r.id === newRoomId);
      if (foundIndex !== -1) {
        setSelectedRoomIndex(foundIndex);
        setCurrentImageIndex(0);
        resetTools();
      }
    }
  }, [searchParams, rooms]);

  const safeRoomIndex = selectedRoomIndex >= rooms.length ? 0 : selectedRoomIndex;
  const currentRoom = rooms[safeRoomIndex];
  const currentDesign = currentRoom?.designs[currentImageIndex];
  const currentImage = currentDesign?.resultImageMain || "";
  const furnitureList = currentDesign?.furnitureItems || [];

  const imageToDisplay = showOriginal
    ? (currentRoom?.originalImage || currentDesign?.baseImageUrl || currentImage)
    : currentImage;

  // Auto-dismiss error toast after 4 seconds
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // Clear prompt error when magic tool is closed
  useEffect(() => {
    if (!isMagicToolActive) setPromptError(null);
  }, [isMagicToolActive]);

  const refreshPage = useCallback(() => {
    router.refresh();
  }, [router]);

  // Polling: while the furniture panel is open and no items are loaded yet,
  // silently refresh server data every 3s until items arrive or 45s elapses.
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isFurniturePanelOpen && furnitureList.length === 0) {
      setIsSearchingFurniture(true);

      interval = setInterval(refreshPage, 3000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        setIsSearchingFurniture(false);
      }, 45000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else if (furnitureList.length > 0) {
      setIsSearchingFurniture(false);
    }
  }, [isFurniturePanelOpen, furnitureList.length, refreshPage]);


  const resetTools = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsZoomToolActive(false);
    setShowZoomSlider(false);
    setIsMagicToolActive(false);
    setIsFurniturePanelOpen(false);
    setPromptError(null);
    clearMask();
  };

  const handlePreviousImage = () => {
    if (!currentRoom?.designs) return;
    setCurrentImageIndex((prev) => prev === 0 ? currentRoom.designs.length - 1 : prev - 1);
    resetTools();
  };

  const handleNextImage = () => {
    if (!currentRoom?.designs) return;
    setCurrentImageIndex((prev) => prev === currentRoom.designs.length - 1 ? 0 : prev + 1);
    resetTools();
  };

  const handleDeleteClick = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(false);
    setRoomToDelete(roomId);
  };

  const confirmDeleteRoom = async () => {
    if (!roomToDelete) return;
    setDeletingRoomId(roomToDelete);
    try {
      const res = await deleteRoomAction(roomToDelete, projectId);
      if (res.success) {
        if (rooms.length === 1) {
          router.push(backUrl);
        } else {
          if (rooms[safeRoomIndex].id === roomToDelete) {
            setSelectedRoomIndex(0);
            setCurrentImageIndex(0);
            resetTools();
          }
        }
      } else {
        setToastMessage("Error deleting room: " + res.error);
      }
    } catch (err) {
      setToastMessage("Error deleting room.");
    } finally {
      setDeletingRoomId(null);
      setRoomToDelete(null);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && zoomLevel > 1 && isZoomToolActive) {
        const limitX = (window.innerWidth * (zoomLevel - 1)) / 2;
        const limitY = (window.innerHeight * (zoomLevel - 1)) / 2;
        let newX = e.clientX - dragStart.x;
        let newY = e.clientY - dragStart.y;
        newX = Math.max(-limitX, Math.min(limitX, newX));
        newY = Math.max(-limitY, Math.min(limitY, newY));
        setPanPosition({ x: newX, y: newY });
      }
    };
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging && isZoomToolActive) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, zoomLevel, isZoomToolActive]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isZoomToolActive) return;
    const zoomChange = e.deltaY < 0 ? 0.2 : -0.2;
    setZoomLevel((prev) => {
      const newZoom = Math.min(Math.max(1, prev + zoomChange), 4);
      if (newZoom === 1) setPanPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomToolActive && zoomLevel > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const syncCanvasSize = () => {
    if (imageRef.current && canvasRef.current) {
      canvasRef.current.width = imageRef.current.naturalWidth;
      canvasRef.current.height = imageRef.current.naturalHeight;
    }
  };

  const getCanvasCoordinates = (e: CanvasEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: CanvasEvent) => {
    if (!isMagicToolActive) return;
    e.stopPropagation();
    e.preventDefault();
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: CanvasEvent) => {
    if (!isDrawing || !isMagicToolActive) return;
    e.stopPropagation();
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const coords = getCanvasCoordinates(e);

    if (!canvas || !ctx || !coords) return;

    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const clearMask = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleMagicReplaceSubmit = async () => {
    if (!magicPrompt) {
      setPromptError("Write what you want to replace the selected area with.");
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas || !currentRoom) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (tempCtx) {
        tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        const originalCtx = canvas.getContext('2d');
        if (originalCtx) {
            const imageData = originalCtx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] > 0) {
                    data[i] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                    data[i + 3] = 255;
                }
            }
            tempCtx.putImageData(imageData, 0, 0);
        }
    }

    const maskBase64 = tempCanvas.toDataURL('image/png');
    setIsEditing(true);

    try {
      const result = await editDesignAction(
        currentRoom.id,
        currentImage,
        maskBase64,
        magicPrompt,
        currentDesign?.style || "Edited"
      );

      if (result.success) {
        setMagicPrompt("");
        setPromptError(null);
        clearMask();
        setIsMagicToolActive(false);
      } else {
        setToastMessage("Editing error: " + result.error);
      }
    } catch (error) {
      console.error(error);
      setToastMessage("Server error.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleDownloadSingle = async () => {
    if (!currentImage) return;
    try {
      const response = await fetch(currentImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName}-${currentRoom?.name || 'room'}-${currentImageIndex + 1}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) { console.error("Download failed", err); }
  };

  const handleDownloadAll = async () => {
    if (!currentRoom?.designs) return;
    for (let i = 0; i < currentRoom.designs.length; i++) {
      const design = currentRoom.designs[i];
      if (!design.resultImageMain) continue;
      try {
        const response = await fetch(design.resultImageMain);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${projectName}-${currentRoom.name}-Angle-${i + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (err) { console.error(`Download failed for image ${i+1}`, err); }
    }
  };

  const glassClasses = "bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xl hover:bg-black/60 transition-all";

  if (!currentRoom) return <div className="w-full h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#111111] overflow-hidden font-sans text-white z-0">

      {/* BACKGROUND & BLUR */}
      <div className="absolute inset-0 z-0 bg-zinc-950 overflow-hidden pointer-events-none">
        <img
          key={`blur-${imageToDisplay}`}
          src={imageToDisplay}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-3xl opacity-50 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[99999] bg-red-600/90 backdrop-blur-md text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-in slide-in-from-top-2 duration-300 max-w-sm text-center pointer-events-none">
          {toastMessage}
        </div>
      )}

      {/* CENTRAL ZONE */}
      <div
        className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center pt-[62px] pb-[80px] md:flex-row md:items-center md:justify-center md:pt-0 md:pb-0 overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onClick={() => setIsFurniturePanelOpen(false)}
      >
        <div
          className={`relative flex flex-col items-center w-full md:items-center md:justify-center md:h-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isFurniturePanelOpen ? 'md:-translate-x-[180px] md:scale-[0.92]' : 'translate-x-0 scale-100'
          }`}
        >
          <div
            className="relative w-full md:flex md:items-center md:justify-center md:max-w-full md:max-h-full group"
            style={{
              transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            <div className="relative w-full md:inline-block md:w-auto md:h-auto md:max-w-full md:max-h-[85vh]">
              <img
                ref={imageRef}
                key={imageToDisplay}
                src={imageToDisplay}
                alt={showOriginal ? "Original Room" : "Room Design"}
                onLoad={syncCanvasSize}
                className={`block w-full h-auto md:w-auto md:h-auto md:max-w-full md:max-h-[85vh] md:shadow-[0_0_100px_rgba(0,0,0,0.8)] md:rounded-lg select-none transition-all duration-300 ${showOriginal ? 'opacity-80 grayscale-[20%]' : 'opacity-100'}`}
                draggable={false}
              />

              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className={`absolute inset-0 w-full h-full md:rounded-lg z-20 ${isMagicToolActive ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none opacity-0'}`}
              />
            </div>
          </div>

          {/* Mobile-only info bar below image */}
          <div className="md:hidden w-full px-4 pt-3 pb-2 flex items-center justify-between bg-black/30 backdrop-blur-sm border-t border-white/5">
            <div className="flex flex-col min-w-0">
              <p className="text-white font-bold text-sm truncate">{currentDesign?.style || "Style"}</p>
              <p className="text-white/50 text-xs mt-0.5 truncate">{currentRoom?.name} · {projectName}</p>
            </div>
            {currentRoom?.designs && currentRoom.designs.length > 1 && (
              <div className="flex items-center gap-1 shrink-0 ml-3">
                <button onClick={handlePreviousImage} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-white/60 text-xs font-bold min-w-[36px] text-center">
                  {currentImageIndex + 1} / {currentRoom.designs.length}
                </span>
                <button onClick={handleNextImage} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:p-6 flex justify-between items-center sm:items-start pointer-events-auto">
        <Link href={backUrl} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transform hover:scale-105 ${glassClasses}`}>
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">{backLabel}</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2.5 rounded-full font-medium min-w-0 max-w-[160px] sm:max-w-none sm:min-w-[250px] justify-center ${glassClasses}`}
            >
              <span className="text-white/70 font-normal hidden sm:inline">
                {currentDesign?.style || "Style"} /
              </span>
              <span className="font-bold truncate">{currentRoom?.name || "Room"}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[230px] sm:left-0 sm:right-0 sm:w-auto sm:translate-x-0 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-y-auto max-h-[350px] py-2 animate-in fade-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
                {rooms.map((room, idx) => (
                  <div key={room.id} className={`flex items-center justify-between w-full hover:bg-white/10 transition-colors group ${idx === safeRoomIndex ? 'bg-white/5' : ''}`}>
                    <button
                      onClick={() => {
                        setSelectedRoomIndex(idx);
                        setCurrentImageIndex(0);
                        resetTools();
                        setIsDropdownOpen(false);
                      }}
                      className={`flex-1 min-w-0 text-left px-4 py-3 flex justify-between items-center gap-2 ${
                        idx === safeRoomIndex ? 'font-bold text-white' : 'text-white/80'
                      }`}
                    >
                      <span className="truncate">{room.name}</span>
                      {idx === safeRoomIndex && <div className="w-2 h-2 shrink-0 bg-white rounded-full" />}
                    </button>

                    <button
                      onClick={(e) => handleDeleteClick(room.id, e)}
                      title="Delete Room"
                      className="px-3 py-3 text-red-400 shrink-0 opacity-30 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href={`/project/${projectId}/add-room`} className={`flex items-center justify-center w-10 h-10 rounded-full transform hover:scale-105 ${glassClasses}`}>
            <Plus className="w-5 h-5" />
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg font-medium transform hover:scale-105 ${glassClasses} ${isExportMenuOpen ? 'bg-black/60' : ''}`}
          >
            <Download className="w-4 h-4 sm:hidden" />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown className={`w-4 h-4 hidden sm:block transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isExportMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-52 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => { handleDownloadSingle(); setIsExportMenuOpen(false); }}
                className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-white/90 text-sm"
              >
                <Download className="w-4 h-4" /> Current Image
              </button>
              <button
                onClick={() => { handleDownloadAll(); setIsExportMenuOpen(false); }}
                className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-white/90 text-sm border-t border-white/5"
              >
                <Layers className="w-4 h-4" /> All Angles ({currentRoom?.designs?.length || 0})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM LEFT: Prompt Details (desktop only) */}
      <div className="hidden md:flex fixed bottom-6 left-6 z-50 flex-col gap-4 items-start pointer-events-auto">
        {showDetails && (
           <div className="bg-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 w-80 max-w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-5 duration-300 mb-2">
              <h3 className="text-lg font-bold text-white mb-1">{currentRoom?.name}</h3>
              <p className="text-white/60 text-sm mb-4">{projectName}</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                   <span className="text-white/60 text-sm flex items-center gap-2"><Palette className="w-4 h-4" /> Style</span>
                   <span className="font-medium text-white">{currentDesign?.style || "N/A"}</span>
                </div>
                <div>
                   <span className="text-white/60 text-sm block mb-1">Atmosphere / Mood</span>
                   <p className="text-white/90 text-sm leading-relaxed bg-white/10 p-3 rounded-lg max-h-32 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/20">
                      {currentDesign?.promptUsed || "No description available."}
                   </p>
                </div>
              </div>
           </div>
        )}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className={`p-3.5 rounded-xl transform hover:scale-105 ${showDetails ? 'bg-white text-black' : glassClasses}`}
        >
           <Info className="w-6 h-6" />
        </button>
      </div>

      {/* BOTTOM CENTER MENU */}
      <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4 pointer-events-auto">

        {/* MAGIC REPLACE PANEL */}
        {isMagicToolActive && (
          <div className="bg-black/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex flex-col gap-3 w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-blue-400"/> Magic Replace
              </span>
              <button onClick={clearMask} className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1">
                <Eraser className="w-3 h-3"/> Clear
              </button>
            </div>
            <input
              type="text"
              value={magicPrompt}
              onChange={(e) => { setMagicPrompt(e.target.value); setPromptError(null); }}
              placeholder="Ex: Replace with a modern sofa"
              className={`w-full bg-white/10 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none transition-colors ${
                promptError ? 'border-red-500 focus:border-red-400' : 'border-white/10 focus:border-blue-500'
              }`}
            />
            {promptError && (
              <p className="text-red-400 text-xs -mt-1">{promptError}</p>
            )}
            <button
              onClick={handleMagicReplaceSubmit}
              disabled={isEditing}
              className={`w-full font-bold py-2 rounded-lg text-sm transition-colors shadow-lg flex justify-center items-center gap-2 ${
                isEditing ? 'bg-blue-800 text-white/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isEditing ? (
                <>
                  <Wand2 className="w-4 h-4 animate-spin" /> Generating...
                </>
              ) : (
                "Regenerate Area"
              )}
            </button>
          </div>
        )}

        {/* Zoom Slider */}
        {showZoomSlider && (
          <div className="bg-black/60 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl shadow-2xl animate-in slide-in-from-bottom-2 flex items-center gap-3">
            <span className="text-white/70 text-xs font-bold">1x</span>
            <input
              type="range" min="1" max="4" step="0.1" value={zoomLevel}
              onChange={(e) => {
                 const newZoom = parseFloat(e.target.value);
                 setZoomLevel(newZoom);
                 if (newZoom === 1) setPanPosition({ x: 0, y: 0 });
              }}
              className="w-32 accent-white cursor-pointer"
            />
            <span className="text-white/70 text-xs font-bold">4x</span>
          </div>
        )}

        <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl max-w-[calc(100vw-2rem)] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Navigation Arrows (desktop only — mobile shows these in the info bar) */}
          {currentRoom?.designs && currentRoom.designs.length > 1 && (
            <div className="hidden md:flex items-center gap-1">
              <button onClick={handlePreviousImage} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-3 py-1 bg-white/5 rounded-lg text-xs font-bold min-w-[50px] text-center">
                {currentImageIndex + 1} / {currentRoom.designs.length}
              </div>
              <button onClick={handleNextImage} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-white/20 mx-1"></div>
            </div>
          )}

          {/* ZOOM */}
          <button
            onClick={() => {
              const newState = !isZoomToolActive;
              setIsZoomToolActive(newState);
              setShowZoomSlider(newState);
              if (newState) setIsMagicToolActive(false);
              if (!newState) resetTools();
            }}
            className={`p-3 rounded-xl transition-all group ${
               isZoomToolActive ? 'bg-blue-500/30 text-blue-400 shadow-[inset_0_0_10px_rgba(59,130,246,0.3)]' : 'hover:bg-white/20 text-white'
            }`}
            title="Pan/Zoom (Click & Drag)"
          >
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="w-px h-6 bg-white/20 mx-1"></div>

          {/* MAGIC REPLACE */}
          <button
            onClick={() => {
              const newState = !isMagicToolActive;
              setIsMagicToolActive(newState);
              if (newState) {
                setIsZoomToolActive(false);
                setShowZoomSlider(false);
              }
            }}
            className={`p-3 rounded-xl transition-all group ${
              isMagicToolActive ? 'bg-blue-500/30 text-blue-400 shadow-[inset_0_0_10px_rgba(59,130,246,0.3)]' : 'hover:bg-white/20 text-white'
            }`}
            title="Magic Replace (Draw on the image)"
          >
            <Wand2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="w-px h-6 bg-white/20 mx-1"></div>

          {/* SHOP THE LOOK */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFurniturePanelOpen(!isFurniturePanelOpen);
            }}
            className={`p-3 rounded-xl transition-all group ${
              isFurniturePanelOpen ? 'bg-purple-500/30 text-purple-400 shadow-[inset_0_0_10px_rgba(168,85,247,0.3)]' : 'hover:bg-white/20 text-white'
            }`}
            title="Shop the Look"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          {/* BEFORE & AFTER */}
          {currentRoom?.originalImage && (
            <>
              <div className="w-px h-6 bg-white/20 mx-1"></div>
              <button
                onMouseDown={() => setShowOriginal(true)}
                onMouseUp={() => setShowOriginal(false)}
                onMouseLeave={() => setShowOriginal(false)}
                onTouchStart={() => setShowOriginal(true)}
                onTouchEnd={() => setShowOriginal(false)}
                className={`p-3 rounded-xl transition-all group ${showOriginal ? 'bg-blue-500/30 text-blue-400 shadow-[inset_0_0_10px_rgba(59,130,246,0.3)]' : 'hover:bg-white/20 text-white'}`}
                title="Hold to see original"
              >
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </>
          )}

        </div>
      </div>

      {/* SIDEBAR: SHOP THE LOOK */}
      <div
        className={`fixed z-40 bg-black/60 backdrop-blur-xl border border-white/20 p-6 transform transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col shadow-2xl
          bottom-0 left-0 right-0 h-[65vh] rounded-t-3xl
          md:bottom-[25px] md:top-[88px] md:right-[24px] md:left-auto md:w-[380px] md:h-auto md:rounded-3xl
          ${isFurniturePanelOpen
            ? 'translate-y-0 md:translate-x-0 md:translate-y-0 opacity-100'
            : 'translate-y-full md:translate-y-0 md:translate-x-[120%] opacity-0'
          }`}
      >
        <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Shop the Look</h2>
          </div>
          <button
            onClick={() => setIsFurniturePanelOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/50 hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {furnitureList.length > 0 ? (
            furnitureList.map((item) => (
              <div key={item.id} className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all group flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
                    {item.productImageUrl ? (
                      <img src={item.productImageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <Tag className="w-6 h-6 text-white/40" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-[10px] uppercase font-black text-purple-400 tracking-widest mb-1">{item.category}</p>
                    <h4 className="font-semibold text-sm text-white leading-tight pr-2">{item.name}</h4>
                    {item.estimatedPrice && (
                      <p className="text-white/80 text-sm mt-2 font-bold bg-white/10 inline-block px-2 py-0.5 rounded-md">
                        ${item.estimatedPrice}
                      </p>
                    )}
                  </div>
                </div>
                {item.shopLink && (
                  <a href={item.shopLink} target="_blank" rel="noopener noreferrer" className="w-full bg-white/10 hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                    Shop Search <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))
          ) : isSearchingFurniture ? (

            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-90 pb-10 animate-in fade-in duration-500">
              <Loader2 className="w-12 h-12 text-purple-400 animate-spin mb-2" />
              <p className="text-sm font-bold text-white">Analyzing...</p>
              <p className="text-xs text-white/60 max-w-[250px]">
                Identifying the furniture in the image and searching for similar products online. This may take up to 45 seconds depending on the complexity of the scene.
              </p>
            </div>

          ) : (

            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50 pb-10">
              <ShoppingBag className="w-16 h-16 text-white/20 mb-2" />
              <p className="text-sm font-medium">No elements found</p>
              <p className="text-xs text-white/50 max-w-[200px]">Try generating a new design to extract the shopping list</p>
            </div>

          )}
        </div>
      </div>

      {/* DELETE ROOM MODAL */}
      {roomToDelete && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 pointer-events-auto"
          style={{ zIndex: 99999 }}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setRoomToDelete(null)}
          />
          <div className="relative bg-zinc-900 border border-white/20 p-8 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-5 text-red-400">
              <AlertTriangle className="w-7 h-7" />
              <h3 className="text-2xl font-bold text-white">Delete Room?</h3>
            </div>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete <span className="text-white font-bold">"{rooms.find(r => r.id === roomToDelete)?.name}"</span>?
              This action cannot be undone and all generated designs will be lost.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRoomToDelete(null)}
                disabled={deletingRoomId !== null}
                className="px-6 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteRoom}
                disabled={deletingRoomId !== null}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg transition-all flex items-center gap-2"
              >
                {deletingRoomId === roomToDelete ? (
                  <>
                    <Wand2 className="w-4 h-4 animate-spin"/> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" /> Yes, delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
