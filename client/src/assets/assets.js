import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import Dermatologist from "./Dermatologist.png";
import Gastroenterologist from "./Gastroenterologist.png";
import General_physician from "./General_physician.png";
import Gynecologist from "./Gynecologist.png";
import Neurologist from "./Neurologist.png";
import Pediatricians from "./Pediatricians.png";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
};

export const specialityData = [
  {
    speciality: "General physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Richard James, MBBS, is a highly dedicated General Physician specializing in adult primary care and overall wellness. With 4 years of experience, he has a strong commitment to delivering comprehensive medical care that focuses on the pillars of health: preventive medicine, early diagnosis, and effective treatment strategies. Dr. James believes in partnering with his patients to manage their long-term health and address acute issues thoroughly and efficiently.",
    fees: 500,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson is a dedicated and skilled Gynecologist committed to providing comprehensive, compassionate care for women at every stage of life. She focuses intently on preventive medicine, early diagnosis, and effective treatment strategies across all areas of women's health. With 3 years of experience, Dr. Larson is passionate about empowering her patients through clear communication and personalized wellness plans.",
    fees: 600,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Sarah Patel, MBBS, is a bright and dedicated Dermatologist with a passion for comprehensive skin health. While having 1 year of professional experience, she is fully committed to delivering comprehensive medical care for the skin, hair, and nails. Dr. Patel’s practice emphasizes the core principles of preventive medicine, early diagnosis, and effective treatment strategies for conditions ranging from common acne to complex dermatological issues, ensuring personalized care for healthy, radiant skin.",
    fees: 300,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Christopher Lee, MBBS, is a compassionate and energetic Pediatrician dedicated to the health and well-being of children and adolescents. With 2 years of experience, he holds a strong commitment to delivering comprehensive medical care to young patients. His practice places a special focus on preventive medicine (including vaccinations and healthy development), early diagnosis, and gentle, effective treatment strategies to support every child's healthy growth.",
    fees: 400,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia, MBBS, is a skilled and insightful Neurologist specializing in the diagnosis and management of disorders affecting the brain, spine, and nervous system. With 4 years of experience, she maintains a strong commitment to delivering comprehensive medical care in this complex field. Dr. Garcia’s focus is on preventive medicine, sophisticated early diagnosis, and effective, evidence-based treatment strategies to help patients manage neurological conditions and improve their quality of life.",
    fees: 500,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams, MBBS, is a dedicated and detail-oriented Neurologist who provides expert care for the central and peripheral nervous systems. With 4 years of experience, Dr. Williams has a strong commitment to delivering comprehensive medical care through a collaborative approach. He places special emphasis on preventive medicine, leveraging early diagnosis for prompt intervention, and developing effective, long-term treatment strategies for patients with both acute and chronic neurological conditions.",
    fees: 500,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc7",
    name: "Dr. Christopher Davis",
    image: doc7,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Christopher Davis, MBBS, is a dedicated and approachable General Physician who prioritizes building strong, collaborative relationships with his patients. With 4 years of experience, he holds a strong commitment to delivering comprehensive medical care that serves as the foundation for long-term health. Dr. Davis focuses intensely on preventive medicine, utilizes accurate early diagnosis, and develops effective treatment strategies that empower patients to actively manage their own wellness.",
    fees: 500,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Timothy White, MBBS, is a compassionate and highly skilled Gynecologist dedicated to providing full-spectrum health services for women. With 3 years of clinical experience, he maintains a strong commitment to delivering comprehensive medical care across all reproductive stages. Dr. White’s practice is centered on preventive medicine, early diagnosis, and effective treatment strategies, ensuring his patients receive expert care, clear guidance, and a supportive environment for their long-term health and wellness goals.",
    fees: 600,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Ava Mitchell, MBBS, is a modern and compassionate Dermatologist dedicated to achieving optimal skin health and vitality for her patients. With 1 year of experience, she maintains a strong commitment to delivering comprehensive medical care that focuses on the interplay between overall health and skin conditions. Dr. Mitchell emphasizes preventive medicine, utilizes advanced techniques for early diagnosis, and implements effective treatment strategies to address both medical dermatology and aesthetic concerns with a holistic view.",
    fees: 300,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King, MBBS, is an approachable and dedicated Pediatrician committed to monitoring and supporting the healthy development of infants, children, and teens. With 2 years of experience, he holds a strong commitment to delivering comprehensive medical care that is tailored to young patients. Dr. King places a special focus on preventive medicine, ensuring early diagnosis of developmental or health concerns, and implementing gentle, effective treatment strategies while fostering a comfortable environment for children and their families.",
    fees: 400,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly, MBBS, is a skilled and insightful Gastroenterologist specializing in the comprehensive care of the digestive system, including the esophagus, stomach, intestines, liver, and pancreas. With 4 years of experience, she is strongly committed to delivering comprehensive medical care. Dr. Kelly's practice emphasizes preventive medicine, leveraging early diagnosis through advanced screening, and implementing effective treatment strategies to manage both common and complex gastrointestinal disorders, focusing on patient comfort and long-term gut wellness.",
    fees: 500,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Gastroenterologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris, MBBS, is a proficient and dedicated Gastroenterologist with expertise in both diagnostic and therapeutic gastrointestinal procedures. With 4 years of focused experience, he maintains a strong commitment to delivering comprehensive medical care for all digestive disorders. Dr. Harris places a high value on preventive medicine, utilizes advanced technology for early diagnosis, and implements effective treatment strategies to ensure precise and high-quality care, particularly for complex gut and liver health issues.",
    fees: 500,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans, MBBS, is a thoughtful and dedicated General Physician who approaches patient health from a holistic perspective, recognizing the interconnectedness of mind and body. With 4 years of experience, she maintains a strong commitment to delivering comprehensive medical care that supports long-term well-being. Dr. Evans's practice is built on the foundations of preventive medicine, utilizes accurate early diagnosis, and implements effective treatment strategies, ensuring she is a consistent and knowledgeable guide throughout her patients' health journey.",
    fees: 500,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Ryan Martinez, MBBS, is a dedicated and empathetic Gynecologist committed to providing supportive and expert care across all aspects of women's reproductive health and general wellness. With 3 years of experience, he maintains a strong commitment to delivering comprehensive medical care in a comfortable setting. Dr. Martinez's practice places a high priority on preventive medicine, utilizes advanced screening for early diagnosis, and implements effective treatment strategies to empower his patients through education and shared decision-making.",
    fees: 600,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Amelia Hill, MBBS, is a compassionate and patient-centered Dermatologist dedicated to helping individuals manage and treat a wide range of common and complex skin, hair, and nail conditions. With 1 year of professional experience, she maintains a strong commitment to delivering comprehensive medical care. Dr. Hill's practice emphasizes preventive medicine, utilizes keen observation for early diagnosis, and implements effective treatment strategies, ensuring every patient receives clear communication and a personalized plan for achieving healthy skin.",
    fees: 300,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];
