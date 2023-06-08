// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import { useLocation } from "react-router-dom";
// import styles from "./styles.module.css";
// import { useNavigate } from "react-router";

// export default function Footer() {
//   const handleFacebookClick = () => {
//     window.open("https://es-la.facebook.com/", "_blank");
//   };
//   const handleInstagramClick = () => {
//     window.open("https://www.instagram.com/?hl=es", "_blank");
//   };
//   const handleTwitterClick = () => {
//     window.open("https://twitter.com/i/flow/login", "_blank");
//   };
//   const handleLinkedInClick = () => {
//     window.open("https://www.linkedin.com/home", "_blank");
//   };

//   const location = useLocation();
//   const navigate = useNavigate();


//   return (
//     <footer
//       className={
//         location.pathname === "/" ? styles.footerLanding : styles.footerHome
//       }
//     >
//       <div className={styles.container}>
//         <div className={styles.row}>
//           <div className={styles.footer_col}>
//             <h4>FoodBook</h4>
//             <ul>
//               <li>
//                 <a href="#" onClick={() => navigate(`home/aboutUs`)}>Acerca de nosotros</a>
//               </li>
//               <li>
//                 <a href="#" onClick={() => navigate(`home/developers`)}>Nuestros Desarrolladores</a>
//               </li>
//             </ul>
//           </div>
//           <div className={styles.footer_col}>
//             <h4>Obtener Ayuda</h4>
//             <ul>
//               <li>
//                 <a href="#">FAQ</a>
//               </li>
//               <li>
//                 <a href="http://localhost:3000/home/cart">Carrito</a>
//               </li>
//             </ul>
//           </div>
//           <div className={styles.footer_col}>
//             <h4>Compra en linea</h4>
//             <ul>
//               <li>
//                 <a href="http://localhost:3000/home">Restaurantes</a>
//               </li>
//               <li>
//                 <a href="http://localhost:3000/mapa">
//                   Ubicaciones de Restaurantes
//                 </a>
//               </li>
//             </ul>
//           </div>

//           <div className={styles.footer_col}>
//             <h4>follow us</h4>
//             <div className={styles.social_links}>
//               <a href="#" onClick={handleFacebookClick}>
//                 <FacebookIcon />
//               </a>
//               <a href="#" onClick={handleTwitterClick}>
//                 <TwitterIcon />
//               </a>
//               <a href="#" onClick={handleInstagramClick}>
//                 <InstagramIcon />
//               </a>
//               <a href="#" onClick={handleLinkedInClick}>
//                 <LinkedInIcon />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
