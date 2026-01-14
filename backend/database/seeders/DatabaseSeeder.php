<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Faq;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * ================================
 * Seeder رئيسي
 * ================================
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء مستخدم مدير
        User::create([
            'name' => 'مدير النظام',
            'email' => 'admin@groundprotection.sa',
            'password' => Hash::make('Admin@123'),
            'phone' => '+966500000000',
            'role' => 'admin',
            'preferred_language' => 'ar',
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        // إنشاء مستخدم موظف
        User::create([
            'name' => 'موظف الدعم',
            'email' => 'staff@groundprotection.sa',
            'password' => Hash::make('Staff@123'),
            'phone' => '+966500000001',
            'role' => 'staff',
            'preferred_language' => 'ar',
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        // إنشاء الخدمات
        $this->createServices();

        // إنشاء الأسئلة الشائعة
        $this->createFaqs();

        // إنشاء مستخدمين للاختبار
        User::factory(10)->create();
    }

    /**
     * إنشاء الخدمات الأساسية
     */
    private function createServices(): void
    {
        $services = [
            [
                'title_ar' => 'أنظمة الحماية من الصواعق',
                'title_en' => 'Lightning Protection Systems',
                'description_ar' => 'نقدم حلول متكاملة لحماية المباني والمنشآت من الصواعق وفق أحدث المعايير العالمية. تشمل خدماتنا التصميم والتركيب والصيانة.',
                'description_en' => 'We provide integrated solutions to protect buildings and facilities from lightning according to the latest international standards. Our services include design, installation, and maintenance.',
                'icon' => 'zap',
                'slug' => 'lightning-protection-systems',
                'starting_price' => 15000,
                'is_featured' => true,
            ],
            [
                'title_ar' => 'أنظمة التأريض',
                'title_en' => 'Grounding Systems',
                'description_ar' => 'تصميم وتنفيذ أنظمة تأريض احترافية تضمن سلامة المعدات والأفراد. نستخدم أفضل المواد وأحدث التقنيات.',
                'description_en' => 'Design and implementation of professional grounding systems that ensure the safety of equipment and personnel. We use the best materials and latest technologies.',
                'icon' => 'shield',
                'slug' => 'grounding-systems',
                'starting_price' => 8000,
                'is_featured' => true,
            ],
            [
                'title_ar' => 'حماية الطفرات الكهربائية',
                'title_en' => 'Surge Protection',
                'description_ar' => 'حماية متكاملة ضد الطفرات الكهربائية للأجهزة الحساسة والمعدات الإلكترونية.',
                'description_en' => 'Complete protection against power surges for sensitive devices and electronic equipment.',
                'icon' => 'activity',
                'slug' => 'surge-protection',
                'starting_price' => 5000,
                'is_featured' => true,
            ],
            [
                'title_ar' => 'الفحص والصيانة',
                'title_en' => 'Inspection & Maintenance',
                'description_ar' => 'خدمات فحص دورية وصيانة وقائية لضمان عمل أنظمة الحماية بكفاءة عالية.',
                'description_en' => 'Periodic inspection and preventive maintenance services to ensure protection systems work efficiently.',
                'icon' => 'check-circle',
                'slug' => 'inspection-maintenance',
                'starting_price' => 3000,
                'is_featured' => false,
            ],
            [
                'title_ar' => 'الاستشارات الفنية',
                'title_en' => 'Technical Consulting',
                'description_ar' => 'استشارات متخصصة في مجال حماية المباني من الصواعق وأنظمة التأريض.',
                'description_en' => 'Specialized consulting in building lightning protection and grounding systems.',
                'icon' => 'users',
                'slug' => 'technical-consulting',
                'starting_price' => 2000,
                'is_featured' => false,
            ],
        ];

        foreach ($services as $index => $service) {
            Service::create(array_merge($service, [
                'short_description_ar' => Str::limit($service['description_ar'], 100),
                'short_description_en' => Str::limit($service['description_en'], 100),
                'features_ar' => ['جودة عالية', 'ضمان شامل', 'دعم فني', 'أسعار منافسة'],
                'features_en' => ['High quality', 'Comprehensive warranty', 'Technical support', 'Competitive prices'],
                'price_unit' => 'SAR',
                'sort_order' => $index,
                'is_active' => true,
                'meta_title_ar' => $service['title_ar'] . ' | Ground Protection',
                'meta_title_en' => $service['title_en'] . ' | Ground Protection',
                'meta_description_ar' => $service['description_ar'],
                'meta_description_en' => $service['description_en'],
            ]));
        }
    }

    /**
     * إنشاء الأسئلة الشائعة
     */
    private function createFaqs(): void
    {
        $faqs = [
            [
                'question_ar' => 'ما هي أهمية أنظمة الحماية من الصواعق؟',
                'question_en' => 'What is the importance of lightning protection systems?',
                'answer_ar' => 'أنظمة الحماية من الصواعق ضرورية لحماية المباني والمنشآت والأفراد من الأضرار الناتجة عن ضربات الصواعق. يمكن أن تتسبب الصواعق في حرائق وتلف المعدات الإلكترونية وحتى إصابات بشرية.',
                'answer_en' => 'Lightning protection systems are essential to protect buildings, facilities, and people from damage caused by lightning strikes. Lightning can cause fires, damage to electronic equipment, and even human injuries.',
                'category_ar' => 'عام',
                'category_en' => 'General',
            ],
            [
                'question_ar' => 'كم يستغرق تركيب نظام الحماية؟',
                'question_en' => 'How long does it take to install a protection system?',
                'answer_ar' => 'يعتمد وقت التركيب على حجم المشروع ونوع النظام. عادة ما يستغرق التركيب من 3 إلى 14 يوماً للمباني المتوسطة، وقد يمتد لفترة أطول للمشاريع الكبيرة.',
                'answer_en' => 'Installation time depends on the project size and system type. Installation usually takes 3 to 14 days for medium buildings, and may take longer for large projects.',
                'category_ar' => 'التركيب',
                'category_en' => 'Installation',
            ],
            [
                'question_ar' => 'هل تقدمون خدمات الصيانة الدورية؟',
                'question_en' => 'Do you offer periodic maintenance services?',
                'answer_ar' => 'نعم، نقدم برامج صيانة دورية شاملة تتضمن الفحص والاختبار والصيانة الوقائية لضمان عمل الأنظمة بكفاءة عالية طوال الوقت.',
                'answer_en' => 'Yes, we offer comprehensive periodic maintenance programs that include inspection, testing, and preventive maintenance to ensure systems work efficiently at all times.',
                'category_ar' => 'الصيانة',
                'category_en' => 'Maintenance',
            ],
            [
                'question_ar' => 'ما هي مدة الضمان على الأنظمة؟',
                'question_en' => 'What is the warranty period for the systems?',
                'answer_ar' => 'نقدم ضماناً شاملاً لمدة 5 سنوات على جميع أنظمتنا، يشمل قطع الغيار والعمالة. كما نوفر خيارات تمديد الضمان.',
                'answer_en' => 'We provide a comprehensive 5-year warranty on all our systems, including parts and labor. We also offer warranty extension options.',
                'category_ar' => 'الضمان',
                'category_en' => 'Warranty',
            ],
            [
                'question_ar' => 'كيف يمكنني الحصول على عرض سعر؟',
                'question_en' => 'How can I get a quote?',
                'answer_ar' => 'يمكنك طلب عرض سعر من خلال تعبئة نموذج طلب عرض السعر على موقعنا، أو التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني. سيقوم فريقنا بزيارتكم لتقييم الموقع وتقديم عرض سعر مفصل.',
                'answer_en' => 'You can request a quote by filling out the quote request form on our website, or by contacting us directly via phone or email. Our team will visit you to assess the site and provide a detailed quote.',
                'category_ar' => 'الأسعار',
                'category_en' => 'Pricing',
            ],
        ];

        foreach ($faqs as $index => $faq) {
            Faq::create(array_merge($faq, [
                'sort_order' => $index,
                'is_active' => true,
                'is_featured' => $index < 3,
            ]));
        }
    }
}
