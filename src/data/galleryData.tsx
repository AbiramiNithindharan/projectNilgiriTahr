export type SubCategory = {
  id: string;
  label: string;
  images: string[];
};

export type GalleryCategory = {
  id: string;
  label: string;
  subCategories: SubCategory[];
};

export const galleryCategories: GalleryCategory[] = [
  {
    id: "nilgiriTahr",
    label: "Nilgiri Tahr",
    subCategories: [
      {
        id: "Portrait",
        label: "Portrait",
        images: [
          "/gallery/nt-portrait/nilgiritahr-1.JPG",
          "/gallery/nt-portrait/nilgiritahr-18.jpg",
          "/gallery/nt-portrait/nilgiritahr-23.jpeg",
        ],
      },
      {
        id: "Landscape",
        label: "Landcape",
        images: [
          "/gallery/nt-portrait/nilgiritahr-2.JPG",
          "/gallery/nt-portrait/nilgiritahr-3.JPG",
          "/gallery/nt-portrait/nilgiritahr-17.jpg",
          "/gallery/nt-portrait/nilgiritahr-16.JPG",
          "/gallery/nt-portrait/nilgiritahr-8.jpg",
          "/gallery/nt-portrait/nilgiritahr-7.jpg",
          "/gallery/nt-portrait/nilgiritahr-4.JPG",
          "/gallery/nt-portrait/nilgiritahr-3.JPG",
          "/gallery/nt-portrait/nilgiritahr-2.JPG",
          "/gallery/nt-portrait/nilgiritahr-19.jpg",
          "/gallery/nt-portrait/nilgiritahr-20.jpg",
          "/gallery/nt-portrait/nilgiritahr-21.jpeg",
          "/gallery/nt-portrait/nilgiritahr-24.jpeg",
          "/gallery/nt-portrait/nilgiritahr-25.png",
          "/gallery/nt-portrait/nilgiritahr-27.png",
          "/gallery/nt-portrait/nilgiritahr-30.jpeg",
          "/gallery/nt-portrait/nilgiritahr-34.jpeg",
          "/gallery/nt-portrait/nilgiritahr-38.jpeg",
        ],
      },
      {
        id: "Mountain",
        label: "Mountain",
        images: [
          "/gallery/nt-portrait/nilgiritahr-14.JPG",
          "/gallery/nt-portrait/nilgiritahr-10.jpg",
          "/gallery/nt-portrait/nilgiritahr-9.jpg",
          "/gallery/nt-portrait/nilgiritahr-22.jpeg",
          "/gallery/nt-portrait/nilgiritahr-26.png",
          "/gallery/nt-portrait/nilgiritahr-28.jpeg",
          "/gallery/nt-portrait/nilgiritahr-29.jpeg",
          "/gallery/nt-portrait/nilgiritahr-35.jpeg",
        ],
      },
      {
        id: "Herd",
        label: "Herd",
        images: [
          "/gallery/nt-portrait/nilgiritahr-5.JPG",
          "/gallery/nt-portrait/nilgiritahr-15.JPG",
          "/gallery/nt-portrait/nilgiritahr-13.JPG",
          "/gallery/nt-portrait/nilgiritahr-5.JPG",
        ],
      },
      {
        id: "Radio-Collaring",
        label: "Radio Collaring",
        images: [
          "/gallery/radio-collared/radiocollar-1.JPG",
          "/gallery/radio-collared/radiocollar-2.JPG",
          "/gallery/radio-collared/radiocollar-3.JPG",
          "/gallery/radio-collared/radiocollar-4.jpg",
          "/gallery/radio-collared/radiocollar-5.jpg",
          "/gallery/radio-collared/radiocollar-6.jpg",
          "/gallery/radio-collared/radiocollar-7.jpg",
        ],
      },
      {
        id: "Fawn",
        label: "Fawn",
        images: [
          "/gallery/nt-portrait/nilgiritahr-31.jpeg",
          "/gallery/nt-portrait/nilgiritahr-32.jpeg",
          "/gallery/nt-portrait/nilgiritahr-33.jpeg",
          "/gallery/nt-portrait/nilgiritahr-36.jpeg",
          "/gallery/nt-portrait/nilgiritahr-37.jpeg",
        ],
      },
    ],
  },
  {
    id: "Mission",
    label: "Mission",
    subCategories: [
      {
        id: "Objectives",
        label: "Objectives",
        images: ["/gallery/Mission/aiwc.jpg"],
      },
      {
        id: "Stamp",
        label: "Stamp",
        images: ["/gallery/Mission/stamp.png"],
      },
      {
        id: "Initiative",
        label: "Initiative",
        images: ["/gallery/Mission/initiative.jpeg"],
      },
      {
        id: "morphology",
        label: "Morphology",
        images: ["/gallery/Mission/morphology.jpg"],
      },
      {
        id: "uniqueness",
        label: "Uniqueness",
        images: ["/gallery/Mission/uniqueness.jpg"],
      },
      {
        id: "a3-flyer",
        label: "A3-Flyer",
        images: ["/gallery/Mission/A3-flyer.jpg"],
      },
    ],
  },
  {
    id: "EcoSystem",
    label: "EcoSystem",
    subCategories: [
      {
        id: "AssociateFlora",
        label: "Associate Flora",
        images: ["/gallery/Flora.JPG"],
      },
      {
        id: "AssociateFauna",
        label: "Associate Fauna",
        images: [
          "/gallery/associate-fauna/associate-fauna-1.JPG",
          "/gallery/associate-fauna/associate-fauna-2.JPG",
          "/gallery/associate-fauna/associate-fauna-3.JPG",
          "/gallery/associate-fauna/associate-fauna-4.JPG",
          "/gallery/associate-fauna/associate-fauna-5.JPG",
          "/gallery/associate-fauna/associate-fauna-6.JPG",
          "/gallery/associate-fauna/associate-fauna-7.JPG",
          "/gallery/associate-fauna/associate-fauna-8.JPG",
        ],
      },
      {
        id: "GrassDiversity",
        label: "Grass Diversity",
        images: ["/gallery/Grass.jpg"],
      },
      {
        id: "HabitatEcology",
        label: "Habitat Ecology",
        images: [
          "/gallery/HabitatEcology/HabitatEcology-1.png",
          "/gallery/HabitatEcology/HabitatEcology-2.jpg",
        ],
      },
      {
        id: "Perspectives",
        label: "Perspectives",
        images: ["/gallery/perspectives.png"],
      },
      {
        id: "Strobilanthes",
        label: "Strobilanthes",
        images: ["/gallery/slobiranthus.jpg"],
      },
    ],
  },
  {
    id: "Portfolio",
    label: "Portfolio",
    subCategories: [
      {
        id: "BiennialSurvey",
        label: "Biennial Survey",
        images: [
          "/gallery/Portfolio/BiennialSurvey/BS1.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS2.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS3.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS4.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS5.jpg",
          "/gallery/Portfolio/BiennialSurvey/BS6.jpg",
        ],
      },
      {
        id: "Awareness",
        label: "Awareness",
        images: [
          "/gallery/Portfolio/Awareness/C.M.S_HSS_SRIVILLIPUTHUR.jpg",
          "/gallery/Portfolio/Awareness/KODANTHUR.jpg",
          "/gallery/Portfolio/Awareness/PAPANASAM_SCHOOL.jpg",
          "/gallery/Portfolio/Awareness/PYKARA_SCHOOL.jpg",
          "/gallery/Portfolio/Awareness/S.L.B_HSS_NAGERKOYIL.jpg",
          "/gallery/Portfolio/Awareness/SHOLUR_SCHOOL.jpg",
        ],
      },
      {
        id: "M-Stripes",
        label: "M-Stripes",
        images: [
          "/gallery/Portfolio/M-Stripes/ANAIMALAIYAGAM_M-STRIPES.jpg",
          "/gallery/Portfolio/M-Stripes/M-STRIPES_CAMERATRAP.jpg",
        ],
      },
      {
        id: "PilotStudy",
        label: "Pilot Study",
        images: [
          "/gallery/Portfolio/PilotStudy/PS1.jpg",
          "/gallery/Portfolio/PilotStudy/PS2.jpg",
          "/gallery/Portfolio/PilotStudy/PS3.jpg",
          "/gallery/Portfolio/PilotStudy/PS4.jpg",
        ],
      },
      {
        id: "PublicInteraction",
        label: "Public Interaction",
        images: [
          "/gallery/Portfolio/PublicInteraction/CHINNAMAYILAR_KAANI_SETTLEMENT_VISIT-scaled.jpg",
          "/gallery/Portfolio/PublicInteraction/MUDHUVA_INTERACTION.jpg",
          "/gallery/Portfolio/PublicInteraction/NOCHOOODAI_TRIBALS_SMTR_MEET.jpg",
        ],
      },
      {
        id: "Training",
        label: "Training",
        images: [
          "/gallery/Portfolio/Training/CAIRNHILL_TRAINING.jpg",
          "/gallery/Portfolio/Training/FEO_SRIVILLIPUTHUR.jpg",
          "/gallery/Portfolio/Training/MUNDANTHURAI_RANGE_OFFICE.jpg",
          "/gallery/Portfolio/Training/NAGERKOYIL_DFO-OFFICE.jpg",
        ],
      },
    ],
  },
  {
    id: "Poster",
    label: "Poster",
    subCategories: [
      {
        id: "Threats",
        label: "Threats",
        images: ["/gallery/Poster/Threats.jpg"],
      },
      {
        id: "Comparison",
        label: "Comparison",
        images: ["/gallery/Poster/Three-tahr.jpg"],
      },
      {
        id: "Adaption",
        label: "Adaption",
        images: ["/gallery/Poster/adaptation.jpg"],
      },
      {
        id: "Conservation",
        label: "Conservation",
        images: ["/gallery/Poster/conservation.jpg"],
      },
      {
        id: "Challenges",
        label: "Challenges",
        images: ["/gallery/Poster/PNT-Challenges.jpg"],
      },
      {
        id: "Ecology",
        label: "Ecology",
        images: ["/gallery/Poster/Habitat-Ecology.png"],
      },
    ],
  },
  {
    id: "Celebration",
    label: "Celebration",
    subCategories: [
      {
        id: "IndigeneousDay",
        label: "Indigeneous Day",
        images: ["/gallery/celebration/Indigeneous/Indigeneous.jpg"],
      },
      {
        id: "ElephantDay",
        label: "Elephant Day",
        images: [
          "/gallery/celebration/ElephantDay/Elephant-day-1.png",
          "/gallery/celebration/ElephantDay/Elephant-day-2.png",
          "/gallery/celebration/ElephantDay/Elephant-day-3.jpg",
          "/gallery/celebration/ElephantDay/Elephant-day-4.jpg",
        ],
      },
      {
        id: "BookFair",
        label: "Book Fair",
        images: [
          "/gallery/celebration/BookFair/Book-fair-1.jpg",
          "/gallery/celebration/BookFair/Book-fair-2.png",
          "/gallery/celebration/BookFair/Book-fair-3.jpg",
          "/gallery/celebration/BookFair/Book-fair-4.jpg",
        ],
      },
      {
        id: "VanMahotsav",
        label: "Van Mahotsav",
        images: [
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-1.png",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-2.png",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-3.jpg",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-4.png",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-5.jpg",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-6.jpg",
          "/gallery/celebration/VanMahotsav/Van-Mahotsav-7.png",
        ],
      },
      {
        id: "EnvironmentDay",
        label: "Environment Day",
        images: [
          "/gallery/celebration/EnvironmentDay/WED1.jpg",
          "/gallery/celebration/EnvironmentDay/WED2.jpg",
          "/gallery/celebration/EnvironmentDay/WED3.jpg",
          "/gallery/celebration/EnvironmentDay/WED4.jpg",
        ],
      },
      {
        id: "PhotographyDay",
        label: "Photography Day",
        images: [
          "/gallery/celebration/Photography/nilgiritahr-1.jpg",
          "/gallery/celebration/Photography/nilgiritahr-2.jpg",
          "/gallery/celebration/Photography/nilgiritahr-3.jpg",
          "/gallery/celebration/Photography/Photography-day.jpg",
        ],
      },
    ],
  },
  {
    id: "Study",
    label: "Study",
    subCategories: [
      {
        id: "ExpertsMeet",
        label: "Experts Meet",
        images: [
          "/gallery/study/ExpertsMeet/ARUMBUGAL_TRUST_MEET.jpg",
          "/gallery/study/ExpertsMeet/TAHR-WATCHERS_MUDHUVA_MEET_FD.jpg",
          "/gallery/study/ExpertsMeet/VANNAPOORANI_VFC_MEET.jpg",
        ],
      },
      {
        id: "Orientation",
        label: "Orientation",
        images: [
          "/gallery/study/Orientation/ATTAKATTY_ORIENTATION-1.jpg",
          "/gallery/study/Orientation/MAHARASHTRA_F.R.O_ORIENTATION.jpg",
        ],
      },
      {
        id: "HonbleACSvisit",
        label: "Honble ACS visit",
        images: ["/gallery/study/Honble_ACS_VISIT.jpg"],
      },
      {
        id: "Students-Visit",
        label: "Students Visit",
        images: ["/gallery/study/STUDENTS_VISIT.jpg"],
      },
      {
        id: "KEYSTONE-Study",
        label: "KEYSTONE Study",
        images: ["/gallery/study/KEYSTONE_FOUNDATION.jpg"],
      },
      {
        id: "PilotMeet",
        label: "Pilot Meet",
        images: ["/gallery/study/PILOT_METHODS.jpg"],
      },
    ],
  },
  {
    id: "Location",
    label: "Location",
    subCategories: [
      {
        id: "Mukurthi",
        label: "Mukurthi",
        images: ["/gallery/location/Mukurthi.jpg"],
      },
      {
        id: "Anamalai",
        label: "Anamalai",
        images: ["/gallery/location/Anamalai.jpg"],
      },
      {
        id: "SrivilliputhurMegamalai",
        label: "Srivilliputhur-Megamalai",
        images: ["/gallery/location/Srivilliputhur-Megamalai.jpg"],
      },
      {
        id: "Kalakkad-Mundanthurai",
        label: "Kalakkad-Mundanthurai",
        images: ["/gallery/location/Kalakkad-Mundanthurai.jpg"],
      },
      {
        id: "Pilot Study",
        label: "Pilot Study",
        images: ["/gallery/location/Pilot-Study.jpg"],
      },
      {
        id: "Srivilliputhur",
        label: "Srivilliputhur",
        images: ["/gallery/location/Srivilliputhur-Megamalai.jpg"],
      },
    ],
  },
];
