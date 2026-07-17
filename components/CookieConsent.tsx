"use client";

import { useEffect, useState } from "react";

type ConsentChoice = "accepted" | "rejected";

function updateGoogleConsent(choice: ConsentChoice) {
  const consentValue = choice === "accepted" ? "granted" : "denied";

  window.gtag?.("consent", "update", {
    analytics_storage: consentValue,
    ad_storage: consentValue,
    ad_user_data: consentValue,
    ad_personalization: consentValue,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedChoice = localStorage.getItem(
      "perlage-cookie-consent"
    ) as ConsentChoice | null;

    if (!savedChoice) {
      setVisible(true);
      return;
    }

    updateGoogleConsent(savedChoice);
  }, []);

  const saveChoice = (choice: ConsentChoice) => {
    localStorage.setItem("perlage-cookie-consent", choice);
    updateGoogleConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[9999] mx-auto max-w-3xl rounded-3xl border border-[#D2B07A]/40 bg-black/95 p-6 text-white shadow-2xl backdrop-blur-xl md:p-7">
      <p className="text-xs uppercase tracking-[0.3em] text-[#D2B07A]">
        Privacy e cookie
      </p>

      <h2 className="mt-3 text-xl font-semibold">
        Utilizziamo cookie e strumenti di misurazione
      </h2>

      <p className="mt-3 text-sm leading-6 text-white/70">
        Utilizziamo cookie tecnici e, con il tuo consenso, strumenti Google
        Analytics e Google Ads per misurare le visite e migliorare le campagne
        pubblicitarie. Puoi accettare o rifiutare i cookie non necessari.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => saveChoice("rejected")}
          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:border-white/50"
        >
          Rifiuta
        </button>

        <button
          type="button"
          onClick={() => saveChoice("accepted")}
          className="rounded-full bg-[#D2B07A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black transition hover:bg-[#E7C48B]"
        >
          Accetta
        </button>
      </div>
    </div>
  );
}