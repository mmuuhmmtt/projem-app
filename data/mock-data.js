
export const mockUsers = [
    { id: 'user-1', name: 'Ahmet Yılmaz' },
    { id: 'user-2', name: 'Ayşe Demir' },
    { id: 'user-3', name: 'Mehmet Kaya' }
];


export const mockAgents = [
    { id: 'agent-1', name: 'Genel Asistan', userId: 'user-1' },
    { id: 'agent-2', name: 'Hukuk Danışmanı', userId: 'user-1' },
    { id: 'agent-3', name: 'Finansal Danışman', userId: 'user-2' },
    { id: 'agent-4', name: 'Teknik Destek', userId: 'user-3' }
];


export const mockSessions = [
    { id: 'session-1', name: 'Oturum 01.05.2025 10:30', agentId: 'agent-1', createdAt: '2025-05-03T09:04:00.851Z' },
    { id: 'session-2', name: 'Oturum 30.04.2025 15:45', agentId: 'agent-1', createdAt: '2025-05-03T09:04:00.851Z' },
    { id: 'session-3', name: 'Oturum 02.05.2025 09:15', agentId: 'agent-2', createdAt: '2025-05-03T09:04:00.851Z' },
    { id: 'session-4', name: 'Oturum 01.05.2025 14:20', agentId: 'agent-3', createdAt: '2025-05-03T09:04:00.851Z' },
    { id: 'session-5', name: 'Oturum 29.04.2025 11:00', agentId: 'agent-4', createdAt: '2025-05-03T09:04:00.851Z' }
];


export const mockMessages = [
    
    {
        id: 'msg-1',
        sessionId: 'session-1',
        type: 'user',
        content: 'Merhaba, bugün nasıl yardımcı olabilirsin?',
        timestamp: '2025-05-01T10:30:10Z'
    },
    {
        id: 'msg-2',
        sessionId: 'session-1',
        type: 'assistant',
        content: 'Merhaba! Size bugün nasıl yardımcı olabilirim? Herhangi bir konuda soru sorabilir veya yardım isteyebilirsiniz.',
        timestamp: '2025-05-01T10:30:15Z',
        citations: []
    },
    {
        id: 'msg-3',
        sessionId: 'session-1',
        type: 'user',
        content: 'Hava durumu nasıl olacak bugün?',
        timestamp: '2025-05-01T10:31:00Z'
    },
    {
        id: 'msg-4',
        sessionId: 'session-1',
        type: 'assistant',
        content: 'Bugünkü hava durumu hakkında bilgi vermek için önce konumunuzu bilmem gerekiyor. Hangi şehir veya bölge için hava durumu öğrenmek istiyorsunuz?',
        timestamp: '2025-05-01T10:31:10Z',
        citations: []
    },
    {
        id: 'msg-5',
        sessionId: 'session-1',
        type: 'user',
        content: 'İstanbul',
        timestamp: '2025-05-01T10:31:30Z'
    },
    {
        id: 'msg-6',
        sessionId: 'session-1',
        type: 'tool',
        toolName: 'weather-api',
        content: 'İstanbul için 02 Mayıs 2025 hava durumu: 22°C, Parçalı Bulutlu',
        timestamp: '2025-05-01T10:31:35Z'
    },
    {
        id: 'msg-7',
        sessionId: 'session-1',
        type: 'assistant',
        content: 'İstanbul\'da bugün hava 22°C ve parçalı bulutlu olacak. Yağış beklenmemektedir. Hafif bir ceket yanınızda bulundurmanız yararlı olabilir.',
        timestamp: '2025-05-01T10:31:40Z',
        citations: [{ text: 'Meteoroloji Genel Müdürlüğü', link: '#' }]
    },

    
    {
        id: 'msg-8',
        sessionId: 'session-2',
        type: 'user',
        content: 'Yeni bir yazılım projesi başlatmak istiyorum. Nereden başlamalıyım?',
        timestamp: '2025-04-30T15:45:10Z'
    },
    {
        id: 'msg-9',
        sessionId: 'session-2',
        type: 'assistant',
        content: 'Yeni bir yazılım projesi başlatmak için şu adımları izlemenizi öneririm:\n\n1. Projenin kapsamını ve hedeflerini net bir şekilde belirleyin\n2. Teknik gereksinimlerinizi listeleyin\n3. Uygun teknoloji yığını seçin\n4. Proje yönetim metodolojisi belirleyin (Agile, Scrum, vb.)\n5. Bir MVP (Minimum Viable Product) tanımlayın\n6. Zaman çizelgesi ve bütçe planlayın\n\nBu konulardan hangisi hakkında daha detaylı bilgi edinmek istersiniz?',
        timestamp: '2025-04-30T15:45:20Z',
        citations: [
            { text: 'Yazılım Projesi Yönetimi Rehberi', link: '#' },
            { text: 'Modern Yazılım Geliştirme', link: '#' }
        ]
    },

    
    {
        id: 'msg-10',
        sessionId: 'session-3',
        type: 'user',
        content: 'Kira sözleşmesi konusunda bazı sorularım var.',
        timestamp: '2025-05-02T09:15:10Z'
    },
    {
        id: 'msg-11',
        sessionId: 'session-3',
        type: 'assistant',
        content: 'Kira sözleşmeleri konusunda size yardımcı olmaktan memnuniyet duyarım. Ne tür sorularınız var? Örneğin:\n\n- Sözleşme süresi\n- Kira artış oranları\n- Depozito iadesi\n- Sözleşme feshi koşulları\n\nHangi konu hakkında bilgi almak istersiniz?',
        timestamp: '2025-05-02T09:15:20Z',
        citations: []
    },

    
    {
        id: 'msg-12',
        sessionId: 'session-4',
        type: 'user',
        content: 'Emeklilik yatırım planım için önerilerin neler olabilir?',
        timestamp: '2025-05-01T14:20:10Z'
    },
    {
        id: 'msg-13',
        sessionId: 'session-4',
        type: 'assistant',
        content: 'Emeklilik yatırım planları kişisel durumunuza, risk toleransınıza ve zaman ufkunuza bağlı olarak değişir. Genel olarak, dengeli bir portföy şunları içerebilir:\n\n- Bireysel Emeklilik Sistemi (BES) - devlet katkısı avantajı sağlar\n- Düşük riskli yatırımlar (hazine bonoları, mevduat)\n- Orta riskli yatırımlar (dengeli fonlar, bazı şirket tahvilleri)\n- Yüksek büyüme potansiyelli yatırımlar (hisse senetleri, yatırım fonları)\n\nYaşınız, finansal durumunuz ve hedefleriniz hakkında daha fazla bilgi paylaşırsanız, daha özelleştirilmiş öneriler sunabilirim.',
        timestamp: '2025-05-01T14:20:25Z',
        citations: [
            { text: 'Finansal Planlama Rehberi', link: '#' },
            { text: 'Emeklilik Yatırım Stratejileri', link: '#' }
        ]
    },
    {
        id: 'msg-14',
        sessionId: 'session-4',
        type: 'tool',
        toolName: 'calculator',
        content: 'Aylık 1000TL yatırım, %8 yıllık getiri ile 30 yılda: 1,357,425.35TL',
        timestamp: '2025-05-01T14:20:30Z'
    },
    {
        id: 'msg-15',
        sessionId: 'session-4',
        type: 'assistant',
        content: 'Örneğin, aylık sadece 1000TL yatırım yaparak, yıllık ortalama %8 getiri ile 30 yıl sonunda 1,357,425.35TL birikiminiz olabilir. Bu, uzun vadeli düzenli yatırımın gücünü göstermektedir. Daha detaylı bir finansal plan için yaşınız, mevcut birikiminiz ve risk toleransınız gibi bilgileri paylaşmanız faydalı olacaktır.',
        timestamp: '2025-05-01T14:20:40Z',
        citations: []
    },

    
    {
        id: 'msg-16',
        sessionId: 'session-5',
        type: 'user',
        content: 'Bilgisayarım çok yavaşladı, ne yapabilirim?',
        timestamp: '2025-04-29T11:00:10Z'
    },
    {
        id: 'msg-17',
        sessionId: 'session-5',
        type: 'assistant',
        content: 'Bilgisayarınızın yavaşlaması için çeşitli nedenler olabilir. İşte hızlandırmak için yapabileceğiniz bazı adımlar:\n\n1. Gereksiz programları ve dosyaları silin\n2. Başlangıçta açılan uygulamaları sınırlayın\n3. Disk temizliği ve disk birleştirme yapın\n4. Virüs ve kötü yazılım taraması yapın\n5. RAM veya SSD yükseltmesi düşünün\n\nHangi işletim sistemini kullanıyorsunuz? Windows, Mac veya Linux\'a göre daha spesifik yönergeler verebilirim.',
        timestamp: '2025-04-29T11:00:25Z',
        citations: [
            { text: 'Bilgisayar Bakım Rehberi', link: '#' }
        ]
    }
];