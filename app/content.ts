export type CtaLink = {
  label: string;
  href: string;
};

export type SeoContent = {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  badges: string[];
  proofPoints: string[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export type SectionHeader = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ReasonItem = {
  title: string;
  description: string;
};

export type UseCase = {
  title: string;
  description: string;
};

export type PackageItem = {
  id: string;
  name: string;
  badge: string;
  attendees: string;
  summary: string;
  highlights: string[];
  recommendedFor: string[];
};

export type ProcessItem = {
  title: string;
  description: string;
};

export type ReferenceItem = {
  quote: string;
  author: string;
};

export type BrandingExampleItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type InquiryField = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "date" | "select" | "textarea";
  required: boolean;
  options?: string[];
};

export type QuickQuoteContent = {
  eyebrow: string;
  title: string;
  description: string;
  attendeeOptions: string[];
  eventOptions: string[];
  packageOptions: string[];
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export type ContactLine = {
  label: string;
  phone: string;
  href: string;
};

export type ContactContent = {
  title: string;
  consultHours: string;
  lunchBreak: string;
  contacts: ContactLine[];
};

export type LegalContent = {
  pageNotice: string;
  operator: string;
  retentionPeriod: string;
  destructionPolicy: string;
  privacyPolicyHref: string;
};

export const siteContent = {
  seo: {
    title: "크리스피크림 도넛트럭 | 브랜드가 직접 찾아가는 도넛 케이터링",
    description:
      "기업 행사, 지점 프로모션, 학교, 촬영장, 팬서포트까지. 브랜드가 직접 찾아가는 도넛 케이터링 서비스.",
    keywords: [
      "도넛트럭",
      "도넛 케이터링",
      "크리스피크림 케이터링",
      "출장 도넛차",
      "기업행사 간식차",
      "브랜드 케이터링",
      "행사 케이터링",
      "도넛차",
      "커피차 대체",
    ],
    ogTitle: "브랜드가 직접 찾아가는 도넛 케이터링",
    ogDescription: "행사장 앞, 오피스 앞, 촬영장 앞에 크리스피크림 도넛 트럭이 갑니다.",
    ogImage: "/og-image.svg",
  } satisfies SeoContent,

  sections: {
    why: {
      eyebrow: "Why Krispy Kreme",
      title: "왜 크리스피크림도넛 도넛트럭인가",
      description:
        "단순 간식 제공이 아니라 브랜드가 직접 현장으로 들어와 도넛과 커피, 그리고 기억에 남는 경험까지 함께 만드는 케이터링입니다.",
    },
    useCases: {
      eyebrow: "Best Use Cases",
      title: "이런 행사에 특히 잘 맞습니다",
      description:
        "기업 행사부터 촬영장, 학교, 팬서포트까지. 현장 분위기와 사진 결과물, 브랜드 경험이 중요한 행사에 강합니다.",
    },
    packages: {
      eyebrow: "Package Overview",
      title: "인원 기준으로 이해하기 쉬운 패키지 구성",
      description:
        "더즌 수량보다 행사 규모와 운영 목적에 맞춰 선택할 수 있도록 구성했습니다. 가격보다 먼저 적합한 행사와 운영 가치를 보여줍니다.",
    },
    branding: {
      eyebrow: "Co-branding Examples",
      title: "현장에 맞춰 함께 설계하는 브랜딩",
      description:
        "기업명, 지점명, 응원 메시지, 촬영장 서포트 문구까지. 현장 목적에 맞는 표현을 함께 조율합니다.",
    },
    process: {
      eyebrow: "Booking Process",
      title: "문의부터 현장 운영까지 명확하게",
      description:
        "무엇을 문의하면 되는지, 상담 이후 어떤 제안을 받게 되는지 한눈에 이해할 수 있도록 간결하게 정리했습니다.",
    },
    references: {
      eyebrow: "References",
      title: "먼저 경험한 현장의 반응",
      description:
        "아래 문구는 실제 운영 장면에서 자주 받는 반응과 현장 후기를 바탕으로 정리한 레퍼런스 톤입니다.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "자주 묻는 질문",
      description:
        "운영 제한사항을 앞세우기보다, 문의 전 가장 많이 궁금해하는 내용부터 신뢰감 있게 안내합니다.",
    },
    inquiry: {
      eyebrow: "Phone Consultation",
      title: "전화 상담 안내",
      description: "지역 담당 번호로 직접 연결해 행사일, 지역, 예상 인원 기준으로 빠르게 상담을 진행하실 수 있습니다.",
    },
  },

  quickQuote: {
    eyebrow: "Quick Quote",
    title: "3분 안에 우리 행사에 맞는 운영 방향을 가볍게 확인해 보세요",
    description: "",
    attendeeOptions: ["100~120명", "150명 이상", "250명 이상"],
    eventOptions: ["기업 행사", "지점 프로모션", "학교 행사", "촬영장 서포트", "브랜드 협업"],
    packageOptions: [
      "Reference Collaboration",
      "Standard Corporate Package",
      "Premium Brand Event",
    ],
    primaryCta: {
      label: "전화 상담 번호 보기",
      href: "#inquiry-contact",
    },
    secondaryCta: {
      label: "추천 패키지 확인하기",
      href: "#packages",
    },
  } satisfies QuickQuoteContent,

  contact: {
    title: "전화 상담 안내",
    consultHours: "09:00~18:00",
    lunchBreak: "12:00~13:00",
    contacts: [
      {
        label: "수도권지역담당",
        phone: "02-708-2822",
        href: "tel:02-708-2822",
      },
      {
        label: "지방권지역담당",
        phone: "051-501-6637",
        href: "tel:051-501-6637",
      },
    ],
  } satisfies ContactContent,

  legal: {
    pageNotice: "본 페이지는 크리스피크림도넛 공식 홈페이지가 아닌 영업 상담용 안내 페이지입니다.",
    operator: "크리스피크림도넛 동부지점",
    retentionPeriod: "접수일로부터 30일",
    destructionPolicy: "보유기간 종료 후 30일 이내 파기",
    privacyPolicyHref: "/privacy",
  } satisfies LegalContent,

  ui: {
    heroCardEyebrow: "Premium On-site Experience",
    heroCardTitle: "크리스피크림도넛\n케이터링 트럭",
    heroCardBadge: "Donuts + Coffee",
    useCaseBadge: "Best Fit",
    useCasePrompt: "행사 유형을 눌러 추천 이유를 확인해 보세요",
    useCaseDetailPoints: [
      "브랜드 무드가 살아나는 현장",
      "사진과 후기가 남는 운영",
      "간단 문의만으로 운영 방향 제안",
    ],
    packagePrompt: "행사 규모에 맞는 패키지를 선택해 세부 구성을 확인하세요",
    packageHighlightsLabel: "포함 포인트",
    packageRecommendedLabel: "추천 행사",
    brandingBadge: "Branding Example",
    referenceBadge: "현장 반응",
    referencePrompt: "좌우로 넘기며 실제 운영 장면에서 자주 나오는 반응을 확인해 보세요",
  },

  hero: {
    eyebrow: "Official Branded Catering",
    title: "브랜드가 직접 찾아가는\n도넛 케이터링",
    subtitle:
      "행사장 앞, 오피스 앞, 촬영장 앞에 크리스피크림 도넛 트럭이 갑니다. 도넛과 커피, 그리고 기억에 남는 브랜드 경험까지.",
    badges: [
      "기업 행사",
      "지점 프로모션",
      "학교 행사",
      "촬영장 서포트",
      "팬서포트",
      "공동 브랜딩",
    ],
    proofPoints: [
      "브랜드가 직접 찾아가는 도넛 케이터링",
      "도넛 + 커피 + 현장 브랜딩 경험",
      "레퍼런스 협업형 패키지로 첫 문의 부담 완화",
    ],
    primaryCta: {
      label: "전화 상담 번호 보기",
      href: "#inquiry-contact",
    },
    secondaryCta: {
      label: "추천 패키지 확인하기",
      href: "#packages",
    },
  } satisfies HeroContent,

  reasons: [
    {
      title: "브랜드가 직접 찾아가는 케이터링",
      description:
        "익숙한 브랜드가 현장으로 들어오는 순간, 행사는 단순한 간식 제공을 넘어 기억에 남는 경험이 됩니다.",
    },
    {
      title: "도넛 + 커피 조합의 희소성",
      description:
        "일반 커피차나 간식차와 다른 방식으로, 도넛과 커피를 함께 즐길 수 있는 브랜드형 케이터링입니다.",
    },
    {
      title: "사진이 남는 비주얼",
      description:
        "트럭 비주얼, 도넛 진열, 브랜드 무드까지 현장 사진과 후기 콘텐츠로 남기기 좋은 구성이 가능합니다.",
    },
    {
      title: "공동 브랜딩에 강합니다",
      description:
        "기업명, 지점명, 행사명, 촬영장 응원 문구 등 현장 목적에 맞는 브랜딩 연출을 협의할 수 있습니다.",
    },
  ] satisfies ReasonItem[],

  useCases: [
    {
      title: "기업 복지 / 임직원 이벤트",
      description: "출근길 이벤트, 사내 복지 데이, 성과 격려, 시즌 행사에 잘 맞습니다.",
    },
    {
      title: "지점 프로모션 / 고객 이벤트",
      description: "오픈행사, 방문 유도, 고객 감사 프로모션에 적합합니다.",
    },
    {
      title: "학교 / 학원 / 대학교 행사",
      description: "축제, 설명회, 입시설명회, 학부모 행사 등 밝고 친근한 현장에 잘 어울립니다.",
    },
    {
      title: "촬영장 / 아티스트 서포트",
      description: "현장을 응원하는 톤으로 운영하기 좋고, 사진 결과물도 좋습니다.",
    },
    {
      title: "브랜드 협업 / 샘플링",
      description: "브랜드 로고 노출, 현장 체험형 운영, 공동 프로모션 연출이 가능합니다.",
    },
  ] satisfies UseCase[],

  packages: [
    {
      id: "reference",
      name: "Reference Collaboration",
      badge: "한정 운영",
      attendees: "100~120명 내외",
      summary:
        "처음 시작하는 협업형 패키지. 공동 브랜딩, 사진 활용, 사례 소개가 가능한 경우 우선 검토합니다.",
      highlights: ["진입형 협업 패키지", "수도권 / 평일 우선", "레퍼런스 확보형"],
      recommendedFor: ["첫 협업 테스트", "소규모 기업 행사", "지점 프로모션", "촬영장 응원"],
    },
    {
      id: "standard",
      name: "Standard Corporate Package",
      badge: "기본 추천",
      attendees: "150명 이상",
      summary:
        "가장 기본이 되는 기업행사형 패키지. 도넛과 커피를 중심으로 안정적인 현장 운영을 제안합니다.",
      highlights: ["가장 범용적인 구성", "인원 기준으로 쉬운 이해", "브랜드 경험 + 실사용성"],
      recommendedFor: ["기업 복지 행사", "지점 고객 이벤트", "학교 행사", "설명회 / 프로모션"],
    },
    {
      id: "premium",
      name: "Premium Brand Event",
      badge: "상위 패키지",
      attendees: "250명 이상",
      summary:
        "브랜드 존재감을 크게 보여주는 상위 패키지. 런칭, VIP 현장, 대규모 행사에 적합합니다.",
      highlights: ["현장 브랜딩 강화", "규모감 있는 연출", "프리미엄 이미지 극대화"],
      recommendedFor: ["대형 사내행사", "런칭 행사", "VIP 이벤트", "대형 촬영 / 프로모션"],
    },
  ] satisfies PackageItem[],

  brandingExamples: [
    {
      title: "임직원 출근길 웰컴 도넛트럭 이벤트",
      description:
        "출근 시간대에 맞춰 환영 메시지와 간편한 운영 동선을 구성하는 예시입니다. 첫 인상과 브랜드 친밀도를 높이는 흐름에 적합합니다.",
    },
    {
      title: "지점 방문 고객 감사 프로모션 운영",
      description:
        "방문 고객에게 감사 메시지와 브랜드 경험을 함께 전달하는 예시입니다. 체류 만족도와 재방문 인상을 높이는 흐름에 잘 맞습니다.",
    },
    {
      title: "대학교 캠퍼스 응원형 현장 이벤트",
      description:
        "축제, 설명회, 학사 행사처럼 밝고 참여감 있는 현장에 어울리는 예시입니다. 사진 반응과 주목도를 자연스럽게 끌어올리기 좋습니다.",
    },
    {
      title: "촬영장 응원 메시지 연계 서포트 운영",
      description:
        "촬영 및 지원 현장에 맞춰 응원 문구와 휴식 타이밍을 자연스럽게 연결하는 예시입니다. 메시지 전달력과 현장 만족도를 함께 챙길 수 있습니다.",
    },
    {
      title: "브랜드 팝업 현장 대기열 유입 이벤트",
      description:
        "팝업 대기 구간에서도 브랜드 노출과 참여 경험이 이어지도록 설계하는 예시입니다. 대기 시간을 체험 요소로 전환하기에 적합합니다.",
    },
  ] satisfies BrandingExampleItem[],

  process: [
    {
      title: "행사 정보 접수",
      description: "행사일, 지역, 장소, 예상 인원, 희망 운영 방향을 확인합니다.",
    },
    {
      title: "현장 조건 검토",
      description: "주차 위치, 동선, 전기 지원 여부, 운영 시간을 함께 점검합니다.",
    },
    {
      title: "패키지 및 견적 제안",
      description: "행사 규모와 목적에 맞는 패키지와 운영안을 제안드립니다.",
    },
    {
      title: "브랜딩 문구 확정",
      description: "현수막, 안내 문구, 응원 메시지 등 현장용 표현을 정리합니다.",
    },
    {
      title: "현장 운영",
      description: "행사 목적에 맞는 톤으로 안정적으로 운영합니다.",
    },
  ] satisfies ProcessItem[],

  references: [
    {
      quote: "광장형 운영이라 지나가는 고객 유입이 자연스럽게 생기고, 대기열이 잡혀도 현장 분위기가 훨씬 좋아 보였습니다.",
      author: "야외 프로모션 운영 담당",
    },
    {
      quote: "캠퍼스 현장에서 응원 메시지와 함께 운영하니 사진 반응이 좋았고, 학생 참여도도 훨씬 자연스럽게 올라왔습니다.",
      author: "학교 행사 진행 담당",
    },
    {
      quote: "트럭 비주얼 자체가 살아 있어서 별도 장식이 많지 않아도 현장 포인트가 충분히 만들어졌습니다.",
      author: "브랜드 협업 담당",
    },
  ] satisfies ReferenceItem[],

  faq: [
    {
      question: "현장 결제가 가능한가요?",
      answer: "현장 결제는 불가하며, 패키지 결제 이후 케이터링으로 진행됩니다.",
    },
    {
      question: "최소 며칠 전에 문의해야 하나요?",
      answer:
        "원활한 운영을 위해 최소 2주 전에 문의 및 예약해주시는 것이 좋습니다. 행사 일정과 지역에 따라 가능 여부가 달라질 수 있습니다.",
    },
    {
      question: "전기 지원이 꼭 필요한가요?",
      answer:
        "현장 조건에 따라 필요한 운영 방식이 달라질 수 있습니다. 전화 상담 시 전기 지원 가능 여부를 알려주시면 빠르게 확인해드립니다.",
    },
    {
      question: "공동 브랜딩이 가능한가요?",
      answer:
        "행사 목적에 맞는 문구와 운영 톤을 협의할 수 있습니다. 기업, 지점, 촬영장, 응원 이벤트 등 상황에 따라 조정됩니다.",
    },
    {
      question: "사진이나 영상 활용이 가능한가요?",
      answer: "레퍼런스 협업형의 경우 사전 협의 시 사진/영상 활용 범위를 조정할 수 있습니다.",
    },
    {
      question: "일반 간식차와 가장 다른 점은 무엇인가요?",
      answer:
        "단순 제공형이 아니라, 브랜드가 직접 현장에 들어와 도넛과 커피, 그리고 사진이 남는 경험까지 함께 만드는 점입니다.",
    },
  ] satisfies FaqItem[],

  inquiryForm: {
    title: "빠른 견적 문의",
    description: "업체명, 연락처, 행사일만 먼저 남겨주셔도 상담 검토를 빠르게 시작할 수 있습니다.",
    fields: [
      { name: "company", label: "업체명", type: "text", required: true },
      { name: "contactName", label: "담당자명", type: "text", required: false },
      { name: "phone", label: "연락처", type: "tel", required: true },
      { name: "email", label: "이메일", type: "email", required: false },
      { name: "eventDate", label: "행사일", type: "date", required: true },
      { name: "eventTime", label: "행사시간", type: "text", required: false },
      { name: "location", label: "행사 장소", type: "text", required: false },
      {
        name: "attendees",
        label: "예상 인원",
        type: "select",
        required: false,
        options: ["100명 이하", "100~120명", "150명 이상", "250명 이상"],
      },
      {
        name: "desiredPackage",
        label: "희망 패키지",
        type: "select",
        required: false,
        options: [
          "Reference Collaboration",
          "Standard Corporate Package",
          "Premium Brand Event",
          "상담 후 추천받기",
        ],
      },
      {
        name: "power",
        label: "전기 지원 가능 여부",
        type: "select",
        required: false,
        options: ["가능", "불가", "미확인"],
      },
      {
        name: "coBranding",
        label: "공동 브랜딩 가능 여부",
        type: "select",
        required: false,
        options: ["가능", "불가", "협의 가능"],
      },
      {
        name: "photoUsage",
        label: "사진/영상 활용 가능 여부",
        type: "select",
        required: false,
        options: ["가능", "불가", "협의 가능"],
      },
      { name: "notes", label: "추가 요청사항", type: "textarea", required: false },
    ] satisfies InquiryField[],
    submitLabel: "지금 상담 요청 보내기",
  },

  bottomCta: {
    title: "행사에 맞는 도넛트럭 상담을 바로 시작해 보세요",
    description: "지역 담당 번호로 직접 연결해 행사일, 지역, 예상 인원 기준으로 빠르게 상담을 진행하실 수 있습니다.",
    primaryCta: {
      label: "수도권 전화 상담",
      href: "tel:02-708-2822",
    },
    secondaryCta: {
      label: "지방권 전화 상담",
      href: "tel:051-501-6637",
    },
  },
};
