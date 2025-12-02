import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path')!;

    const normalizedPath = path.startsWith('/') ? path.substring(1) : path;

    const fullPath = join(process.cwd(), 'src', normalizedPath);

    if (!existsSync(fullPath)) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    try {
        const fileContent = readFileSync(fullPath, 'utf-8');

        return new NextResponse(fileContent, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error) {
        console.error('Error processing markdown:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}