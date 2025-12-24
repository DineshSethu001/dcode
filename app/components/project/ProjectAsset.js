import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiStyledcomponents,SiTensorflow } from "react-icons/si";

import mix from '../../assets /project_images/mix.png'
import e1 from "../../assets /project_images/e1.png";
import modernPage from '../../assets /project_images/modern_page.png'
import vi from '../../assets /project_images/vi1.png'
import crypto_app from '../../assets /project_images/crypt_app.png'
import Email from '../../assets /project_images/Email.png'
import movie from '../../assets /project_images/movie.png'
import aiImage from '../../assets /project_images/aiImage.png'
import fairSplit from '../../assets /project_images/fairSplit.png'

const projectAsset = [{
   title: "Fair & Split",
  description:
    `FairSplit is a small app that helps friends split expenses fairly.
You can add friends, record who paid, and then the app tells you who owes whom so no one overpays or gets confused.

It’s perfect for:

Eating out with friends

Group trips 

Small events

Shared monthly expenses`,
  tech: [
    { name: "React", icon: FaReact, color: "text-blue-500" },
    
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    

  ],
  image: fairSplit, // replace this with your imported image name
  demo: "https://fair-split-fawn.vercel.app/",
  code: "https://github.com/DineshSethu001/FairSplit",
},
 {
  title: "AI Image Detector",
  description:
    "AI Image Detector is a smart web app that uses TensorFlow’s COCO-SSD model to identify objects within images directly in your browser. Built with React and styled using Tailwind CSS, it allows users to upload any image (or use a default one) and instantly see detected objects with confidence scores visualized through progress bars — no backend or API key required.",
  tech: [
    { name: "React", icon: FaReact, color: "text-blue-500" },
    { name: "TensorFlow.js", icon: SiTensorflow, color: "text-yellow-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },

  ],
  image: aiImage, // replace this with your imported image name
  demo: "https://a-iimage-detector-react-ixna1jn3r-rulerds-projects.vercel.app/",
  code: "https://github.com/DineshSethu001/AIimageDetector-react-",
},
  {
    title: "Electronic E-commerce App",
    description:
      "Developed a responsive Sample Web Application using React.js with features like product listings, shopping cart, and user authentication.",
    tech: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    ],
    image: e1,
    demo: "https://super-vacherin-38881e.netlify.app/",
    code: "https://github.com/DineshSethu001/react_Ecommerce",
  },
   {
    title: "Modern Landing Page for Business",
    description:"A modern landing page is a clean and responsive web page designed to engage users and highlight a product or service. It features a hero section, clear call-to-action, visually appealing design, and smooth animations to guide visitors toward a specific goal.",
    tech: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    ],
    image: modernPage,
    demo: "https://business-page-6yht.vercel.app/",
    code: "https://github.com/DineshSethu001/react_Ecommerce",
  },
   {
    title: "Movie",
    description: "Movie Hub is a React-based web app that lets users explore and navigate movies seamlessly using React Router. It features a clean, responsive design styled with React and modern UI techniques for an engaging browsing experience.",
    tech: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    ],
    image: movie,
    demo: "https://movie-hub-react-cccy.vercel.app/",
    code: "https://github.com/DineshSethu001/movieHub_react",
  },
   {
    title: "Virtual Business Website",
    description:
      "Developed a responsive Sample Web Application using React.js with features like product listings, shopping cart, and user authentication.",
    tech: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    ],
    image: vi,
    demo: "https://lucky-pegasus-055f75.netlify.app/",
    code: "https://github.com/DineshSethu001/virtual_website",
  },
   
   {
    title: "3d_website",
    description:
      "Developed a responsive Sample Web Application using React.js with features like product listings, shopping cart, and user authentication.",
    tech: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    ],
    image: Email,
    demo: "https://3d-design-roan.vercel.app/",
    code: "https://github.com/DineshSethu001/3d_design",
  },
   {
    title: "Crypt_App",
    description:
      "Developed a responsive Sample Web Application using React.js with features like product listings, shopping cart, and user authentication.",
    tech: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
    ],
    image: crypto_app ,
    demo: "https://crypto-app-nu-one.vercel.app/",
    code: "https://github.com/DineshSethu001/Crypto_app",
  },
  {
    title: "MixMaster",
    description:
      "Mixing fruits and vegetables is a smart way to boost nutrition, combining vitamins, minerals, and antioxidants from both. Fruits add natural sweetness and energy, while vegetables provide fiber and phytonutrients that support digestion and immunity, making colorful combos like spinach with berries both tasty and nourishing.",
    tech : [
  { name: "React", icon: FaReact, color: "text-blue-500" },
  { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-400" },
  { name: "Styled Components", icon: SiStyledcomponents, color: "text-pink-500" },
],
    image: mix,
    demo: "https://mix-master-six.vercel.app/",
    code: "https://github.com/DineshSethu001/mixMaster",
  }
];

export default projectAsset;
