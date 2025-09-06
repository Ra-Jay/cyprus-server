// src/payload/collections/Pages.ts (or wherever your collection is defined)
import { CollectionConfig } from 'payload';
import ParallaxScrollBlock from '../app/(payload)/blocks/ParallaxScrollBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        ParallaxScrollBlock,
        // Add other blocks here, e.g., HeroBlock, TextBlock, etc.
      ],
    },
    // Other fields...
  ],
  // Other config options like access, hooks, etc.
};