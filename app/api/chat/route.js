import { sendAIMessage } from '@/lib/ai-service';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Geçerli bir mesaj gönderilmedi' },
        { status: 400 }
      );
    }

    // AI'ya mesaj gönder
    const aiResponse = await sendAIMessage(message, conversationHistory || []);

    return NextResponse.json({ 
      success: true,
      message: aiResponse 
    });
  } catch (error) {
    console.error('Chat API hatası:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'AI yanıtı alınamadı',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

