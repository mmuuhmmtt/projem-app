// 3 mock kullanıcı
export const mockUsers = [
    { id: 'user-1', name: 'Ahmet Yılmaz' },
    { id: 'user-2', name: 'Ayşe Demir' },
    { id: 'user-3', name: 'Mehmet Kaya' }
];

// Kullanıcı bazlı mesajlar (userId ile)
export const mockMessages = [
    // Ahmet Yılmaz'ın mesajları
    {
        id: 'msg-1',
        userId: 'user-1',
        type: 'user',
        content: 'Merhaba, bugün nasıl yardımcı olabilirsin?',
        timestamp: '2025-05-01T10:30:10Z'
    },
    {
        id: 'msg-2',
        userId: 'user-1',
        type: 'assistant',
        content: 'Merhaba! Size bugün nasıl yardımcı olabilirim? Herhangi bir konuda soru sorabilir veya yardım isteyebilirsiniz.',
        timestamp: '2025-05-01T10:30:15Z',
        citations: []
    },
    {
        id: 'msg-3',
        userId: 'user-1',
        type: 'user',
        content: 'Hava durumu nasıl olacak bugün?',
        timestamp: '2025-05-01T10:31:00Z'
    },
    {
        id: 'msg-4',
        userId: 'user-1',
        type: 'assistant',
        content: 'Bugünkü hava durumu hakkında bilgi vermek için önce konumunuzu bilmem gerekiyor. Hangi şehir veya bölge için hava durumu öğrenmek istiyorsunuz?',
        timestamp: '2025-05-01T10:31:10Z',
        citations: []
    },
    
    // Ayşe Demir'in mesajları
    {
        id: 'msg-5',
        userId: 'user-2',
        type: 'user',
        content: 'Yeni bir yazılım projesi başlatmak istiyorum. Nereden başlamalıyım?',
        timestamp: '2025-04-30T15:45:10Z'
    },
    {
        id: 'msg-6',
        userId: 'user-2',
        type: 'assistant',
        content: 'Yeni bir yazılım projesi başlatmak için şu adımları izlemenizi öneririm:\n\n1. Projenin kapsamını ve hedeflerini net bir şekilde belirleyin\n2. Teknik gereksinimlerinizi listeleyin\n3. Uygun teknoloji yığını seçin\n4. Proje yönetim metodolojisi belirleyin (Agile, Scrum, vb.)\n5. Bir MVP (Minimum Viable Product) tanımlayın\n6. Zaman çizelgesi ve bütçe planlayın\n\nBu konulardan hangisi hakkında daha detaylı bilgi edinmek istersiniz?',
        timestamp: '2025-04-30T15:45:20Z',
        citations: [
            { text: 'Yazılım Projesi Yönetimi Rehberi', link: '#' },
            { text: 'Modern Yazılım Geliştirme', link: '#' }
        ]
    },
    
    // Mehmet Kaya'nın mesajları
    {
        id: 'msg-7',
        userId: 'user-3',
        type: 'user',
        content: 'Bilgisayarım çok yavaşladı, ne yapabilirim?',
        timestamp: '2025-04-29T11:00:10Z'
    },
    {
        id: 'msg-8',
        userId: 'user-3',
        type: 'assistant',
        content: 'Bilgisayarınızın yavaşlaması için çeşitli nedenler olabilir. İşte hızlandırmak için yapabileceğiniz bazı adımlar:\n\n1. Gereksiz programları ve dosyaları silin\n2. Başlangıçta açılan uygulamaları sınırlayın\n3. Disk temizliği ve disk birleştirme yapın\n4. Virüs ve kötü yazılım taraması yapın\n5. RAM veya SSD yükseltmesi düşünün\n\nHangi işletim sistemini kullanıyorsunuz? Windows, Mac veya Linux\'a göre daha spesifik yönergeler verebilirim.',
        timestamp: '2025-04-29T11:00:25Z',
        citations: [
            { text: 'Bilgisayar Bakım Rehberi', link: '#' }
        ]
    }
];