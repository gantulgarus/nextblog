const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: process.env.r58lhdix,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.NODE_ENV === "production",
});

export default client;
