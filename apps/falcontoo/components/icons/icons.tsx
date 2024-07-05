import React, { ComponentType, ExoticComponent } from "react";
import {
  BookmarkIcon as BookmarkIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  CalendarIcon as CalendarIconSolid,
  CameraIcon as CameraIconSolid,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  FaceSmileIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon as MinusIconSolid,
  XMarkIcon,
  PhotoIcon,
  PlayIcon as PlayIconSolid,
  PaperClipIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  SparklesIcon,
  FolderIcon as HiFolderIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
  HomeIcon as HomeIconSolid,
  BellIcon as BellIconSolid,
  BellAlertIcon,
  ChartPieIcon,
  ArrowUpIcon as ArrowUpIconSolid,
  ArrowDownIcon as ArrowDownIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
  UserIcon as UserIconSolid,
  ChevronUpIcon as ChevronUpIconSolid,
  ChevronDownIcon as ChevronDownIconSolid,
  Cog6ToothIcon as SettingsCog,
  ExclamationCircleIcon,
  EllipsisHorizontalCircleIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { FaFilePdf } from "react-icons/fa";
import {
  FaFileWord,
  FaFileImage,
  FaFileLines,
  FaSpinner,
  FaCheck,
  FaFont,
} from "react-icons/fa6";
import { FiSliders, FiAirplay, FiTool } from "react-icons/fi";

// Tailwind Size Mapping
const sizeMapping = {
  xxs: "h-3 w-3",
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  base: "h-6 w-6",
  md: "h-7 w-7",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
  "2xl": "h-12 w-12",
};

// Color Mapping
const colorMapping = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  white: "text-white",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  purple: "text-purple-200",
  "base-100": "text-base-100",
  "base-200": "text-base-200",
  "base-300": "text-base-300",
  slate: "text-slate-400",
};

export type BaseIconProps = {
  Icon: ComponentType<React.SVGProps<SVGSVGElement>> | ExoticComponent<any>;
  size?: keyof typeof sizeMapping;
  color?: keyof typeof colorMapping;
  className?: string;
};

export const BaseIcon: React.FC<BaseIconProps> = ({
  Icon,
  size = "base",
  color = "currentColor",
  className,
  ...props
}) => {
  const sizeClass = sizeMapping[size] || sizeMapping.md;
  const colorClass =
    color === "currentColor"
      ? ""
      : colorMapping[color as keyof typeof colorMapping] || "";
  const combinedClassNames =
    `${sizeClass} ${colorClass} ${className || ""}`.trim();

  return <Icon className={combinedClassNames} {...props} />;
};

export default BaseIcon;

export type IconProps = Omit<BaseIconProps, "Icon">;
export type FalconIcon = React.FC<IconProps>;

const SettingsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={WrenchScrewdriverIcon} />
);

const StudentIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaceSmileIcon} />
);

const TeacherIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={AcademicCapIcon} />
);

const SchoolIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={BuildingLibraryIcon} />
);

const AdminIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={UserCircleIcon} />
);

const DeleteIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={TrashIcon} />
);

const AddIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={PlusIcon} />
);

const MinusIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={MinusIconSolid} />
);

const CrossCircleIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={XCircleIcon} />
);

const CrossIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={XMarkIcon} />
);

const MediaIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={PhotoIcon} />
);

const PlayIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={PlayIconSolid} />
);

const DocumentFileIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaFileWord} />
);

const PdfFileIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaFilePdf} />
);

const ImageFileIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaFileImage} />
);

const TextFileIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaFileLines} />
);

const AttachmentIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={PaperClipIcon} />
);

const MaximizeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ArrowsPointingOutIcon} />
);

const MinimizeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ArrowsPointingInIcon} />
);

const LoadingIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaSpinner} className="animate-spin" />
);

const CheckmarkIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaCheck} />
);

const AIMagicIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={SparklesIcon} />
);

const FolderIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={HiFolderIcon} />
);

const EditIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={PencilSquareIcon} />
);

const LeftArrowIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ArrowLeftIcon} />
);

const HomeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={HomeIconSolid} />
);

const SlidersIcon = React.forwardRef<SVGSVGElement, IconProps>((props) => (
  <BaseIcon {...props} Icon={FiSliders} />
));

const ScreenIcon = React.forwardRef<SVGSVGElement, IconProps>((props) => (
  <BaseIcon {...props} Icon={FiAirplay} />
));

const ToolIcon = React.forwardRef<SVGSVGElement, IconProps>((props) => (
  <BaseIcon {...props} Icon={FiTool} />
));

const BellIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={BellIconSolid} />
);

const BellRingingIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={BellAlertIcon} />
);

const PieChartIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ChartPieIcon} />
);

const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ArrowUpIconSolid} />
);

const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ArrowDownIconSolid} />
);

const CheckBadgeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={CheckBadgeIconSolid} />
);

const CameraIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={CameraIconSolid} />
);

const CalendarIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={CalendarIconSolid} />
);

const BookmarkIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={BookmarkIconSolid} />
);

const BookOpenIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={BookOpenIconSolid} />
);

const UserIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={UserIconSolid} />
);

const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ChevronUpIconSolid} />
);

const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ChevronDownIconSolid} />
);

const SettingsCogIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={SettingsCog} />
);

const ExclamationIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={ExclamationCircleIcon} />
);

const EllipsisIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={EllipsisHorizontalCircleIcon} />
);

const FontIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props} Icon={FaFont} />
);

const AdjustmentsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props) => <BaseIcon {...props} Icon={AdjustmentsHorizontalIcon} />,
);

export {
  SettingsIcon,
  StudentIcon,
  TeacherIcon,
  SchoolIcon,
  AdminIcon,
  DeleteIcon,
  AddIcon,
  MinusIcon,
  CrossCircleIcon,
  CrossIcon,
  MediaIcon,
  PlayIcon,
  DocumentFileIcon,
  PdfFileIcon,
  ImageFileIcon,
  TextFileIcon,
  AttachmentIcon,
  MaximizeIcon,
  MinimizeIcon,
  LoadingIcon,
  CheckmarkIcon,
  AIMagicIcon,
  FolderIcon,
  EditIcon,
  LeftArrowIcon,
  HomeIcon,
  SlidersIcon,
  ScreenIcon,
  ToolIcon,
  BellIcon,
  BellRingingIcon,
  PieChartIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckBadgeIcon,
  CameraIcon,
  CalendarIcon,
  BookmarkIcon,
  BookOpenIcon,
  UserIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  SettingsCogIcon,
  ExclamationIcon,
  EllipsisIcon,
  FontIcon,
  AdjustmentsIcon,
};
