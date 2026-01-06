import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowDown,
  Activity,
  Info
} from 'lucide-react';

export default function GroundingCalculator() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    soilResistivity: '',
    numberOfRods: '',
    rodLength: '',
    rodDiameter: '',
    soilType: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateGrounding = (e) => {
    e.preventDefault();

    // BS-7430 inspired grounding calculation
    const rho = parseFloat(formData.soilResistivity); // soil resistivity (Ω.m)
    const L = parseFloat(formData.rodLength); // rod length (m)
    const d = parseFloat(formData.rodDiameter) / 1000; // rod diameter (convert mm to m)
    const n = parseInt(formData.numberOfRods); // number of rods

    // Single rod resistance (Simplified formula)
    const singleRodResistance = (rho / (2 * Math.PI * L)) * Math.log((4 * L) / d);

    // Efficiency factor for multiple rods (simplified)
    let efficiency = 1;
    if (n === 2) efficiency = 0.6;
    else if (n === 3) efficiency = 0.5;
    else if (n === 4) efficiency = 0.45;
    else if (n >= 5) efficiency = 0.4;

    // Total resistance with multiple rods
    const totalResistance = (singleRodResistance * efficiency) / n;

    // Soil type correction factor
    const soilFactors = {
      sandy: 1.2,
      clay: 0.9,
      rocky: 1.5,
      mixed: 1.0
    };
    const correctedResistance = totalResistance * (soilFactors[formData.soilType] || 1.0);

    // Determine if acceptable (< 10 ohms is generally good, < 5 ohms is excellent)
    const isAcceptable = correctedResistance < 10;
    const isExcellent = correctedResistance < 5;

    setResult({
      resistance: correctedResistance.toFixed(2),
      singleRodResistance: singleRodResistance.toFixed(2),
      isAcceptable,
      isExcellent
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary-dark p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {t('tools.groundingCalculator.title')}
            </h2>
            <p className="text-white/80 text-sm">
              {t('tools.groundingCalculator.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={calculateGrounding} className="p-6 space-y-6">
        {/* Soil Resistivity */}
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
            <Activity className="w-5 h-5 text-accent" />
            {t('tools.groundingCalculator.soilResistivity')}
          </label>
          <input
            type="number"
            name="soilResistivity"
            value={formData.soilResistivity}
            onChange={handleChange}
            required
            min="1"
            step="0.1"
            placeholder="100"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">
            {t('tools.groundingCalculator.soilResistivityHint')}
          </p>
        </div>

        {/* Number of Rods and Rod Length */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <ArrowDown className="w-5 h-5 text-accent" />
              {t('tools.groundingCalculator.numberOfRods')}
            </label>
            <input
              type="number"
              name="numberOfRods"
              value={formData.numberOfRods}
              onChange={handleChange}
              required
              min="1"
              max="20"
              step="1"
              placeholder="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <ArrowDown className="w-5 h-5 text-accent" />
              {t('tools.groundingCalculator.rodLength')}
            </label>
            <input
              type="number"
              name="rodLength"
              value={formData.rodLength}
              onChange={handleChange}
              required
              min="0.5"
              step="0.1"
              placeholder="2.4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Rod Diameter and Soil Type */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Info className="w-5 h-5 text-accent" />
              {t('tools.groundingCalculator.rodDiameter')}
            </label>
            <input
              type="number"
              name="rodDiameter"
              value={formData.rodDiameter}
              onChange={handleChange}
              required
              min="10"
              step="1"
              placeholder="16"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Info className="w-5 h-5 text-accent" />
              {t('tools.groundingCalculator.soilType')}
            </label>
            <select
              name="soilType"
              value={formData.soilType}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            >
              <option value="">{t('tools.groundingCalculator.select')}</option>
              <option value="sandy">{t('tools.groundingCalculator.soilTypes.sandy')}</option>
              <option value="clay">{t('tools.groundingCalculator.soilTypes.clay')}</option>
              <option value="rocky">{t('tools.groundingCalculator.soilTypes.rocky')}</option>
              <option value="mixed">{t('tools.groundingCalculator.soilTypes.mixed')}</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-primary py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
        >
          <Activity className="w-5 h-5" />
          {t('tools.groundingCalculator.calculate')}
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
              {t('tools.groundingCalculator.results.title')}
            </h3>
            <div className="flex items-center justify-center gap-3 mb-4">
              {result.isAcceptable ? (
                <CheckCircle2 className={`w-16 h-16 ${result.isExcellent ? 'text-green-500' : 'text-yellow-500'}`} />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
            </div>
            <div className={`inline-block px-6 py-3 rounded-full ${result.isExcellent ? 'bg-green-500' : result.isAcceptable ? 'bg-yellow-500' : 'bg-red-500'} text-white font-bold text-lg`}>
              {result.isExcellent 
                ? t('tools.groundingCalculator.status.excellent')
                : result.isAcceptable 
                  ? t('tools.groundingCalculator.status.acceptable') 
                  : t('tools.groundingCalculator.status.unacceptable')}
            </div>
            <div className="mt-4">
              <div className="text-4xl font-bold text-gray-900">{result.resistance} Ω</div>
              <div className="text-sm text-gray-600">{t('tools.groundingCalculator.results.resistance')}</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-4">
            <div className="text-sm text-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{t('tools.groundingCalculator.results.singleRod')}</span>
                <span>{result.singleRodResistance} Ω</span>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-accent" />
              {t('tools.groundingCalculator.recommendations.title')}
            </h4>
            <ul className="space-y-2">
              {result.isExcellent && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.excellent.0')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.excellent.1')}</span>
                  </li>
                </>
              )}
              {result.isAcceptable && !result.isExcellent && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.acceptable.0')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.acceptable.1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.acceptable.2')}</span>
                  </li>
                </>
              )}
              {!result.isAcceptable && (
                <>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.unacceptable.0')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.unacceptable.1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.unacceptable.2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{t('tools.groundingCalculator.recommendations.unacceptable.3')}</span>
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
