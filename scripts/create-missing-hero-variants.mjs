/**
 * ================================
 * سكريبت إنشاء النسخ المفقودة من صور Hero
 * ================================
 * 
 * ينسخ hero-2.webp و hero-3.avif لإنشاء جميع النسخ المطلوبة
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = './public/assets/images/backgroundImage';

async function createMissingHeroVariants() {
  console.log('🖼️ إنشاء النسخ المفقودة من صور Hero...\n');
  
  // Hero 2 - لدينا فقط .webp نحتاج إنشاء avif + responsive
  const hero2Webp = path.join(IMAGES_DIR, 'hero-2.webp');
  if (fs.existsSync(hero2Webp)) {
    console.log('📸 معالجة hero-2...');
    
    // AVIF versions
    await sharp(hero2Webp)
      .resize(1920, 1080, { fit: 'cover' })
      .avif({ quality: 50, effort: 9 })
      .toFile(path.join(IMAGES_DIR, 'hero-2.avif'));
    console.log('✅ أنشئ: hero-2.avif');
    
    await sharp(hero2Webp)
      .resize(1024, 576, { fit: 'cover' })
      .avif({ quality: 45, effort: 9 })
      .toFile(path.join(IMAGES_DIR, 'hero-2-tablet.avif'));
    console.log('✅ أنشئ: hero-2-tablet.avif');
    
    await sharp(hero2Webp)
      .resize(640, 360, { fit: 'cover' })
      .avif({ quality: 40, effort: 9 })
      .toFile(path.join(IMAGES_DIR, 'hero-2-mobile.avif'));
    console.log('✅ أنشئ: hero-2-mobile.avif');
    
    // WebP responsive
    await sharp(hero2Webp)
      .resize(1024, 576, { fit: 'cover' })
      .webp({ quality: 65, effort: 6 })
      .toFile(path.join(IMAGES_DIR, 'hero-2-tablet.webp'));
    console.log('✅ أنشئ: hero-2-tablet.webp');
    
    await sharp(hero2Webp)
      .resize(640, 360, { fit: 'cover' })
      .webp({ quality: 60, effort: 6 })
      .toFile(path.join(IMAGES_DIR, 'hero-2-mobile.webp'));
    console.log('✅ أنشئ: hero-2-mobile.webp');
  }
  
  // Hero 3 - لدينا فقط .avif نحتاج إنشاء webp + responsive
  const hero3Avif = path.join(IMAGES_DIR, 'hero-3.avif');
  if (fs.existsSync(hero3Avif)) {
    console.log('\n📸 معالجة hero-3...');
    
    // WebP versions
    await sharp(hero3Avif)
      .resize(1920, 1080, { fit: 'cover' })
      .webp({ quality: 70, effort: 6 })
      .toFile(path.join(IMAGES_DIR, 'hero-3.webp'));
    console.log('✅ أنشئ: hero-3.webp');
    
    await sharp(hero3Avif)
      .resize(1024, 576, { fit: 'cover' })
      .webp({ quality: 65, effort: 6 })
      .toFile(path.join(IMAGES_DIR, 'hero-3-tablet.webp'));
    console.log('✅ أنشئ: hero-3-tablet.webp');
    
    await sharp(hero3Avif)
      .resize(640, 360, { fit: 'cover' })
      .webp({ quality: 60, effort: 6 })
      .toFile(path.join(IMAGES_DIR, 'hero-3-mobile.webp'));
    console.log('✅ أنشئ: hero-3-mobile.webp');
    
    // AVIF responsive
    await sharp(hero3Avif)
      .resize(1024, 576, { fit: 'cover' })
      .avif({ quality: 45, effort: 9 })
      .toFile(path.join(IMAGES_DIR, 'hero-3-tablet.avif'));
    console.log('✅ أنشئ: hero-3-tablet.avif');
    
    await sharp(hero3Avif)
      .resize(640, 360, { fit: 'cover' })
      .avif({ quality: 40, effort: 9 })
      .toFile(path.join(IMAGES_DIR, 'hero-3-mobile.avif'));
    console.log('✅ أنشئ: hero-3-mobile.avif');
  }
  
  console.log('\n✨ تم الانتهاء من إنشاء جميع النسخ!');
}

// تشغيل السكريبت
createMissingHeroVariants().catch(console.error);
