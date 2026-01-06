import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Zap, 
  MapPin, 
  Cpu, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle,
  ShieldAlert
} from 'lucide-react';

export default function LightningRiskCalculator() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    buildingType: '',
    height: '',
    area: '',
    location: '',
    electronics: '',
    flammable: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateRisk = (e) => {
    e.preventDefault();

    // IEC 62305 inspired risk calculation
    let riskScore = 0;

    // Building type factor (0-25 points)
    const buildingTypes = {
      residential: 5,
      commercial: 10,
      industrial: 15,
      medical: 25,
      educational: 12
    };
    riskScore += buildingTypes[formData.buildingType] || 0;

    // Height factor (0-25 points)
    const height = parseFloat(formData.height);
    if (height > 50) riskScore += 25;
    else if (height > 30) riskScore += 20;
    else if (height > 20) riskScore += 15;
    else if (height > 10) riskScore += 10;
    else riskScore += 5;

    // Area factor (0-15 points)
    const area = parseFloat(formData.area);
    if (area > 5000) riskScore += 15;
    else if (area > 2000) riskScore += 12;
    else if (area > 1000) riskScore += 8;
    else if (area > 500) riskScore += 5;
    else riskScore += 3;

    // Location factor (0-20 points)
    const locations = {
      open: 20,
      urban: 10,
      mountain: 15
    };
    riskScore += locations[formData.location] || 0;

    // Electronics factor (0-10 points)
    if (formData.electronics === 'yes') riskScore += 10;

    // Flammable materials factor (0-15 points)
    if (formData.flammable === 'yes') riskScore += 15;

    // Determine risk level
    let level = '';
    let color = '';
    if (riskScore >= 70) {
      level = 'critical';
      color = 'red';
    } else if (riskScore >= 50) {
      level = 'high';
      color = 'orange';
    } else if (riskScore >= 30) {
      level = 'medium';
      color = 'yellow';
    } else {
      level = 'low';
      color = 'green';
    }

    setResult({
      score: riskScore,
      level,
      color
    });
  };

  const getRiskIcon = (level) => {
    if (level === 'critical') return ShieldAlert;
    if (level === 'high') return AlertTriangle;
    if (level === 'medium') return AlertCircle;
    return CheckCircle2;
  };

  const getRiskColor = (color) => {
    const colors = {
      red: 'bg-red-500',
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500',
      green: 'bg-green-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {t('tools.riskCalculator.title')}
            </h2>
            <p className="text-white/80 text-sm">
              {t('tools.riskCalculator.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={calculateRisk} className="p-6 space-y-6">
        {/* Building Type */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
            <Building2 className="w-5 h-5 text-accent" />
            {t('tools.riskCalculator.buildingType')}
          </label>
          <select
            name="buildingType"
            value={formData.buildingType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          >
            <option value="">{t('tools.riskCalculator.select')}</option>
            <option value="residential">{t('tools.riskCalculator.types.residential')}</option>
            <option value="commercial">{t('tools.riskCalculator.types.commercial')}</option>
            <option value="industrial">{t('tools.riskCalculator.types.industrial')}</option>
            <option value="medical">{t('tools.riskCalculator.types.medical')}</option>
            <option value="educational">{t('tools.riskCalculator.types.educational')}</option>
          </select>
        </div>

        {/* Height and Area */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Building2 className="w-5 h-5 text-accent" />
              {t('tools.riskCalculator.height')}
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              required
              min="1"
              step="0.1"
              placeholder="15"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Building2 className="w-5 h-5 text-accent" />
              {t('tools.riskCalculator.area')}
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              min="1"
              step="1"
              placeholder="500"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
            <MapPin className="w-5 h-5 text-accent" />
            {t('tools.riskCalculator.location')}
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          >
            <option value="">{t('tools.riskCalculator.select')}</option>
            <option value="open">{t('tools.riskCalculator.locations.open')}</option>
            <option value="urban">{t('tools.riskCalculator.locations.urban')}</option>
            <option value="mountain">{t('tools.riskCalculator.locations.mountain')}</option>
          </select>
        </div>

        {/* Electronics and Flammable */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Cpu className="w-5 h-5 text-accent" />
              {t('tools.riskCalculator.electronics')}
            </label>
            <select
              name="electronics"
              value={formData.electronics}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="">{t('tools.riskCalculator.select')}</option>
              <option value="yes">{t('tools.riskCalculator.yes')}</option>
              <option value="no">{t('tools.riskCalculator.no')}</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Flame className="w-5 h-5 text-accent" />
              {t('tools.riskCalculator.flammable')}
            </label>
            <select
              name="flammable"
              value={formData.flammable}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="">{t('tools.riskCalculator.select')}</option>
              <option value="yes">{t('tools.riskCalculator.yes')}</option>
              <option value="no">{t('tools.riskCalculator.no')}</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-primary py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          {t('tools.riskCalculator.calculate')}
        </button>
      </form>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 bg-gray-50 border-t border-gray-200"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('tools.riskCalculator.results.title')}
            </h3>
            <div className="flex items-center justify-center gap-3 mb-4">
              {React.createElement(getRiskIcon(result.level), {
                className: `w-16 h-16 ${result.color === 'green' ? 'text-green-500' : result.color === 'yellow' ? 'text-yellow-500' : result.color === 'orange' ? 'text-orange-500' : 'text-red-500'}`
              })}
            </div>
            <div className={`inline-block px-6 py-3 rounded-full ${getRiskColor(result.color)} text-white font-bold text-lg`}>
              {t(`tools.riskCalculator.levels.${result.level}`)}
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-gray-900">{result.score}</div>
              <div className="text-sm text-gray-600">{t('tools.riskCalculator.results.score')}</div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              {t('tools.riskCalculator.recommendations.title')}
            </h4>
            <ul className="space-y-2">
              {result.level === 'critical' && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.critical.0')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.critical.1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.critical.2')}</span>
                  </li>
                </>
              )}
              {result.level === 'high' && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.high.0')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.high.1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.high.2')}</span>
                  </li>
                </>
              )}
              {result.level === 'medium' && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.medium.0')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.medium.1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.medium.2')}</span>
                  </li>
                </>
              )}
              {result.level === 'low' && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.low.0')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.riskCalculator.recommendations.low.1')}</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
