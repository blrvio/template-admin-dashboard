import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/src/config/site";
import { title, subtitle } from "@/src/components/primitives";
import { GithubIcon } from "@/src/components/icons";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>
          Para visualizar os objetos 3d, acesse o site pelo seu celular.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Selecione o objeto de acordo com o seu tipo de smartphone
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          href={"/export-obj2.obj"}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Android
          <span className="icon">
            <Image
              src="https://developer.apple.com/augmented-reality/quick-look/images/arkit-glyph.svg"
              alt="ARKit Icon"
              width={20} // Ajuste a largura conforme necessário
              height={20} // Ajuste a altura conforme necessário
              layout="fixed"
            />
          </span>
        </Link>
        <Link
          isExternal
          href={"/export-usd3.usdz"}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          IOS / iPhone
          <span className="icon">
            <Image
              src="https://developer.apple.com/augmented-reality/quick-look/images/arkit-glyph.svg"
              alt="ARKit Icon"
              width={20} // Ajuste a largura conforme necessário
              height={20} // Ajuste a altura conforme necessário
              layout="fixed"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
