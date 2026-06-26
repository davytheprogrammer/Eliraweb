export interface ArticleSection {
  heading?: string;
  content: string[];
}

export interface Article {
  slug: string;
  title: string;
  tag: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  image: string;
  summary: string;
  sections: ArticleSection[];
}

export const ARTICLES_DATA: Record<string, Article> = {
  "understanding-endometriosis-overcoming-silent-pain": {
    slug: "understanding-endometriosis-overcoming-silent-pain",
    title: "Understanding Endometriosis: Overcoming Silent Pain",
    tag: "Medical Insights",
    readTime: "12 min read",
    author: "Dr. Angela Mbogo",
    authorRole: "OB-GYN Expert",
    date: "June 25, 2026",
    image: "/images/article_endo_doctor.png",
    summary: "Ob-Gyn expert guidelines on symptoms, staging, diagnosis delays, and active management choices for managing endometriosis.",
    sections: [
      {
        heading: "What is Endometriosis? Pathophysiology and Scope",
        content: [
          "Endometriosis is a chronic, estrogen-dependent inflammatory condition characterized by the presence of endometrial-like stroma and glands outside the uterine cavity. Most commonly, these lesions deposit themselves on the pelvic peritoneum, ovaries, rectovaginal septum, and Fallopian tubes, though they can occasionally spread to extra-pelvic locations such as the diaphragm, lungs, and surgical scars.",
          "Unlike normal uterine lining which is shed externally during menstruation, ectopic endometrial-like tissue has no exit path. Under the influence of cyclical hormone fluctuations, these implants swell, break down, and bleed directly into the pelvic cavity. This localized hemorrhage triggers a cascade of inflammatory cytokines, prostaglandins, and macrophages, leading to chronic pelvic pain, severe internal scarring (adhesions), fibrosis, and ovarian cysts known as endometriomas (or 'chocolate cysts').",
          "Globally, endometriosis affects an estimated 190 million women and individuals assigned female at birth during their reproductive years—representing roughly 10% of this population. Despite its high prevalence, it remains one of the most neglected and misunderstood conditions in modern women's healthcare."
        ]
      },
      {
        heading: "The Root Causes: Medical Theories",
        content: [
          "Although the exact etiology of endometriosis remains under active scientific debate, several primary theories explain its development:",
          "1. Retrograde Menstruation (Sampson's Theory): This is the most widely accepted hypothesis. It proposes that during menstruation, some menstrual debris flows backward through the Fallopian tubes and into the pelvic cavity. These viable endometrial cells then attach to pelvic surfaces and grow. However, since retrograde menstruation occurs in up to 90% of women, other factors—such as immune dysfunction or genetic susceptibility—must dictate why implants take root in only 10% of cases.",
          "2. Coelomic Metaplasia: This theory suggests that normal cells lining the pelvic organs (peritoneal cells) transform into endometrial-like cells under the influence of inflammatory, hormonal, or environmental triggers.",
          "3. Lymphatic or Vascular Dissemination: This explains how endometrial cells travel to distant organs, such as the lungs or brain, by utilizing the lymphatic system or bloodstream as transport vectors.",
          "4. Stem Cell Theory: Proposes that undifferentiated stem or progenitor cells from the bone marrow or uterus deposit themselves in ectopic locations and differentiate into endometrial tissue."
        ]
      },
      {
        heading: "Understanding the Staging System (Stages I to IV)",
        content: [
          "The American Society for Reproductive Medicine (ASRM) classifies endometriosis into four distinct stages based on a point system during laparoscopic visualization. It is critical to recognize that these stages measure the physical extent and depth of disease, NOT the severity of pain:",
          "• Stage I (Minimal): Characterized by superficial implants and few, if any, thin adhesions. Implants are isolated and lack significant depth.",
          "• Stage II (Mild): Displays more numerous superficial implants, deeper infiltration, and some localized scarring on the pelvic lining or ovaries.",
          "• Stage III (Moderate): Involves multiple deep implants, visible endometriomas on one or both ovaries, and prominent adhesions. The Fallopian tubes or ovaries may be bound by scar tissue.",
          "• Stage IV (Severe): Defined by deep implants, large endometriomas, and dense, extensive adhesions that bind pelvic organs together (often resulting in a 'frozen pelvis' where the uterus, rectum, and ovaries are fused into a rigid mass)."
        ]
      },
      {
        heading: "The Silent Struggle: Symptom Profiles",
        content: [
          "Endometriosis is notorious for its highly variable presentation. Symptom severity depends on lesion location, depth of invasion, and individual pain sensitivity. Common symptoms include:",
          "• Severe Dysmenorrhea: Debilitating cramps before and during menstruation, often unresponsive to over-the-counter pain medications.",
          "• Deep Dyspareunia: Pain during or after sexual intercourse, typically caused by lesions on the rectovaginal septum, uterosacral ligaments, or posterior cul-de-sac.",
          "• Chronic Pelvic Pain: Persistent pain in the abdomen, lower back, and pelvis that lasts for six months or longer, independent of the menstrual cycle.",
          "• Dyschezia and Dysuria: Painful bowel movements or painful urination, respectively, which peak during menstruation.",
          "• Infertility: Up to 30% to 50% of women with endometriosis face difficulties conceiving. Adhesions can physically block Fallopian tubes, while localized inflammation can damage egg quality and impair embryo implantation."
        ]
      },
      {
        heading: "The Diagnostic Delay: A Multi-Year Battle",
        content: [
          "Globally, patients experience an average delay of 7 to 10 years between the onset of symptoms and an accurate diagnosis. This delay is driven by several systemic factors:",
          "First, the societal normalization of menstrual pain leads family members, peers, and even healthcare professionals to dismiss severe pain as normal. Second, the symptoms of endometriosis overlap extensively with gastrointestinal disorders like irritable bowel syndrome (IBS), pelvic inflammatory disease (PID), and adenomyosis. Third, routine pelvic ultrasounds and CT scans frequently fail to detect superficial peritoneal lesions, meaning a 'normal' ultrasound is often falsely interpreted as an absence of the disease.",
          "A definitive diagnosis still requires direct visualization via minimally invasive laparoscopic surgery, followed by histological confirmation (biopsy) of the excised tissue."
        ]
      },
      {
        heading: "Active Clinical Management and Treatment Pathways",
        content: [
          "While there is currently no cure for endometriosis, highly effective clinical strategies can alleviate pain, manage progression, and preserve fertility:",
          "• Medical Management: Nonsteroidal anti-inflammatory drugs (NSAIDs) block inflammatory pathways. Hormonal suppression therapies—including combined oral contraceptive pills, progestin-only treatments, Levonorgestrel-releasing IUDs, and GnRH agonists/antagonists—work by downregulating estrogen, suppressing ovulation, and inducing atrophy of ectopic implants.",
          "• Surgical Intervention: Laparoscopic excision surgery (cutting out the lesions) is far superior to ablation (burning the surface). Excision removes the full depth of the implant, significantly reducing recurrence rates and improving chronic pelvic pain.",
          "• Multidisciplinary Care: Integrating pelvic floor physical therapy relaxes hypertonic pelvic muscles. An anti-inflammatory diet (low in gluten, dairy, and processed sugars) reduces systemic inflammatory markers. Psychological counseling helps patients process the emotional and cognitive burden of living with a chronic pain condition."
        ]
      }
    ]
  },
  "optimal-nutrition-fueling-cycle-pregnancy-stages": {
    slug: "optimal-nutrition-fueling-cycle-pregnancy-stages",
    title: "Optimal Nutrition: Fueling Cycle & Pregnancy Stages",
    tag: "Nutrition & Diet",
    readTime: "10 min read",
    author: "Grace Wanjiku",
    authorRole: "Certified Nutritionist",
    date: "June 24, 2026",
    image: "/images/article_nutrition_food.png",
    summary: "A comprehensive food list mapped to support hormone levels, energy reserves, and prenatal care throughout your cycle and pregnancy.",
    sections: [
      {
        heading: "The Science of Hormonal Nutrition",
        content: [
          "The female endocrine system operates on a complex cyclical rhythm. Progesterone, estrogen, luteinizing hormone (LH), and follicle-stimulating hormone (FSH) rise and fall in a highly orchestrated sequence. Each of these hormonal transitions affects metabolism, insulin sensitivity, neurotransmitters, and energy expenditures.",
          "Feeding your body phase-appropriate nutrients supports healthy hormone synthesis, assists liver detoxification of excess estrogen, and mitigates cyclical symptoms like fatigue, bloating, and mood swings. This practice is known as cycle-syncing nutrition."
        ]
      },
      {
        heading: "Menstrual Cycle Phase-by-Phase Nutritional Protocol",
        content: [
          "• Menstrual Phase (Days 1-5): Estrogen and progesterone are at their lowest. The body is actively shedding the uterine lining, resulting in blood and nutrient loss. Focus on iron replenishment (heme iron from lean beef, bison, or non-heme iron from lentils and spinach paired with Vitamin C to maximize absorption). Warm, slow-cooked stews, bone broths, and ginger teas are highly beneficial, easing uterine cramps and providing comforting, easily digestible nutrients.",
          "• Follicular Phase (Days 6-12): Estrogen begins its steady rise, prompting follicle maturation and boosting energy. Support this phase with cruciferous vegetables (broccoli, Brussels sprouts, kale, cabbage). These contain indole-3-carbinol, which assists the liver in metabolizing estrogen pathways. Focus on light, fresh foods, fermented foods (kimchi, kefir), and complex carbohydrates like quinoa and wild rice.",
          "• Ovulatory Phase (Days 13-16): Estrogen peaks, and LH surges to trigger egg release. Metabolism rises, and cellular energy demands are high. Incorporate anti-inflammatory fats (wild-caught salmon, mackerel, extra virgin olive oil, and avocados) to support follicle health. Prioritize raw leafy greens, berries, and hydration.",
          "• Luteal Phase (Days 17-28): Progesterone increases to build the endometrium. If fertilization doesn't occur, hormones drop at the end of this phase, often triggering mood drops and food cravings. Stabilize blood sugar by consuming slow-burning complex carbohydrates (sweet potatoes, squash, oats) and magnesium-dense foods (dark chocolate, pumpkin seeds, almonds) to relax uterine muscles and improve sleep quality."
        ]
      },
      {
        heading: "Seed Cycling for Endocrine Support",
        content: [
          "Seed cycling is a gentle, food-based practice that provides key fatty acids and lignans to support balanced estrogen and progesterone profiles:",
          "• Follicular & Ovulatory Phases (Days 1-14): Consume 1-2 tablespoons of freshly ground flaxseeds and raw pumpkin seeds daily. Flaxseeds contain lignans, which bind excess estrogen, while pumpkin seeds are high in zinc, supporting healthy follicle development.",
          "• Luteal Phase (Days 15-28): Consume 1-2 tablespoons of ground sesame seeds and raw sunflower seeds daily. Sesame seeds contain lignans that block excess estrogen, while sunflower seeds are rich in selenium and vitamin E, supporting progesterone production."
        ]
      },
      {
        heading: "Trimester-by-Trimester Prenatal Nutrition",
        content: [
          "During pregnancy, nutritional demands increase significantly to support fetal organogenesis, placental growth, and expanded maternal blood volume:",
          "• First Trimester (Weeks 1-12): Focus on folate (Vitamin B9) to prevent neural tube defects. Opt for active L-methylfolate from dark leafy greens, asparagus, and citrus fruits. If experiencing morning sickness, prioritize small, frequent meals of easily tolerated proteins and ginger-infused broths.",
          "• Second Trimester (Weeks 13-26): Fetal skeletal development accelerates. Calcium and Vitamin D3/K2 intake is critical to prevent the depletion of maternal bone density. Increase iron intake to support the 50% expansion in maternal blood volume. Good sources include pasture-raised egg yolks, grass-fed meats, and chia seeds.",
          "• Third Trimester (Weeks 27-40): Fetal brain growth peaks. Consume adequate Omega-3 fatty acids (specifically DHA) from low-mercury fish (wild salmon, sardines) or algae-based supplements. Choline—found abundantly in eggs—is vital for neural development and memory function."
        ]
      },
      {
        heading: "Foods and Substances to Restrict During Pregnancy",
        content: [
          "To protect the developing fetus, avoid or heavily restrict certain foods:",
          "• High-Mercury Fish: Shark, swordfish, king mackerel, and tilefish contain accumulated heavy metals that harm fetal neurological development.",
          "• Unpasteurized Dairy and Juices: Raw milk, soft cheeses (brie, feta, blue cheese) unless cooked, and unpasteurized juices carry a risk of Listeria monocytogenes infection, which can lead to miscarriage or preterm labor.",
          "• Raw or Undercooked Animal Proteins: Raw sushi, rare meat, and runny eggs carry risks of Salmonella and Toxoplasmosis.",
          "• Excess Caffeine: Limit caffeine intake to under 200mg per day (about one 12 oz cup of coffee) to reduce the risk of low birth weight."
        ]
      }
    ]
  },
  "yoga-flexibility-reproductive-health-support": {
    slug: "yoga-flexibility-reproductive-health-support",
    title: "Yoga & Flexibility for Reproductive Health Support",
    tag: "Fitness & Wellness",
    readTime: "8 min read",
    author: "Sarah Akinyi",
    authorRole: "Yoga Therapist",
    date: "June 23, 2026",
    image: "/images/article_yoga_stretch.png",
    summary: "Gentle daily flows and breathing exercises targeting pelvic blood flow, core release, and period cramp relief.",
    sections: [
      {
        heading: "The Somatic Connection: Yoga and Pelvic Health",
        content: [
          "The pelvic basin is a primary repository for stress and emotional tension. Chronic stress causes chronic contraction of the pelvic floor muscles, which can restrict local blood circulation, compromise lymphatic drainage, and worsen menstrual pain and pelvic congestion.",
          "Yoga therapy uses mindful movement, structural alignment, and targeted stretches to release this deep muscular tension. By relaxing the pelvic diaphragm and activating the parasympathetic nervous system, yoga helps balance the endocrine system and reduces the production of inflammatory prostaglandins that trigger painful uterine spasms."
        ]
      },
      {
        heading: "Step-by-Step Restorative Posture Flow",
        content: [
          "Incorporate these five key postures into a daily, low-intensity routine—especially during the luteal and menstrual phases—to relieve tension and improve pelvic circulation:",
          "1. Child's Pose (Balasana): Kneel on the floor, bring your big toes together, and widen your knees. Fold forward, extending your arms and resting your forehead on the mat. Breathe deeply into your lower back and sacrum. This position stretches the lower back muscles, gently compresses the abdomen to stimulate pelvic blood flow, and calms the nervous system.",
          "2. Reclined Bound Angle Pose (Supta Baddha Konasana): Lie on your back, bend your knees, and place the soles of your feet together, allowing your knees to fall open to the sides. Use cushions or blocks under your outer thighs for support. Rest one hand on your heart and one on your lower abdomen. This pose opens the hips, stretches the adductor muscles, and relaxes the pelvic floor.",
          "3. Legs-Up-The-Wall Pose (Viparita Karani): Sit sideways against a wall, then gently swing your legs up onto the wall as you lie back. Keep your hips close to the wall or supported on a folded blanket. Extend your arms to the sides, palms up. This inversion promotes venous return, drains stagnant fluid from the pelvis and lower limbs, and reduces congestion.",
          "4. Bridge Pose (Setu Bandhasana): Lie on your back, knees bent, feet flat on the floor hip-width apart. Inhale and slowly lift your hips toward the ceiling, engaging your glutes and hamstrings while keeping your neck relaxed. Hold for 5 breaths, then roll down slowly. This pose strengthens the pelvic floor and lower back while stretching the hip flexors.",
          "5. Garland Pose (Malasana): Stand with feet slightly wider than hip-width, toes turned out. Bend your knees and lower your hips into a deep squat. Bring your palms together at your chest, using your elbows to gently press your knees outward. If your heels lift, place a rolled blanket underneath. Malasana stretches the groin, lower back, and hips, and encourages pelvic circulation."
        ]
      },
      {
        heading: "Pranayama (Breathing) Protocols for Pain Management",
        content: [
          "Breath control is a highly effective way to manage physical pain. By changing your breathing rhythm, you can shift the body from a sympathetic ('fight-or-flight') state to a parasympathetic ('rest-and-digest') state:",
          "• Diaphragmatic Breathing: Place your hands on your lower abdomen. Inhale deeply through your nose, feeling your belly expand outward like a balloon. Exhale slowly through your nose, letting your belly sink. This movement massages internal organs and relaxes pelvic muscles.",
          "• Box Breathing (4-4-4-4): Inhale for 4 seconds, hold your breath for 4 seconds, exhale for 4 seconds, and hold your lungs empty for 4 seconds. Repeat this cycle for 5 minutes. This technique helps regulate cortisol levels and reduces pain signals.",
          "• Nadi Shodhana (Alternate Nostril Breathing): Fold your index and middle fingers of your right hand. Use your thumb to close your right nostril and inhale through the left. Close the left nostril with your ring finger, release the right, and exhale. Inhale through the right, close it, and exhale through the left. This balances the autonomic nervous system and helps stabilize emotions."
        ]
      }
    ]
  },
  "postpartum-recovery-sleep-comfort-healing": {
    slug: "postpartum-recovery-sleep-comfort-healing",
    title: "Postpartum Recovery: Sleep, Comfort, and Healing",
    tag: "Postpartum Care",
    readTime: "11 min read",
    author: "Dr. Evelyn Mwangi",
    authorRole: "Pediatric Consultant",
    date: "June 22, 2026",
    image: "/images/article_rest_comfort.png",
    summary: "Essential sleep tips, physical recovery guides, and nursery setup suggestions for new mothers adjusting to life with a newborn.",
    sections: [
      {
        heading: "The Fourth Trimester: An Overview",
        content: [
          "The 'fourth trimester' refers to the first 12 weeks postpartum. During this time, the maternal body undergoes a rapid transition: organs return to their pre-pregnancy positions, blood volume normalizes, and hormone levels shift dramatically. Progesterone and estrogen levels drop to near-menopausal levels within 48 hours of childbirth.",
          "Healing requires time, rest, and support. Modern postpartum care emphasizes nurturing the mother's physical and emotional healing alongside the care of the newborn."
        ]
      },
      {
        heading: "Physical Healing After Childbirth",
        content: [
          "Physical healing varies depending on the mode of delivery, but key recovery milestones include:",
          "• Managing Lochia: Lochia is the postpartum vaginal discharge containing blood, tissue, and mucus from the uterine lining. It progresses from bright red (Lochia Rubra, days 1-4) to pinkish-brown (Lochia Serosa, days 5-14) and finally to yellowish-white (Lochia Alba, weeks 3-6). Use pads rather than tampons during this time to reduce the risk of uterine infection.",
          "• Perineal Recovery: If you experienced a vaginal delivery with an episiotomy or perineal tear, keep the area clean and dry. Use a peri bottle filled with warm water to rinse the area after using the toilet. Warm sitz baths and cold gel packs can help reduce swelling and relieve soreness.",
          "• Cesarean Incision Care: Keep C-section incision sites clean and dry. Wash the area gently with mild soap and water, pat it dry, and avoid wearing tight clothing that could rub against the incision. Rest is crucial; avoid lifting anything heavier than your baby for the first 6 weeks to allow the abdominal wall to heal."
        ]
      },
      {
        heading: "Understanding Infant Sleep and Sleep Deprivation",
        content: [
          "Sleep deprivation is a common challenge for new parents. Newborns do not have a circadian rhythm and sleep in short cycles of 2 to 3 hours, driven by their small stomach capacity and feeding needs.",
          "Understanding the difference between active sleep (where the baby may move, make sounds, and have irregular breathing) and quiet sleep can help prevent unnecessary awakenings. Give your baby a moment to settle before picking them up during active sleep.",
          "To manage sleep deprivation: try to sleep or rest when your baby sleeps, share nighttime care with your partner, and limit visitors during the early weeks to protect your rest windows."
        ]
      },
      {
        heading: "Setting Up a Restorative Healing Environment",
        content: [
          "Your home environment plays a significant role in your recovery:",
          "• Recovery Station: Set up a comfortable recovery station with water, healthy snacks, nursing pillows, extra pads, and phone chargers close to where you rest.",
          "• Nursery Configuration: Keep nursery lighting dim and warm (using red or amber night lights) to support melatonin production during nighttime feedings. Keep essential supplies organized and within easy reach to minimize physical strain."
        ]
      }
    ]
  },
  "mindfulness-motherhood-mental-health-priorities": {
    slug: "mindfulness-motherhood-mental-health-priorities",
    title: "Mindfulness & Motherhood: Mental Health Priorities",
    tag: "Mental Wellness",
    readTime: "9 min read",
    author: "David Oloo",
    authorRole: "Mental Health Advocate",
    date: "June 21, 2026",
    image: "/images/article_mental_health.png",
    summary: "Tactics to navigate stress levels, hormone dropouts, and emotional spikes with expert counselors and mindfulness practices.",
    sections: [
      {
        heading: "The Neurobiology of the Postpartum Transition",
        content: [
          "The transition into motherhood brings about significant neurological and hormonal changes. Within hours of delivery, progesterone and estrogen levels drop precipitously. This biological shift, combined with sleep deprivation, alters neurotransmitter levels (such as serotonin and dopamine) in the brain.",
          "It is important to distinguish between different mental health experiences:",
          "• Baby Blues: Affects up to 80% of new mothers, characterized by mild mood swings, tearfulness, and anxiety that peak around day 4 and resolve within two weeks as hormone levels stabilize.",
          "• Postpartum Depression (PPD) and Anxiety (PPA): Affects 10% to 15% of new mothers. Symptoms are more intense and persistent, lasting beyond two weeks. They can include severe anxiety, feelings of worthlessness, difficulty bonding with the baby, and changes in appetite or sleep patterns."
        ]
      },
      {
        heading: "CBT and Mindfulness Tools for Daily Practice",
        content: [
          "Cognitive Behavioral Therapy (CBT) and mindfulness techniques can help manage stress and navigate complex emotions:",
          "• Cognitive Reframing: Notice self-critical thoughts (e.g., 'I am failing because my baby won't stop crying') and gently reframe them into more supportive statements ('Crying is how my baby communicates, and I am doing my best to support them').",
          "• The STOP Technique: When feeling overwhelmed: S - Stop what you are doing. T - Take a breath. O - Observe your thoughts, emotions, and physical sensations without judgment. P - Proceed with a mindful action (such as taking a sip of water or stretching).",
          "• The 5-4-3-2-1 Grounding Method: Calm anxiety by naming: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
        ]
      },
      {
        heading: "Building a Sustainable Support System",
        content: [
          "Maternal mental health is supported by community and connection. Avoid isolation by:",
          "• Communicating Needs: Share your feelings and needs clearly with your partner, family, and friends.",
          "• Joining Support Groups: Connect with other new parents to share experiences and reduce feelings of isolation.",
          "• Professional Support: If you experience persistent sadness, anxiety, or find it difficult to cope, reach out to an OB-GYN, pediatrician, or mental health specialist. Professional support can provide valuable tools for recovery."
        ]
      }
    ]
  }
};
