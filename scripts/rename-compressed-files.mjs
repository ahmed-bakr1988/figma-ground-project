/**
 * ================================
 * سكريبت إعادة تسمية الصور المضغوطة
 * ================================
 * 
 * يقوم بـ:
 * 1. إزالة -compressed من أسماء الملفات
 * 2. حذف الملفات غير المستخدمة
 */

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const IMAGES_DIR = './public/assets/images';

async function renameCompressedFiles() {
  console.log('📝 بدء إعادة تسمية الملفات المضغوطة...\n');
  
  let renamedCount = 0;
  let deletedCount = 0;
  
  // الملفات التي نحتاج إنشاؤها (غير موجودة)
  const missingFiles = [
    // Hero images بدون -compressed
    '/backgroundImage/hero-optimized.avif',
    '/backgroundImage/hero-optimized-mobile.avif',
    '/backgroundImage/hero-optimized-tablet.avif',
    '/backgroundImage/hero-2.avif',
    '/backgroundImage/hero-2-mobile.avif',
    '/backgroundImage/hero-2-tablet.avif',
    '/backgroundImage/hero-2-mobile.webp',
    '/backgroundImage/hero-2-tablet.webp',
    '/backgroundImage/hero-3-mobile.avif',
    '/backgroundImage/hero-3-tablet.avif',
    '/backgroundImage/hero-3.webp',
    '/backgroundImage/hero-3-mobile.webp',
    '/backgroundImage/hero-3-tablet.webp',
    
    // Other images
    '/backgroundImage/Image-17.avif',
    '/backgroundImage/Image-17-mobile.avif',
    '/backgroundImage/Image-17-tablet.avif',
    '/backgroundImage/Risk-Assessment-1.avif',
    '/backgroundImage/Risk-Assessment-1-mobile.avif',
    '/backgroundImage/Risk-Assessment-1-tablet.avif',
  ];
  
  // إعادة تسمية الملفات -compressed لإزالة -compressed
  for (const missingFile of missingFiles) {
    const fullPath = path.join(IMAGES_DIR, missingFile);
    const compressedPath = fullPath.replace(/\.(avif|webp)$/, '-compressed.$1');
    
    if (fs.existsSync(compressedPath) && !fs.existsSync(fullPath)) {
      fs.renameSync(compressedPath, fullPath);
      console.log(`✅ إعادة تسمية: ${path.basename(compressedPath)} → ${path.basename(fullPath)}`);
      renamedCount++;
    }
  }
  
  // حذف الملفات غير المستخدمة
  const unusedFiles = [
    '/backgroundImage/backgroundImage5-compressed.jpeg',
    '/backgroundImage/backgroundImage5-compressed.webp',
    '/backgroundImage/backgroundImage6.png',
  ];
  
  for (const unusedFile of unusedFiles) {
    const fullPath = path.join(IMAGES_DIR, unusedFile);
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      fs.unlinkSync(fullPath);
      console.log(`❌ حذف ملف غير مستخدم: ${path.basename(fullPath)} (${sizeKB} KB)`);
      deletedCount++;
    }
  }
  
  console.log(`\n✨ انتهت العملية!`);
  console.log(`📊 الإحصائيات:`);
  console.log(`   - الملفات المعاد تسميتها: ${renamedCount}`);
  console.log(`   - الملفات المحذوفة: ${deletedCount}`);
}

// تشغيل السكريبت
renameCompressedFiles().catch(console.error);
