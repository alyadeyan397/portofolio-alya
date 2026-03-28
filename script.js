document.addEventListener('DOMContentLoaded', () => {
    
    const btnExport = document.getElementById('btn-export');
    const exportArea = document.getElementById('portfolio-wrapper');

    btnExport.addEventListener('click', () => {
        
        // Peringatan Keamanan CORS (Agar gambar tidak hilang/Tainted Canvas)
        if (window.location.protocol === 'file:') {
            alert("PERINGATAN: Untuk mencetak gambar ke dalam PDF, Anda wajib membuka file ini melalui Local/Live Server, bukan file:///. PDF akan tetap dibuat, namun gambar mungkin tidak muncul.");
        }

        // Animasi Loading
        const originalText = btnExport.innerHTML;
        btnExport.innerHTML = '<i class="ph ph-spinner-gap ph-spin"></i> Merender Landscape...';
        btnExport.style.opacity = '0.7';
        btnExport.style.pointerEvents = 'none';

        // Konfigurasi Kritis PDF (Landscape & CSS Page Break)
        const opt = {
            margin:       [0, 0, 0, 0], // Margin 0 karena web sudah punya padding bawaan
            filename:     'Portofolio_Web_Alya_Rizqita.pdf',
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { 
                scale: 2,           // Resolusi tinggi
                useCORS: true,      // Mengizinkan render gambar
                scrollY: 0,
                letterRendering: true
            },
            jsPDF:        { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'landscape' // <--- KUNCI UTAMA (Mencegah potong lebar)
            },
            // Menginstruksikan library untuk membaca class .pdf-page-break
            pagebreak: { mode: ['css', 'legacy'] } 
        };

        // Eksekusi Generate PDF
        html2pdf().set(opt).from(exportArea).save().then(() => {
            // Kembalikan tombol seperti semula
            btnExport.innerHTML = originalText;
            btnExport.style.opacity = '1';
            btnExport.style.pointerEvents = 'auto';
        }).catch(err => {
            console.error('Terjadi kesalahan render:', err);
            btnExport.innerHTML = originalText;
            btnExport.style.opacity = '1';
            btnExport.style.pointerEvents = 'auto';
            alert("Gagal merender PDF. Pastikan menggunakan Live Server.");
        });
    });
});