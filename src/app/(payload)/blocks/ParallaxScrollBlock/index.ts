// payload/blocks/ParallaxScrollBlock.ts
import { Block } from 'payload';

const ParallaxScrollBlock: Block = {
  slug: 'parallax-scroll',
  interfaceName: 'ParallaxScrollBlock',
  labels: {
    singular: 'Parallax Scroll',
    plural: 'Parallax Scrolls',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 3, // To match the component's slicing; adjust if you make the component more flexible
      maxRows: 25, // Optional; based on original slicing
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Assumes you have a 'media' collection for uploads
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'hours',
          type: 'number',
          required: true,
          min: 1,
          max: 24, // Arbitrary reasonable limit
        },
        {
          name: 'rating',
          type: 'number',
          required: true,
          min: 0,
          max: 5,
          admin: {
            step: 0.1,
          },
        },
        {
          name: 'gradient',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Pink to Violet',
              value: 'bg-gradient-to-r from-pink-500 to-violet-600',
            },
            {
              label: 'Blue Shades',
              value: 'bg-gradient-to-r from-[#00B5F1] via-[#00AEEF] to-[#0066B3]',
            },
          ],
        },
      ],
    },
  ],
};

export default ParallaxScrollBlock;