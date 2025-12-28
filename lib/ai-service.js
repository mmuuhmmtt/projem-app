/**
 * AI Service - Ücretsiz AI API entegrasyonu
 * Desteklenen sağlayıcılar: Hugging Face, Groq
 */

const AI_PROVIDER = process.env.NEXT_PUBLIC_AI_PROVIDER || 'groq'; // 'huggingface' veya 'groq' (groq önerilir)

/**
 * Hugging Face Inference API ile mesaj gönderme
 * NOT: Hugging Face eski endpoint'i desteklemiyor
 * Groq API kullanmanız önerilir (daha hızlı ve stabil)
 */
async function sendMessageHuggingFace(message, conversationHistory = []) {
  const API_KEY = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
  
  if (!API_KEY) {
    throw new Error('HUGGINGFACE_API_KEY bulunamadı. Lütfen .env.local dosyasına ekleyin.');
  }

  // Hugging Face'in yeni router endpoint'i
  // Ancak bu endpoint henüz tam desteklenmiyor, Groq kullanmanız önerilir
  const model = process.env.NEXT_PUBLIC_HF_MODEL || 'mistralai/Mistral-7B-Instruct-v0.2';
  
  // Chat formatı kullan (system prompt ile)
  const messages = [
    {
      role: 'system',
      content: 'Sen Muhammed\'sin. Kullanıcılara yardımcı olan samimi ve profesyonel bir AI asistansın. Türkçe yanıt veriyorsun. İlk mesajlarda kendini "Merhaba, ben Muhammed. Size nasıl yardımcı olabilirim?" şeklinde tanıtıyorsun. Samimi, yardımsever ve anlaşılır bir dil kullanıyorsun.'
    },
    ...conversationHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    { role: 'user', content: message }
  ];

  try {
    // Yeni router endpoint (deneme aşamasında)
    const response = await fetch(`https://router.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: messages,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: errorText };
      }
      
      if (response.status === 503) {
        throw new Error('Model şu anda yükleniyor. Lütfen birkaç saniye bekleyip tekrar deneyin.');
      }
      
      // Router endpoint çalışmıyorsa Groq kullanmayı öner
      throw new Error(`Hugging Face API hatası: ${errorData.error || errorText}. Lütfen Groq API kullanmayı deneyin.`);
    }

    const data = await response.json();
    
    // Response formatını parse et
    let generatedText = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text;
    } else if (data.generated_text) {
      generatedText = data.generated_text;
    } else if (data[0]?.summary_text) {
      generatedText = data[0].summary_text;
    } else if (typeof data === 'string') {
      generatedText = data;
    } else {
      throw new Error('Beklenmeyen yanıt formatı. Groq API kullanmanız önerilir.');
    }
    
    return generatedText.trim() || 'Yanıt alınamadı';
  } catch (error) {
    console.error('Hugging Face API hatası:', error);
    // Groq kullanmayı öner
    throw new Error(`${error.message} Lütfen Groq API kullanmayı deneyin (daha hızlı ve stabil).`);
  }
}

/**
 * Groq API ile mesaj gönderme
 */
async function sendMessageGroq(message, conversationHistory = []) {
  const API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  
  if (!API_KEY) {
    throw new Error('GROQ_API_KEY bulunamadı. Lütfen .env.local dosyasına ekleyin.');
  }

  // llama-3.1-8b-instant modeli (ücretsiz ve hızlı)
  const model = process.env.NEXT_PUBLIC_GROQ_MODEL || 'llama-3.1-8b-instant';

  // Konuşma geçmişini formatla
  const messages = [
    {
      role: 'system',
      content: 'Sen Muhammet\'sin. Kullanıcılara yardımcı olan samimi ve profesyonel bir AI asistansın. Türkçe yanıt veriyorsun. İlk mesajlarda kendini "Merhaba, ben Muhammet. Size nasıl yardımcı olabilirim?" şeklinde tanıtıyorsun. Samimi, yardımsever ve anlaşılır bir dil kullanıyorsun.'
    },
    ...conversationHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API hatası: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Yanıt alınamadı';
  } catch (error) {
    console.error('Groq API hatası:', error);
    throw error;
  }
}

/**
 * Ana AI mesaj gönderme fonksiyonu
 * Seçilen sağlayıcıya göre uygun fonksiyonu çağırır
 */
export async function sendAIMessage(message, conversationHistory = []) {
  try {
    if (AI_PROVIDER === 'groq') {
      return await sendMessageGroq(message, conversationHistory);
    } else {
      return await sendMessageHuggingFace(message, conversationHistory);
    }
  } catch (error) {
    // Hata durumunda kullanıcıya anlaşılır mesaj döndür
    if (error.message.includes('API_KEY')) {
      throw new Error('API anahtarı bulunamadı. Lütfen .env.local dosyasını kontrol edin.');
    }
    throw error;
  }
}

/**
 * Kullanılan AI sağlayıcısını döndürür
 */
export function getAIProvider() {
  return AI_PROVIDER;
}

