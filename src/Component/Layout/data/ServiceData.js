// src/assets/Component/data/ServiceData.js
import { FaBookMedical } from "react-icons/fa";
import { TbVaccine } from "react-icons/tb";
import { IoIosChatbubbles } from "react-icons/io";
import { FaFileMedical } from "react-icons/fa6";

export const items = [
  {
    type: "booking",
    icon: FaBookMedical,
    label: "Booking",
    head: "Schedule your appointment with ease",
    buttonText: "Book Now",
    path: "/vaccinationdetails", // Path for navigation
  },
  {
    type: "vaccinationrecord",
    icon: TbVaccine,
    label: "Vaccination Records",
    head: "Keep track of your vaccinations.",
    buttonText: "View Records",
    path: "/user", // Path for navigation
  },
  {
    type: "chat",
    icon: IoIosChatbubbles,
    label: "Chat",
    head: "Get in touch with our doctors",
    buttonText: "Start Chat",
    path: "/UserChat", // Path for navigation
  },
  {
    type: "report",
    icon: FaFileMedical,
    label: "Report",
    head: "Access your medical reports.",
    buttonText: "View Report",
    path: "/report", // Path for navigation
  },
];
