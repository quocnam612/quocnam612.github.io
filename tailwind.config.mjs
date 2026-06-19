import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

const config = {
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["pixelarticons"]),
    }),
  ],
};

export default config;
