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
  route: string;
  icon?: ReactNode;
  image: string;
};

export type AtomMainCategory = {
  id: string;
  label: string;
  icon?: ReactNode;
  image: string;
  subCategories: AtomSubCategory[];
};

export const GALLERY_ATOM_CATEGORIES: AtomMainCategory[] = [
  {
    id: "nilgiriTahr",
    label: "Nilgiri Tahr",
    icon: <PawPrint {...ICON_MAIN} />,
    image: "/gallery/nt-portrait/nilgiritahr-26.png",
    subCategories: [
      {
        id: "Portrait",
        label: "Portrait",
        route: "/photo-gallery?category=nilgiriTahr&sub=Portrait",
        icon: <Camera {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-1.JPG",
      },
      {
        id: "Landscape",
        label: "Landscape",
        route: "/photo-gallery?category=nilgiriTahr&sub=Landscape",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-2.JPG",
      },
      {
        id: "Mountain",
        label: "Mountain",
        route: "/photo-gallery?category=nilgiriTahr&sub=Mountain",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-14.JPG",
      },
      {
        id: "Herd",
        label: "Herd",
        route: "/photo-gallery?category=nilgiriTahr&sub=Herd",
        icon: <PawPrint {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-5.JPG",
      },
      {
        id: "Radio-Collaring",
        label: "Radio Collaring",
        route: "/photo-gallery?category=nilgiriTahr&sub=Radio-Collaring",
        icon: <Compass {...ICON_SUB} />,
        image: "/gallery/radio-collared/radiocollar-1.JPG",
      },
      {
        id: "Fawn",
        label: "Fawn",
        route: "/photo-gallery?category=nilgiriTahr&sub=Fawn",
        icon: <Heart {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-31.jpeg",
      },
    ],
  },

  {
    id: "Mission",
    label: "Mission",
    icon: <Compass {...ICON_MAIN} />,
    image: "/gallery/nt-portrait/nilgiritahr-5.JPG",
    subCategories: [
      {
        id: "Objectives",
        label: "Objectives",
        route: "/photo-gallery?category=Mission&sub=Objectives",

        icon: <Target {...ICON_SUB} />,
        image: "/gallery/Mission/aiwc.jpg",
      },
      {
        id: "Stamp",
        label: "Stamp",
        route: "/photo-gallery?category=Mission&sub=Stamp",
        icon: <Stamp {...ICON_SUB} />,
        image: "/gallery/Mission/stamp.png",
      },
      {
        id: "Initiative",
        label: "Initiative",
        route: "/photo-gallery?category=Mission&sub=Initiative",
        icon: <Compass {...ICON_SUB} />,
        image: "/gallery/Mission/initiative.jpeg",
      },
      {
        id: "Morphology",
        label: "Morphology",
        route: "/photo-gallery?category=Mission&sub=Morphology",
        icon: <Eye {...ICON_SUB} />,
        image: "/gallery/Mission/morphology.jpg",
      },
      {
        id: "Uniqueness",
        label: "Uniqueness",
        route: "/photo-gallery?category=Mission&sub=Uniqueness",
        icon: <Star {...ICON_SUB} />,
        image: "/gallery/Mission/uniqueness.jpg",
      },
      {
        id: "A3-flyer",
        label: "A3-flyer",
        route: "/photo-gallery?category=Mission&sub=A3-flyer",
        icon: <Image {...ICON_SUB} />,
        image: "/gallery/Mission/A3-flyer.jpg",
      },
    ],
  },

  {
    id: "EcoSystem",
    label: "EcoSystem",
    icon: <Leaf {...ICON_MAIN} />,
    image: "/gallery/associate-fauna/associate-fauna-4.JPG",
    subCategories: [
      {
        id: "AssociateFlora",
        label: "Associate Flora",
        route: "/photo-gallery?category=EcoSystem&sub=AssociateFlora",
        icon: <Leaf {...ICON_SUB} />,
        image: "/gallery/Flora.JPG",
      },
      {
        id: "AssociateFauna",
        label: "Associate Fauna",
        route: "/photo-gallery?category=EcoSystem&sub=AssociateFauna",
        icon: <PawPrint {...ICON_SUB} />,
        image: "/gallery/associate-fauna/associate-fauna-1.JPG",
      },
      {
        id: "GrassDiversity",
        label: "Grass Diversity",
        route: "/photo-gallery?category=EcoSystem&sub=GrassDiversity",
        icon: <Trees {...ICON_SUB} />,
        image: "/gallery/Grass.jpg",
      },
      {
        id: "HabitatEcology",
        label: "Habitat Ecology",
        route: "/photo-gallery?category=EcoSystem&sub=HabitatEcology",

        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/HabitatEcology/HabitatEcology-2.jpg",
      },
      {
        id: "Perspectives",
        label: "Perspectives",
        route: "/photo-gallery?category=EcoSystem&sub=Perspectives",
        icon: <Eye {...ICON_SUB} />,
        image: "/gallery/perspectives.png",
      },
      {
        id: "Strobilanthes",
        label: "Strobilanthes",
        route: "/photo-gallery?category=EcoSystem&sub=Strobilanthes",
        icon: <Flower {...ICON_SUB} />,
        image: "/gallery/slobiranthus.jpg",
      },
    ],
  },
  {
    id: "Portfolio",
    label: "Portfolio",
    icon: <Image {...ICON_MAIN} />,
    image: "/gallery/Portfolio/BiennialSurvey/BS3.jpg",
    subCategories: [
      {
        id: "BiennialSurvey",
        label: "Biennial Survey",
        route: "/photo-gallery?category=Portfolio&sub=BiennialSurvey",
        icon: <ClipboardList {...ICON_SUB} />,
        image: "/gallery/Portfolio/BiennialSurvey/BS1.jpg",
      },
      {
        id: "Awareness",
        label: "Awareness",
        route: "/photo-gallery?category=Portfolio&sub=Awareness",
        icon: <Megaphone {...ICON_SUB} />,
        image: "/gallery/Portfolio/Awareness/C.M.S_HSS_SRIVILLIPUTHUR.jpg",
      },
      {
        id: "M-Stripes",
        label: "M-Stripes",
        route: "/photo-gallery?category=Portfolio&sub=M-Stripes",
        icon: <Image {...ICON_SUB} />,
        image: "/gallery/Portfolio/M-Stripes/M-STRIPES_CAMERATRAP.jpg",
      },
      {
        id: "PilotStudy",
        label: "Pilot Study",
        route: "/photo-gallery?category=Portfolio&sub=PilotStudy",
        icon: <Compass {...ICON_SUB} />,
        image: "/gallery/Portfolio/PilotStudy/PS1.jpg",
      },
      {
        id: "PublicInteraction",
        label: "Public Interaction",
        route: "/photo-gallery?category=Portfolio&sub=PublicInteraction",
        icon: <Users {...ICON_SUB} />,
        image:
          "/gallery/Portfolio/PublicInteraction/CHINNAMAYILAR_KAANI_SETTLEMENT_VISIT-scaled.jpg",
      },
      {
        id: "Training",
        label: "Training",
        route: "/photo-gallery?category=Portfolio&sub=Training",
        icon: <GraduationCap {...ICON_SUB} />,
        image: "/gallery/Portfolio/Training/CAIRNHILL_TRAINING.jpg",
      },
    ],
  },
  {
    id: "Poster",
    label: "Poster",
    icon: <Image {...ICON_MAIN} />,
    image: "/gallery/nt-portrait/nilgiritahr-18.jpg",
    subCategories: [
      {
        id: "Threats",
        label: "Threats",
        route: "/photo-gallery?category=Poster&sub=Threats",
        icon: <AlertTriangle {...ICON_SUB} />,
        image: "/gallery/Poster/Threats.jpg",
      },
      {
        id: "Comparison",
        label: "Comparison",
        route: "/photo-gallery?category=Poster&sub=Comparison",
        icon: <Scale {...ICON_SUB} />,
        image: "/gallery/Poster/Three-tahr.jpg",
      },
      {
        id: "Adaption",
        label: "Adaption",
        route: "/photo-gallery?category=Poster&sub=Adaption",
        icon: <RefreshCw {...ICON_SUB} />,
        image: "/gallery/Poster/adaptation.jpg",
      },
      {
        id: "Conservation",
        label: "Conservation",
        route: "/photo-gallery?category=Poster&sub=Conservation",
        icon: <Leaf {...ICON_SUB} />,
        image: "/gallery/Poster/conservation.jpg",
      },
      {
        id: "Challenges",
        label: "Challenges",
        route: "/photo-gallery?category=Poster&sub=Challenges",
        icon: <ShieldAlert {...ICON_SUB} />,
        image: "/gallery/Poster/PNT-Challenges.jpg",
      },
      {
        id: "Ecology",
        label: "Ecology",
        route: "/photo-gallery?category=Poster&sub=Ecology",
        icon: <Trees {...ICON_SUB} />,
        image: "/gallery/Poster/Habitat-Ecology.png",
      },
    ],
  },
  {
    id: "Celebration",
    label: "Celebration",
    icon: <Camera {...ICON_MAIN} />,
    image: "/gallery/celebration/Photography/nilgiritahr-1.jpg",
    subCategories: [
      {
        id: "IndigeneousDay",
        label: "Indigeneous Day",
        route: "/photo-gallery?category=Celebration&sub=IndigeneousDay",
        icon: <Users {...ICON_SUB} />,
        image: "/gallery/celebration/Indigeneous/Indigeneous.jpg",
      },
      {
        id: "ElephantDay",
        label: "Elephant Day",
        route: "/photo-gallery?category=Celebration&sub=ElephantDay",
        icon: <PawPrint {...ICON_SUB} />,
        image: "/gallery/celebration/ElephantDay/Elephant-day-1.png",
      },
      {
        id: "BookFair",
        label: "Book Fair",
        route: "/photo-gallery?category=Celebration&sub=BookFair",
        icon: <BookOpen {...ICON_SUB} />,
        image: "/gallery/celebration/BookFair/Book-fair-1.jpg",
      },
      {
        id: "VanMahotsav",
        label: "Van Mahotsav",
        route: "/photo-gallery?category=Celebration&sub=VanMahotsav",
        icon: <Trees {...ICON_SUB} />,
        image: "/gallery/celebration/VanMahotsav/Van-Mahotsav-1.png",
      },
      {
        id: "EnvironmentDay",
        label: "Environment Day",
        route: "/photo-gallery?category=Celebration&sub=EnvironmentDay",
        icon: <Leaf {...ICON_SUB} />,
        image: "/gallery/celebration/EnvironmentDay/WED1.jpg",
      },
      {
        id: "PhotographyDay",
        label: "Photography Day",
        route: "/photo-gallery?category=Celebration&sub=PhotographyDay",
        icon: <Camera {...ICON_SUB} />,
        image: "/gallery/celebration/Photography/nilgiritahr-3.jpg",
      },
    ],
  },

  {
    id: "Study",
    label: "Study",
    icon: <Eye {...ICON_MAIN} />,
    image: "/gallery/study/Orientation/MAHARASHTRA_F.R.O_ORIENTATION.jpg",
    subCategories: [
      {
        id: "ExpertsMeet",
        label: "Experts Meet",
        route: "/photo-gallery?category=Study&sub=ExpertsMeet",
        icon: <Users {...ICON_SUB} />,
        image: "/gallery/study/ExpertsMeet/ARUMBUGAL_TRUST_MEET.jpg",
      },
      {
        id: "Orientation",
        label: "Orientation",
        route: "/photo-gallery?category=Study&sub=Orientation",
        icon: <Compass {...ICON_SUB} />,
        image: "/gallery/study/Orientation/ATTAKATTY_ORIENTATION-1.jpg",
      },
      {
        id: "HonbleACSvisit",
        label: "HonbleACSvisit",
        route: "/photo-gallery?category=Study&sub=HonbleACSvisit",
        icon: <UserCheck {...ICON_SUB} />,
        image: "/gallery/study/Honble_ACS_VISIT.jpg",
      },
      {
        id: "Students-Visit",
        label: "Students Visit",
        route: "/photo-gallery?category=Study&sub=Students-Visit",
        icon: <GraduationCap {...ICON_SUB} />,
        image: "/gallery/study/STUDENTS_VISIT.jpg",
      },
      {
        id: "KEYSTONE-Study",
        label: "KEYSTONE Study",
        route: "/photo-gallery?category=Study&sub=KEYSTONE-Study",
        icon: <Eye {...ICON_SUB} />,
        image: "/gallery/study/KEYSTONE_FOUNDATION.jpg",
      },
      {
        id: "PilotMeet",
        label: "Pilot Meet",
        route: "/photo-gallery?category=Study&sub=PilotMeet",
        icon: <ClipboardList {...ICON_SUB} />,
        image: "/gallery/study/PILOT_METHODS.jpg",
      },
    ],
  },
  {
    id: "Location",
    label: "Location",
    icon: <Mountain {...ICON_MAIN} />,
    image: "/gallery/nt-portrait/nilgiritahr-35.jpeg",
    subCategories: [
      {
        id: "Mukurthi",
        label: "Mukurthi",
        route: "/photo-gallery?category=Location&sub=Mukurthi",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/location/Mukurthi.jpg",
      },
      {
        id: "Anamalai",
        label: "Anamalai",
        route: "/photo-gallery?category=Location&sub=Anamalai",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/location/Anamalai.jpg",
      },
      {
        id: "Srivilliputhur-Megamalai",
        label: "Srivilliputhur-Megamalai",
        route: "/photo-gallery?category=Location&sub=Srivilliputhur-Megamalai",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/location/Srivilliputhur-Megamalai.jpg",
      },
      {
        id: "Kalakkad-Mundanthurai",
        label: "Kalakkad-Mundanthurai",
        route: "/photo-gallery?category=Location&sub=Kalakkad-Mundanthurai",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/location/Kalakkad-Mundanthurai.jpg",
      },
      {
        id: "Pilot Study",
        label: "Pilot Study",
        route: "/photo-gallery?category=Location&sub=Pilot Study",
        icon: <Compass {...ICON_SUB} />,
        image: "/gallery/location/Pilot-Study.jpg",
      },
      {
        id: "Srivilliputhur",
        label: "Srivilliputhur",
        route: "/photo-gallery?category=Location&sub=Srivilliputhur",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/location/Srivilliputhur-Megamalai.jpg",
      },
    ],
  },
];
