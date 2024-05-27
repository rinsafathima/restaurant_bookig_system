import Link from "next/link";
import Image from "next/image";

export default function Katering() {
  return (
    <section className="mx-auto max-w-screen-xl overflow-hidden sm:grid sm:grid-cols-2 sm:items-center mb-16">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Unleash a Symphony of Taste
          </h2>

          <p className="text-gray-500 md:mt-4 md:block">
            Our talented chefs will craft a menu that perfectly complements your event, 
            from delectable dim sum to sizzling stir-fries. Every dish is prepared with fresh, 
            high-quality ingredients, ensuring an unforgettable taste experience.
          </p>

          <div className="mt-4 md:mt-8">
            <Link
              href="./reserva"
              className="inline-block rounded bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-green-700"
            >
              Reservation
            </Link>
          </div>
        </div>
      </div>

      <Image
        alt="katering_img"
        src="/img/katering.jpg"
        className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-tl-[30px] md:h-[calc(100%_-_4rem)] md:rounded-tl-[60px] sm:pr-14"
        height={400}
        width={400}
      />
    </section>
  );
}
