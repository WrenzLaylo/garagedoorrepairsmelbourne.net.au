import { useEffect, useRef, useState } from "react";
import { Phone, FileText, AlertTriangle } from "lucide-react";
import { CONTACT } from "../../constants";

interface Props {
  onCall: () => void;
  onEmergencyCall?: () => void;
}

export default function MobileCTABar({ onCall, onEmergencyCall }: Props) {
  const [visible, setVisible] = useState(false);
  const scrolledPast = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 160;
      if (past !== scrolledPast.current) {
        scrolledPast.current = past;
        setVisible(past);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 backdrop-blur-md md:hidden"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-3">
        <a
          href={CONTACT.emergencyTel}
          onClick={onEmergencyCall}
          className="flex flex-col items-center justify-center gap-1 border-r border-border py-3 text-accent-dark active:bg-accent/5"
          aria-label={`Emergency call ${CONTACT.emergencyPhone}`}
        >
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Emergency</span>
        </a>
        <a
          href={CONTACT.phoneTel}
          onClick={onCall}
          className="flex flex-col items-center justify-center gap-1 bg-brand-dark py-3 text-white active:opacity-90"
          aria-label={`Call us at ${CONTACT.phone}`}
        >
          <Phone className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Call now</span>
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center justify-center gap-1 border-l border-border py-3 text-ink active:bg-surface-alt"
          aria-label="Get a free quote"
        >
          <FileText className="h-5 w-5" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">Get quote</span>
        </a>
      </div>
    </div>
  );
}
