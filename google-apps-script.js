/**
 * ============================================
 * Google Apps Script — Ground Protection
 * ============================================
 * 
 * هذا الكود يُنسخ ويُلصق في Google Apps Script
 * لاستقبال رسائل التواصل من الموقع وحفظها في Google Sheets
 * 
 * خطوات الإعداد:
 * 1. اذهب إلى https://sheets.google.com وأنشئ ملفاً جديداً
 * 2. سمّه: "Ground Protection - Contact Messages"
 * 3. أضف هذه العناوين في الصف الأول:
 *    Timestamp | Name | Email | Phone | Subject | Message | Source | Language
 * 4. من القائمة: Extensions → Apps Script
 * 5. احذف أي كود موجود والصق هذا الكود بالكامل
 * 6. اضغط Deploy → New Deployment
 * 7. اختر Type: Web app
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. اضغط Deploy وانسخ الـ URL
 * 11. ضع الـ URL في ملف .env:
 *     VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // إضافة صف جديد بالبيانات
    sheet.appendRow([
      new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' }),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.subject || '',
      data.message || '',
      data.source_page || 'website',
      data.preferred_language || 'ar'
    ]);
    
    // إرسال إشعار بريد إلكتروني
    if (data.email && data.source_page !== 'newsletter') {
      MailApp.sendEmail({
        to: 'ahmedkory23@gmail.com',
        subject: '📩 رسالة جديدة من موقع Ground Protection: ' + (data.subject || 'بدون عنوان'),
        htmlBody: 
          '<div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
          '<div style="background: #0E3A5D; color: white; padding: 20px; border-radius: 10px 10px 0 0;">' +
          '<h2 style="margin: 0;">📩 رسالة جديدة من الموقع</h2>' +
          '<p style="margin: 5px 0 0; opacity: 0.8;">Ground Protection - نظام الحماية</p>' +
          '</div>' +
          '<div style="background: #f9f9f9; padding: 20px; border: 1px solid #ddd;">' +
          '<table style="border-collapse: collapse; width: 100%;">' +
          '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f0f0f0; width: 120px;"><strong>الاسم</strong></td><td style="padding: 12px; border: 1px solid #ddd;">' + (data.name || '-') + '</td></tr>' +
          '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f0f0f0;"><strong>البريد</strong></td><td style="padding: 12px; border: 1px solid #ddd;"><a href="mailto:' + data.email + '">' + data.email + '</a></td></tr>' +
          '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f0f0f0;"><strong>الهاتف</strong></td><td style="padding: 12px; border: 1px solid #ddd;">' + (data.phone || '-') + '</td></tr>' +
          '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f0f0f0;"><strong>الموضوع</strong></td><td style="padding: 12px; border: 1px solid #ddd;">' + (data.subject || '-') + '</td></tr>' +
          '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f0f0f0;"><strong>الرسالة</strong></td><td style="padding: 12px; border: 1px solid #ddd; white-space: pre-wrap;">' + (data.message || '-') + '</td></tr>' +
          '<tr><td style="padding: 12px; border: 1px solid #ddd; background: #f0f0f0;"><strong>المصدر</strong></td><td style="padding: 12px; border: 1px solid #ddd;">' + (data.source_page || '-') + '</td></tr>' +
          '</table>' +
          '</div>' +
          '<div style="background: #0E3A5D; color: white; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px;">' +
          'تم الإرسال تلقائياً من موقع Ground Protection' +
          '</div>' +
          '</div>'
      });
    }
    
    // إشعار اشتراك النشرة البريدية
    if (data.source_page === 'newsletter') {
      MailApp.sendEmail({
        to: 'ahmedkory23@gmail.com',
        subject: '📬 اشتراك جديد في النشرة البريدية - Ground Protection',
        htmlBody: 
          '<div dir="rtl" style="font-family: Arial, sans-serif;">' +
          '<h3>📬 اشتراك جديد في النشرة البريدية</h3>' +
          '<p><strong>البريد:</strong> ' + data.email + '</p>' +
          '<p><strong>التاريخ:</strong> ' + new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' }) + '</p>' +
          '</div>'
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'حدث خطأ: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// للسماح بطلبات GET (اختبار الاتصال)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'active', 
      message: 'Ground Protection Contact API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
