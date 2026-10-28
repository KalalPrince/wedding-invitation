/**
 * Wedding Invitation Data - Source of Truth: Wedding invitation.pdf
 * Contains all verified details for both weddings, pre-wedding rituals,
 * family lineage, hosts, and venue information.
 */

const WEDDING_DATA = {
  general: {
    familyTitleHi: "मालविया परिवार",
    familyTitleEn: "Malviya Family",
    invitationTitleHi: "शुभविवाह एवं गंगा प्रसादी",
    invitationTitleEn: "Auspicious Wedding & Ganga Prasadi",
    welcomeMessageHi: "मालविया परिवार आपका हार्दिक स्वागत करता है।",
    welcomeMessageEn: "The Malviya Family cordially welcomes you to grace this sacred union with your blessings.",
    shlokas: [
      {
        deity: "गणेश वंदना",
        sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।\nनिर्विघ्नंकुरुमे देव सर्वकार्येषु सर्वदा॥",
        meaningEn: "O Lord with the curved trunk and immense aura, radiant as ten million suns, please make all our endeavors obstacle-free, forever."
      },
      {
        deity: "मंगल श्लोक",
        sanskrit: "विघ्न हरण मंगल करण, गणनायक गणराज।\nरिधि सिधि सहित पधारजो, पूरण करजो काज॥",
        meaningEn: "Destroyer of obstacles, bringer of auspiciousness, O leader of celestial hosts! Come along with Riddhi and Siddhi, and accomplish our ceremonies."
      }
    ],
    invitationLetter: {
      hi: "मान्यवर श्री,\nयोग लिखी गाँव धोली मंगरी (कलालों की आँती) से भगवानलालजी, जीवनलालजी का राम राम बंचावसी। अपरंच अठे हमारे पिताश्री स्व. श्री कानाजी एवं दादाजी स्व. श्री गंगारामजी का गंगोज सं. 2083 छठ रविवार मार्गशीर्ष कृष्ण पक्ष दि. 29-11-2026 को है एवं पागबंधा सं. 2083 सातम सोमवार दि. 30-11-2026 को है सो आप सब वेगा पधारसी।",
      en: "Respected Guests,\nWith warm respectful greetings from Village Dholi Mangri (Kalalo ki Aanti), Bhagwanlalji and Jivanlalji convey their sincere Ram-Ram. By divine grace, the Gangoj (Ganga Prasadi) commemoration in memory of our revered father Late Shri Kanaji and grandfather Late Shri Gangaramji will be held on Vikram Samvat 2083, Chhath, Sunday, Margashirsha Krishna Paksha, 29 November 2026; followed by Pagbandha ceremony on Vikram Samvat 2083, Satam, Monday, 30 November 2026. We cordially request your gracious presence to bless our family."
    },
    meethiManuhaar: {
      verseHi: "हल्दी है, चन्दन है, रिश्तो का बंधन है,\nहमारे भैया और दीदी की शादी में आपका अभिनंदन है...",
      verseEn: "With the fragrance of turmeric and sandalwood, and the eternal bond of kinship,\nwe lovingly welcome you to our beloved brother and sister's wedding...",
      namesHi: "राज, प्रिन्स, संजना, गौतम, ऊषा",
      namesEn: "Raj, Prince, Sanjana, Gautam, Usha"
    }
  },

  weddings: {
    jaimin: {
      id: "jaimin-monika",
      monogram: "JM",
      weddingDateIso: "2026-11-26T11:00:00+05:30",
      targetDate: "2026-11-26",
      dateFormattedHi: "26 नवम्बर 2026, गुरुवार",
      dateFormattedEn: "Thursday, 26 November 2026",
      dayHi: "गुरुवार",
      dayEn: "Thursday",
      roleHi: "वर पक्ष (जैमिन का विवाह)",
      roleEn: "Groom's Side (Jaimin's Marriage)",
      groom: {
        salutationHi: "चि.",
        salutationEn: "Chi.",
        nameHi: "जैमिन",
        nameEn: "Jaimin",
        fullNameHi: "चि. जैमिन मालविया",
        fullNameEn: "Chi. Jaimin Malviya",
        grandparentsHi: "स्व. श्रीमती टीपूबेन - स्व. श्री कानाजी",
        grandparentsEn: "Late Smt. Tipuben & Late Shri Kanaji",
        parentsHi: "श्रीमती लक्ष्मीबेन - श्री भगवानलालजी मालविया",
        parentsEn: "Smt. Laxmiben & Shri Bhagwanlalji Malviya",
        residenceHi: "धोली मंगरी (कलालों की आँती), तह. देवगढ़, जिला राजसमन्द, राजस्थान",
        residenceEn: "Dholi Mangri (Kalalo ki Aanti), Tehsil Deogarh, Dist. Rajsamand, Rajasthan"
      },
      bride: {
        salutationHi: "सौ.कां.",
        salutationEn: "Sau. Ka.",
        nameHi: "मोनिका",
        nameEn: "Monika",
        fullNameHi: "सौ.कां. मोनिका सिद्धावत",
        fullNameEn: "Sau. Ka. Monika Siddhawat",
        grandparentsHi: "श्रीमती पवनदेवी - श्री अशोकजी",
        grandparentsEn: "Smt. Pawandevi & Shri Ashokji",
        parentsHi: "श्रीमती नर्मदादेवी - श्री देवेन्द्रजी सिद्धावत",
        parentsEn: "Smt. Narmadadevi & Shri Devendraji Siddhawat",
        residenceHi: "नरदास का गुड़ा, राजस्थान",
        residenceEn: "Nardas Ka Gurha, Rajasthan"
      },
      ceremonies: [
        {
          id: "jm-pritibhoj",
          nameHi: "प्रीतिभोज",
          nameEn: "Priti Bhoj (Wedding Banquet)",
          dateHi: "25-11-2026, बुधवार",
          dateEn: "Wednesday, 25 Nov 2026",
          timeHi: "प्रातः 11:15 बजे से आपके आगमन तक",
          timeEn: "11:15 AM onwards till arrival",
          venueKey: "dholi-mangri",
          venueNameHi: "निज निवास, धोली मंगरी (कलालों की आँती)",
          venueNameEn: "Family Residence, Dholi Mangri (Kalalo ki Aanti)",
          descHi: "वर पक्ष का प्रीतिभोज एवं सत्कार समारोह।",
          descEn: "Welcoming feast and celebration hosted by the groom's family."
        },
        {
          id: "jm-barat-prasthan",
          nameHi: "बारात प्रस्थान",
          nameEn: "Barat Prasthan (Wedding Procession Departure)",
          dateHi: "26-11-2026, गुरुवार",
          dateEn: "Thursday, 26 Nov 2026",
          timeHi: "प्रातः 7:15 बजे",
          timeEn: "7:15 AM Morning",
          venueKey: "nardas-ka-gurha",
          venueNameHi: "प्रस्थान: धोली मंगरी -> गंतव्य: नरदास का गुड़ा",
          venueNameEn: "Departure: Dholi Mangri -> Destination: Nardas Ka Gurha",
          noteHi: "बारात श्रीमान देवेन्द्रजी अशोकजी सिद्धावत नरदास का गुड़ा के यहाँ जाएगी।",
          noteEn: "The wedding procession will proceed to the residence of Shri Devendraji Ashokji Siddhawat at Nardas Ka Gurha."
        },
        {
          id: "jm-hast-melap",
          nameHi: "हस्त मेलाप एवं पाणिग्रहण",
          nameEn: "Hast Melap & Sacred Wedding Rites",
          dateHi: "26-11-2026, गुरुवार",
          dateEn: "Thursday, 26 Nov 2026",
          timeHi: "दोपहर 11:00 से 3:00 बजे तक",
          timeEn: "11:00 AM to 3:00 PM",
          venueKey: "nardas-ka-gurha",
          venueNameHi: "श्री देवेन्द्रजी सिद्धावत निवास, नरदास का गुड़ा",
          venueNameEn: "Shri Devendraji Siddhawat Residence, Nardas Ka Gurha",
          descHi: "पवित्र अग्नि के समक्ष वर-वधू का हस्त मिलाप एवं सात फेरे।",
          descEn: "Sacred union of hands and circumambulation around the holy fire."
        }
      ],
      illustration: "assets/images/jaimin-monika.jpg"
    },

    gayatri: {
      id: "gayatri-aditya",
      monogram: "GA",
      weddingDateIso: "2026-11-29T11:15:00+05:30",
      targetDate: "2026-11-29",
      dateFormattedHi: "29 नवम्बर 2026, रविवार",
      dateFormattedEn: "Sunday, 29 November 2026",
      dayHi: "रविवार",
      dayEn: "Sunday",
      roleHi: "वधू पक्ष (गायत्री का विवाह)",
      roleEn: "Bride's Side (Gayatri's Marriage)",
      bride: {
        salutationHi: "सौ.कां.",
        salutationEn: "Sau. Ka.",
        nameHi: "गायत्री (शिल्पा)",
        nameEn: "Gayatri (Shilpa)",
        fullNameHi: "सौ.कां. गायत्री (शिल्पा) मालविया",
        fullNameEn: "Sau. Ka. Gayatri (Shilpa) Malviya",
        grandparentsHi: "स्व. श्रीमती टीपूबेन - स्व. श्री कानाजी",
        grandparentsEn: "Late Smt. Tipuben & Late Shri Kanaji",
        parentsHi: "श्रीमती लक्ष्मीबेन - श्री भगवानलालजी मालविया",
        parentsEn: "Smt. Laxmiben & Shri Bhagwanlalji Malviya",
        residenceHi: "धोली मंगरी (कलालों की आँती), तह. देवगढ़, जिला राजसमन्द, राजस्थान",
        residenceEn: "Dholi Mangri (Kalalo ki Aanti), Tehsil Deogarh, Dist. Rajsamand, Rajasthan"
      },
      groom: {
        salutationHi: "चि.",
        salutationEn: "Chi.",
        nameHi: "आदित्य",
        nameEn: "Aditya",
        fullNameHi: "चि. आदित्य कट्टर",
        fullNameEn: "Chi. Aditya Kattar",
        grandparentsHi: "श्रीमती झमकुबाई - स्व. श्री मोहनलालजी",
        grandparentsEn: "Smt. Jhamkubai & Late Shri Mohanlalji",
        parentsHi: "श्रीमती मंजुदेवी - श्री रमेशचंद्रजी कट्टर",
        parentsEn: "Smt. Manjudevi & Shri Rameshchandraji Kattar",
        residenceHi: "बिनोल, राजस्थान",
        residenceEn: "Binol, Rajasthan"
      },
      blessingQuoteHi: "के शुभ परिणयोत्सव पर मंगलमयी मधुर बेला पर पधार कर नवयुगल को अपने स्नेह से अभिसिंचित कर अपनी गरिमामयी उपस्थिति से हमें गौरवान्वित करें।",
      blessingQuoteEn: "On this auspicious occasion of marital union, please grace us with your esteemed presence and shower the newlyweds with your heartfelt blessings.",
      ceremonies: [
        {
          id: "ga-barat-swagat",
          nameHi: "बारात स्वागत",
          nameEn: "Barat Swagat (Welcome of Groom's Procession)",
          dateHi: "29-11-2026, रविवार",
          dateEn: "Sunday, 29 Nov 2026",
          timeHi: "प्रातः शुभ वेला",
          timeEn: "Morning Auspicious Hour",
          venueKey: "dholi-mangri",
          venueNameHi: "निज निवास, धोली मंगरी (कलालों की आँती)",
          venueNameEn: "Family Residence, Dholi Mangri (Kalalo ki Aanti)",
          noteHi: "बारात गाँव बिनोल से श्रीमान रमेशचंद्रजी S/o. स्व. श्री मोहनजी कट्टर (अहमदाबाद वाले) के यहां से आएगी।",
          noteEn: "The wedding procession will arrive from village Binol from Shri Rameshchandraji s/o Late Shri Mohanji Kattar (Ahmedabad wale)."
        },
        {
          id: "ga-panigrahan",
          nameHi: "पाणिग्रहण संस्कार",
          nameEn: "Panigrahan Sanskar (Wedding Ceremony)",
          dateHi: "29-11-2026, रविवार (छठ मार्गशीर्ष कृष्ण पक्ष सं. 2083)",
          dateEn: "Sunday, 29 Nov 2026 (Chhath Margashirsha Krishna Paksha Samvat 2083)",
          timeHi: "शुभ वेला में",
          timeEn: "Auspicious Auspicious Hour",
          venueKey: "dholi-mangri",
          venueNameHi: "निज निवास मण्डप, धोली मंगरी",
          venueNameEn: "Wedding Mandap, Dholi Mangri",
          descHi: "वैदिक मंत्रोच्चार एवं शुभ मंगल फेरे।",
          descEn: "Solemnization of marriage through Vedic hymns and sacred pheras."
        },
        {
          id: "ga-pritibhoj",
          nameHi: "प्रीतिभोज",
          nameEn: "Priti Bhoj (Wedding Feast)",
          dateHi: "29-11-2026, रविवार",
          dateEn: "Sunday, 29 Nov 2026",
          timeHi: "दोपहर 11:15 से आपके आगमन तक",
          timeEn: "11:15 AM onwards till arrival",
          venueKey: "dholi-mangri",
          venueNameHi: "निज निवास, धोली मंगरी (कलालों की आँती)",
          venueNameEn: "Family Residence, Dholi Mangri (Kalalo ki Aanti)",
          descHi: "समस्त सगे-संबंधियों व स्नेहीजनों हेतु प्रीतिभोज।",
          descEn: "Celebratory royal banquet for family, relatives, and esteemed guests."
        }
      ],
      illustration: "assets/images/gayatri-aditya.jpg"
    }
  },

  // Auspicious ceremonies timeline (Page 2: Shagun Ke Pal + Joint Rituals)
  shagunTimeline: [
    {
      id: "shagun-1",
      nameHi: "विनायक स्थापना",
      nameEn: "Vinayak Sthapana",
      category: "joint",
      dateIso: "2026-11-20",
      dateFormattedHi: "दि. 20-11-2026, शुक्रवार",
      dateFormattedEn: "Friday, 20 Nov 2026",
      timeHi: "प्रातः 9:15 बजे",
      timeEn: "Morning 9:15 AM",
      descHi: "गणेश जी की स्थापना एवं विवाह कार्य का निर्विघ्न शुभारंभ।",
      descEn: "Consecration of Lord Ganesha to begin wedding rituals without hurdles.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-2",
      nameHi: "बड़ा विनायक स्थापना",
      nameEn: "Bada Vinayak Sthapana",
      category: "joint",
      dateIso: "2026-11-25",
      dateFormattedHi: "दि. 25-11-2026, बुधवार",
      dateFormattedEn: "Wednesday, 25 Nov 2026",
      timeHi: "प्रातः 9:15 बजे",
      timeEn: "Morning 9:15 AM",
      descHi: "विस्तृत गणेश पूजन व मांगलिक स्थापना।",
      descEn: "Grand Ganesh worship and invocation of divine prosperity.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-3",
      nameHi: "हल्दी रस्म",
      nameEn: "Haldi Ceremony",
      category: "joint",
      dateIso: "2026-11-25",
      dateFormattedHi: "दि. 25-11-2026, बुधवार",
      dateFormattedEn: "Wednesday, 25 Nov 2026",
      timeHi: "प्रातः 11:15 बजे",
      timeEn: "Morning 11:15 AM",
      descHi: "हल्दी, चन्दन एवं उबटन का मांगलिक लेपन।",
      descEn: "Auspicious application of turmeric paste and sandalwood blessings.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-4",
      nameHi: "प्रीतिभोज (जैमिन - वर पक्ष)",
      nameEn: "Priti Bhoj (Jaimin's Wedding Feast)",
      category: "jaimin",
      dateIso: "2026-11-25",
      dateFormattedHi: "दि. 25-11-2026, बुधवार",
      dateFormattedEn: "Wednesday, 25 Nov 2026",
      timeHi: "प्रातः 11:15 बजे से आगमन तक",
      timeEn: "11:15 AM onwards",
      descHi: "वर पक्ष द्वारा आयोजित स्नेह प्रीतिभोज।",
      descEn: "Auspicious wedding banquet hosted by the groom's family.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-5",
      nameHi: "बन्दोली (संगीत व शोभायात्रा)",
      nameEn: "Bandoli (Musical Procession)",
      category: "joint",
      dateIso: "2026-11-25",
      dateFormattedHi: "दि. 25-11-2026, बुधवार",
      dateFormattedEn: "Wednesday, 25 Nov 2026",
      timeHi: "रात्रि 8:15 बजे",
      timeEn: "Night 8:15 PM",
      descHi: "पारंपरिक ढोल-नगाड़ों एवं संगीत के साथ भव्य बन्दोली।",
      descEn: "Joyous traditional musical procession through the village.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-6",
      nameHi: "बारात प्रस्थान (जैमिन)",
      nameEn: "Barat Prasthan (Jaimin's Barat)",
      category: "jaimin",
      dateIso: "2026-11-26",
      dateFormattedHi: "दि. 26-11-2026, गुरुवार",
      dateFormattedEn: "Thursday, 26 Nov 2026",
      timeHi: "प्रातः 7:15 बजे",
      timeEn: "Morning 7:15 AM",
      descHi: "बारात श्रीमान देवेन्द्रजी अशोकजी सिद्धावत, नरदास का गुड़ा जाएगी।",
      descEn: "Barat departs from Dholi Mangri to Nardas Ka Gurha.",
      venue: "Dholi Mangri -> Nardas Ka Gurha"
    },
    {
      id: "shagun-7",
      nameHi: "हस्त मेलाप (जैमिन संग मोनिका)",
      nameEn: "Hast Melap (Jaimin & Monika)",
      category: "jaimin",
      dateIso: "2026-11-26",
      dateFormattedHi: "दि. 26-11-2026, गुरुवार",
      dateFormattedEn: "Thursday, 26 Nov 2026",
      timeHi: "दोपहर 11:00 से 3:00 बजे तक",
      timeEn: "11:00 AM to 3:00 PM",
      descHi: "विवाह संस्कार एवं पाणिग्रहण।",
      descEn: "Sacred wedding rituals and union of hands.",
      venue: "Nardas Ka Gurha"
    },
    {
      id: "shagun-8",
      nameHi: "गंगामाई कलश एवं बारात स्वागत",
      nameEn: "Ganga Mai Kalash & Barat Swagat",
      category: "gayatri",
      dateIso: "2026-11-29",
      dateFormattedHi: "दि. 29-11-2026, रविवार",
      dateFormattedEn: "Sunday, 29 Nov 2026",
      timeHi: "प्रातः शुभवेला",
      timeEn: "Morning Auspicious Time",
      descHi: "पवित्र गंगा कलश पूजन एवं बिनोल से पधारी बारात का स्वागत।",
      descEn: "Sacred Kalash ceremony & welcoming Aditya's Barat arriving from Binol.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-9",
      nameHi: "पाणिग्रहण संस्कार (गायत्री संग आदित्य)",
      nameEn: "Panigrahan Sanskar (Gayatri & Aditya)",
      category: "gayatri",
      dateIso: "2026-11-29",
      dateFormattedHi: "दि. 29-11-2026, रविवार",
      dateFormattedEn: "Sunday, 29 Nov 2026",
      timeHi: "शुभ वेला में (छठ कृष्ण पक्ष)",
      timeEn: "Auspicious Time (Margashirsha Krishna Paksha Chhath)",
      descHi: "वैदिक रीति-रिवाजों से पवित्र सात फेरे।",
      descEn: "Sacred Vedic marriage ceremony and holy pheras.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-10",
      nameHi: "प्रीतिभोज (गायत्री - वधू पक्ष)",
      nameEn: "Priti Bhoj (Gayatri's Wedding Feast)",
      category: "gayatri",
      dateIso: "2026-11-29",
      dateFormattedHi: "दि. 29-11-2026, रविवार",
      dateFormattedEn: "Sunday, 29 Nov 2026",
      timeHi: "दोपहर 11:15 बजे से आगमन तक",
      timeEn: "11:15 AM onwards",
      descHi: "कन्या पक्ष द्वारा स्नेह प्रीतिभोज।",
      descEn: "Grand wedding feast honoring all beloved guests.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-11",
      nameHi: "गंगोज (गंगा प्रसादी)",
      nameEn: "Gangoj (Ganga Prasadi Commemoration)",
      category: "memorial",
      dateIso: "2026-11-29",
      dateFormattedHi: "दि. 29-11-2026, रविवार",
      dateFormattedEn: "Sunday, 29 Nov 2026",
      timeHi: "शुभ वेला में (सं. 2083 छठ मार्गशीर्ष कृष्ण पक्ष)",
      timeEn: "Auspicious Hour (Samvat 2083 Chhath Margashirsha)",
      descHi: "पिताश्री स्व. श्री कानाजी एवं दादाजी स्व. श्री गंगारामजी की स्मृति में गंगोज।",
      descEn: "Sacred memorial offering in homage to Late father Shri Kanaji & Late grandfather Shri Gangaramji.",
      venue: "Dholi Mangri"
    },
    {
      id: "shagun-12",
      nameHi: "पागबंधा व मायरा",
      nameEn: "Pagbandha & Mayra",
      category: "joint",
      dateIso: "2026-11-30",
      dateFormattedHi: "दि. 30-11-2026, सोमवार",
      dateFormattedEn: "Monday, 30 Nov 2026",
      timeHi: "दोपहर 12:05 बजे (सं. 2083 सातम सोमवार)",
      timeEn: "Afternoon 12:05 PM (Samvat 2083 Satam)",
      descHi: "पारंपरिक पगड़ी बंधाई एवं ननिहाल पक्ष द्वारा मायरा (भात) रस्म।",
      descEn: "Traditional Pagbandha turban ceremony & Mayra (Bhaat) presented by maternal family.",
      venue: "Dholi Mangri"
    }
  ],

  // Family details (Page 1, 2, 3)
  family: {
    nimantrak: {
      titleHi: "निमंत्रक",
      titleEn: "Cordially Invited By (Nimantrak)",
      members: [
        {
          nameHi: "भगवानलालजी S/o. स्व. श्री कानाजी कलाल",
          nameEn: "Bhagwanlalji S/o Late Shri Kanaji Kalal"
        },
        {
          nameHi: "जीवनलालजी S/o. स्व. श्री कानाजी कलाल",
          nameEn: "Jivanlalji S/o Late Shri Kanaji Kalal"
        }
      ],
      noteHi: "(अहमदाबाद वाले)",
      noteEn: "(Residing in Ahmedabad)",
      residenceHi: "कलालों की आँती (धोली मंगरी) तह. देवगढ़, जिला राजसमन्द राजस्थान",
      residenceEn: "Kalalo ki Aanti (Dholi Mangri), Tehsil Deogarh, Dist. Rajsamand, Rajasthan",
      phones: [
        "9427069679",
        "8866024167",
        "9725761069",
        "9724651567"
      ]
    },

    vineet: {
      titleHi: "विनीत",
      titleEn: "Vineet (With Compliments)",
      membersHi: "भगवानजी, जीवनजी मालविया",
      membersEn: "Bhagwanji, Jivanji Malviya",
      residenceHi: "नि. धोली मंगरी (कलालों की आँती) तह. देवगढ़, जिला राजसमन्द (हाल अहमदाबाद)",
      residenceEn: "Residing at Dholi Mangri (Kalalo ki Aanti), Tehsil Deogarh, Dist. Rajsamand (Presently Ahmedabad)"
    },

    visheshPrarthi: {
      titleHi: "विशेष प्रार्थी",
      titleEn: "Vishesh Prarthi (Special Solicitation)",
      members: [
        {
          nameHi: "श्रीमती कान्ताबेन जीवनलालजी",
          nameEn: "Smt. Kantaben Jivanlalji"
        },
        {
          nameHi: "श्रीमती लक्ष्मीबेन अम्बालालजी",
          nameEn: "Smt. Laxmiben Ambalalji"
        }
      ]
    },

    darshanabhilashi: {
      titleHi: "दर्शनाभिलाषी",
      titleEn: "Darshanabhilashi (Awaiting Your Gracious Presence)",
      members: [
        { nameHi: "भगवानलालजी", nameEn: "Bhagwanlalji" },
        { nameHi: "जीवनलालजी", nameEn: "Jivanlalji" },
        { nameHi: "दीपारामजी", nameEn: "Deeparamji" },
        { nameHi: "मूलारामजी", nameEn: "Moolaramji" },
        { nameHi: "गेहरीलालजी", nameEn: "Gehrilalji" },
        { nameHi: "जैमिन", nameEn: "Jaimin" },
        { nameHi: "राज", nameEn: "Raj" },
        { nameHi: "प्रिन्स", nameEn: "Prince" },
        { nameHi: "सुरेशजी", nameEn: "Sureshji" },
        { nameHi: "जगदीशजी", nameEn: "Jagdishji" },
        { nameHi: "मगनीरामजी", nameEn: "Maganiramji" },
        { nameHi: "रोशनजी", nameEn: "Roshanji" },
        { nameHi: "विनोदजी", nameEn: "Vinodji" },
        { nameHi: "धर्मेशजी", nameEn: "Dharmeshji" },
        { nameHi: "प्रकाश", nameEn: "Prakash" },
        { nameHi: "विष्णु", nameEn: "Vishnu" },
        { nameHi: "विक्रम", nameEn: "Vikram" },
        { nameHi: "सोनू", nameEn: "Sonu" },
        { nameHi: "अशोक", nameEn: "Ashok" },
        { nameHi: "नारायण", nameEn: "Narayan" },
        { nameHi: "गोविन्द", nameEn: "Govind" },
        { nameHi: "खुशाल", nameEn: "Khushal" },
        { nameHi: "हरिओम", nameEn: "Hariom" },
        { nameHi: "महावीर", nameEn: "Mahaveer" },
        { nameHi: "वेदांश", nameEn: "Vedansh" }
      ],
      familyNoteHi: "एवं समस्त मालविया परिवार",
      familyNoteEn: "and the entire Malviya Family"
    },

    jamaiPaksh: {
      titleHi: "जमाई पक्ष",
      titleEn: "Jamai Paksh (Sons-in-law & Daughters)",
      members: [
        { hi: "श्रीमती लक्ष्मीबाई - अम्बालालजी", en: "Smt. Laxmibai - Ambalalji" },
        { hi: "श्रीमती पानीबाई - स्व. श्री चौथमलजी", en: "Smt. Panibai - Late Shri Chhothmalji" },
        { hi: "श्रीमती सायरीबाई - सोहनजी", en: "Smt. Sayaribai - Sohanji" },
        { hi: "श्रीमती घटूबाई - वनजी", en: "Smt. Ghatoobai - Vanji" },
        { hi: "श्रीमती ताराबाई - दिव्या", en: "Smt. Tarabai - Divya" },
        { hi: "श्रीमती ऊगमाबाई - प्रकाशजी", en: "Smt. Ugamabai - Prakashji" },
        { hi: "श्रीमती रेखाबाई - लक्ष्मणजी", en: "Smt. Rekhabai - Laxmanji" },
        { hi: "श्रीमती कविता - रामचन्द्रजी", en: "Smt. Kavita - Ramchandraji" },
        { hi: "श्रीमती निरमा - सुरेशजी", en: "Smt. Nirma - Sureshji" },
        { hi: "श्रीमती अंजली - भावेशजी", en: "Smt. Anjali - Bhaveshji" }
      ]
    },

    nanihalPaksh: {
      titleHi: "ननिहाल पक्ष",
      titleEn: "Nanihal Paksh (Maternal Family)",
      eldersHi: "धर्माजी, गेवरजी, बाबूलालजी, पिन्टुजी, मुकेशजी, कैलाशजी, महेन्द्रजी, प्रभूजी, नारायणजी, मदनजी, विशालजी, नारूजी, देवाजी, पिताजी, शेषमलजी, दिनेशजी, भेराजी, दलपतजी, लक्ष्मणजी",
      eldersEn: "Dharmaji, Gevarji, Babulalji, Pintuji, Mukeshji, Kailashji, Mahendraji, Prabhuji, Narayanji, Madanji, Vishalji, Naruji, Devaji, Pitaji, Sheshmalji, Dineshji, Bheraji, Dalpatji, Laxmanji",
      villageHi: "एवं समस्त सिद्धावत परिवार गाँव ननाणा",
      villageEn: "and the entire Siddhawat Family, Village Nanana"
    },

    pratishthan: {
      titleHi: "प्रतिष्ठान",
      titleEn: "Business Establishments",
      firms: [
        {
          nameHi: "जीवन युनिवर्सल डेवलपर्स एण्ड एडवाइजरी",
          nameEn: "Jivan Universal Developers and Advisory",
          locationHi: "धोलेरा - अहमदाबाद",
          locationEn: "Dholera - Ahmedabad"
        },
        {
          nameHi: "S. G. Science Academy",
          nameEn: "S. G. Science Academy",
          locationHi: "अहमदाबाद",
          locationEn: "Ahmedabad"
        }
      ]
    }
  },

  // Venue & Location Information
  venues: [
    {
      id: "dholi-mangri",
      titleHi: "मुख्य निज निवास (धोली मंगरी)",
      titleEn: "Main Family Residence (Dholi Mangri)",
      descriptionHi: "विनायक स्थापना, हल्दी, बन्दोली, प्रीतिभोज, पाणिग्रहण (गायत्री), गंगोज, पागबंधा व मायरा",
      descriptionEn: "Vinayak Sthapana, Haldi, Bandoli, Priti Bhoj, Panigrahan (Gayatri), Gangoj, Pagbandha & Mayra",
      addressHi: "कलालों की आँती (धोली मंगरी), तहसील देवगढ़, जिला राजसमन्द, राजस्थान",
      addressEn: "Kalalo ki Aanti (Dholi Mangri), Tehsil Deogarh, Dist. Rajsamand, Rajasthan",
      mapsQuery: "Dholi+Mangri+Deogarh+Rajsamand+Rajasthan",
      verificationNoteHi: "स्थान देवगढ़ तहसील, राजसमन्द क्षेत्र के अनुसार। विशिष्ट लैंडमार्क या लाइव जीपीएस पिन हेतु परिवार से संपर्क कर सकते हैं।",
      verificationNoteEn: "Location as per Deogarh tehsil, Rajsamand district. Exact GPS pin or landmark can be re-confirmed with family."
    },
    {
      id: "nardas-ka-gurha",
      titleHi: "वधू पक्ष निवास (नरदास का गुड़ा) - जैमिन का विवाह",
      titleEn: "Bride's Residence (Nardas Ka Gurha) - Jaimin's Marriage",
      descriptionHi: "श्रीमान देवेन्द्रजी अशोकजी सिद्धावत निवास (बारात आगमन एवं हस्त मिलाप)",
      descriptionEn: "Residence of Shri Devendraji Ashokji Siddhawat (Barat arrival and Hast Melap)",
      addressHi: "नरदास का गुड़ा, राजस्थान",
      addressEn: "Nardas Ka Gurha, Rajasthan",
      mapsQuery: "Nardas+Ka+Gurha+Rajasthan",
      verificationNoteHi: "स्थान नरदास का गुड़ा, राजस्थान। बारात प्रस्थान 26-11-2026 प्रातः 7:15 बजे।",
      verificationNoteEn: "Location Nardas Ka Gurha, Rajasthan. Barat departs 26-11-2026 at 7:15 AM."
    },
    {
      id: "binol",
      titleHi: "वर पक्ष निवास (गाँव बिनोल) - गायत्री का विवाह",
      titleEn: "Groom's Origin (Village Binol) - Gayatri's Marriage",
      descriptionHi: "श्रीमान रमेशचंद्रजी S/o. स्व. श्री मोहनजी कट्टर निवास (बारात का आगमन स्थल)",
      descriptionEn: "Residence of Shri Rameshchandraji s/o Late Shri Mohanji Kattar (Barat departure point to Dholi Mangri)",
      addressHi: "गाँव बिनोल, राजस्थान (अहमदाबाद वाले)",
      addressEn: "Village Binol, Rajasthan (Ahmedabad)",
      mapsQuery: "Binol+Rajasthan",
      verificationNoteHi: "बारात गाँव बिनोल से 29-11-2026 प्रातः शुभ वेला में धोली मंगरी पहुँचेगी।",
      verificationNoteEn: "Barat arrives from village Binol on 29-11-2026 morning at Dholi Mangri."
    }
  ]
};

// Export if used in modules, otherwise attaches to window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WEDDING_DATA;
}
