export interface Author {
  slug: string;
  name: string;
  nameRu: string;
  role: string;
  roleRu: string;
  bio: string;
  bioRu: string;
  photo: string;
  linkedin: string;
  expertise: string[];
  expertiseRu: string[];
}

export const authors: Author[] = [
  {
    slug: 'samal-bekmaganbetova',
    name: 'Samal Bekmaganbetova',
    nameRu: 'Самал Бекмаганбетова',
    role: 'Privacy & Data Governance Advisor',
    roleRu: 'Советник по приватности и управлению данными',
    bio: `Samal Bekmaganbetova is a Programme Manager at the United Nations Office for Disaster Risk Reduction (UNDRR), where she leads initiatives on urban resilience and disaster risk reduction in Central Asia. With a background spanning international development, digital governance, and data protection frameworks, Samal brings a unique perspective on why privacy matters - not just as a legal requirement, but as a fundamental right in an era of pervasive digital surveillance.

Her work at the United Nations has given her firsthand insight into how sensitive meeting data, organizational communications, and confidential planning discussions can be exposed when organizations rely on cloud-based tools without understanding where their data actually goes. She holds a Master of Public Administration from Nazarbayev University and a Bachelor of Science in Telecommunication Engineering Technology from Rochester Institute of Technology.

At Siplinx AI, Samal contributes articles on data privacy, digital sovereignty, and the real-world risks of cloud-based AI tools - helping professionals understand why keeping meeting content on their own device is the only approach that truly protects confidentiality.`,
    bioRu: `Самал Бекмаганбетова - менеджер программ в Офисе ООН по снижению риска бедствий (UNDRR), где она руководит инициативами по устойчивости городов и снижению рисков стихийных бедствий в Центральной Азии. Имея опыт в международном развитии, цифровом управлении и фреймворках защиты данных, Самал привносит уникальный взгляд на то, почему приватность важна - не просто как юридическое требование, но как фундаментальное право в эпоху повсеместного цифрового наблюдения.

Её работа в ООН дала ей непосредственное понимание того, как чувствительные данные встреч, организационные коммуникации и конфиденциальные планерки могут быть раскрыты, когда организации используют облачные инструменты, не понимая, куда именно уходят их данные. Она имеет степень магистра государственного управления Назарбаев Университета и степень бакалавра по технологии телекоммуникационной инженерии Рочестерского технологического института.

В Siplinx AI Самал пишет статьи о защите данных, цифровом суверенитете и реальных рисках облачных AI-инструментов - помогая профессионалам понять, почему хранение данных встреч на собственном устройстве - единственный подход, который действительно защищает конфиденциальность.`,
    photo: '/images/authors/samal-bekmaganbetova.png',
    linkedin: 'https://www.linkedin.com/in/samalbek',
    expertise: [
      'Data Privacy',
      'Digital Governance',
      'International Frameworks',
      'Disaster Risk Reduction',
      'Urban Resilience',
    ],
    expertiseRu: [
      'Защита данных',
      'Цифровое управление',
      'Международные стандарты',
      'Снижение рисков',
      'Устойчивость городов',
    ],
  },
  {
    slug: 'amanay-yessen',
    name: 'Amanay Yessen',
    nameRu: 'Аманай Есен',
    role: 'CEO & Founder, FlyProx AI',
    roleRu: 'CEO и основатель FlyProx AI',
    bio: `Amanay Yessen is the CEO and founder of FlyProx AI, a company that builds AI agents to handle outbound sales calls for B2B teams. Instead of paying a $5,000 a month sales rep, companies use FlyProx AI to call prospects, qualify leads, and book meetings around the clock for a fraction of the cost. Before FlyProx AI, he spent years running the digital agencies A-93 and AmanCenter, where his team delivered more than a thousand websites and web applications and ran performance marketing campaigns across Facebook, TikTok, and Google Ads for clients in multiple industries.

His background sits at the intersection of engineering and growth. He studied computing and software at Kokshetau State University and computer science at the Czech Technical University in Prague, where he won a silver medal at an international programming olympiad for building a client server system with multithreading. That mix of technical depth and hands on marketing experience shapes how he thinks about AI products: they need to move a real business metric, not just look impressive in a demo.

At Siplinx AI, Amanay writes about AI automation, product strategy, and what it takes to build and scale an AI powered business, drawing on years of running engineering teams and marketing budgets at the same time.`,
    bioRu: `Аманай Есен CEO и основатель FlyProx AI, компании, которая создает AI агентов для обработки исходящих продающих звонков в B2B. Вместо менеджера по продажам за $5000 в месяц компании используют FlyProx AI, чтобы звонить потенциальным клиентам, квалифицировать лиды и назначать встречи круглосуточно за долю стоимости. До FlyProx AI он несколько лет руководил digital агентствами A-93 и AmanCenter, где его команда реализовала больше тысячи сайтов и веб приложений и вела performance маркетинг кампании в Facebook, TikTok и Google Ads для клиентов из разных индустрий.

Его опыт находится на стыке разработки и роста. Он изучал computing and software в Kokshetau State University и компьютерные науки в Пражском техническом университете, где получил серебряную медаль на международной олимпиаде по программированию за клиент серверную систему с многопоточностью. Такое сочетание технической базы и практического опыта в маркетинге определяет его взгляд на AI продукты: они должны реально влиять на бизнес показатели, а не просто эффектно выглядеть на демо.

В Siplinx AI Аманай пишет об автоматизации на основе AI, продуктовой стратегии и о том, что реально нужно для построения и масштабирования бизнеса на AI, опираясь на годы одновременного управления инженерной командой и маркетинговым бюджетом.`,
    photo: '/images/authors/amanay-yessen.jpg',
    linkedin: 'https://www.linkedin.com/in/amanay-yessen-1a1a26188',
    expertise: ['AI Automation', 'Growth Marketing', 'Full-Stack Development', 'Entrepreneurship'],
    expertiseRu: ['Автоматизация на основе AI', 'Growth-маркетинг', 'Full-Stack разработка', 'Предпринимательство'],
  },
  {
    slug: 'yulia-trishkina',
    name: 'Yulia Trishkina',
    nameRu: 'Юлия Тришкина',
    role: 'Web3 Co-founder, TractionEye',
    roleRu: 'Web3 сооснователь, TractionEye',
    bio: `Yulia Trishkina is the co-founder and business developer of TractionEye, a collective trading marketplace built on the TON blockchain that lets people put their crypto assets under the management of verified traders, with everything enforced by smart contracts rather than by trust. Before starting TractionEye, she worked as a product manager at AppScience and held growth and analyst roles at Sber, where she learned how large companies run product development at scale.

She studied programming and internet technologies at ITMO University in Saint Petersburg and has spent the past two years deep in the Web3 and TON ecosystem, winning first place in the DeFi track and second place in the AI track at the IdeaTON hackathon in Moscow. Her writing draws on real founder experience: pitching to investors, handling tough Q&A sessions, and constantly asking whether a product actually solves a problem or just looks good in a demo.

At Siplinx AI, Yulia writes about product thinking, growth, and what it actually takes to build something people want to use, drawing on lessons from running a startup from idea to launch.`,
    bioRu: `Юлия Тришкина сооснователь и бизнес-девелопер TractionEye, коллективной торговой площадки на блокчейне TON, где пользователи могут доверить управление своими крипто активами проверенным трейдерам, а все условия контролируются смарт контрактами, а не обещаниями. До запуска TractionEye она работала продакт менеджером в AppScience, а также занимала позиции growth продакт менеджера и старшего аналитика в Сбере, где на практике увидела, как крупные компании выстраивают процесс разработки продукта.

Она изучала программирование и интернет технологии в Университете ИТМО в Санкт Петербурге и последние два года плотно погружена в экосистему Web3 и TON, взяв первое место в треке DeFi и второе место в треке AI на хакатоне IdeaTON в Москве. В её текстах реальный опыт основателя стартапа: питчи перед инвесторами, сложные сессии вопросов и ответов и постоянный вопрос себе, решает ли продукт реальную проблему или просто хорошо выглядит на демо.

В Siplinx AI Юлия пишет о продуктовом мышлении, росте и о том, что действительно нужно, чтобы создать продукт, которым люди хотят пользоваться, опираясь на опыт построения стартапа от идеи до запуска.`,
    photo: '/images/authors/yulia-trishkina.png',
    linkedin: 'https://www.linkedin.com/in/yulia-trishkina/',
    expertise: ['Product Management', 'Growth', 'Web3 & Blockchain', 'Entrepreneurship'],
    expertiseRu: ['Управление продуктом', 'Growth', 'Web3 и блокчейн', 'Предпринимательство'],
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
