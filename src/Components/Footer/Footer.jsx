import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import styles from "./Footer.module.css";

export default function Footer() {
  const handleFacebookClick = () => {
    window.open("https://es-la.facebook.com/", "_blank");
  };
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/?hl=es", "_blank");
  };
  const handleTwitterClick = () => {
    window.open("https://twitter.com/i/flow/login", "_blank");
  };
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/home", "_blank");
  };

  return (
    <footer className={styles.container}>
      <div className={styles.socialMedias}>
        <div className={styles.hrs}>
          <hr />
        </div>
        <a href="#" onClick={handleFacebookClick}>
          <FacebookIcon className={styles.icons} />
        </a>
        <a href="#" onClick={handleTwitterClick}>
          <TwitterIcon className={styles.icons} />
        </a>
        <a href="#" onClick={handleInstagramClick}>
          <InstagramIcon className={styles.icons} />
        </a>
        <a href="#" onClick={handleLinkedInClick}>
          <LinkedInIcon className={styles.icons} />
        </a>
        <div className={styles.hrs}>
          <hr />
        </div>
      </div>

      <div className={styles.copyright}>
        <h3>Copyright © E-Commerce Todos los derechos reservados 2023</h3>
      </div>
    </footer>
  );
}
