import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "현재 웹페이지에서는 개인정보를 별도로 접수하지 않습니다. 페이지 내 상담 번호를 통해 전화 상담을 이용해 주세요.",
    },
    { status: 410 },
  );
}
