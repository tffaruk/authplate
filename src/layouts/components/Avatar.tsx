"use client";
import { Avatar } from "keep-react";

const AvatarComponent = ({ size, shape }: { size: string; shape: string }) => {
  return (
    <Avatar
      className="border border-border mb-4 w-14 h-14 bg-theme-light"
      size={size}
      shape={shape as "circle" | "square" | "rounded" | undefined}
    />
  );
};

export default AvatarComponent;
