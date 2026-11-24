import { ReactNode } from "react";
import styles from './gradientBtn.module.css';

const GradientBtn = ({ children, href, cls, label }: { children: ReactNode, href: string, cls?: string, label?: string }) => {

  return (
    <a href={href} target="_blank" rel="noreferrer" >
      {/* @ts-ignore */}
      <button className={styles?.[cls] || styles.btn} aria-label={label} title={label}>
        {children}
      </button>
    </a>
  )
}

export default GradientBtn;