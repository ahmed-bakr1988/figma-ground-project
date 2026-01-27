/**
 * ================================
 * سكريبت تحسين الصور - Image Optimization Script (محدّث)
 * ================================
 * 
 * يقوم بـ:
 * 1. حذف النسخ القديمة المضغوطة أولاً (منع التكرار)
 * 2. تحويل الصور إلى AVIF + WebP
 * 3. إنشاء نسخ بأحجام مختلفة (responsive)
 * 
 * ⚠️ تحذير: سيحذف الملفات القديمة تلقائياً!
 * 
 * متطلبات:
 * npm install sharp glob
 * 
 * التشغيل:
 * node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

const INPUT_DIR = './public/assets/images';
const OUTPUT_DIR = './public/assets/images';

// Sizes for responsive images
const SIZES = {
  thumbnail: 150,
  small: 320,
  medium: 640,
  large: 1024,
  xlarge: 1920,
};

// Hero image specific sizes
const HERO_SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1920,
};

/**
 * حذف النسخ القديمة المضغوطة
 */
function deleteOldCompressedVersions(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dirName = path.dirname(inputPath);
  
  // قائمة بأنماط الملفات القديمة المحتمل تواجدها
  const patternsToDelete = [
    `${baseName}-compressed${ext}`,
    `${baseName}-compressed.webp`,
    `${baseName}-compressed.avif`,
    `${baseName}-compressed-compressed${ext}`,
    `${baseName}-compressed-compressed.webp`,
    `${baseName}-compressed-compressed.avif`,
    `${baseName}-compressed-mobile.webp`,
    `${baseName}-compressed-mobile.avif`,
    `${baseName}-compressed-tablet.webp`,
    `${baseName}-compressed-tablet.avif`,
  ];
  
  let deletedCount = 0;
  patternsToDelete.forEach(pattern => {
    const filePath = path.join(dirName, pattern);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      deletedCount++;
      console.log(`  🗑️  حذف ملف قديم: ${pattern}`);
    }
  });
  
  return deletedCount;
}

async function optimizeImage(inputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dirName = path.dirname(inputPath);
  
  // Skip if already WebP or AVIF
  if (ext === '.webp' || ext === '.avif') {
    console.log(`⏭️  تخطي (بالفعل محسّن): ${inputPath}`);
    return;
  }
  
  // Skip SVG files
  if (ext === '.svg') {
    console.log(`⏭️  تخطي (SVG): ${inputPath}`);
    return;
  }
  
  console.log(`\n📸 معالجة: ${path.basename(inputPath)}`);
  
  // ⚠️ حذف النسخ القديمة أولاً
  const deletedCount = deleteOldCompressedVersions(inputPath);
  if (deletedCount > 0) {
    console.log(`  ✅ تم حذف ${deletedCount} ملف قديم`);
  }
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Generate AVIF version (best compression)
    const avifOutput = path.join(dirName, `${baseName}.avif`);
    if (!fs.existsSync(avifOutput)) {
      await image
        .avif({ quality: 50, effort: 9 })
        .toFile(avifOutput);
      const avifSize = (fs.statSync(avifOutput).size / 1024).toFixed(2);
      console.log(`  ✅ AVIF: ${baseName}.avif (${avifSize} KB)`);
    }
    
    // Generate WebP version (fallback)
    const webpOutput = path.join(dirName, `${baseName}.webp`);
    if (!fs.existsSync(webpOutput)) {
      await image
        .webp({ quality: 80, effort: 6 })
        .toFile(webpOutput);
      const webpSize = (fs.statSync(webpOutput).size / 1024).toFixed(2);
      console.log(`  ✅ WebP: ${baseName}.webp (${webpSize} KB)`);
    }
    
    // For hero/background images, create optimized versions with AVIF + responsive sizes
    if (inputPath.includes('backgroundImage') || inputPath.includes('hero')) {
      const heroName = baseName.replace(/backgroundImage\d+/, 'hero-optimized');
      
      console.log(`  🎨 إنشاء نسخ responsive...`);
      
      // ⚡ AVIF - Best compression for modern browsers (target < 30KB for desktop)
      // Desktop AVIF (1920px)
      const avifDesktop = path.join(dirName, `${heroName}.avif`);
      if (!fs.existsSync(avifDesktop)) {
        await sharp(inputPath)
          .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
          .avif({ quality: 50, effort: 9 })
          .toFile(avifDesktop);
        const size = (fs.statSync(avifDesktop).size / 1024).toFixed(2);
        console.log(`  ✅ AVIF desktop: ${heroName}.avif (${size} KB)`);
      }
      
      // Tablet AVIF (1024px)
      const avifTablet = path.join(dirName, `${heroName}-tablet.avif`);
      if (!fs.existsSync(avifTablet)) {
        await sharp(inputPath)
          .resize(1024, 576, { fit: 'cover', withoutEnlargement: true })
          .avif({ quality: 45, effort: 9 })
          .toFile(avifTablet);
        const size = (fs.statSync(avifTablet).size / 1024).toFixed(2);
        console.log(`  ✅ AVIF tablet: ${heroName}-tablet.avif (${size} KB)`);
      }
      
      // Mobile AVIF (640px) - Target < 15KB
      const avifMobile = path.join(dirName, `${heroName}-mobile.avif`);
      if (!fs.existsSync(avifMobile)) {
        await sharp(inputPath)
          .resize(640, 360, { fit: 'cover', withoutEnlargement: true })
          .avif({ quality: 40, effort: 9 })
          .toFile(avifMobile);
        const size = (fs.statSync(avifMobile).size / 1024).toFixed(2);
        console.log(`  ✅ AVIF mobile: ${heroName}-mobile.avif (${size} KB)`);
      }
      
      // ⚡ WebP - Fallback for browsers without AVIF
      // Desktop WebP (1920px)
      const webpDesktop = path.join(dirName, `${heroName}.webp`);
      if (!fs.existsSync(webpDesktop)) {
        await sharp(inputPath)
          .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
          .webp({ quality: 70, effort: 6 })
          .toFile(webpDesktop);
        const size = (fs.statSync(webpDesktop).size / 1024).toFixed(2);
        console.log(`  ✅ WebP desktop: ${heroName}.webp (${size} KB)`);
      }
      
      // Tablet WebP (1024px)
      const webpTablet = path.join(dirName, `${heroName}-tablet.webp`);
      if (!fs.existsSync(webpTablet)) {
        await sharp(inputPath)
          .resize(1024, 576, { fit: 'cover', withoutEnlargement: true })
          .webp({ quality: 65, effort: 6 })
          .toFile(webpTablet);
        const size = (fs.statSync(webpTablet).size / 1024).toFixed(2);
        console.log(`  ✅ WebP tablet: ${heroName}-tablet.webp (${size} KB)`);
      }
      
      // Mobile WebP (640px)
      const webpMobile = path.join(dirName, `${heroName}-mobile.webp`);
      if (!fs.existsSync(webpMobile)) {
        await sharp(inputPath)
          .resize(640, 360, { fit: 'cover', withoutEnlargement: true })
          .webp({ quality: 60, effort: 6 })
          .toFile(webpMobile);
        const size = (fs.statSync(webpMobile).size / 1024).toFixed(2);
        console.log(`  ✅ WebP mobile: ${heroName}-mobile.webp (${size} KB)`);
      }
      
      console.log(`  📊 الهدف: Mobile <15KB, Tablet <25KB, Desktop <35KB`);
    }
    
    // Get original file size
    const originalSize = fs.statSync(inputPath).size;
    console.log(`  📊 الحجم الأصلي: ${(originalSize / 1024).toFixed(1)} KB`);
    
  } catch (error) {
    console.error(`  ❌ خطأ في معالجة ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  بدء تحسين الصور...\n');
  console.log('⚠️  تحذير: سيتم حذف النسخ القديمة المضغوطة تلقائياً\n');
  
  // Find all images (exclude already optimized webp/avif)
  const patterns = [
    `${INPUT_DIR}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}`,
  ];
  
  let totalProcessed = 0;
  let totalSkipped = 0;
  
  for (const pattern of patterns) {
    const files = await glob(pattern);
    console.log(`🔍 وُجد ${files.length} صورة بصيغة ${pattern.split('.').pop()}\n`);
    
    for (const file of files) {
      // Skip -compressed files (old artifacts)
      if (file.includes('-compressed')) {
        totalSkipped++;
        continue;
      }
      
      await optimizeImage(file);
      totalProcessed++;
      console.log('---');
    }
  }
  
  console.log('\n✨ اكتمل تحسين الصور!');
  console.log(`📊 الإحصائيات:`);
  console.log(`   - الصور المعالجة: ${totalProcessed}`);
  console.log(`   - الصور المتخطاة: ${totalSkipped}`);
  console.log('\n📝 الخطوات التالية:');
  console.log('1. راجع ملفات AVIF و WebP المُنشأة');
  console.log('2. تحديث مراجع الصور في المكونات لاستخدام AVIF مع WebP كـ fallback');
  console.log('3. يمكنك حذف الصور الأصلية (jpg, png) بعد التأكد من جودة النسخ المحسّنة');
  console.log('\n⚠️  ملاحظة: لن يتم تكرار الصور عند إعادة تشغيل هذا السكريبت');
}

main().catch(console.error);
