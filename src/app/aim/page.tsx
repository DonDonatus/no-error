// src/app/measurements/page.tsx
import MeasurementForm from '@/components/MeasurementForm';

export default function MeasurementPage() {
  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">👔 AI Suit Measurer</h1>
      <p className="mb-6">Stand still and we'll measure you!</p>
      
      <MeasurementForm />
      
      <div className="mt-8 text-sm text-gray-500">
        <p>📸 Take a full-body photo against a plain wall</p>
        <p>👕 Wear fitted clothes for best results</p>
      </div>
    </main>
  );
}