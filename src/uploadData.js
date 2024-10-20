import { db, ref, set } from "./firebase";

const companies = {
  doordash: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/DoorDash.svg",
    name: "DoorDash",
    website: "https://www.doordash.com",
    shortDescription: "Food delivery and logistics",
    longDescription:
      "DoorDash is a food delivery and logistics company that connects customers with local restaurants and stores.",
    pitchVideo: "https://www.youtube.com/watch?v=J6Y6Y5Y6Y6Y", // Placeholder video URL
    founders: [
      {
        name: "Tony Xu",
        email: "tony@doordash.com",
        linkedIn: "https://www.linkedin.com/in/tonyxu",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/DoorDash.svg", // Placeholder photo URL
      },
      {
        name: "Andy Fang",
        email: "andy@doordash.com",
        linkedIn: "https://www.linkedin.com/in/andyfang",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/DoorDash.svg", // Placeholder photo URL
      },
      {
        name: "Evan Moore",
        email: "evan@doordash.com",
        linkedIn: "https://www.linkedin.com/in/evanmoore",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/DoorDash.svg", // Placeholder photo URL
      },
    ],
  },
  affinity: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Affinity.svg",
    name: "Affinity",
    website: "https://www.affinity.co",
    shortDescription: "Relationship intelligence platform",
    longDescription:
      "Affinity is a relationship intelligence platform that helps businesses manage their relationships and networks.",
    pitchVideo: "https://www.youtube.com/watch?v=J6Y6Y5Y6Y6Y", // Placeholder video URL
    founders: [
      {
        name: "Ray Zhou",
        email: "ray@affinity.co",
        linkedIn: "https://www.linkedin.com/in/rayzhou",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/Affinity.svg", // Placeholder photo URL
      },
    ],
  },
  guardantHealth: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/GuardantHealth.svg",
    name: "Guardant Health",
    website: "https://www.guardanthealth.com",
    shortDescription: "Liquid biopsy and cancer diagnostics",
    longDescription:
      "Guardant Health is a biotech company that develops and commercializes liquid biopsy tests for cancer.",
    pitchVideo: "https://www.youtube.com/watch?v=J6Y6Y5Y6Y6Y", // Placeholder video URL
    founders: [
      {
        name: "AmirAli Talasaz",
        email: "amirali@guardanthealth.com",
        linkedIn: "https://www.linkedin.com/in/amiralitalasaz",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/GuardantHealth.svg", // Placeholder photo URL
      },
    ],
  },
  valarLabs: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/ValarLabs.svg",
    name: "Valar Labs",
    website: "https://www.valarlabs.com",
    shortDescription: "AI-powered cybersecurity",
    longDescription:
      "Valar Labs is a cybersecurity company that leverages AI and machine learning to detect and prevent cyber threats.",
    pitchVideo: "https://www.youtube.com/watch?v=J6Y6Y5Y6Y6Y", // Placeholder video URL
    founders: [
      {
        name: "Amit Jain",
        email: "amit@valarlabs.com",
        linkedIn: "https://www.linkedin.com/in/amitjain",
        photo:
          "https://upload.wikimedia.org/wikipedia/commons/e/ec/ValarLabs.svg", // Placeholder photo URL
      },
    ],
  },
};

const pushCompaniesToDatabase = () => {
  const dbRef = ref(db, "companies/");
  set(dbRef, companies)
    .then(() => {
      console.log("Data successfully written!");
    })
    .catch((error) => {
      console.error("Error writing data: ", error);
    });
};

export default pushCompaniesToDatabase;
