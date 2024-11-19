import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-full max-h-full h-screen">
      <Image
        src="/images/under_construction.png"
        alt="no reservations"
        width={450}
        height={300}
        className="object-contain"
      />
    </div>
  );
}
