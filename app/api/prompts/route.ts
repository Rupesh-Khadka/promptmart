import { getAllPrompt, getOrders } from "@/app/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "8");

    const data = await getAllPrompt(page, pageSize);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   try {
//     // You can add query params later if needed (e.g., for pagination)
//     const data = await getOrders();

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("GET /api/orders error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
