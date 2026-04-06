import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteContent } from "@/app/content";

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
  contactName?: string;
  phone: string;
  email?: string;
  eventDate: string;
  eventTime?: string;
  location?: string;
  attendees?: string;
  desiredPackage?: string;
  power?: string;
  coBranding?: string;
  photoUsage?: string;
  notes?: string;
  privacyConsent?: string;
};

function pickRouteLabel(location: string) {
  const normalized = (location || "").replace(/\s+/g, "");

  if (metroKeywords.some((keyword) => normalized.includes(keyword))) {
    return "수도권지역담당";
  }

  if (localKeywords.some((keyword) => normalized.includes(keyword))) {
    return "지방권지역담당";
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
    privacyConsent: "개인정보 수집 및 이용 동의",
  };

  for (const field of requiredFields) {
    if (!payload[field]?.trim()) {
      return `${fieldLabels[field]} 값을 입력해 주세요.`;
    }
  }

  if (payload.privacyConsent !== "agreed") {
    return "개인정보 수집 및 이용 동의가 필요합니다.";
  }

  return null;
}

function getRecipient(routeLabel: string) {
  const metroEmail = process.env.INQUIRY_TO_METRO || siteContent.contact.contacts[0]?.email;
  const localEmail = process.env.INQUIRY_TO_LOCAL || siteContent.contact.contacts[1]?.email;
  const fallbackEmail = process.env.INQUIRY_TO_FALLBACK || siteContent.legal.operatorEmail;

  if (routeLabel === "수도권지역담당") {
    return metroEmail;
  }

  if (routeLabel === "지방권지역담당") {
    return localEmail;
  }

  return fallbackEmail;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function buildMailText(payload: InquiryPayload, routeLabel: string) {
  return [
    "새 상담 문의가 접수되었습니다.",
    "",
    `담당 구분: ${routeLabel}`,
    `업체명: ${payload.company || "-"}`,
    `담당자명: ${payload.contactName || "-"}`,
    `연락처: ${payload.phone || "-"}`,
    `이메일: ${payload.email || "-"}`,
    `행사일: ${payload.eventDate || "-"}`,
    `행사시간: ${payload.eventTime || "-"}`,
    `행사 장소: ${payload.location || "-"}`,
    `예상 인원: ${payload.attendees || "-"}`,
    `희망 패키지: ${payload.desiredPackage || "-"}`,
    `전기 지원 가능 여부: ${payload.power || "-"}`,
    `공동 브랜딩 가능 여부: ${payload.coBranding || "-"}`,
    `사진/영상 활용 가능 여부: ${payload.photoUsage || "-"}`,
    `추가 요청사항: ${payload.notes || "-"}`,
    "",
    "본 메일은 랜딩페이지 상담 문의 폼을 통해 자동 접수되었습니다.",
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;
    const validationError = validatePayload(payload);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const transporter = getTransporter();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (!transporter || !from) {
      return NextResponse.json(
        { message: "메일 접수 설정이 아직 완료되지 않았습니다. 관리자에게 문의해 주세요." },
        { status: 500 },
      );
    }

    const routeLabel = pickRouteLabel(payload.location || "");
    const to = getRecipient(routeLabel);

    if (!to) {
      return NextResponse.json(
        { message: "문의 수신 메일 주소가 설정되지 않았습니다. 관리자에게 문의해 주세요." },
        { status: 500 },
      );
    }

    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email || undefined,
      subject: `[크리스피크림도넛 상담 접수] ${payload.company} / ${payload.eventDate}`,
      text: buildMailText(payload, routeLabel),
    });

    return NextResponse.json({
      message: `${routeLabel} 기준으로 문의가 정상 접수되었습니다. 담당자가 회사 메일에서 확인 후 연락드릴 예정입니다.`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
