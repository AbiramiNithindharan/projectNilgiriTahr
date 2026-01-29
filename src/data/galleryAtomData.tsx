import {
  PawPrint,
  Compass,
  Leaf,
  Image,
  Camera,
  Eye,
  Mountain,
  Trees,
  Heart,
  Target,
  Star,
  Stamp,
  Flower,
  ClipboardList,
  Megaphone,
  Users,
  GraduationCap,
  AlertTriangle,
  Scale,
  RefreshCw,
  ShieldAlert,
  BookOpen,
  UserCheck,
} from "lucide-react";
import { ReactNode } from "react";

const ICON_MAIN = { size: 26, strokeWidth: 1.6 };
const ICON_SUB = { size: 18, strokeWidth: 1.5 };
export type AtomSubCategory = {
  id: string;
  label: string;
  icon: ReactNode;
  route: string;
};

export type AtomMainCategory = {
  id: string;
  label: string;
  icon: ReactNode;
  subCategories: AtomSubCategory[];
};

export const GALLERY_ATOM_CATEGORIES: AtomMainCategory[] = [
  {
    id: "nilgiriTahr",
    label: "Nilgiri Tahr",
    icon: <PawPrint {...ICON_MAIN} />,
    subCategories: [
      {
        id: "Portrait",
        label: "Portrait",
        route: "/photo-gallery?category=nilgiriTahr&sub=Portrait",
        icon: <Camera {...ICON_SUB} />,
      },
      {
        id: "Landscape",
        label: "Landscape",
        route: "/photo-gallery?category=nilgiriTahr&sub=Landscape",
        icon: <Mountain {...ICON_SUB} />,
      },
      {
        id: "Mountain",
        label: "Mountain",
        route: "/photo-gallery?category=nilgiriTahr&sub=Mountain",
        icon: <Mountain {...ICON_SUB} />,
      },
      {
        id: "Herd",
        label: "Herd",
        route: "/photo-gallery?category=nilgiriTahr&sub=Herd",
        icon: <PawPrint {...ICON_SUB} />,
      },
      {
        id: "Radio-Collaring",
        label: "Radio Collaring",
        route: "/photo-gallery?category=nilgiriTahr&sub=Radio-Collaring",
        icon: <Compass {...ICON_SUB} />,
      },
      {
        id: "Love",
        label: "Love",
        route: "/photo-gallery?category=nilgiriTahr&sub=Love",
        icon: <Heart {...ICON_SUB} />,
      },
    ],
  },

  {
    id: "Mission",
    label: "Mission",
    icon: <Compass {...ICON_MAIN} />,
    subCategories: [
      {
        id: "Objectives",
        label: "Objectives",
        route: "/photo-gallery?category=Mission&sub=Objectives",

        icon: <Target {...ICON_SUB} />,
      },
      {
        id: "Stamp",
        label: "Stamp",
        route: "/photo-gallery?category=Mission&sub=Stamp",
        icon: <Stamp {...ICON_SUB} />,
      },
      {
        id: "Initiative",
        label: "Initiative",
        route: "/photo-gallery?category=Mission&sub=Initiative",
        icon: <Compass {...ICON_SUB} />,
      },
      {
        id: "Morphology",
        label: "Morphology",
        route: "/photo-gallery?category=Mission&sub=Morphology",
        icon: <Eye {...ICON_SUB} />,
      },
      {
        id: "Uniqueness",
        label: "Uniqueness",
        route: "/photo-gallery?category=Mission&sub=Uniqueness",
        icon: <Star {...ICON_SUB} />,
      },
      {
        id: "A3-flyer",
        label: "A3-flyer",
        route: "/photo-gallery?category=Mission&sub=A3-flyer",
        icon: <Image {...ICON_SUB} />,
      },
    ],
  },

  {
    id: "EcoSystem",
    label: "EcoSystem",
    icon: <Leaf {...ICON_MAIN} />,
    subCategories: [
      {
        id: "AssociateFlora",
        label: "Associate Flora",
        route: "/photo-gallery?category=EcoSystem&sub=AssociateFlora",
        icon: <Leaf {...ICON_SUB} />,
      },
      {
        id: "AssociateFauna",
        label: "Associate Fauna",
        route: "/photo-gallery?category=EcoSystem&sub=AssociateFauna",
        icon: <PawPrint {...ICON_SUB} />,
      },
      {
        id: "GrassDiversity",
        label: "Grass Diversity",
        route: "/photo-gallery?category=EcoSystem&sub=GrassDiversity",
        icon: <Trees {...ICON_SUB} />,
      },
      {
        id: "HabitatEcology",
        label: "Habitat Ecology",
        route: "/photo-gallery?category=EcoSystem&sub=HabitatEcology",

        icon: <Mountain {...ICON_SUB} />,
      },
      {
        id: "Perspectives",
        label: "Perspectives",
        route: "/photo-gallery?category=EcoSystem&sub=Perspectives",
        icon: <Eye {...ICON_SUB} />,
      },
      {
        id: "Strobilanthes",
        label: "Strobilanthes",
        route: "/photo-gallery?category=EcoSystem&sub=Strobilanthes",
        icon: <Flower {...ICON_SUB} />,
      },
    ],
  },
  {
    id: "Portfolio",
    label: "Portfolio",
    icon: <Image {...ICON_MAIN} />,
    subCategories: [
      {
        id: "BiennialSurvey",
        label: "Biennial Survey",
        route: "/photo-gallery?category=Portfolio&sub=BiennialSurvey",
        icon: <ClipboardList {...ICON_SUB} />,
      },
      {
        id: "Awareness",
        label: "Awareness",
        route: "/photo-gallery?category=Portfolio&sub=Awareness",
        icon: <Megaphone {...ICON_SUB} />,
      },
      {
        id: "M-Stripes",
        label: "M-Stripes",
        route: "/photo-gallery?category=Portfolio&sub=M-Stripes",
        icon: <Image {...ICON_SUB} />,
      },
      {
        id: "PilotStudy",
        label: "Pilot Study",
        route: "/photo-gallery?category=Portfolio&sub=PilotStudy",
        icon: <Compass {...ICON_SUB} />,
      },
      {
        id: "PublicInteraction",
        label: "Public Interaction",
        route: "/photo-gallery?category=Portfolio&sub=PublicInteraction",
        icon: <Users {...ICON_SUB} />,
      },
      {
        id: "Training",
        label: "Training",
        route: "/photo-gallery?category=Portfolio&sub=Training",
        icon: <GraduationCap {...ICON_SUB} />,
      },
    ],
  },
  {
    id: "Poster",
    label: "Poster",
    icon: <Image {...ICON_MAIN} />,
    subCategories: [
      {
        id: "Threats",
        label: "Threats",
        route: "/photo-gallery?category=Poster&sub=Threats",
        icon: <AlertTriangle {...ICON_SUB} />,
      },
      {
        id: "Comparison",
        label: "Comparison",
        route: "/photo-gallery?category=Poster&sub=Comparison",
        icon: <Scale {...ICON_SUB} />,
      },
      {
        id: "Adaption",
        label: "Adaption",
        route: "/photo-gallery?category=Poster&sub=Adaption",
        icon: <RefreshCw {...ICON_SUB} />,
      },
      {
        id: "Conservation",
        label: "Conservation",
        route: "/photo-gallery?category=Poster&sub=Conservation",

        icon: <Leaf {...ICON_SUB} />,
      },
      {
        id: "Challenges",
        label: "Challenges",
        route: "/photo-gallery?category=Poster&sub=Challenges",
        icon: <ShieldAlert {...ICON_SUB} />,
      },
      {
        id: "Ecology",
        label: "Ecology",
        route: "/photo-gallery?category=Poster&sub=Ecology",
        icon: <Trees {...ICON_SUB} />,
      },
    ],
  },
  {
    id: "Celebration",
    label: "Celebration",
    icon: <Camera {...ICON_MAIN} />,
    subCategories: [
      {
        id: "IndigeneousDay",
        label: "Indigeneous Day",
        route: "/photo-gallery?category=Celebration&sub=IndigeneousDay",
        icon: <Users {...ICON_SUB} />,
      },
      {
        id: "ElephantDay",
        label: "Elephant Day",
        route: "/photo-gallery?category=Celebration&sub=ElephantDay",
        icon: <PawPrint {...ICON_SUB} />,
      },
      {
        id: "BookFair",
        label: "Book Fair",
        route: "/photo-gallery?category=Celebration&sub=BookFair",
        icon: <BookOpen {...ICON_SUB} />,
      },
      {
        id: "VanMahotsav",
        label: "Van Mahotsav",
        route: "/photo-gallery?category=Celebration&sub=VanMahotsav",
        icon: <Trees {...ICON_SUB} />,
      },
      {
        id: "EnvironmentDay",
        label: "Environment Day",
        route: "/photo-gallery?category=Celebration&sub=EnvironmentDay",
        icon: <Leaf {...ICON_SUB} />,
      },
      {
        id: "PhotographyDay",
        label: "Photography Day",
        route: "/photo-gallery?category=Celebration&sub=PhotographyDay",
        icon: <Camera {...ICON_SUB} />,
      },
    ],
  },

  {
    id: "Study",
    label: "Study",
    icon: <Eye {...ICON_MAIN} />,
    subCategories: [
      {
        id: "ExpertsMeet",
        label: "Experts Meet",
        route: "/photo-gallery?category=Study&sub=ExpertsMeet",
        icon: <Users {...ICON_SUB} />,
      },
      {
        id: "Orientation",
        label: "Orientation",
        route: "/photo-gallery?category=Study&sub=Orientation",
        icon: <Compass {...ICON_SUB} />,
      },
      {
        id: "HonbleACSvisit",
        label: "HonbleACSvisit",
        route: "/photo-gallery?category=Study&sub=HonbleACSvisit",
        icon: <UserCheck {...ICON_SUB} />,
      },
      {
        id: "Students-Visit",
        label: "Students Visit",
        route: "/photo-gallery?category=Study&sub=Students-Visit",
        icon: <GraduationCap {...ICON_SUB} />,
      },
      {
        id: "KEYSTONE-Study",
        label: "KEYSTONE Study",
        route: "/photo-gallery?category=Study&sub=KEYSTONE-Study",
        icon: <Eye {...ICON_SUB} />,
      },
      {
        id: "PilotMeet",
        label: "Pilot Meet",
        route: "/photo-gallery?category=Study&sub=PilotMeet",
        icon: <ClipboardList {...ICON_SUB} />,
      },
    ],
  },
  {
    id: "Location",
    label: "Location",
    icon: <Mountain {...ICON_MAIN} />,
    subCategories: [
      {
        id: "Mukurthi",
        label: "Mukurthi",
        route: "/photo-gallery?category=Location&sub=Mukurthi",
        icon: <Mountain {...ICON_SUB} />,
      },
      {
        id: "Anamalai",
        label: "Anamalai",
        route: "/photo-gallery?category=Location&sub=Anamalai",
        icon: <Mountain {...ICON_SUB} />,
      },
      {
        id: "Srivilliputhur-Megamalai",
        label: "Srivilliputhur-Megamalai",
        route: "/photo-gallery?category=Location&sub=Srivilliputhur-Megamalai",
        icon: <Mountain {...ICON_SUB} />,
      },
      {
        id: "Kalakkad-Mundanthurai",
        label: "Kalakkad-Mundanthurai",
        route: "/photo-gallery?category=Location&sub=Kalakkad-Mundanthurai",
        icon: <Mountain {...ICON_SUB} />,
      },
      {
        id: "Pilot Study",
        label: "Pilot Study",
        route: "/photo-gallery?category=Location&sub=Pilot Study",
        icon: <Compass {...ICON_SUB} />,
      },
      {
        id: "Srivilliputhur",
        label: "Srivilliputhur",
        route: "/photo-gallery?category=Location&sub=Srivilliputhur",
        icon: <Mountain {...ICON_SUB} />,
      },
    ],
  },
];
