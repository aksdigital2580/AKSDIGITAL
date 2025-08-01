
'use client';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.7), rgba(15, 15, 15, 0.7)), url('https://readdy.ai/api/search-image?query=Professional%20DJ%20booth%20with%20neon%20purple%20and%20pink%20lighting%2C%20turntables%20and%20mixing%20console%2C%20dark%20nightclub%20atmosphere%2C%20smoke%20effects%2C%20DJ%20Luna%20Janjali%20performing%2C%20electronic%20music%20festival%20vibes%2C%20high%20energy%20dance%20floor%20lighting&width=1920&height=1080&seq=hero1&orientation=landscape')`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff005c]/20 via-transparent to-[#8c00ff]/20"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#ff005c] via-white to-[#8c00ff] bg-clip-text text-transparent font-['Urbanist'] leading-tight">
            AKS DIGITAL
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-['Poppins'] font-light">
            Stream & Download DJ Remixes by DJ Luna Janjali
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="px-8 py-4 bg-gradient-to-r from-[#ff005c] to-[#8c00ff] rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-[#ff005c]/40 flex items-center gap-2 whitespace-nowrap">
            <i className="ri-play-circle-fill w-6 h-6 flex items-center justify-center"></i>
            Start Listening
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white/30 rounded-full font-semibold text-lg transition-all hover:bg-white/10 hover:border-white/50 flex items-center gap-2 whitespace-nowrap">
            <i className="ri-download-2-line w-6 h-6 flex items-center justify-center"></i>
            Free Downloads
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#ff005c] mb-2">50+</div>
            <div className="text-gray-300">Premium Remixes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#8c00ff] mb-2">100K+</div>
            <div className="text-gray-300">Total Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#ff005c] mb-2">24/7</div>
            <div className="text-gray-300">Free Streaming</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="ri-arrow-down-line text-2xl text-white/70 w-8 h-8 flex items-center justify-center"></i>
      </div>
    </section>
  );
}
