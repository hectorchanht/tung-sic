import { ReactNode } from "react";
import styles from './gradientBtn.module.css';

const GradientBtn = ({ children, href, cls }: { children: ReactNode, href: string, cls?: string }) => {

  return (
    <button className={styles[cls] || styles.btn}>
      <a href={href} target="_blank" rel="noreferrer" >
        {children}
      </a>
    </button>
  )
}

export default GradientBtn;