import AppButton from "@components/atoms/AppButton";
import AppLogo from "@components/atoms/AppLogo";

import styles from "./NavBar.module.scss";

import { useNavbar } from "@hooks/useNavbar";

interface NavBarProps {
  datas?: {
    links?: {
      [key: string]: { link?: string; text?: string; type?: string };
    };
    homeLink?: {
      link?: string;
      srcLogo?: string;
      srcFavicon?: string;
    };
  };
}

export default function NavBar({
  datas = { links: null, homeLink: null },
}: NavBarProps) {
  const { isMenuOpen, setIsMenuOpen } = useNavbar();

  return (
    <nav className={styles.navbar}>
      <div
        className={`${styles.darkFilter} ${
          isMenuOpen ? styles["menu-open"] : ""
        }`}
      ></div>
      <ul
        className={`${styles.navLinks} ${
          isMenuOpen ? styles["menu-open"] : ""
        }`}
      >
        <li>
          <AppLogo
            src={datas?.homeLink?.srcLogo || null}
            link={datas?.homeLink?.link || "/"}
            className={styles.logo}
            type="logo"
          />
        </li>
        {datas?.links &&
          Object.entries(datas.links).map(
            ([key, value]: [
              string,
              { link?: string; text?: string; type?: string }
            ]) => (
              <li key={`nav-link-${key}`}>
                <AppButton
                  link={value.link}
                  text={value.text || "Accueil"}
                  type={value.type}
                />
              </li>
            )
          )}
        <li className={styles.closeMenuButton}>
          <button onClick={() => setIsMenuOpen(false)}>
            <div></div>
            <div></div>
          </button>
        </li>
      </ul>
      <ul className={styles.navMobile}>
        <li>
          <AppLogo
            src={datas?.homeLink?.srcFavicon}
            link={datas?.homeLink?.link}
            className={styles.favicon}
            type="favicon"
          />
        </li>
        <li>
          <button id="burger-menu" onClick={() => setIsMenuOpen(true)}>
            <div></div>
            <div></div>
            <div></div>
          </button>
        </li>
      </ul>
    </nav>
  );
}
