import { getPayloadHMR } from '@payloadcms/next/utilities';
import configPromise from '@payload-config'; // Adjust if your config is named differently
import { notFound } from 'next/navigation';
import { ParallaxScroll } from '@/components/ui/paralax-scroll';// Adjust import path to your component
import Card from '@/components/card';
import Navbar from '@/components/navbar';

interface ParallaxImage {
  image: {
    url: string | null | undefined;
  };
  title: string;
  hours: number;
  rating: number;
  gradient: string;
  id?: string | number | undefined;
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: await configPromise });
  const pages = await payload.find({ collection: 'pages', limit: 0 });
  return pages.docs.map((page) => ({ slug: 'home' }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const payload = await getPayloadHMR({ config: await configPromise });

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: params.slug } },
    depth: 2, // Ensures relations like images are populated with URLs
    limit: 1,
  });
  console.log("retuslt:", result);

  const page = result.docs[0];

  if (!page) {
    notFound();
  }

  return (
    <div className=" flex flex-col h-[100vh] overflow-x-hidden sm:overflow-hidden bg-gray-50">
      <div className="w-full  border-b-[1px] mb-[48px]">
        <Navbar />
      </div>
      <div className="hidden relative overflow-hidden h-full sm:flex items-start w-full px-8 py-0 max-w-[1440px] mx-auto">
        {/* Background - ParallaxScroll component */}
        <div className="absolute h-[35rem] min-w-[1120px] max-w-[1120px] left-[20%] inset-0 z-0 rounded-xl overflow-hidden border border-transparent">
          <div>
            {page.layout?.map((block, index) => {
              if (block.blockType === 'parallax-scroll') {
                // Map items to ensure image.url is accessible (populated via depth)
                const items = block.items?.map((item) => ({
                  ...item,
                  image: {
                    url: typeof item.image === 'object' ? item.image.url : '', // Fallback if not populated
                  },
                }));
                console.log("items:", items);
                { items != undefined && <ParallaxScroll key={index} images={items} /> };
                return null
              }
              return null; // Handle other blocks here if added
            })}
          </div>
        </div>

        {/* Foreground - Booking Card */}
        <div className="relative z-10 mt-20 max-w-md">
          <Card />
        </div>
      </div>
      <div className="sm:hidden flex gap-8 flex-col p-4">
        <div className="rounded-2xl  overflow-hidden">
          <img src="/hero.png" alt="" />
        </div>
        <div className="flex justify-center">
          <Card />
        </div>
      </div>
    </div>
    // </div>
  );
}