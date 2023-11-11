"use client";
import { Logo } from "@/components/icons";
import Image from "next/image";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="flex flex-col w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/3 lg:px-8 lg:py-24">
        {/* Logotipo ou elemento no topo */}
        <div className="w-full">
          <Logo className="mx-auto" />
        </div>
        {/* Conteúdo do children */}
        {children}
        {/* Outro espaçador para manter o children centralizado */}
        <div className="flex-grow"></div>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-2/3">
        <Image
          alt="Welcome"
          src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWgefHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  );
}
