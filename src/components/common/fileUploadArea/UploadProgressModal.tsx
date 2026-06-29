'use client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Upload } from 'lucide-react';

interface UploadProgressModalProps {
    percent: number;
    multiple: boolean;
}

export default function UploadProgressModal({ percent, multiple }: UploadProgressModalProps) {
    if (typeof document === 'undefined') return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-[360px] flex flex-col items-center gap-6">
                {/* Animated icon */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute inline-flex h-16 w-16 rounded-full bg-amber-100 animate-ping opacity-60" />
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300">
                        <Upload className="w-7 h-7 text-amber-500 animate-bounce" />
                    </div>
                </div>

                {/* Text */}
                <div className="text-center space-y-1">
                    <p className="text-gray-900 font-semibold text-lg">
                        Processing your {multiple ? 'images' : 'image'}…
                    </p>
                    <p className="text-gray-400 text-sm">Please don't close or refresh this tab</p>
                </div>

                {/* Progress bar */}
                <div className="w-full space-y-2">
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                            style={{
                                width: `${percent}%`,
                                transition: 'width 350ms ease',
                            }}
                        />
                    </div>
                    <p className="text-center text-amber-600 font-bold text-base tabular-nums">
                        {percent}%
                    </p>
                </div>

                {/* Footer note */}
                <p className="text-gray-400 text-xs text-center">
                    This may take a moment
                </p>
            </div>
        </div>,
        document.body,
    );
}
