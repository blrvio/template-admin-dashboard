"use client";
import ProtectRoute from "@/components/ProtectRoute";
import { Progress } from "@nextui-org/react";
import { ReactNode } from "react";
import { usePathname } from "next/navigation"; // Importando useRouter

interface OnboardLayoutProps {
  children: ReactNode;
}

type ProgressMap = {
  '/onboard/first-organization': number;
  '/onboard/personal-information': number;
  '/onboard/personal-preferences': number;
  '/onboard/finish': number;
};

export default function OnboardLayout({ children }: OnboardLayoutProps) {
  const pathname = usePathname();

  // Calcule o progresso com base no caminho da rota
  const calculateProgress = (path: keyof ProgressMap) => {
    const progressMap: ProgressMap = {
      '/onboard/first-organization': 33,
      '/onboard/personal-information': 66,
      '/onboard/personal-preferences': 97,
      '/onboard/finish': 100,
      // Adicione mais caminhos e valores de progresso conforme necessário
    };

    return progressMap[path] || 0; // Retorna 0 se o caminho não estiver no mapa
  };

  console.log('router.pathname', pathname);
  
  const progressValue = calculateProgress(pathname as keyof ProgressMap);

  return (
    <ProtectRoute>
      <div className="h-screen bg-dark-900 flex flex-col justify-center items-center space-y-8">
        <div className="w-full max-w-md px-4">
          <Progress
            size="sm"
            radius="sm"
            value={progressValue}
            classNames={{
              base: "w-full",
              track: "drop-shadow-md border border-default",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            label="Onboarding progress"
            showValueLabel={true}
          />
        </div>
        {children}
      </div>
    </ProtectRoute>
  );
}
