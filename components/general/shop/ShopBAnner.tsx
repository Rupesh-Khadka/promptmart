import Image from "next/image";

export function ShopBanner({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div>
        <Image
          src="https://pixner.net/aikeu/assets/images/banner/cmn-thumb-left.png"
          width={180}
          height={180}
          alt="Left Banner"
          className="absolute top-1 left-10 "
        />
        <h4 className="text-4xl font-[700] xl:text-6xl 2xl:text-7xl font-Monserrat text-white">
          {title}
        </h4>

        <div>
          <Image
            src="https://pixner.net/aikeu/assets/images/banner/cmn-thumb-right.png"
            alt="Prompt Images"
            height={180}
            width={180}
            className="absolute right-10"
          />
        </div>
      </div>
    </div>
  );
}
