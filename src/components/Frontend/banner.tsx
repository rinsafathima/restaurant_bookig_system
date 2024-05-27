import Link from "next/link";
import Image from "next/image";

export default function Banner() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-4">
        <div className="max-w-xl text-center sm:text-left lg:pl-12">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to
            <strong className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-500">
              Bug Free Spoon
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
          Our unique and high-quality recipes will transport you on a culinary journey through China. Reserve your table now and enjoy an unforgettable dining experience!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/reserva"
              className="block w-full rounded bg-green-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-green-600 focus:outline-none focus:ring active:bg-green-500 sm:w-auto">
              Reservation
            </Link>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-0 lg:ml-16 lg:flex-1 lg:pl-8 pointer-events-none">
          <img
            alt="banner"
            src="/img/banner.png"
            className="hidden lg:block"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
