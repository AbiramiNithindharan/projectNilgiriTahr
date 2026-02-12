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
    id: "NilgiriTahr",
    label: "Nilgiri Tahr",
    icon: <PawPrint {...ICON_MAIN} />,
    image: "/gallery/nt-portrait/nilgiritahr-26.png",
    subCategories: [
      {
        id: "Portrait",
        label: "Portrait",
        route: "/photo-gallery?category=NilgiriTahr&sub=Portrait",
        icon: <Camera {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-1.JPG",
      },

      {
        id: "Herd",
        label: "Herd",
        route: "/photo-gallery?category=NilgiriTahr&sub=Herd",
        icon: <PawPrint {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-5.JPG",
      },
      {
        id: "Radio-Collaring",
        label: "Radio Collaring",
        route: "/photo-gallery?category=NilgiriTahr&sub=Radio-Collaring",
        icon: <Compass {...ICON_SUB} />,
        image: "/gallery/radio-collared/radiocollar-1.JPG",
      },
      {
        id: "Fawn",
        label: "Fawn",
        route: "/photo-gallery?category=NilgiriTahr&sub=Fawn",
        icon: <Heart {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-31.jpeg",
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
        id: "FloraAndFauna",
        label: "Flora and Flora",
        route: "/photo-gallery?category=EcoSystem&sub=FloraAndFauna",
        icon: <Leaf {...ICON_SUB} />,
        image: "/gallery/associate-fauna/associate-fauna-1.JPG",
      },

      {
        id: "Landscape",
        label: "Landscape",
        route: "/photo-gallery?category=EcoSystem&sub=Landscape",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-2.JPG",
      },
      {
        id: "Mountain",
        label: "Mountain",
        route: "/photo-gallery?category=EcoSystem&sub=Mountain",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/nt-portrait/nilgiritahr-14.JPG",
      },
      {
        id: "Location",
        label: "Location",
        route: "/photo-gallery?category=EcoSystem&sub=Location",
        icon: <Mountain {...ICON_SUB} />,
        image: "/gallery/location/Mukurthi.jpg",
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
        id: "Objectives",
        label: "Objectives",
        route: "/photo-gallery?category=Poster&sub=Objectives",

        icon: <Target {...ICON_SUB} />,
        image: "/gallery/Mission/aiwc.jpg",
      },
      {
        id: "Conservation",
        label: "Conservation",
        route: "/photo-gallery?category=Poster&sub=Conservation",
        icon: <Leaf {...ICON_SUB} />,
        image: "/gallery/Poster/conservation.jpg",
      },

      {
        id: "Ecology",
        label: "Ecology",
        route: "/photo-gallery?category=Poster&sub=Ecology",
        icon: <Trees {...ICON_SUB} />,
        image: "/gallery/Poster/Habitat-Ecology.png",
      },
      {
        id: "Diversity",
        label: "Diversity",
        route: "/photo-gallery?category=Poster&sub=Diversity",
        icon: <Trees {...ICON_SUB} />,
        image: "/gallery/Grass.jpg",
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
        id: "Initiative",
        label: "Initiative",
        route: "/photo-gallery?category=Celebration&sub=Initiative",
        icon: <Compass {...ICON_SUB} />,
        image: "/gallery/Mission/initiative.jpeg",
      },
      {
        id: "ElephantDay",
        label: "Elephant Day",
        route: "/photo-gallery?category=Celebration&sub=ElephantDay",
        icon: <PawPrint {...ICON_SUB} />,
        image: "/gallery/celebration/ElephantDay/Elephant-day-1.png",
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
        id: "Awareness",
        label: "Awareness",
        route: "/photo-gallery?category=Study&sub=Awareness",
        icon: <Megaphone {...ICON_SUB} />,
        image: "/gallery/Portfolio/Awareness/C.M.S_HSS_SRIVILLIPUTHUR.jpg",
      },
      {
        id: "BookFair",
        label: "Book Fair",
        route: "/photo-gallery?category=Study&sub=BookFair",
        icon: <BookOpen {...ICON_SUB} />,
        image: "/gallery/celebration/BookFair/Book-fair-1.jpg",
      },
      {
        id: "Photography",
        label: "Photography",
        route: "/photo-gallery?category=Study&sub=Photography",
        icon: <Camera {...ICON_SUB} />,
        image: "/gallery/celebration/Photography/nilgiritahr-3.jpg",
      },
    ],
  },
];
