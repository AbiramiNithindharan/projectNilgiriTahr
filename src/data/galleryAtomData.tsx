import { ReactNode } from "react";

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
    image: "/gallery/nt-portrait/nilgiritahr-26.png",
    subCategories: [
      {
        id: "Portrait",
        label: "Portrait",
        route: "/photo-gallery?category=NilgiriTahr&sub=Portrait",
        image: "/gallery/nt-portrait/nilgiritahr-1.JPG",
      },

      {
        id: "Herd",
        label: "Herd",
        route: "/photo-gallery?category=NilgiriTahr&sub=Herd",
        image: "/gallery/nt-portrait/nilgiritahr-5.JPG",
      },
      {
        id: "Radio-Collaring",
        label: "Radio Collaring",
        route: "/photo-gallery?category=NilgiriTahr&sub=Radio-Collaring",
        image: "/gallery/radio-collared/radiocollar-1.JPG",
      },
      {
        id: "Fawn",
        label: "Fawn",
        route: "/photo-gallery?category=NilgiriTahr&sub=Fawn",
        image: "/gallery/nt-portrait/nilgiritahr-31.jpeg",
      },
    ],
  },
  {
    id: "EcoSystem",
    label: "EcoSystem",
    image: "/gallery/associate-fauna/associate-fauna-4.JPG",
    subCategories: [
      {
        id: "FloraAndFauna",
        label: "Flora and Flora",
        route: "/photo-gallery?category=EcoSystem&sub=FloraAndFauna",
        image: "/gallery/associate-fauna/associate-fauna-1.JPG",
      },

      {
        id: "Landscape",
        label: "Landscape",
        route: "/photo-gallery?category=EcoSystem&sub=Landscape",
        image: "/gallery/nt-portrait/nilgiritahr-2.JPG",
      },
      {
        id: "Mountain",
        label: "Mountain",
        route: "/photo-gallery?category=EcoSystem&sub=Mountain",
        image: "/gallery/nt-portrait/nilgiritahr-14.JPG",
      },
      {
        id: "Location",
        label: "Location",
        route: "/photo-gallery?category=EcoSystem&sub=Location",
        image: "/gallery/location/Mukurthi.jpg",
      },
    ],
  },
  {
    id: "Portfolio",
    label: "Portfolio",
    image: "/gallery/Portfolio/BiennialSurvey/BS3.jpg",
    subCategories: [
      {
        id: "BiennialSurvey",
        label: "Biennial Survey",
        route: "/photo-gallery?category=Portfolio&sub=BiennialSurvey",
        image: "/gallery/Portfolio/BiennialSurvey/BS1.jpg",
      },

      {
        id: "PilotStudy",
        label: "Pilot Study",
        route: "/photo-gallery?category=Portfolio&sub=PilotStudy",
        image: "/gallery/Portfolio/PilotStudy/PS1.jpg",
      },
      {
        id: "PublicInteraction",
        label: "Public Interaction",
        route: "/photo-gallery?category=Portfolio&sub=PublicInteraction",
        image:
          "/gallery/Portfolio/PublicInteraction/CHINNAMAYILAR_KAANI_SETTLEMENT_VISIT-scaled.jpg",
      },
      {
        id: "Training",
        label: "Training",
        route: "/photo-gallery?category=Portfolio&sub=Training",
        image: "/gallery/Portfolio/Training/CAIRNHILL_TRAINING.jpg",
      },
    ],
  },
  {
    id: "Poster",
    label: "Poster",
    image: "/gallery/nt-portrait/nilgiritahr-18.jpg",
    subCategories: [
      {
        id: "Objectives",
        label: "Objectives",
        route: "/photo-gallery?category=Poster&sub=Objectives",
        image: "/gallery/Mission/aiwc.jpg",
      },
      {
        id: "Conservation",
        label: "Conservation",
        route: "/photo-gallery?category=Poster&sub=Conservation",
        image: "/gallery/Poster/conservation.jpg",
      },

      {
        id: "Ecology",
        label: "Ecology",
        route: "/photo-gallery?category=Poster&sub=Ecology",
        image: "/gallery/Poster/Habitat-Ecology.png",
      },
      {
        id: "Diversity",
        label: "Diversity",
        route: "/photo-gallery?category=Poster&sub=Diversity",
        image: "/gallery/Grass.jpg",
      },
    ],
  },
  {
    id: "Celebration",
    label: "Celebration",
    image: "/gallery/celebration/Photography/nilgiritahr-1.jpg",
    subCategories: [
      {
        id: "Initiative",
        label: "Initiative",
        route: "/photo-gallery?category=Celebration&sub=Initiative",
        image: "/gallery/Mission/initiative.jpeg",
      },
      {
        id: "ElephantDay",
        label: "Elephant Day",
        route: "/photo-gallery?category=Celebration&sub=ElephantDay",
        image: "/gallery/celebration/ElephantDay/Elephant-day-1.png",
      },

      {
        id: "VanMahotsav",
        label: "Van Mahotsav",
        route: "/photo-gallery?category=Celebration&sub=VanMahotsav",
        image: "/gallery/celebration/VanMahotsav/Van-Mahotsav-1.png",
      },
      {
        id: "EnvironmentDay",
        label: "Environment Day",
        route: "/photo-gallery?category=Celebration&sub=EnvironmentDay",
        image: "/gallery/celebration/EnvironmentDay/WED1.jpg",
      },
    ],
  },
  {
    id: "Study",
    label: "Study",
    image: "/gallery/study/Orientation/MAHARASHTRA_F.R.O_ORIENTATION.jpg",
    subCategories: [
      {
        id: "ExpertsMeet",
        label: "Experts Meet",
        route: "/photo-gallery?category=Study&sub=ExpertsMeet",
        image: "/gallery/study/ExpertsMeet/ARUMBUGAL_TRUST_MEET.jpg",
      },
      {
        id: "Awareness",
        label: "Awareness",
        route: "/photo-gallery?category=Study&sub=Awareness",
        image: "/gallery/Portfolio/Awareness/C.M.S_HSS_SRIVILLIPUTHUR.jpg",
      },
      {
        id: "BookFair",
        label: "Book Fair",
        route: "/photo-gallery?category=Study&sub=BookFair",
        image: "/gallery/celebration/BookFair/Book-fair-1.jpg",
      },
      {
        id: "Photography",
        label: "Photography",
        route: "/photo-gallery?category=Study&sub=Photography",
        image: "/gallery/celebration/Photography/nilgiritahr-3.jpg",
      },
    ],
  },
];
