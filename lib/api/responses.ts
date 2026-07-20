import { NextResponse } from "next/server";

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "MARKETPLACE_ERROR"
  | "AI_PROVIDER_ERROR"
  | "IMAGE_ANALYSIS_FAILED"
  | "INTERNAL_ERROR";

export function successResponse<TData>(data: TData, init?: ResponseInit) {
  return NextResponse.json(
    {
      success: true,
      data
    },
    init
  );
}

export function errorResponse(
  code: ApiErrorCode,
  message: string,
  status: number,
  details: Record<string, unknown> = {}
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details
      }
    },
    { status }
  );
}
