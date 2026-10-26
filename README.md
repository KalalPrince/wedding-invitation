# Malviya Family Royal Wedding Invitation (डिजिटल कंकौत्री)

An opulent, production-ready, mobile-first traditional-modern Indian wedding invitation website built for the auspicious weddings of **Chi. Jaimin & Sau. Ka. Monika** and **Sau. Ka. Gayatri (Shilpa) & Chi. Aditya**.

Built with complete fidelity to the provided `Wedding invitation.pdf` (source of truth).

---

## 🌟 Key Features

### 1. Traditional-Modern Indian Royal Aesthetic
- **Rich Color Palette**: Royal Burgundy / Maroon (`#3a0510`, `#520b18`), Antique Gold Foil Gradients (`#dfb76c`, `#d4af37`), Warm Ivory (`#fffefb`), and subtle Sage Green accents.
- **Custom Indian Wedding Artwork**:
  - Royal Lord Ganesha mandala blessing art (`assets/images/ganesha.jpg`)
  - Brother's wedding couple artwork: Chi. Jaimin & Sau. Ka. Monika in Rajasthani royal attire (`assets/images/jaimin-monika.jpg`)
  - Sister's wedding couple artwork: Sau. Ka. Gayatri (Shilpa) & Chi. Aditya performing the sacred Hastmelap under an ornate royal mandap (`assets/images/gayatri-aditya.jpg`)
  - Panoramic royal Barat procession illustration with elephants, shehnai musicians, and royal palanquin (`assets/images/barat-banner.jpg`)
  - *No real couple photographs used*, maintaining traditional modesty and cultural reverence.
- **Royal Opening Envelope & Seal Experience**: An interactive royal envelope with traditional Sanskrit Shloka (*Vakratunda Mahakaya...*) and an animated wax seal with a fragrant rose and marigold petal shower (*Pushpa Varsha*).

### 2. Seamless English | हिन्दी Language Switcher
- A persistent, prominently placed language switcher button in the navbar.
- **English is default**; clicking **हिन्दी** translates every single heading, navigation label, ceremony name, invitation letter, family relation, button, countdown label, and venue note.
- Implemented with a centralized JavaScript dictionary (`js/translations.js`), preventing fragmented or hardcoded conditional text.
- Full Devanagari typography support via Google Fonts (*Rozha One*, *Yatra One*, *Noto Serif Devanagari*).

### 3. Website Structure & Dedicated Wedding Views
- **Shared Homepage (`#home`)**:
  - Auspicious Shlokas and divine greetings.
  - Welcome message from the Malviya family.
  - Side-by-side illustrated wedding cards for both weddings with **live countdown timers**.
  - Traditional invitation letter & Ram-Ram from elders Bhagwanlalji & Jivanlalji mentioning the sacred *Gangoj* (Ganga Prasadi) on 29-11-2026 and *Pagbandha* on 30-11-2026.
  - Heartfelt *Meethi Manuhaar* verse by the younger generation (Raj, Prince, Sanjana, Gautam, Usha).
  - Complete 12-event chronological timeline (*Shagun Ke Pal*) with interactive category filters (*All*, *Jaimin's Wedding*, *Gayatri's Wedding*, *Family Rituals*).
  - Complete extended family directory (*Nimantrak*, *Vineet*, *Vishesh Prarthi*, *Darshanabhilashi*, *Jamai Paksh*, *Nanihal Paksh*, and *Pratishthan*).
  - Verified venue cards and guest blessings guestbook.
- **Brother's Dedicated Invitation (`#jaimin-monika`)**:
  - Couple: **Chi. Jaimin & Sau. Ka. Monika**
  - Date: **Thursday, 26 November 2026**
  - Complete lineage for both Groom and Bride.
  - Dedicated ceremony schedule: Priti Bhoj (25 Nov, 11:15 AM onwards), Barat Departure (26 Nov, 7:15 AM to Nardas Ka Guda), Hast Melap (26 Nov, 11:00 AM to 3:00 PM).
  - Add to Calendar and WhatsApp sharing controls.
- **Sister's Dedicated Invitation (`#gayatri-aditya`)**:
  - Couple: **Sau. Ka. Gayatri (Shilpa) & Chi. Aditya**
  - Date: **Sunday, 29 November 2026**
  - Complete lineage for both Bride and Groom.
  - Dedicated ceremony schedule: Barat Swagat (29 Nov Morning), Panigrahan Sanskar (29 Nov Auspicious Time, Samvat 2083 Chhath Margashirsha Krishna Paksh), Priti Bhoj (29 Nov 11:15 AM onwards), Ganga Mai Kalash & Gangoj.
  - Barat arrival note from Village Binol (Shri Rameshchandraji Kaddur).
  - Add to Calendar and WhatsApp sharing controls.

### 4. Background Indian Classical Music
- Interactive toggle with animated sound wave equalizer in the header.
- **Zero-dependency Web Audio API synthesizer** playing traditional Indian Raag (Tanpura acoustic drone + Shehnai / Santoor melodic motif) that works 100% offline without external mp3 dependencies.
- Also supports any standard MP3 audio placed in the HTML audio tag.
- Strictly adheres to browser standards: **Never forced autoplay**.

### 5. Mobile-First Responsive Design
- Optimized for mobile guests arriving via WhatsApp links.
- Fluid responsive layout tested at **320px, 360px, 390px, 768px, 1024px, and 1440px**.
- Zero horizontal overflow.
- Mobile drawer navigation with clear open/close controls.
- Large, comfortable tap targets (minimum 44px touch height).
- Respects `prefers-reduced-motion` accessibility preferences.

---

## 📁 File Structure

```
Wedding Invitation/
├── assets/
│   ├── images/
│   │   ├── ganesha.jpg          # Lord Ganesha gold foil mandala artwork
│   │   ├── jaimin-monika.jpg    # Jaimin & Monika royal couple artwork
│   │   ├── gayatri-aditya.jpg   # Gayatri & Aditya royal union artwork
│   │   └── barat-banner.jpg     # Panoramic royal Barat procession artwork
│   └── icons/
├── css/
│   └── styles.css               # Premium CSS with tokens, responsive grids, and Devanagari styles
├── js/
│   ├── wedding-data.js          # Authoritative structured wedding data & lineage
│   ├── translations.js          # Symmetric English & Hindi translations
│   ├── audio.js                 # Indian classical synthesizer & audio manager
│   └── app.js                   # Application state, view routing, countdowns, sharing & calendar
├── index.html                   # Semantic HTML5 single-page application
├── Wedding invitation.pdf       # Authoritative source PDF
└── README.md                    # Documentation & deployment guide
```

---

## 🚀 Running Locally

Because this project is built using vanilla HTML5, CSS3, and JavaScript, it requires no complex toolchains or build steps.

### Method 1: Python HTTP Server (Recommended)
Open a terminal in this directory and run:
```bash
python -m http.server 8080
```
Then visit: [http://localhost:8080](http://localhost:8080)

### Method 2: Node.js http-server
```bash
npx -y http-server -p 8080
```
Then visit: [http://localhost:8080](http://localhost:8080)

### Method 3: Direct File Opening
Double-click `index.html` to open directly in Google Chrome, Microsoft Edge, Safari, or Firefox.

---

## 🌐 Deployment Instructions

### 1. GitHub Pages (Free & Immediate)
1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and `/ (root)`.
4. Click **Save**. Within 1–2 minutes, your wedding invitation website will be live at `https://<username>.github.io/<repo-name>/`.

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel` or link your GitHub repo directly on [vercel.com](https://vercel.com).
2. Run `vercel` in this directory and accept defaults.
3. Your wedding site will be instantly deployed on a global CDN with SSL.

---

## 📋 Information Verification Checklist

| Information Item | Status | Source / Reference |
| :--- | :---: | :--- |
| **Brother's Name & Title** | Verified | Chi. Jaimin Malviya (चि. जैमिन) (Page 1 & 3) |
| **Brother's Bride** | Verified | Sau. Ka. Monika Siddhawat (सौ.कां. मोनिका) (Page 1 & 3) |
| **Brother's Wedding Date** | Verified | 26 November 2026, Thursday (26-11-2026, गुरुवार) |
| **Brother's Ceremonies** | Verified | Priti Bhoj (25th, 11:15 AM), Barat (26th, 7:15 AM), Hast Melap (26th, 11 AM - 3 PM) |
| **Sister's Name & Title** | Verified | Sau. Ka. Gayatri (Shilpa) (सौ.कां. गायत्री (शिल्पा)) (Page 1 & 3) |
| **Sister's Groom** | Verified | Chi. Aditya Kaddur (चि. आदित्य) (Page 1 & 3) |
| **Sister's Wedding Date** | Verified | 29 November 2026, Sunday (29-11-2026, रविवार) |
| **Sister's Ceremonies** | Verified | Barat Swagat (29th Morning), Panigrahan (29th Auspicious Time), Priti Bhoj (29th, 11:15 AM) |
| **Ganga Prasadi (Gangoj)** | Verified | 29 November 2026, Sunday (Chhath Margashirsha Krishna Paksh Samvat 2083) |
| **Pagbandha & Mayra** | Verified | 30 November 2026, Monday (Satam Samvat 2083, 12:05 PM) |
| **Vinayak Sthapana** | Verified | 20-11-2026, Friday (9:15 AM) (Page 2) |
| **Bada Vinayak & Haldi**| Verified | 25-11-2026, Wednesday (9:15 AM & 11:15 AM) |
| **Bandoli (Sangeet)** | Verified | 25-11-2026, Wednesday (8:15 PM) |
| **Nimantrak Hosts** | Verified | Bhagwanlalji & Jivanlalji s/o Late Shri Kanaji Kalal (Page 1) |
| **Host Phone Numbers** | Verified | 9427069679, 8866024167, 9725761069, 9724651567 |
| **Main Residence** | Verified | Kalalo ki Aanti (Dholi Mangri), Tehsil Deogarh, Dist. Rajsamand, Rajasthan |
| **Brother's In-law Venue**| Verified | Shri Devendraji Ashokji Siddhawat, Nardas Ka Guda, Rajasthan |
| **Sister's Groom Venue** | Verified | Shri Rameshchandraji Kaddur, Village Binol, Rajasthan (Ahmedabad) |
| **Establishments** | Verified | Jeevan Universal Developers & Advisory (Dholera-Ahmedabad); S. G. Science Academy (Ahmedabad) |

*Note on Google Maps Navigation*: Per prompt instruction, exact GPS coordinates are not guessed. The website links to verified village/region queries (`Dholi Mangri, Deogarh, Rajsamand`, `Nardas Ka Guda`, and `Binol`) with a clear advisory note for guests to confirm doorstep landmarks with the family hosts.
