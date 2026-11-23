type Props = {
  className?: string;
};

export default function ResearchOverviewGraphic({ className }: Props) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 340 210"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="research-board" width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="var(--paper-raised)" />
          <path d="M0 0H4.5V4.5H0ZM4.5 4.5H9V9H4.5Z" fill="var(--rule)" />
        </pattern>
      </defs>
      <rect x="22" y="12" width="224" height="184" fill="var(--paper-raised)" stroke="var(--rule)" strokeWidth="1.5" />
      <path d="M42 34H86" stroke="var(--pencil)" strokeWidth="3" />
      <path d="M42 49H170M42 58H166" stroke="var(--rule)" strokeWidth="1.5" />
      <rect
        x="193"
        y="26.5"
        width="32.5"
        height="32.5"
        fill="url(#research-board)"
        stroke="var(--rule)"
        strokeWidth="0.75"
      />
      <path d="M42 73H226" stroke="var(--rule)" strokeWidth="1.5" />
      <path d="M49 159H222M49 128H222M49 98H222" stroke="var(--rule)" strokeWidth="1" />
      <path d="M49 159V91" stroke="var(--rule)" strokeWidth="1.5" />
      <path d="M66 159V139H89V159M103 159V121H126V159M140 159V130H163V159M177 159V105H200V159" fill="var(--active)" />
      <path
        d="M66 159V139H89V159M103 159V121H126V159M140 159V130H163V159M177 159V105H200V159"
        stroke="var(--muted)"
        strokeWidth="1.5"
      />
      <circle cx="77.5" cy="139" r="3" fill="var(--paper-raised)" stroke="var(--muted)" strokeWidth="1.5" />
      <circle cx="114.5" cy="121" r="3" fill="var(--pencil)" strokeWidth="1.5" />
      <circle cx="151.5" cy="130" r="3" fill="var(--paper-raised)" stroke="var(--muted)" strokeWidth="1.5" />
      <circle cx="188.5" cy="105" r="3.5" fill="var(--paper-raised)" stroke="var(--muted)" strokeWidth="1.5" />
      <path d="M49 174H108M119 174H160" stroke="var(--rule)" strokeWidth="1.5" />
      <path d="M278 128L316 166" stroke="var(--ink)" strokeLinecap="round" strokeWidth="6" />
      <circle cx="253" cy="103" r="34" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M232 91H274M232 103H274M232 115H274" stroke="var(--rule)" strokeWidth="1" />
      <path d="M253 80V126" stroke="var(--rule)" strokeDasharray="2 3" strokeWidth="1" />
      <path
        d="M232 111L239 104L246 108L253 103L260 106L267 92L274 97"
        stroke="var(--pencil)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <circle cx="239" cy="104" r="2" fill="var(--paper)" stroke="var(--pencil)" strokeWidth="1.5" />
      <circle cx="253" cy="103" r="4" fill="var(--pencil)" stroke="var(--paper)" strokeWidth="1.5" />
      <circle cx="267" cy="92" r="2" fill="var(--paper)" stroke="var(--pencil)" strokeWidth="1.5" />
      <circle cx="274" cy="97" r="2" fill="var(--paper)" stroke="var(--pencil)" strokeWidth="1.5" />
    </svg>
  );
}
