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
  const { inquiryForm } = siteContent;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const trustSignals = useMemo(
    () => [
      "예상 답변 시간: 영업일 기준 순차 회신",
      "진행 가능 지역: 수도권 / 지방권 상담 후 검토",
      "필수 입력 3개: 업체명, 연락처, 행사일",
    ],
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        throw new Error(result.message || "문의 전송에 실패했습니다.");
      }

      setStatus("success");
      setMessage(result.message || "문의가 정상 접수되었습니다.");
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "문의 전송에 실패했습니다.";
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
      <div className="mt-5 flex flex-col gap-3 border-t border-forest-900/8 pt-4 text-sm text-forest-800/75 sm:mt-6 sm:pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p>{inquiryForm.description}</p>
          {message ? (
            <p className={status === "success" ? "text-forest-800" : "text-kkdred"}>{message}</p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-11 items-center justify-center rounded-full bg-forest-800 px-5 text-[13px] font-semibold text-cream transition hover:bg-forest-900 disabled:cursor-not-allowed disabled:opacity-70 sm:h-12 sm:px-6 sm:text-sm"
        >
          {status === "submitting" ? "문의 전송 중..." : inquiryForm.submitLabel}
        </button>
      </div>
    </form>
  );
}
