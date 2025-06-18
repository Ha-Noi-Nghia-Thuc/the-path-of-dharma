"use client";

import { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value?: string;
  onPickerChange: (color: string) => void;
  disabled?: boolean;
}

const ColorPicker = ({
  value = "#ffffff",
  onPickerChange,
  disabled = false,
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* color input field */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">#</span>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          disabled={disabled}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="ffffff"
        />

        {/* color preview */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-10 h-9 rounded-md border border-input shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: value }}
          aria-label="Mở bảng chọn màu"
        />
      </div>

      {/* color picker */}
      {isOpen && !disabled && (
        <div className="relative">
          <HexColorPicker
            color={value}
            onChange={onPickerChange}
            className="!w-full max-w-xs"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-background border border-input rounded-full flex items-center justify-center text-xs hover:bg-muted"
            aria-label="Đóng bảng chọn màu"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
