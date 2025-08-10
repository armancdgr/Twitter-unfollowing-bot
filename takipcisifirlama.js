// Twitter/X Takip Ettiklerini Sıfırlama Script'i
// Browser console'da çalıştır (F12 -> Console)

async function unfollowAll() {
    console.log('🚀 Takipten çıkarma başlatılıyor...');
    
    let unfollowCount = 0;
    let totalProcessed = 0;
    
    // Sayfayı en üste scroll et
    window.scrollTo(0, 0);
    await sleep(2000);
    
    while (true) {
        // "Takip Ediliyor" veya "Following" butonlarını bul
        const followingButtons = document.querySelectorAll('[data-testid="unfollow"], [aria-label*="Following"], [aria-label*="Takip ediliyor"], button[aria-label*="Following"]');
        
        if (followingButtons.length === 0) {
            console.log('🔍 Daha fazla "Takip Ediliyor" butonu bulunamadı, sayfa kaydırılıyor...');
            
            // Sayfayı aşağı kaydır
            window.scrollBy(0, 1000);
            await sleep(1500);
            
            // Yeni butonları kontrol et
            const newButtons = document.querySelectorAll('[data-testid="unfollow"], [aria-label*="Following"], [aria-label*="Takip ediliyor"], button[aria-label*="Following"]');
            
            if (newButtons.length === 0) {
                console.log('✅ Tüm takip edilenler işlendi!');
                break;
            }
            continue;
        }
        
        console.log(`📋 ${followingButtons.length} takip ediliyor butonu bulundu`);
        
        // Her butona tıkla
        for (let i = 0; i < followingButtons.length; i++) {
            const button = followingButtons[i];
            
            try {
                // Butona tıkla
                button.click();
                await sleep(300);
                
                // Onay dialogu varsa onayla
                const confirmButton = document.querySelector('[data-testid="confirmationSheetConfirm"]') || 
                                    document.querySelector('button[data-testid="confirmationSheetConfirm"]') ||
                                    document.querySelector('[role="button"][data-testid="confirmationSheetConfirm"]');
                
                if (confirmButton) {
                    confirmButton.click();
                    unfollowCount++;
                    console.log(`✅ ${unfollowCount}. kişi takipten çıkarıldı`);
                } else {
                    // Direkt takipten çıktıysa
                    unfollowCount++;
                    console.log(`✅ ${unfollowCount}. kişi takipten çıkarıldı`);
                }
                
                totalProcessed++;
                
                // Hızlı bekleme (200-500ms arası rastgele)
                const delay = Math.random() * 300 + 200;
                await sleep(delay);
                
            } catch (error) {
                console.warn('⚠️ Hata:', error);
                continue;
            }
        }
        
        // Bir grup işledikten sonra kısa bekle
        console.log('⏳ Yeni butonlar yükleniyor...');
        await sleep(1000);
    }
    
    console.log(`🎉 İşlem tamamlandı! Toplam ${unfollowCount} kişi takipten çıkarıldı.`);
    
    // İstatistikleri göster
    showStats(unfollowCount, totalProcessed);
}

// Bekleme fonksiyonu
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// İstatistik gösterici
function showStats(unfollowed, processed) {
    const stats = `
╔══════════════════════════════════╗
║           İŞLEM RAPORU           ║
╠══════════════════════════════════╣
║ Başarıyla takipten çıkarılan: ${unfollowed.toString().padStart(3)} ║
║ Toplam işlenen buton: ${processed.toString().padStart(8)} ║
║ İşlem durumu: TAMAMLANDI ✅      ║
╚══════════════════════════════════╝
    `;
    console.log(stats);
}

// Hızlı başlatma fonksiyonu
function quickStart() {
    console.log(`
🔥 TWITTER TAKİP TEMİZLEYİCİ
═══════════════════════════════

📋 Nasıl kullanılır:
1. Twitter'da "Takip Edilenler" sayfasına git
2. Bu kodu console'a yapıştır
3. unfollowAll() yazıp Enter'a bas

⚠️  ÖNEMLİ UYARILAR:
• İşlem geri alınamaz!
• Twitter rate limitine takılırsan biraz bekle
• Sayfayı kapatma, işlem durur

Başlatmak için: unfollowAll()
    `);
}

// Otomatik çalıştır
quickStart();

// Manuel başlatma için
console.log('📝 Başlatmak için: unfollowAll()');