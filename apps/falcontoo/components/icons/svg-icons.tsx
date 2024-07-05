import React from "react";
import { BaseIcon, IconProps } from "./icons";

const AlignLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="4" width="20" height="2" fill="currentColor" />
    <rect x="2" y="10" width="16" height="2" fill="currentColor" />
    <rect x="2" y="16" width="12" height="2" fill="currentColor" />
  </svg>
);

const AlignJustifyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="4" width="20" height="2" fill="currentColor" />
    <rect x="2" y="10" width="20" height="2" fill="currentColor" />
    <rect x="2" y="16" width="20" height="2" fill="currentColor" />
  </svg>
);

const LeadingSmallIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="6" width="20" height="2" fill="currentColor" />
    <rect x="2" y="10" width="20" height="2" fill="currentColor" />
    <rect x="2" y="14" width="20" height="2" fill="currentColor" />
  </svg>
);

const LeadingMediumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="4" width="20" height="2" fill="currentColor" />
    <rect x="2" y="10" width="20" height="2" fill="currentColor" />
    <rect x="2" y="16" width="20" height="2" fill="currentColor" />
  </svg>
);

const LeadingLargeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="3" width="20" height="2" fill="currentColor" />
    <rect x="2" y="10" width="20" height="2" fill="currentColor" />
    <rect x="2" y="17" width="20" height="2" fill="currentColor" />
  </svg>
);

const MarginSmallIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="4" width="20" height="2" fill="currentColor" />
    <rect x="2" y="10" width="20" height="2" fill="currentColor" />
    <rect x="2" y="16" width="20" height="2" fill="currentColor" />
  </svg>
);

const MarginMediumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="4" y="4" width="16" height="2" fill="currentColor" />
    <rect x="4" y="10" width="16" height="2" fill="currentColor" />
    <rect x="4" y="16" width="16" height="2" fill="currentColor" />
  </svg>
);

const MarginLargeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="6" y="4" width="12" height="2" fill="currentColor" />
    <rect x="6" y="10" width="12" height="2" fill="currentColor" />
    <rect x="6" y="16" width="12" height="2" fill="currentColor" />
  </svg>
);

export const AlignLeft: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={AlignLeftIcon} />
);

export const AlignJustify: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={AlignJustifyIcon} />
);

export const LeadingSmall: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={LeadingSmallIcon} />
);

export const LeadingMedium: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={LeadingMediumIcon} />
);

export const LeadingLarge: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={LeadingLargeIcon} />
);

export const MarginSmall: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={MarginSmallIcon} />
);

export const MarginMedium: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={MarginMediumIcon} />
);

export const MarginLarge: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={MarginLargeIcon} />
);

export const ReaderIcons = {
  alignment: {
    left: AlignLeft,
    justify: AlignJustify,
  },
  leading: {
    small: LeadingSmall,
    medium: LeadingMedium,
    large: LeadingLarge,
  },
  margin: {
    small: MarginSmall,
    medium: MarginMedium,
    large: MarginLarge,
  },
};
