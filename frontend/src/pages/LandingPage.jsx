import React, { useState } from 'react';
import { 
  Activity, 
  Brain, 
  Shield, 
  Database, 
  BarChart3, 
  Users, 
  Zap, 
  FileText, 
  Lock, 
  Globe, 
  Mail,
  Menu,
  X,
  ChevronRight,
  Stethoscope,
  Monitor,
  Cpu,
  Settings,
  TrendingUp,
  Eye,
  Mic,
  Calendar,
  Server,
  CheckCircle,
  LogIn
} from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: Activity },
    { id: 'features', label: 'Features', icon: Cpu },
    { id: 'about', label: 'About', icon: Stethoscope },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield }
  ];

  // Function to handle login navigation
  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const TabButton = ({ tab, isActive, onClick }) => {
    const Icon = tab.icon;
    return (
      <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <Icon size={18} />
        <span>{tab.label}</span>
      </button>
    );
  };

  const FeatureCard = ({ icon: Icon, title, description, color = "blue" }) => {
    // Map color to actual Tailwind classes
    const colorClasses = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', border: 'hover:border-green-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'hover:border-orange-200' },
      red: { bg: 'bg-red-100', text: 'text-red-600', border: 'hover:border-red-200' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'hover:border-indigo-200' }
    };

    const currentColor = colorClasses[color] || colorClasses.blue;

    return (
      <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 ${currentColor.border}`}>
        <div className={`w-12 h-12 ${currentColor.bg} rounded-lg flex items-center justify-center mb-4`}>
          <Icon className={currentColor.text} size={24} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    );
  };

  const renderHomeContent = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8 py-16">
        <div className="flex justify-center mb-8">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src="/logo.png"  // <-- replace with your image path
              alt="SynPACS Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          🚀 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Redefining Medical Imaging
          </span><br />
          with Next-Generation PACS and AI
        </h1>
        <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Faster Workflows. Sharper Insights. Better Care
        </p>
        <p className="text-lg text-gray-500 max-w-6xl mx-auto">
          SynPACS is building an intelligent Picture Archiving and Communication System that blends medical imaging, 
          artificial intelligence, and advanced reporting tools into a seamless experience for radiologists, 
          hospitals, and diagnostic networks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button 
            onClick={handleLoginClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
          >
            <LogIn size={20} />
            <span>Sign In to Platform</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2">
            <Eye size={20} />
            <span>Watch Demo</span>
          </button>
        </div>
      </div>

      {/* Why Choose Synpacs */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose SynPACS?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Brain className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Future-Ready</h3>
            <p className="text-gray-600">Designed with AI integration at its core</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Settings className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Customizable</h3>
            <p className="text-gray-600">Add modules as your organization grows</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Transparent</h3>
            <p className="text-gray-600">Client dashboards and usage tracking built-in</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <Database className="text-orange-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Affordable</h3>
            <p className="text-gray-600">Flexible pricing aligned with your scale</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="text-red-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Reliable</h3>
            <p className="text-gray-600">24/7 accessibility with enterprise-grade performance</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <Server className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Scalable</h3>
            <p className="text-gray-600">From small clinics to enterprise hospitals</p>
          </div>
        </div>
      </div>

      {/* Development Status */}
      <div className="text-center bg-amber-50 rounded-2xl p-12">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="text-amber-600" size={28} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Currently in Development</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We are working hand-in-hand with radiologists and imaging specialists to ensure SynPACS delivers 
          real-world efficiency, accuracy, and reliability.
        </p>
      </div>
    </div>
  );

  const renderFeaturesContent = () => (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Features Under Development</h1>
        <p className="text-xl text-gray-600">Building the future of medical imaging technology</p>
      </div>

      {/* Core PACS Features */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Monitor className="text-blue-600" />
          <span>Core PACS Features</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={Database}
            title="Secure Storage & Retrieval"
            description="Advanced image storage and retrieval system with enterprise-grade security measures."
            color="blue"
          />
          <FeatureCard
            icon={Eye}
            title="Multi-Modality DICOM Viewer"
            description="Support for CT, MRI, X-ray, Ultrasound, PET, and more with fast loading times."
            color="green"
          />
          <FeatureCard
            icon={Zap}
            title="High-Speed Performance"
            description="Fast loading times, even for high-resolution studies and large datasets."
            color="purple"
          />
          <FeatureCard
            icon={FileText}
            title="Structured Reporting"
            description="Customizable templates for consistent and comprehensive reporting."
            color="orange"
          />
        </div>
      </div>

      {/* AI-Powered Tools */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Brain className="text-purple-600" />
          <span>AI-Powered Tools</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={FileText}
            title="AI-Assisted Reporting"
            description="Intelligent assistance for structured reporting with greater accuracy."
            color="purple"
          />
          <FeatureCard
            icon={TrendingUp}
            title="Workflow Triage"
            description="Automated prioritization for urgent cases to improve patient outcomes."
            color="red"
          />
          <FeatureCard
            icon={Mic}
            title="Speech-to-Text"
            description="Advanced voice recognition with medical terminology support."
            color="blue"
          />
        </div>
      </div>

      {/* Analytics & Business Intelligence */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <BarChart3 className="text-green-600" />
          <span>Analytics & Business Intelligence</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={Calendar}
            title="Case Load Tracking"
            description="Comprehensive tracking and reporting of turnaround time (TAT) insights."
            color="green"
          />
          <FeatureCard
            icon={TrendingUp}
            title="Productivity Dashboards"
            description="Detailed radiologist productivity metrics and performance analytics."
            color="blue"
          />
          <FeatureCard
            icon={BarChart3}
            title="Operational Intelligence"
            description="Data-driven insights for better decision-making and optimization."
            color="purple"
          />
          <FeatureCard
            icon={Users}
            title="Client Statistics"
            description="Client-specific usage statistics and performance metrics."
            color="orange"
          />
        </div>
      </div>

      {/* Client Portal */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Users className="text-orange-600" />
          <span>Client Portal</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Monitor}
            title="Dedicated Client Dashboard"
            description="Personalized dashboard for clients to monitor their imaging cases."
            color="orange"
          />
          <FeatureCard
            icon={Shield}
            title="Secure Access"
            description="Secure access to reports and study volumes with role-based permissions."
            color="red"
          />
          <FeatureCard
            icon={BarChart3}
            title="Usage Analytics"
            description="Transparent case statistics and comprehensive usage history."
            color="green"
          />
        </div>
      </div>

      {/* Scalability & Integration */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Server className="text-indigo-600" />
          <span>Scalability & Integration</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard
            icon={Settings}
            title="Modular Design"
            description="Flexible architecture suitable for small clinics to enterprise hospitals."
            color="indigo"
          />
          <FeatureCard
            icon={Globe}
            title="API Integration"
            description="Comprehensive API support for seamless integration with existing EMR/HIS systems."
            color="blue"
          />
        </div>
      </div>
    </div>
  );

  const renderAboutContent = () => (
    <div className="space-y-12">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <Stethoscope className="text-white" size={40} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">About Synpacs</h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Shaping the future of medical imaging technology
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          At <strong>Synpacs</strong>, we are shaping the future of medical imaging technology. 
          Our vision is to create a <strong>powerful yet intuitive PACS platform</strong> that goes beyond 
          storage and viewing — empowering radiologists and healthcare organizations with 
          <strong> AI-powered insights, advanced analytics, and workflow automation</strong>.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          We are currently in the <strong>development stage</strong>, working hand-in-hand with 
          radiologists and imaging specialists to ensure Synpacs delivers 
          <strong> real-world efficiency, accuracy, and reliability</strong>.
        </p>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Zap className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Simplify Workflows</h3>
            <p className="text-gray-600">Streamline radiology workflows for maximum efficiency</p>
          </div>
          <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Brain className="text-purple-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Meaningful AI</h3>
            <p className="text-gray-600">Deliver meaningful AI assistance, not complexity</p>
          </div>
          <div className="text-center space-y-4 p-6 bg-white rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="text-green-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Secure Infrastructure</h3>
            <p className="text-gray-600">Provide secure, scalable, and future-proof imaging infrastructure</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTermsContent = () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
          <FileText className="text-blue-600" size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Terms & Conditions</h1>
        <p className="text-gray-600">Last Updated: September, 2025</p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          Welcome to <strong>Synpacs</strong>. By accessing, registering, or using our website, 
          platform, or services (collectively, the "Services"), you agree to comply with 
          the following Terms & Conditions.
        </p>
      </div>

      <div className="space-y-8">
        {[
          {
            title: "Acceptance of Terms",
            content: "By using Synpacs, you confirm that you are authorized to do so on behalf of your organization or as an individual user. If you do not agree to these Terms, you must discontinue use immediately."
          },
          {
            title: "Services Under Development",
            content: "Synpacs is currently under active development. Features, specifications, and service availability may change, improve, or be discontinued without prior notice."
          },
          {
            title: "Permitted Use",
            content: "Users must use Synpacs only for legitimate medical imaging, reporting, or research purposes. Any use of the Services for unlawful, unethical, or non-medical activities is strictly prohibited. Users may not resell, sublicense, or redistribute Synpacs without prior written approval."
          },
          {
            title: "User Responsibilities",
            content: "Users are responsible for the accuracy and legality of all information and data uploaded. Users must ensure they have obtained appropriate patient consent and complied with local regulations before sharing imaging data. Users must not attempt to bypass security measures, reverse-engineer the software, or interfere with platform operations."
          },
          {
            title: "Data & Confidentiality",
            content: "Synpacs implements industry-standard security measures, including encryption and restricted access controls, to protect data. While no digital system can be guaranteed 100% secure, Synpacs continually enhances its safeguards to ensure the highest possible level of protection. Users remain the legal owners of their uploaded imaging data and reports."
          },
          {
            title: "Medical Disclaimer",
            content: "Synpacs provides assistive AI tools but does not make clinical or diagnostic decisions. All medical interpretations, diagnoses, and reporting responsibilities rest solely with qualified healthcare professionals. Synpacs cannot be held liable for clinical outcomes based on use of the Services."
          },
          {
            title: "Limitation of Liability",
            content: "To the maximum extent permitted by applicable law, Synpacs shall not be responsible for any indirect or incidental damages that may arise from the use of the platform. Service interruptions, AI misinterpretations, or data delays shall not create liability for Synpacs."
          },
          {
            title: "Governing Law",
            content: "These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in New Delhi, India."
          }
        ].map((section, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <CheckCircle className="text-green-500" size={20} />
              <span>{index + 1}. {section.title}</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacyContent = () => (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Shield className="text-green-600" size={32} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-600">Last Updated: September, 2025</p>
      </div>

      <div className="bg-green-50 rounded-lg p-6">
        <p className="text-gray-700 leading-relaxed">
          At <strong>Synpacs</strong>, we value your trust. This Privacy Policy explains how we 
          collect, store, use, and protect information when you access or use our Services.
        </p>
      </div>

      <div className="space-y-8">
        {[
          {
            title: "Information We Collect",
            content: "Account Information: Name, email, organization details, and login credentials. Usage Information: Login history, access logs, session activity, and performance metrics. Medical Data (if uploaded): Imaging files, reports, and associated case details. Technical Data: Browser type, device information, and IP address."
          },
          {
            title: "Purpose of Collection",
            content: "We collect information to: Provide and improve the Services. Analyze system usage to enhance reliability. Communicate updates, product changes, or support information. Ensure compliance with institutional and contractual requirements."
          },
          {
            title: "Data Ownership & Control",
            content: "Users and their organizations retain ownership of all uploaded imaging data. Synpacs only processes data to deliver platform functionalities. Users may request data deletion at any time by contacting our support team."
          },
          {
            title: "Data Security",
            content: "Synpacs employs encryption, restricted access, and secure servers to safeguard data. Despite best efforts, no system is 100% secure. Users are advised to comply with their institutional security policies."
          },
          {
            title: "Data Sharing",
            content: "Synpacs does not sell, trade, or rent user or patient data. Limited data may be shared with trusted service providers for technical support or legal compliance. Any third-party integrations (e.g., EMR, HIS systems) are managed under separate agreements."
          },
          {
            title: "User Rights",
            content: "Request access to stored personal data. Request correction or deletion of inaccurate data. Withdraw consent for communication at any time. Request account and data deletion upon termination."
          },
          {
            title: "International Use",
            content: "Users accessing from outside India are responsible for compliance with local laws and data protection rules in their jurisdiction."
          }
        ].map((section, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Lock className="text-green-500" size={20} />
              <span>{index + 1}. {section.title}</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact Us</h3>
        <p className="text-gray-700 mb-4">For privacy-related queries, reach us at:</p>
        <a 
          href="mailto:support@synpacs.com" 
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <Mail size={20} />
          <span>support@synpacs.com</span>
        </a>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeContent();
      case 'features': return renderFeaturesContent();
      case 'about': return renderAboutContent();
      case 'terms': return renderTermsContent();
      case 'privacy': return renderPrivacyContent();
      default: return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="text-white" size={24} />
              </div> */}
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"  // <-- replace with your image path
                  alt="SynPACS Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SynPACS</h1>
                <p className="text-sm text-gray-500">Medical Imaging Platform</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <nav className="flex space-x-2">
                {tabs.map(tab => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </nav>
              
              {/* Login Button */}
              <div className="border-l border-gray-300 pl-4">
                <button
                  onClick={handleLoginClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2 border-t border-gray-200">
              {tabs.map(tab => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={activeTab === tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
              
              {/* Mobile Login Button */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full text-left px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"  // <-- replace with your image path
                  alt="SynPACS Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Synpacs</h3>
                <p className="text-gray-400">Next-Generation Medical Imaging</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Building the future of medical imaging technology with AI-powered insights 
              and advanced workflow automation.
            </p>
            <div className="flex justify-center space-x-6">
              <a 
                href="mailto:support@synpacs.com" 
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
                <span>support@synpacs.com</span>
              </a>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2025 Synpacs. All rights reserved. | Governed by the laws of India
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;