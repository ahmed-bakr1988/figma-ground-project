/**
 * ================================
 * سكريبت حذف الصور المكررة
 * ================================
 * 
 * يقوم بـ:
 * 1. حذف الصور المضغوطة المكررة (مثل -compressed-compressed)
 * 2. الإبقاء فقط على النسخ المطلوبة (webp, avif, mobile, tablet, desktop)
 * 3. حذف الصور الأصلية (jpg, png, jpeg) بعد إنشاء webp
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const IMAGES_DIR = './public/assets/images';

// الصور المستخدمة فعلياً في المشروع (من HeroSection)
const REQUIRED_HERO_IMAGES = [
  // Hero 1 - optimized
  'hero-optimized.avif',
  'hero-optimized-mobile.avif',
  'hero-optimized-tablet.avif',
  'hero-optimized.webp',
  'hero-optimized-mobile.webp',
  'hero-optimized-tablet.webp',
  
  // Hero 2
  'hero-2.avif',
  'hero-2-mobile.avif',
  'hero-2-tablet.avif',
  'hero-2.webp',
  'hero-2-mobile.webp',
  'hero-2-tablet.webp',
  
  // Hero 3
  'hero-3.avif',
  'hero-3-mobile.avif',
  'hero-3-tablet.avif',
  'hero-3.webp',
  'hero-3-mobile.webp',
  'hero-3-tablet.webp',
];

// الصور المستخدمة في الصفحات الأخرى
const REQUIRED_OTHER_IMAGES = [
  // Background images
  'Image-17.webp',
  'Image-17.avif',
  'Image-17-mobile.avif',
  'Image-17-tablet.avif',
  'backgroundImage6.webp',
  'backgroundImage6.png', // مستخدم في ProjectsPage
  
  // Risk Assessment
  'Risk-Assessment-1.webp',
  'Risk-Assessment-1.avif',
  
  // AboutUs
  'Image-1.webp',
  'Image-2.webp',
  'Image-4.webp',
  
  // Person/Team
  'oaner-Image-1.webp',
  'oaner-Image-2.webp',
  'oaner-Image-3.webp',
  'oaner-Image-4.webp',
  
  // Services
  'Lightning Protection Systems.png',
  'Lightning Protection Systems.webp',
  'Grounding &Earthing-Systems.png',
  'Grounding &Earthing-Systems.webp',
  'Surge-Protection-Devices-(SPD).jpg',
  'Surge-Protection-Devices-(SPD).webp',
  'lightning-Risk-Assessment.webp',
  'LightningProtection6-scaled.webp',
  'lightning.webp',
];

async function cleanDuplicateImages() {
  console.log('🧹 بدء حذف الصور المكررة...\n');
  
  let deletedCount = 0;
  let keptCount = 0;
  let totalSaved = 0; // بالكيلوبايت
  
  // البحث عن جميع الملفات
  const allFiles = await glob(`${IMAGES_DIR}/**/*.*`);
  
  for (const file of allFiles) {
    const fileName = path.basename(file);
    const dirName = path.dirname(file).split(path.sep).pop();
    
    let shouldDelete = false;
    let reason = '';
    
    // 1. حذف الملفات المضغوطة المكررة (-compressed-compressed)
    if (fileName.includes('-compressed-compressed')) {
      shouldDelete = true;
      reason = 'ملف مضغوط مكرر';
    }
    // 2. حذف -compressed.webp إذا كان يوجد .webp
    else if (fileName.includes('-compressed.webp')) {
      const normalVersion = file.replace('-compressed.webp', '.webp');
      if (fs.existsSync(normalVersion)) {
        shouldDelete = true;
        reason = 'يوجد نسخة WebP عادية';
      }
    }
    // 3. حذف -compressed.avif إذا كان يوجد .avif
    else if (fileName.includes('-compressed.avif')) {
      const normalVersion = file.replace('-compressed.avif', '.avif');
      if (fs.existsSync(normalVersion)) {
        shouldDelete = true;
        reason = 'يوجد نسخة AVIF عادية';
      }
    }
    // 4. حذف -compressed.jpg/png/jpeg إذا كان يوجد .webp
    else if (fileName.match(/-compressed\.(jpg|jpeg|png)$/)) {
      const baseName = fileName.replace(/-compressed\.(jpg|jpeg|png)$/, '');
      const webpVersion = path.join(path.dirname(file), baseName + '.webp');
      if (fs.existsSync(webpVersion)) {
        shouldDelete = true;
        reason = 'يوجد نسخة WebP';
      }
    }
    // 5. حذف الصور الأصلية (jpg, png, jpeg) إذا كان يوجد webp
    else if (fileName.match(/\.(jpg|jpeg|png)$/) && !fileName.includes('Lightning') && !fileName.includes('Grounding') && !fileName.includes('SPD') && !fileName.includes('backgroundImage6')) {
      const webpVersion = file.replace(/\.(jpg|jpeg|png)$/, '.webp');
      if (fs.existsSync(webpVersion)) {
        shouldDelete = true;
        reason = 'يوجد نسخة WebP (حذف الأصل)';
      }
    }
    
    if (shouldDelete) {
      try {
        const stats = fs.statSync(file);
        const sizeKB = (stats.size / 1024).toFixed(2);
        fs.unlinkSync(file);
        deletedCount++;
        totalSaved += parseFloat(sizeKB);
        console.log(`❌ حذف: ${fileName} (${sizeKB} KB) - ${reason}`);
      } catch (error) {
        console.error(`⚠️  فشل حذف ${fileName}:`, error.message);
      }
    } else {
      keptCount++;
    }
  }
  
  console.log(`\n✨ انتهى التنظيف!`);
  console.log(`📊 الإحصائيات:`);
  console.log(`   - الملفات المحذوفة: ${deletedCount}`);
  console.log(`   - الملفات المحفوظة: ${keptCount}`);
  console.log(`   - المساحة المحررة: ${(totalSaved / 1024).toFixed(2)} MB`);
}

// تشغيل السكريبت
cleanDuplicateImages().catch(console.error);
