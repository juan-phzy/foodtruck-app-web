import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerLogo}>
                        <Link href="/" className={styles.footerLogoLink}>
                            MunchMap
                        </Link>
                        <p className={styles.footerTagline}>
                            Discovering street food made easy
                        </p>
                    </div>

                    <div className={styles.footerLinks}>
                        <div className={styles.footerLinkGroup}>
                            <h4 className={styles.footerLinkTitle}>Explore</h4>
                            <Link href="/map" className={styles.footerLink}>
                                Map
                            </Link>
                            <Link
                                href="/vendor-info"
                                className={styles.footerLink}
                            >
                                For Vendors
                            </Link>
                        </div>

                        <div className={styles.footerLinkGroup}>
                            <h4 className={styles.footerLinkTitle}>Company</h4>
                            <Link href="/about" className={styles.footerLink}>
                                About Us
                            </Link>
                            <Link href="/contact" className={styles.footerLink}>
                                Contact
                            </Link>
                        </div>

                        <div className={styles.footerLinkGroup}>
                            <h4 className={styles.footerLinkTitle}>Legal</h4>
                            <Link href="/privacy" className={styles.footerLink}>
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className={styles.footerLink}>
                                Terms of Use
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        &copy; {new Date().getFullYear()} MunchMap. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
