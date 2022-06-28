import { ReactNode } from "react";
import styles from './gradientBtn.module.css';

const GradientBtn = ({ children, href, cls }: { children: ReactNode, href: string, cls?: string }) => {

  return (
    <a href={href} target="_blank" rel="noreferrer" >
      {/* @ts-ignore */}
      <button className={styles?.[cls] || styles.btn}>
        {children}
      </button>
    </a>
  )
}

export default GradientBtn;