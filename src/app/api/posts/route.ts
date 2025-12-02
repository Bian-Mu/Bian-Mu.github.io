import { NextRequest, NextResponse } from 'next/server';
import { getPostStructure } from '../../lib/postUtils';

export async function GET(request: NextRequest) {
    try {
        const posts = getPostStructure();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to load posts' },
            { status: 500 }
        );
    }
}