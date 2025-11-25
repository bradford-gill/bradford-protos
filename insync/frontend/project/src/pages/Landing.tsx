import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Activity, Heart, Users, TrendingUp, ArrowRight } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gray-900 rounded-xl">
              <Activity className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 tracking-tight">InSync Health</h1>
          </div>

          <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl font-light">
            Comprehensive care coordination platform for value-based healthcare delivery.
            <span className="block mt-2">Empowering care teams to deliver better outcomes.</span>
          </p>

          <Button
            size="lg"
            className="text-lg px-10 py-7 bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
            onClick={() => navigate('/login')}
          >
            Access Dashboard
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="grid md:grid-cols-3 gap-8 w-full mt-20">
            <div className="p-10 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-100 rounded-xl">
                  <Heart className="h-10 w-10 text-gray-900" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Patient-Centered Care</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor high-risk patients across the care continuum with real-time tracking and intelligent alerts
              </p>
            </div>

            <div className="p-10 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-100 rounded-xl">
                  <Users className="h-10 w-10 text-gray-900" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Team Coordination</h3>
              <p className="text-gray-600 leading-relaxed">
                Seamless collaboration tools for care teams, specialists, and care coordinators
              </p>
            </div>

            <div className="p-10 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-100 rounded-xl">
                  <TrendingUp className="h-10 w-10 text-gray-900" strokeWidth={2} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Value-Based Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Track quality metrics, readmission rates, and financial performance in real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full py-6 text-center text-sm text-gray-500 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-center gap-6">
          <span className="font-medium">v2.1.0</span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-medium">HIPAA Compliant</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
