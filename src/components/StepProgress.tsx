"use client";
import { usePathname } from "next/navigation";

const steps = [
  { label: "Project", path: "/project" },
  { label: "Persona", path: "/persona" },
  { label: "Survey", path: "/survey" },
  { label: "Results", path: "/results" },
];

export default function StepProgress() {
  const pathname = usePathname();
  const currentIdx = steps.findIndex((s) => pathname.startsWith(s.path));

  return (
    <div className="flex justify-center items-center py-4 bg-[#0058A3]">
      <div className="flex space-x-0 sm:space-x-8 w-full max-w-2xl">
        {steps.map((step, idx) => (
          <div key={step.path} className="flex-1 flex items-center">
            <div
              className={`flex flex-col items-center w-full relative`}
            >
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg border-2 transition
                  ${idx === currentIdx
                    ? 'bg-[#FFD200] border-[#FFD200] text-[#0058A3] scale-110 shadow-lg'
                    : idx < currentIdx
                    ? 'bg-white border-[#FFD200] text-[#0058A3]'
                    : 'bg-[#B7D0E2] border-[#B7D0E2] text-white'}
                `}
              >
                {idx + 1}
              </div>
              <span
                className={`mt-2 text-sm font-semibold transition
                  ${idx === currentIdx
                    ? 'text-[#FFD200]'
                    : idx < currentIdx
                    ? 'text-white'
                    : 'text-[#B7D0E2]'}
                `}
              >
                {step.label}
              </span>
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-full w-8 h-1 sm:w-16 sm:h-1 rounded-full
                    ${idx < currentIdx ? 'bg-[#FFD200]' : 'bg-[#B7D0E2]'}
                  `}
                  style={{ zIndex: 0 }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 