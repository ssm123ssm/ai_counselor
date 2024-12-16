import Image from "next/image";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="fixed bottom-0 left-0 flex h-24 w-full items-end justify-between bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          href="https://www.llamaindex.ai/"
          className="flex items-center justify-center font-nunito text-lg font-bold gap-2"
        >
          <span>Department of Pharmacology</span>
          <Image
            className="rounded-xl m-2"
            src="/uni.png"
            alt="University Logo"
            width={40}
            height={40}
            priority
          />
        </a>
      </div>
      <Image
        className="rounded-xl right-0"
        src="/logo.jpeg"
        alt="University Logo"
        width={200}
        height={200}
        priority
      />
    </div>
  );
}
