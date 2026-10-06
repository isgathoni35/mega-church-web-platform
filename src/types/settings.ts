export interface MinistryEventItem {
  id: string;
  badge: string;
  title: string;
  location: string;
  dates: string;
  format: string;
  description: string;
  imageUrl: string;
  whatsappMessage: string;
  [key: string]: string;
}


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

  // Hero Section
  heroHeadline1: string;
  heroHeadline2: string;
  heroHeadline3: string;
  heroSubtitle: string;
  heroPromise: string;
  heroImageUrl: string;
  heroStatBranches: string;
  heroStatLives: string;
  heroStatYears: string;

  // Mission & Vision Statements
  missionStatement: string;
  visionStatement: string;

  // Twin Ongoing Projects
  constructionTitle: string;
  constructionSubtitle: string;
  constructionNarrative: string;
  constructionImageUrl: string;
  constructionBadge: string;

  orphanageTitle: string;
  orphanageSubtitle: string;
  orphanageNarrative: string;
  orphanageImageUrl: string;
  orphanageBadge: string;

  // Grassroots Community Outreach
  communityTitle: string;
  communityNarrative: string;
  communityImageUrl: string;

  // 4 Ministry Pillars
  pillar1Title: string;
  pillar1Desc: string;
  pillar1Image: string;

  pillar2Title: string;
  pillar2Desc: string;
  pillar2Image: string;

  pillar3Title: string;
  pillar3Desc: string;
  pillar3Image: string;

  pillar4Title: string;
  pillar4Desc: string;
  pillar4Image: string;

  // 3 Pillar Impact Counters
  impactStat1Val: string;
  impactStat1Lbl: string;
  impactStat2Val: string;
  impactStat2Lbl: string;
  impactStat3Val: string;
  impactStat3Lbl: string;

  // Events Data
  eventsJson: MinistryEventItem[];

  // Communication & Social Channels
  mpesaPhone: string;
  contactEmail: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeChannelUrl: string;


  // Remittance & Banking
  kcbAccountNumber: string;
  kcbAccountName: string;
  kcbBranch: string;
  kcbSwift: string;
  mpesaPaybill: string;
  mpesaTillNumber: string;
  mpesaTillName: string;
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

  // Hero Section
  heroHeadline1: "Sugutta",
  heroHeadline2: "Fellowship",
  heroHeadline3: "Church",
  heroSubtitle:
    "We are a Christ-centered, Spirit-filled family learning to follow Jesus faithfully and carry His Gospel into everyday life.",
  heroPromise:
    "Experience God's power through deliverance and spiritual transformation.",
  heroImageUrl: "/images/pastor-caesar-hero.jpg",
  heroStatBranches: "50+",
  heroStatLives: "1M+",
  heroStatYears: "25+",

  // Mission & Vision Statements
  missionStatement:
    "To win souls to Christ, disciple believers in sound biblical doctrine, break spiritual bondages through the power of the Holy Spirit, and raise an empowered community walking in holiness and divine covenant purpose.",
  visionStatement:
    "To be an apostolic beacon of worship and spiritual awakening across Kenya and the nations, demonstrating Christ's compassion, planting praying families, and advancing the Kingdom of God.",

  // Twin Ongoing Projects
  constructionTitle: "Building a Permanent House of Prayer in Sugutta",
  constructionSubtitle:
    "Concrete foundation blocks, steel pillar reinforcement & roof trussing.",
  constructionNarrative:
    "With five vibrant Sunday services and midweek teachings overflowing our temporary hall, our congregation is constructing a permanent sanctuary to shelter worshippers from the rains and house youth discipleship.",
  constructionImageUrl: "/images/church-construction.jpg",
  constructionBadge: "Sanctuary Construction",

  orphanageTitle: "Sheltering & Sponsoring 50+ Vulnerable Children",
  orphanageSubtitle:
    "Hot nutritious meals, quality education, medical care & parental love.",
  orphanageNarrative:
    "Putting faith into tangible action. Every day, our home feeds, clothes, and educates orphaned boys and girls in Sugutta. Sponsoring a child or sending food donations preserves a destiny and fulfills James 1:27.",
  orphanageImageUrl: "/images/orphanage-hero.png",
  orphanageBadge: "Children's Home Mission",

  // Grassroots Community Outreach
  communityTitle: "Rooted in Our Community, Walking Alongside Families",
  communityNarrative:
    "True Christian ministry is never confined to sanctuary walls. In Sugutta and neighboring villages, our pastoral team and church workers meet regularly with village elders, struggling families, and young children in their homesteads.",
  communityImageUrl: "/images/community-outreach.jpg",

  // 4 Ministry Pillars
  pillar1Title: "Deliverance & Healing",
  pillar1Desc:
    "Treading upon the works of darkness, breaking generational curses, casting out demonic afflictions, and witnessing total physical restoration through the authority of Jesus Christ.",
  pillar1Image: "/images/ministry-healing.jpg",

  pillar2Title: "Global Crusades",
  pillar2Desc:
    "Conducting massive outdoor evangelistic campaigns, stadium crusades, and open-air meetings that gather hundreds of thousands to repent and accept the saving power of the Cross.",
  pillar2Image: "/images/hero-worship.jpg",

  pillar3Title: "Prophetic Word & Truth",
  pillar3Desc:
    "Expositional teaching of the Holy Scriptures to equip the saints, ground believers in apostolic doctrine, and build resilient Christian families anchored in holiness.",
  pillar3Image: "/images/ministry-healing.jpg",

  pillar4Title: "Compassion & Outreach",
  pillar4Desc:
    "Feeding the hungry, sheltering orphans, providing medical support, and clothing widows across underserved communities as an active demonstration of Christ's compassion.",
  pillar4Image: "/images/community-outreach.jpg",

  // 3 Pillar Impact Counters
  impactStat1Val: "1,200+",
  impactStat1Lbl: "Deliverance Sessions",
  impactStat2Val: "50+",
  impactStat2Lbl: "Miracle Crusades",
  impactStat3Val: "1,000,000+",
  impactStat3Lbl: "Believers Impacted",

  // Events Data
  eventsJson: [
    {
      id: "sugutta-crusade-2026",
      badge: "MISSION 2026",
      title: "Sugutta Miracle & Deliverance Crusade",
      location: "Sugutta Sanctuary, Kenya",
      dates: "April 24-26, 2026",
      format: "In-Person & Live Broadcast",
      description:
        "Join Pastor Caesar Osebe Nyandwaro for three powerful days of deliverance, healing, and supernatural transformation.",
      imageUrl: "/images/hero-worship.jpg",
      whatsappMessage:
        "Hello Pastor Caesar, I would like to join the WhatsApp group for the Sugutta Miracle & Deliverance Crusade (April 24-26, 2026).",
    },
    {
      id: "prayer-mountain-retreat-2026",
      badge: "RETREAT 2026",
      title: "Sacred Prayer Mountain Fasting Retreat",
      location: "Sugutta Prayer Mountain Sanctuary",
      dates: "May 15-17, 2026",
      format: "In-Person Retreat",
      description:
        "An intensive spiritual retreat dedicated to deep fasting, mountain intercession, and personal revival away from all worldly distractions.",
      imageUrl: "/images/ministry-healing.jpg",
      whatsappMessage:
        "Hello Pastor Caesar, I would like to register for the Sacred Prayer Mountain Fasting Retreat (May 15-17, 2026).",
    },
  ],

  // Communication & Social Channels
  mpesaPhone: "+254112656123",
  contactEmail: "caesarosebe@gmail.com",
  facebookUrl: "https://facebook.com/SUGGUTTA-FELLOWSHIP-CHURCH",
  instagramUrl: "https://instagram.com/suggutta",
  youtubeChannelUrl: "https://www.youtube.com/@Brianmbera",



  // Remittance & Banking
  kcbAccountNumber: "1356891853",
  kcbAccountName: "Sugutta Fellowship church",
  kcbBranch: "Nairobi Central Branch",
  kcbSwift: "KCBLKENX",
  mpesaPaybill: "174379",
  mpesaTillNumber: "8146952",
  mpesaTillName: "Suggutta Fellowship Church",
  westernUnionRecipient: "Caesar Osebe Nyandwaro",
};
