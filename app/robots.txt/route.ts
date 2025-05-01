import {NextResponse} from "next/server";

export function GET() {
	return new NextResponse(
		`User-agent: *
Allow: /
Disallow: /api/

Sitemap: http://localhost:3000/sitemap.xml`,
		{
			headers: {
				"Content-Type": "text/plain",
			},
		}
	);
}
