import { notFound } from "next/navigation";
import styles from "./victory-section.module.css";
import Image from "next/image";

const victorySections = [
  {
    id: "survey-2024",
    name: "Survey-2024",
    title:
      "First Synchronized Survey of Nilgiri Tahr – A Landmark Step in Conservation",
    image: "/banners/DJI_0036.jpg", // Add your image paths in the public folder
    content:
      "The first-ever synchronized survey of the Nilgiri Tahr was a historic milestone in wildlife conservation, bringing together multiple stakeholders across two states—Tamil Nadu and Kerala. Conducted between April 29 and May 1, 2024, the survey spanned 13 forest divisions, 36 ranges, five elephant reserves, and six wildlife sanctuaries across the Southern Western Ghats. This extensive effort involved 708 team members, including forest officers, scientists, veterinarians, and field biologists, who trekked a total of 1,862 kilometres through rugged terrains to assess the population of this endangered mountain ungulate. The survey was unique as it used a hybrid scientific methodology combining the Double Observer and Bounded Count techniques, ensuring accurate and reliable population data.<br>                  For the first time, cutting-edge tools like drones were deployed to monitor inaccessible areas, while DNA samples were collected to build a genetic repository of the species. A total of 11 training programs were held to prepare frontline staff, equipping them with skills in survey protocols and habitat management. The results revealed that Tamil Nadu hosts 1,031 Nilgiri Tahrs, while adjoining Kerala habitats contributed 1,229 individuals, bringing the total population across both states to 1,858 individuals. The survey also identified five individuals affected by skin lumps, highlighting the need for health monitoring.<br>                 The Anamalai Hills emerged as a critical stronghold, accounting for 41% of Tamil Nadu’s population, followed by the Nilgiris landscape at 24%. Importantly, new habitats like Pasumalai were documented, showing the species’ resilience and adaptability. These findings provide a scientific foundation for future conservation strategies, ensuring that management plans are informed by robust, data-driven insights. The report was released by the Honourable State Forest Minister, Thiru K. Ponmudy, on December 18, 2025, marking a turning point in the state’s efforts to protect its iconic state animal.",
  },
  {
    id: "radio-collaring",
    name: "Radio-Collaring",
    title:
      "Pioneering Radio Collaring of Nilgiri Tahr – Tracking the Mountain Monarch",
    image: "/banners/DJI_0036.jpg",
    content:
      " In 2024, Project Nilgiri Tahr achieved a first-of-its-kind feat by successfully radio-collaring wild Nilgiri Tahrs to study their movement, behaviour, and habitat use. With permission from the Government of India to collar 20 individuals, two specialized collars were procured from African Wildlife Tracking and Vectronics Aerospace, Germany, with satellite-linked receivers imported from the United States. This groundbreaking initiative, executed in collaboration with WWF-India, aimed to generate vital ecological data for the long-term conservation of this elusive species.<br>The first breakthrough came on March 21, 2024, when a saddleback male was collared at Mukurthi National Park. The collar transmitted GPS coordinates every three hours, helping scientists determine a remarkable home range of 414 km². Tragically, this individual was later predated by a wild carnivore in July 2024, but the data it provided has been invaluable for understanding movement patterns. Following this, on August 21, 2024, a young male, aged 3-4 years, was collared near the 7th Hairpin Bend in the Pollachi Division, offering insights into habitat geofencing and behavioural dynamics.<br>On December 6, 2024, two more individuals—a five-year-old male and an eight-year-old female—were collared in Mukurthi National Park. While the male recovered well and resumed normal activities, the female unfortunately collapsed post-procedure despite careful monitoring. Biological samples such as blood, swabs, and hair were collected during these operations for health and genetic studies.<br>The radio-collaring project represents a major leap forward in wildlife research. By tracking movements, seasonal migrations, and breeding behaviour, scientists can identify critical corridors and design strategies to connect fragmented populations. Plans are underway to collar 10 more individuals, expanding the database to inform habitat restoration and reintroduction programs. This initiative sets a new benchmark for mountain ungulate research in India.",
  },
  {
    id: "survey-2025",
    name: "Survey-2025",
    title: "Second Synchronized Survey – Expansion and New Discoveries",
    image: "/banners/DJI_0036.jpg",
    content:
      "Building on the success of the first synchronized survey, the second survey was conducted from April 24 to 27, 2025, covering an even larger area with improved methods and expanded goals. This time, the survey included 177 blocks across 14 forest divisions, with a special focus on historically significant landscapes like the Ibex Hills in the Kodaikanal Division. A total of 780 personnel were mobilized, including forest officers, scientists, and local field staff, marking one of the largest conservation mobilizations in the region’s history.<br>The 2025 survey introduced threat assessment protocols for the first time, enabling teams to map and analyze pressures such as invasive species, habitat fragmentation, and fire. Remarkably, 36 new blocks were surveyed, leading to significant discoveries. For example, Nilgiri Tahrs were directly sighted at Chinnattumalai (Coimbatore Division) after a decade, indicating successful natural dispersal. Dry pellets found at Mangaladevi (Megamalai Division) confirmed the continued presence of the species in a landscape where they were once thought to be locally extinct. Additionally, the first-ever sighting at Peyar Varaiyattumottai (Nellai Wildlife Sanctuary) expanded the known distribution range.<br>The results revealed a significant increase in population, with Tamil Nadu recording 1,303 individuals and Kerala 1,352 individuals, bringing the total to 2,655 individuals across both states. This growth demonstrates the effectiveness of ongoing conservation actions, including habitat restoration and control of invasive species like wattle. However, challenges remain, as isolated populations in regions like Nellai Wildlife Sanctuary continue to face severe anthropogenic pressures, with some subpopulations numbering fewer than 15 individuals.<br>By combining advanced technologies like drones and camera traps with traditional field surveys, the 2025 effort set new standards for wildlife monitoring. These findings will guide future actions, including reintroductions into historical habitats and strengthening connectivity among fragmented populations, ensuring the survival of this iconic species for generations to come.",
  },
];

export default async function VictorySectionsPage({
  params,
}: {
  params: Promise<{ victorySectionId: string }>;
}) {
  const { victorySectionId } = await params;
  const section = victorySections.find((s) => s.id === victorySectionId);

  if (!section) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.heading}>{section.name}</h1>
          <p className={styles.subtitle}>{section.title}</p>
        </div>

        {/* Hero Image */}
        {section?.image && (
          <div className={styles.heroImage}>
            <Image
              src={section.image}
              alt="Nilgiri Tahr"
              fill
              className={styles.image}
              priority
            />
          </div>
        )}

        {/* Content Card */}
        <div className={styles.card}>
          {section.content.split(/<br\s*\/?>/).map((para, idx) => (
            <p key={idx} style={{ textIndent: "2em", marginTop: "1rem" }}>
              {para.trim()}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
