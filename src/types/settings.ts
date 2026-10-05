export interface SiteSettingsData {
  // Pastoral Profile
  pastorName: string;
  pastorTitle: string;
  pastorImageUrl: string;
  pastorBio: string;
  pastorNationalId: string;

  // Church Identity & Location
  churchMotto: string;
  churchSlogan: string;
  postalAddress: string;
  physicalLocation: string;

  // Communication & Social Channels
  mpesaPhone: string;
  contactEmail: string;
  facebookUrl: string;
  instagramUrl: string;

  // Remittance & Banking
  kcbAccountNumber: string;
  kcbAccountName: string;
  kcbBranch: string;
  kcbSwift: string;
  mpesaPaybill: string;
  westernUnionRecipient: string;
}

export const DEFAULT_SETTINGS: SiteSettingsData = {
  // Pastoral Profile
  pastorName: "Pastor Caesar Osebe Nyandwaro",
  pastorTitle: "Resident Pastor & Visionary",
  pastorImageUrl: "/images/pastor-caesar-hero.jpg",
  pastorBio:
    "Called by God with an apostolic passion to set the captives free, build disciples through sound Biblical exposition, and lead Sugutta Fellowship Church into dynamic community transformation and global impact.",
  pastorNationalId: "39966005",

  // Church Identity & Location
  churchMotto: "REACHING OUT | GROWING TOGETHER | IMPACTING OUR WORLD",
  churchSlogan: "Come. Connect. Grow. Go.",
  postalAddress: "P.O BOX 405-40211, SUGGUTTA",
  physicalLocation: "Sugutta Sanctuary, Kenya",

  // Communication & Social Channels
  mpesaPhone: "+254112656123",
  contactEmail: "caesarosebe@gmail.com",
  facebookUrl: "https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH",
  instagramUrl: "https://instagram.com/suggutta",

  // Remittance & Banking
  kcbAccountNumber: "1234567890",
  kcbAccountName: "Sugutta Fellowship Church",
  kcbBranch: "Nairobi Central Branch",
  kcbSwift: "KCBLKENX",
  mpesaPaybill: "174379",
  westernUnionRecipient: "Caesar Osebe Nyandwaro",
};
