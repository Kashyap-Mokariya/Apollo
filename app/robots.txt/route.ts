import {NextResponse} from "next/server";

export function GET() {
	return new NextResponse(
		`User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://apollo-six-orcin.vercel.app/sitemap.xml`,
		{
			headers: {
				"Content-Type": "text/plain",
			},
		}
	);
}
