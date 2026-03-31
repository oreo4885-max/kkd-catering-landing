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
  "판교",
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

type ContactRecipient = (typeof siteContent.contact.contacts)[number];

function pickRecipients(location: string): { recipients: ContactRecipient[]; routeLabel: string } {
  const normalized = location.replace(/\s+/g, "");
  const contacts = siteContent.contact.contacts;
  const metroContact = contacts.find((item) => item.label.includes("수도권"));
  const localContact = contacts.find((item) => item.label.includes("지방권"));

  const isMetro = metroKeywords.some((keyword) => normalized.includes(keyword));
  const isLocal = localKeywords.some((keyword) => normalized.includes(keyword));

  if (isMetro && metroContact) {
    return { recipients: [metroContact], routeLabel: metroContact.label };
  }

  if (isLocal && localContact) {
    return { recipients: [localContact], routeLabel: localContact.label };
  }

  const fallbackRecipients = [metroContact, localContact].filter(
    (item): item is ContactRecipient => Boolean(item),
  );

  return {
    recipients: fallbackRecipients,
    routeLabel: "지역 판별 미확정으로 전체 담당자",
  };
}

function validatePayload(payload: InquiryPayload) {
  const requiredFields: Array<keyof InquiryPayload> = [
    "company",
    "contactName",
    "phone",
    "email",
    "eventDate",
    "eventTime",
    "location",
    "attendees",
    "desiredPackage",
    "power",
    "coBranding",
    "photoUsage",
  ];

  for (const field of requiredFields) {
    if (!payload[field]?.trim()) {
      return `${field} 값이 비어 있습니다.`;
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

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM ?? smtpUser;
    const smtpSecure = process.env.SMTP_SECURE === "true";

    if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
      return NextResponse.json(
        { message: "메일 전송 환경이 아직 설정되지 않았습니다. SMTP 정보를 먼저 설정해 주세요." },
        { status: 500 },
      );
    }

    const { recipients, routeLabel } = pickRecipients(payload.location);

    if (recipients.length === 0) {
      return NextResponse.json(
        { message: "수신 담당자 정보를 찾을 수 없습니다." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = `[크리스피크림도넛 문의] ${payload.company} / ${payload.eventDate} / ${payload.desiredPackage}`;
    const text = `
[자동 접수된 문의입니다]

담당 라우팅: ${routeLabel}

업체명: ${payload.company}
담당자명: ${payload.contactName}
연락처: ${payload.phone}
이메일: ${payload.email}
행사일: ${payload.eventDate}
행사시간: ${payload.eventTime}
행사 장소: ${payload.location}
예상 인원: ${payload.attendees}
희망 패키지: ${payload.desiredPackage}
전기 지원 가능 여부: ${payload.power}
공동 브랜딩 가능 여부: ${payload.coBranding}
사진/영상 활용 가능 여부: ${payload.photoUsage}

추가 요청사항:
${payload.notes?.trim() || "-"}
`.trim();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #1a2213;">
        <h2 style="margin-bottom: 12px;">크리스피크림도넛 케이터링 문의</h2>
        <p style="margin: 0 0 16px;"><strong>담당 라우팅:</strong> ${routeLabel}</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tbody>
            <tr><td style="padding: 8px 0; width: 180px;"><strong>업체명</strong></td><td>${payload.company}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>담당자명</strong></td><td>${payload.contactName}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>연락처</strong></td><td>${payload.phone}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>이메일</strong></td><td>${payload.email}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>행사일</strong></td><td>${payload.eventDate}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>행사시간</strong></td><td>${payload.eventTime}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>행사 장소</strong></td><td>${payload.location}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>예상 인원</strong></td><td>${payload.attendees}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>희망 패키지</strong></td><td>${payload.desiredPackage}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>전기 지원</strong></td><td>${payload.power}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>공동 브랜딩</strong></td><td>${payload.coBranding}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>사진/영상 활용</strong></td><td>${payload.photoUsage}</td></tr>
            <tr><td style="padding: 8px 0; vertical-align: top;"><strong>추가 요청사항</strong></td><td>${payload.notes?.trim() || "-"}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    await transporter.sendMail({
      from: smtpFrom,
      to: recipients.map((item) => item.email).join(", "),
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    return NextResponse.json({
      message: `${routeLabel} 메일로 문의가 접수되었습니다.`,
      recipients: recipients.map((item) => item.email),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "문의 전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
