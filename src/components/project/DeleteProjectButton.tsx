'use client';

import { Trash2, AlertTriangle } from 'lucide-react';
import { useState, useTransition } from 'react';
import { deleteProjectAction } from '@/actions/deleteProjects';

export default function DeleteProjectButton({ projectId }: { projectId: string }) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      const result = await deleteProjectAction(projectId);
      if (!result.success) {
        setShowModal(false);
      }
    });
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        disabled={isPending}
        title="Delete Project"
        className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-md p-2 rounded-md border border-white/10 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-50 group-hover:opacity-100 sm:opacity-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 pointer-events-auto"
          style={{ zIndex: 99999 }}
          onClick={handleCancel}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <div
            className="relative bg-zinc-900 border border-white/20 p-8 rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.8)] max-w-md w-full animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-5 text-red-400">
              <AlertTriangle className="w-7 h-7" />
              <h3 className="text-2xl font-bold text-white">Delete Project?</h3>
            </div>

            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              This action cannot be undone. All rooms, generated designs, and furniture data inside this project will be permanently deleted.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="px-6 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="px-6 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Trash2 className="w-4 h-4 animate-pulse" /> Deleting...
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
    </>
  );
}
