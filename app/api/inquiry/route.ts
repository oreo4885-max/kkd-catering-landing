import { NextResponse } from "next/server";

const metroKeywords = [
  "서울",
  "경기",
  "인천",
  "수도권",
  "성남",
  "수원",
  "용인",
  "고양",
  "부천",
  "안양",
  "김포",
  "화성",
  "파주",
  "하남",
  "광명",
  "시흥",
  "안산",
  "의정부",
  "남양주",
  "구리",
  "동탄",
  "양주",
];

const localKeywords = [
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "강릉",
  "춘천",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
  "창원",
  "포항",
  "천안",
  "청주",
  "전주",
  "여수",
  "목포",
];

type InquiryPayload = {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  eventDate: string;
  eventTime: string;
  location: string;
  attendees: string;
  desiredPackage: string;
  power: string;
  coBranding: string;
  photoUsage: string;
  notes?: string;
};

function pickRouteLabel(location: string) {
  const normalized = (location || "").replace(/\s+/g, "");

  if (metroKeywords.some((keyword) => normalized.includes(keyword))) {
    return "수도권 담당";
  }

  if (localKeywords.some((keyword) => normalized.includes(keyword))) {
    return "지방권 담당";
  }

  return "지역 확인 필요";
}

function validatePayload(payload: InquiryPayload) {
  const requiredFields: Array<keyof InquiryPayload> = ["company", "phone", "eventDate"];

  const fieldLabels: Record<keyof InquiryPayload, string> = {
    company: "업체명",
    contactName: "담당자명",
    phone: "연락처",
    email: "이메일",
    eventDate: "행사일",
    eventTime: "행사시간",
    location: "행사 장소",
    attendees: "예상 인원",
    desiredPackage: "희망 패키지",
    power: "전기 지원 가능 여부",
    coBranding: "공동 브랜딩 가능 여부",
    photoUsage: "사진/영상 활용 가능 여부",
    notes: "추가 요청사항",
  };

  for (const field of requiredFields) {
    if (!payload[field]?.trim()) {
      return `${fieldLabels[field]} 값을 입력해 주세요.`;
    }
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    const scriptSecret = process.env.GOOGLE_SCRIPT_SECRET;

    if (!scriptUrl || !scriptSecret) {
      return NextResponse.json(
        { message: "문의 저장 설정이 아직 완료되지 않았습니다. 관리자에게 문의해 주세요." },
        { status: 500 },
      );
    }

    const routeLabel = pickRouteLabel(payload.location);

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        routeLabel,
        secret: scriptSecret,
      }),
      cache: "no-store",
    });

    const rawText = await response.text();
    let result: { ok?: boolean; message?: string } = {};

    try {
      result = JSON.parse(rawText) as { ok?: boolean; message?: string };
    } catch {
      result = {};
    }

    if (!response.ok || !result.ok) {
      return NextResponse.json(
        { message: "문의 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: `${routeLabel} 기준으로 문의가 정상 접수되었습니다. 담당자가 확인 후 연락드릴 예정입니다.`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
