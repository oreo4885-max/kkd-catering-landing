"use client";

import { FormEvent, useMemo, useState } from "react";
import { siteContent, type InquiryField } from "@/app/content";

const inputClassName =
  "h-12 w-full rounded-2xl border border-forest-900/10 bg-white px-4 text-sm text-forest-900 outline-none transition placeholder:text-forest-700/40 focus:border-forest-600 focus:ring-2 focus:ring-forest-200";

const textareaClassName =
  "w-full rounded-2xl border border-forest-900/10 bg-white px-4 py-3 text-sm text-forest-900 outline-none transition placeholder:text-forest-700/40 focus:border-forest-600 focus:ring-2 focus:ring-forest-200";

function getPlaceholder(field: InquiryField) {
  const placeholders: Record<string, string> = {
    company: "예: 롯데백화점 마케팅팀",
    contactName: "담당자 성함",
    phone: "연락 가능한 번호",
    email: "회신 받을 이메일",
    eventTime: "예: 오전 11시~오후 2시",
    location: "예: 서울시 강남구 OO빌딩 1층 야외광장",
    notes: "행사 목적, 요청 분위기, 현장 특이사항 등을 남겨주세요.",
  };

  return placeholders[field.name] ?? "";
}

export function InquiryForm() {
  const { inquiryForm, legal } = siteContent;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const trustSignals = useMemo(
    () => [
      "예상 답변 시간: 영업일 기준 순차 회신",
      "진행 가능 지역: 수도권/지방권 상담 후 검토",
      "필수 입력 3개: 업체명, 연락처, 행사일",
    ],
    [],
  );

  const privacyItems = useMemo(
    () => [
      "수집 항목: 업체명, 담당자명, 연락처, 이메일, 행사일, 행사시간, 행사 장소, 예상 인원, 희망 패키지, 전기 지원 가능 여부, 공동 브랜딩 가능 여부, 사진/영상 활용 가능 여부, 추가 요청사항",
      "수집 목적: 케이터링 상담 접수, 운영 가능 여부 확인, 견적 및 제안 안내",
      `보유 기간: ${legal.retentionPeriod}`,
      `파기 기준: ${legal.destructionPolicy}`,
      "동의 거부 권리 및 불이익: 동의를 거부하실 수 있으나, 상담 접수 및 회신이 제한될 수 있습니다.",
    ],
    [legal.destructionPolicy, legal.retentionPeriod],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!privacyChecked) {
      setStatus("error");
      setMessage("개인정보 수집 및 이용 동의 후 상담 요청이 가능합니다.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "문의 접수 중 문제가 발생했습니다.");
      }

      setStatus("success");
      setMessage(result.message || "문의가 정상 접수되었습니다.");
      form.reset();
      setPrivacyChecked(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "문의 접수 중 문제가 발생했습니다.";
      setStatus("error");
      setMessage(errorMessage);
    }
  }

  return (
    <form className="card-surface rounded-[28px] p-4 sm:rounded-[32px] sm:p-8" id="inquiry-form" onSubmit={handleSubmit}>
      <div className="mb-5 grid gap-2.5 sm:mb-6 sm:grid-cols-3 sm:gap-3">
        {trustSignals.map((item) => (
          <div
            key={item}
            className="rounded-[18px] border border-forest-900/8 bg-forest-50 px-4 py-3.5 text-[13px] leading-5 text-forest-800 sm:rounded-[20px] sm:py-4 sm:text-sm sm:leading-6"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
        {inquiryForm.fields.map((field) => {
          const spanClass = field.type === "textarea" || field.name === "location" ? "sm:col-span-2" : "";

          return (
            <label key={field.name} className={`space-y-2 ${spanClass}`.trim()}>
              <span className="text-sm font-medium text-forest-900">
                {field.label}
                {field.required ? " *" : ""}
              </span>

              {field.type === "select" ? (
                <select className={inputClassName} name={field.name} defaultValue="" required={field.required}>
                  <option value="" disabled>
                    선택해 주세요
                  </option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  className={textareaClassName}
                  name={field.name}
                  rows={5}
                  placeholder={getPlaceholder(field)}
                  required={field.required}
                />
              ) : (
                <input
                  className={inputClassName}
                  name={field.name}
                  type={field.type}
                  placeholder={getPlaceholder(field)}
                  required={field.required}
                />
              )}
            </label>
          );
        })}
      </div>

      <div className="mt-5 rounded-[22px] border border-forest-900/8 bg-forest-50/80 px-4 py-4 text-sm leading-6 text-forest-800 sm:mt-6 sm:px-5">
        <label className="flex items-start gap-3 text-forest-900">
          <input
            className="mt-1 h-4 w-4 rounded border-forest-900/20 text-forest-800 focus:ring-forest-300"
            type="checkbox"
            name="privacyConsent"
            value="agreed"
            checked={privacyChecked}
            onChange={(event) => setPrivacyChecked(event.target.checked)}
            required
          />
          <span className="font-medium">[필수] 상담 접수를 위한 개인정보 수집 및 이용에 동의합니다.</span>
        </label>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px] font-medium text-forest-800">
          <a
            href={legal.privacyPolicyHref}
            className="underline underline-offset-4 transition hover:text-forest-900"
            target="_blank"
            rel="noreferrer"
          >
            개인정보처리방침 보기
          </a>
          <span className="text-forest-700/70">운영주체: {legal.operator}</span>
          <a href={`mailto:${legal.operatorEmail}`} className="underline underline-offset-4 transition hover:text-forest-900">
            {legal.operatorEmail}
          </a>
        </div>

        <div className="mt-3 rounded-[18px] bg-white/80 px-4 py-3 text-[13px] leading-6 text-forest-800/85">
          {privacyItems.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-forest-900/8 pt-4 text-sm text-forest-800/75 sm:mt-6 sm:pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p>{inquiryForm.description}</p>
          <p className="text-[13px] leading-6 text-forest-700/78">{legal.pageNotice}</p>
          {!privacyChecked ? <p className="text-forest-700/80">개인정보 동의 후 상담 요청 버튼이 활성화됩니다.</p> : null}
          {message ? (
            <p className={status === "success" ? "text-forest-800" : "text-kkdred"}>{message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={status === "submitting" || !privacyChecked}
          className="inline-flex h-11 items-center justify-center rounded-full bg-forest-800 px-5 text-[13px] font-semibold text-cream transition hover:bg-forest-900 disabled:cursor-not-allowed disabled:opacity-70 sm:h-12 sm:px-6 sm:text-sm"
        >
          {status === "submitting" ? "문의 전송 중.." : inquiryForm.submitLabel}
        </button>
      </div>
    </form>
  );
}
